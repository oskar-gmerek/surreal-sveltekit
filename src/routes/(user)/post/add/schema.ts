import { z } from 'zod';

export const schema = z.object({
	title: z
		.string()
		.min(
			15,
			'Without a catchy title, a story is like a joke without a punchline - it falls flat. Minimum 15 chars.'
		),
	content: z
		.string()
		.min(
			50,
			`When creativity took a coffee break, it's smarter to have a coffee yourself and ponder something extraordinary. Maybe the coffee beans will spill the secrets of genius! Minimum 50 chars.`
		)
		.max(
			300,
			`Whoa, slow down with the quill! This is just the demo, not your magnum opus! Keep it short and sweet, like a wizard's spell, but without the wand waving! Maximum 300 chars.`
		)
});
