<script lang="ts">
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';
	import { schema } from './schema';
	import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { mcssForm } from '$lib/styles/form.mcss';
	import { mcssButton } from '$lib/styles/button.mcss';
	import { createStore } from '$lib/createStore';
	import { observeLive } from '$lib/surreal';
	import dayjs from 'dayjs'
	import relativeTime from 'dayjs/plugin/relativeTime' 
	dayjs.extend(relativeTime)

	export let data: PageData;

	const { form, enhance, errors, message } = superForm(data.form, {
		validators: schema,
		taintedMessage: false,
		resetForm: true
	});

	const posts = createStore('my_posts', data.my_posts);

	$: $posts;
	observeLive('post', posts);
</script>

<div class="min-vh min-w:full p:20">
	<div class="flex flex:col w:98%@<2xs max-w:800 m:auto">
		<form
			method="POST"
			action="?/add_post"
			use:enhance
			class={`${mcssForm} w:600 w:98%@<2xs mx:auto`}
		>
			{#if $message}
				<div class="message">{$message}</div>
			{/if}
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

			<button class={mcssButton}>Add post</button>
		</form>

		<h1 class="fg:yellow-70 my:50 text:underline f:40">Your latest posts:</h1>

		{#if $posts.length > 0}
			{#each $posts as post, i (post.id)}
			<div class="my:10 bg:yellow-70 fg:black/.7 r:5 p:10 overflow:hidden" id={'post_' + i}
			transition:slide={{ delay: 250, duration: 600, easing: quintOut, axis: 'y' }}>
				<div class="flex ">
					<div class="text:right w:full">
						Written {dayjs(post.created_at).fromNow()}
						<!-- This 'if' should be removed after fix fetching user object in live observer -->
						{#if post.author.username}
						by <a class="fg:black/.7 fg:black:hover" href={`/author/${post.author.slug}`} title={post.author.username}>{data.locals.user?.username === post.author.username ? 'you' : post.author.username}</a>
						{/if}
					</div>
				</div>
				<a href={`/post/${post.slug}`} title={post.title}><h2 class="p:50|30 line-height:1 fg:black:hover word-break:break-all">{post.title}</h2></a>
				<div class="text-indent:20 px:30 pb:50 word-break:break-all">
					{post.content}
				</div>
			</div>
			{/each}
		{:else}
			No posts yet
		{/if}
	</div>
</div>
