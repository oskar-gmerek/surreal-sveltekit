import { z } from 'zod';

export const schema = z.object({
	title: z.string(),
	content: z.string(),
	author_id: z.string(),
	post_id: z.string()

})
