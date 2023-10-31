<script lang="ts">
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';
	import type { User } from '$types';
	import { schema } from './schema';
	import { db } from '$lib/surreal';
	import { error } from '@sveltejs/kit';
	import { mcssForm } from '$lib/styles/form.mcss';
	import { mcssButton } from '$lib/styles/button.mcss';

	export let data: PageData;

	const { form, enhance, errors, message } = superForm(data.form, {
		validators: schema,
		taintedMessage: false
	});

	let usernameAvailable = true;

	const checkAvailability = async (input: string) => {
		const username = await db
			.query<[User[]]>('SELECT * FROM username_lookup WHERE username = type::string($username)', {
				username: input
			})
			.catch((err: Error) => {
				throw error(500, `Error: ${err.message}`);
			});
		if (username?.[0].result?.[0])
			return (
				(usernameAvailable = false),
				($errors.username = [`Taken, this username is. Take again, you can't.`])
			);
		return (usernameAvailable = true);
	};
</script>

<div class="min-vh min-w:full p:20 flex center-content">
	<div class="flex flex:col">
		<h1 class="ai:center text:center" title="Join the Community of Adults">Create New Account</h1>

		<form method="POST" use:enhance action="?/register" class={`${mcssForm} w:600 w:98%@<2xs `}>
			{#if $message}
				<div class="bg:red-60 p:30 m:20 font:bold fg:black r:3">
					{$message}
				</div>
			{/if}
			<div class="field">
				<label for="username">Username</label>
				<input
					id="username"
					type="text"
					class:invalid={$errors.username || !usernameAvailable}
					name="username"
					bind:value={$form.username}
					on:input={(t) => checkAvailability(t.currentTarget.value)}
				/>
				{#if $errors.username || !usernameAvailable}<div class="invalid">{$errors.username}</div>{/if}
			</div>
			<div class="field">
				<label for="new-password">Password</label>
				<input
					id="new-password"
					type="password"
					name="new-password"
					bind:value={$form['new-password']}
					autocomplete="new-password"
				/>
				{#if $errors['new-password']}
					<div class="invalid">{$errors['new-password']}</div>
				{/if}
			</div>
			<button class={mcssButton}>Create your account</button>
		</form>
	</div>
</div>
