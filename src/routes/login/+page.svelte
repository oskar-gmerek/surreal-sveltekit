<script lang="ts">
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';
	import { schema } from './schema';
	import { mcssForm } from '$lib/styles/form.mcss';
	import { mcssButton } from '$lib/styles/button.mcss';

	export let data: PageData;

	const { form, enhance, errors, message } = superForm(data.form, {
		validators: schema,
		taintedMessage: false
	});
</script>

<div class="min-vh min-w:full p:20 flex center-content">
	<div class="flex flex:col">
		<h1 class="ai:center text:center" title="Join the Community of Adults">Log In</h1>

		<form method="POST" use:enhance action="?/login" class={`${mcssForm} w:600 w:98%@<2xs `}>
			{#if $message}
				<div class="bg:red-60 p:30 m:20 font:bold fg:black r:3">
					{$message}
				</div>
			{/if}
			<div class="field">
				<label for="username">Username</label>
				<input
					class:invalid={$errors.username}
					id="username"
					type="text"
					name="username"
					bind:value={$form.username}
					autocomplete="username"
					width={30}
				/>
				{#if $errors.username}<span class="invalid">{$errors.username}</span>{/if}
			</div>

			<div class="field">
				<label for="current-password">Password</label>
				<input
					class:invalid={$errors['current-password']}
					id="current-password"
					type="password"
					name="current-password"
					bind:value={$form['current-password']}
					autocomplete="current-password"
				/>
				{#if $errors['current-password']}<span class="invalid">{$errors['current-password']}</span
					>{/if}
			</div>

			<button class={`${mcssButton} m:auto`}>Log in</button>
		</form>
	</div>
</div>
