import { z } from 'zod';

export const schema = z.object({
	username: z.string().min(7, 'Are you sure this is your username?'),
	'current-password': z.string().min(3, 'It looks like you ate a few characters.')
});
