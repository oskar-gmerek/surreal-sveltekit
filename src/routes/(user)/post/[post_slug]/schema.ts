import { z } from 'zod';

export const schema = z.object({
	post_id: z.string(),
	author_id: z.string()
})
