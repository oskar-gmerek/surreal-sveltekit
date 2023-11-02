import { error, fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { db } from '$lib/surreal';
import type { Post } from '$types';
import {  setError, superValidate } from 'sveltekit-superforms/server';
import { schema } from './schema';

export const load = (async ({ locals, params }) => {
	const post = await db.query<[Post[]]>('SELECT *, author.* FROM post WHERE slug = $slug LIMIT 1', {
		slug: params.post_slug
	});
	const form = await superValidate(post[0][0] as Post, schema);
	return { form, locals, post: post[0][0] as Post };
}) satisfies PageServerLoad;

export const actions = {
	edit: async ({ request, locals, params }) => {
		const user = locals.user;
		if (!user) throw redirect(303, '/login');
		const form = await superValidate(request, schema);

		if (!form.valid) {
			return fail(400, { form });
		}

		const { author_id, post_id, title, content } = form.data;
		if (author_id !== locals.user?.id) {
			throw error(403, `You are not a Russian propagandist, you can't modify other people's posts.`)
		}
		let isError = false
		try {
			await db
				.merge(post_id, {
					title: title,
					content: content
				})
				.catch((e: Error) => {
					if (e.message.includes('title' && title)) {
						isError = true
						return setError(
							form,
							'title',
							`The title "${title}" is already in use. Please come up with something else.`
						);
					} else {
						console.log(e.message);
					}
				})
		} catch (e) {
			const err = e as Error;
			throw error(500, `Error: ${err.message}`);
		}

		if (!isError) throw redirect(303, `/post/${params.post_slug}`)
		return { form }
	}
} satisfies Actions;
