// import { db } from '$lib/surreal';
// import type { Post, User } from '$types';
// import type { LayoutLoad } from './$types';

// export const load = (async ({ data, parent }) => {
// 	const { locals } = await parent();

// 	// const posts = await db.query<[Post[]]>(`SELECT *, author.* FROM post ORDER BY created_at DESC`);
// 	// const total_users = await db.query<[User[]]>(`SELECT * FROM user`);

// 	// const latest_user = await db.query<[User[]]>(`SELECT * FROM $latest_user`);

// 	// TODO: The below do not work because of the permission for SELECT 'WHERE author = $auth.id'. I think this should work, why doesn't it work?
// 	// const your_posts = await db.query<[Post[]]>('SELECT *, author.* FROM your_posts');
// 	// const your_posts = await db.query<[Post[]]>('SELECT *, author.* FROM post WHERE author == $author', {
// 	// 	author: locals.user?.id
// 	// });
	     
// 	return {
// 		data,
// 		locals,
// 		posts: posts[0].result as Post[],
// 		latest_user: latest_user[0].result?.[0] as User,
// 		// your_posts: your_posts[0].result as Post[],
// 		total_users: total_users[0].result as User[]
// 	};
// }) satisfies LayoutLoad;
