import type { LayoutLoad } from './$types';

export const load = (async ({ data, parent }) => {
	const { locals } = await parent();
	return { data, locals };
}) satisfies LayoutLoad;
