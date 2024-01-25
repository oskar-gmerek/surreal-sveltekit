import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { db } from '$lib/surreal';
import type { Post } from '$types';
import { setMessage, superValidate } from 'sveltekit-superforms/server';
import { schema } from './schema';

export const load = (async ({ params, locals }) => {
	const form = await superValidate(schema);
	const post = await db.query<[Post[]]>('SELECT *, author.* FROM post WHERE slug = $slug LIMIT 1', {
		slug: params.post_slug
	});
	return { form, locals, post: post[0][0] as Post };
}) satisfies PageServerLoad;

export const actions = {
	remove: async ({request, locals}) => {
		const user = locals.user;
		if (!user) redirect(303, '/login');

		const form = await superValidate(request, schema);

		if (!form.valid) {
			return fail(400, { form });
		}
		const { post_id, author_id } = form.data

		if (author_id !== locals.user?.id) {
			setMessage(form, `You are not the author of this post. You can't delete it.`) 
			return fail(400, { form })
		}

		await db.query('DELETE $post', {
			post: post_id
		}).catch((e: Error) => {
			console.log(e)
		})
		


		redirect(303, '/');
	}
} satisfies Actions;