import type { PageServerLoad } from './$types';
import { type Actions, redirect } from '@sveltejs/kit';
import { db } from '$lib/surreal';
import type { Post, User } from '$types';

export const load = (async ({ locals }) => {
	const posts = await db.query<[Post[]]>(`SELECT *, author.* FROM post ORDER BY created_at DESC`);
	const total_users = await db.query<[User[]]>(`SELECT * FROM user`);

	// const latest_user = await db.query<[Partial<User>[]]>(`SELECT * FROM $latest_user`);
	const latest_user = await db.query<[User[]]>(`SELECT * FROM user ORDER BY created_at DESC LIMIT 1`)
	// const your_posts = await db.query<[Post[]]>('SELECT *, author.* FROM your_posts');
		const your_posts = await db.query<[Post[]]>('SELECT *, author.* FROM post WHERE author == $author', {
		author: locals.user?.id
	});
	return { 
		locals,
		posts: posts[0].result as Post[],
		latest_user: latest_user[0].result as User[],
		your_posts: your_posts[0].result as Post[],
		total_users: total_users[0].result as User[]
	};
}) satisfies PageServerLoad;

export const actions = {
	logout: async (event) => {
		event.locals.user = undefined;
		event.cookies.set('token', '', {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			secure: process.env.NODE_ENV === 'production',
			maxAge: -1
		});

		await db.invalidate();
		throw redirect(303, '/');
	}
} satisfies Actions;
