import { db } from '$lib/surreal';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { User } from '$types';

export const load = (async ({ locals, params }) => {
	const author = await db.query<[User[]]>('SELECT * FROM user WHERE slug = $slug LIMIT 1', {
		slug: params.author_slug
	}) 
	if (!author) error(404, `This author is not registered yet.`);

	return { locals, author: author[0][0] as User };
}) satisfies PageServerLoad;
