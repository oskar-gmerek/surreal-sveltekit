import { z } from 'zod';

export const schema = z.object({
	username: z
		.string()
		.min(
			7,
			'Username length is inversely proportional to registration success. Add more characters, please! Minimum 7 chars.'
		),
	'new-password': z
		.string()
		.min(
			3,
			'Yikes! That password is like a cardboard shield in a medieval battle. Reinforce it, brave soul! Minimum 13 chars.'
		)
});
