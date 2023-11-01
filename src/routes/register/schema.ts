import { db } from '$lib/surreal';
import { z } from 'zod';

type UsernameLookup = {
	id: string,
	username: string
}

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
})
.refine(async (data) => {
	const query = await db
			.query<[UsernameLookup[]]>('SELECT * FROM username_lookup WHERE username = type::string($username)', {
				username: data.username
			}) 
	
			return !query[0][0]}, {
	message: "Taken, this username is. Take again, you can't.",
	path: ["username"]
  });
