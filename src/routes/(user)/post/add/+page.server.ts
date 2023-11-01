import type { PageServerLoad } from './$types';
import { setError, superValidate } from 'sveltekit-superforms/server';
import { schema } from './schema';
import { fail, type Actions, redirect, error } from '@sveltejs/kit';
import { db } from '$lib/surreal';
import type { Post } from '$types';

export const load = (async ({ locals }) => {
	const form = await superValidate(schema);
	const my_posts = await db.query<[Post[]]>('SELECT *, author.* FROM post ORDER BY created_at DESC');
	// const my_posts = await db.query<[Post[]]>('SELECT * FROM your_posts ORDER BY created_at DESC');

	return { form, locals, my_posts: my_posts[0] as Post[] };
}) satisfies PageServerLoad;

export const actions = {
	add_post: async ({ request, locals }) => {
		const user = locals.user;
		if (!user) throw redirect(303, '/login');
		const form = await superValidate(request, schema);

		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			const { title, content } = form.data;

			await db
				.create('post', {
					title: title,
					content: content,
					author: user.id,
					created_at: new Date()
				})
				.catch((e: Error) => {
					if (e.message.includes('title' && title)) {
						setError(
							form,
							'title',
							`The title "${title}" is already in use. Please come up with something else.`
						);
						return fail(403, { form });
					} else if (e.message.includes('slug' && 'already contains')) {
						setError(
							form,
							'title',
							`The title "${title}" is already in use. Please come up with something else. Be creative!`
						);
						return fail(403, { form });
					} else {
						console.log(e.message);
					}
				});
		} catch (e) {
			const err = e as Error;
			throw error(500, `Error: ${err.message}`);
		}

		return { form };
	}
} satisfies Actions;
