import type { PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms/server';
import { schema } from './schema';
import { fail, type Actions, redirect } from '@sveltejs/kit';
import { db } from '$lib/surreal';

export const load = (async ({ locals }) => {
	const form = await superValidate(schema);

	return { form, locals };
}) satisfies PageServerLoad;

export const actions = {
	register: async ({ request, locals }) => {
		if (locals.user) redirect(303, '/');
		
		const form = await superValidate(request, schema);
		const { username, 'new-password': password } = form.data;

		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			await db.signup({
				scope: 'user',
				username: username,
				password: password
			});
		} catch (err) {
			const error = err as Error;
			console.log(error);
		}
		redirect(303, '/login');
	}
} satisfies Actions;
