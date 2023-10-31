<script lang="ts">
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';
	import { schema } from './schema';
	import { mcssForm } from '$lib/styles/form.mcss';
	import { mcssButton } from '$lib/styles/button.mcss';
	import dayjs from 'dayjs';
	import relativeTime from 'dayjs/plugin/relativeTime' 
	dayjs.extend(relativeTime)

	export let data: PageData;

	const { form, enhance, errors, message } = superForm(data.form, {
		validators: schema,
		taintedMessage: false,
		resetForm: true
	});
</script>

<div class="m:auto max-w:800 p:70|0@>2xs p:70|20">
	{#if $message}
				<div class="bg:red-60 p:30 m:20 font:bold fg:black r:3">
					{$message}
				</div>
			{/if}
			{#if data.post?.author.id === data.locals.user?.id} 
			<form
			method="POST"
			action={`/post/${data.post?.slug}/edit/?/edit`}
			use:enhance
			class={`${mcssForm} w:600 w:98%@<2xs mx:auto`}
		>
			{#if $message}
				<div class="message">{$message}</div>
			{/if}
			<input name="post_id" value={data.post?.id} class="hidden">
			<input name="author_id" value={data.post?.author.id} class="hidden">
			<div class="field">
				<label for="title">Title:</label>
				<input id="title" type="text" name="title" bind:value={$form.title} autocomplete="off" />
				{#if $errors.title}<span class="invalid">{$errors.title}</span>{/if}
			</div>
			<div class="field">
				<label for="content">Content:</label>
				<textarea id="content" name="content" bind:value={$form.content} autocomplete="off" />
				{#if $errors.content}<span class="invalid">{$errors.content}</span>{/if}
			</div>

			<button class={mcssButton}>Modify post</button>
		</form>
		
		{/if}
</div>