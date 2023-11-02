import type { PageServerLoad } from './$types';
import { setMessage, superValidate } from 'sveltekit-superforms/server';
import { schema } from './schema';
import { fail, type Actions, redirect, error } from '@sveltejs/kit';
import { db } from '$lib/surreal';

export const load = (async ({ locals }) => {
	const form = await superValidate(schema);

	return { form, locals };
}) satisfies PageServerLoad;

export const actions = {
	login: async ({ request, locals, cookies }) => {
		if (locals.user) throw redirect(303, '/');
		const form = await superValidate(request, schema);

		if (!form.valid) {
			return fail(400, { form });
		}

		const { username, 'current-password': password } = form.data;
		await db.use({ namespace: 'surreal', database: 'sveltekit' }).catch((err: Error) => {
			throw error(500, `Error: ${err.message}`);
		});

		try {
			await db
				.signin({
					scope: 'user',
					username: username,
					password: password
				})
				.then(async (token) => {
					if (!token) throw error(401, 'Authentication failed');
					cookies.set('token', token, {
						path: '/',
						httpOnly: true,
						sameSite: 'strict',
						secure: process.env.NODE_ENV === 'production',
						maxAge: 60 * 60 * 24 * 7, // 1 week
						priority: 'high'
					});
				});
		} catch (err) {
			setMessage(form, 'Error 605: Too intense, your Force is. Take a mind-break and try again.');
			return fail(400, { form });
		}
		throw redirect(303, '/');
	}
} satisfies Actions;
