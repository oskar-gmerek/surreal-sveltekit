<script lang="ts">
	import dayjs from 'dayjs';
	import relativeTime from 'dayjs/plugin/relativeTime' 
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';
	import { schema } from './schema';

	export let data: PageData;
	dayjs.extend(relativeTime)

	const { enhance, message } = superForm(data.form, {
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
	<div class="bg:yellow-70 fg:black r:5 p:10 overflow:hidden">
		<div class="flex ">
			{#if data.post?.author.id === data.locals.user?.id} 
			<div class="text:left w:full f:bold"><a href={`/post/${data.post?.slug}/edit`} title="Modify post">EDIT</a> | 
				<form method="POST" action={`/post/${data.post?.slug}/?/remove`} use:enhance>
					<input name='post_id' value={data.post?.id} class="hidden">
					<input name='author_id' value={data.post?.author.id} class="hidden">
					<button title="Remove post" type="submit">REMOVE</button>
				</form>
			</div>
			{/if}
			<div class="text:right w:full">
				Written {dayjs(data.post?.created_at).fromNow()}
				by <a class="fg:black/.8 fg:black:hover" href={`/author/${data.post?.author.slug}`} title={data.post?.title}>{data.post?.author.username}</a>
			</div>
		</div>
		<h1 class="p:50|30 line-height:1">{data.post?.title}</h1>
		<div class="text-indent:20 px:30 pb:50">
			{data.post?.content}
		</div>
	</div>

</div>