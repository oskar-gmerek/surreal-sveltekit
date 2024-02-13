<script lang="ts">
	import type { PageData } from './$types';
	import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { card, card_content, card_icon, card_stat, card_title } from '$lib/styles/card.mcss';
	import { observeLive } from '$lib/surreal';
	import { createStore } from '$lib/createStore';
	import dayjs from 'dayjs'
	import relativeTime from 'dayjs/plugin/relativeTime' 
	dayjs.extend(relativeTime)

	export let data: PageData;
	
	const posts = createStore('posts', data.posts)
	const total_users = createStore('total_users', data.total_users)
	const your_posts = createStore('your_posts', data.your_posts)
	const latest_user = createStore('latest_user', data.latest_user)

	$: $latest_user
	observeLive('user', latest_user)

	$: $posts
	observeLive('post', posts)
	$: $your_posts
	// TODO: Below should observe 'your_posts' instead of 'post', but there is the problem with permission on the 'your_posts' view. Temporary workaround.
	observeLive('post', your_posts)
	$: $total_users
	observeLive('user', total_users)
	
	const link_user_prefix = '/author/'

</script>

<div class="w:full text:center">
	<a
		href="/post/add"
		class="rel top:15 bg:yellow-50 bg:yellow-40hover p:15|30 fg:gray-80 fg:gray-90:hover f:bold rb:3">Add post</a
	>
</div>
<div class="min-vh min-w:full p:20">
	<div class="flex flex:col w:98%@<2xs max-w:800 m:auto">
		<div class="grid gap:6 grid-cols:3">
			<div class={card}>
				<div class={card_icon}><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 13a2 2 0 1 0 4 0a2 2 0 0 0-4 0m-2 8v-1a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1M15 5a2 2 0 1 0 4 0a2 2 0 0 0-4 0m2 5h2a2 2 0 0 1 2 2v1M5 5a2 2 0 1 0 4 0a2 2 0 0 0-4 0m-2 8v-1a2 2 0 0 1 2-2h2"/></svg></div>
				<div class={card_content}>
					<div class={card_title}>Total users</div>
					<div class={card_stat}>{$total_users.length}</div>
				</div>
			</div>
			<div class={card}>
				<div class={card_icon}><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 20 20"><path fill="currentColor" d="M7 0a2 2 0 0 0-2 2h9a2 2 0 0 1 2 2v12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/><path fill="currentColor" d="M13 20a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2zM9 5h4v5H9zM4 5h4v1H4zm0 2h4v1H4zm0 2h4v1H4zm0 2h9v1H4zm0 2h9v1H4zm0 2h9v1H4z"/></svg></div>
				<div class={card_content}>
					<div class={card_title}>Total posts</div>
					<div class={card_stat}>{$posts.length}</div>
				</div>
			</div>
			<a href={`/post/add`} title="Manage your posts">
				<div class={card}>
					<div class={card_icon}><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M6.625 22q-1.975 0-3.363-1.388T1.875 17.25q0-1.425.738-2.55T4.55 13H2v-2h6v6H6v-2.425q-.925.2-1.525.95t-.6 1.725q0 1.15.812 1.95t1.938.8v2ZM7 9h10V7H7v2Zm3 12v-4h4v-2h-4v-2h7v-2h-7V9H3V5q0-.825.588-1.413T5 3h14q.825 0 1.413.588T21 5v14q0 .825-.588 1.413T19 21h-9Z"/></svg></div>
					<div class={card_content}>
						<div class={card_title}>Your posts</div>
						<div class={card_stat}>{$your_posts.length}</div>
					</div>
				</div>
			</a>
				<div class="grid-col-span:3 bg:yellow-50 flex fg:gray-80 p:10">
					<div class="as:center px:4"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M20 6H2V2h18v4m-3.5 6H15v5l3.61 2.16l.75-1.22l-2.86-1.69V12m6.5 4c0 3.87-3.13 7-7 7c-2.38 0-4.47-1.19-5.74-3H3V7h16v2.68c2.36 1.13 4 3.53 4 6.32M8 12h2.26c.57-.81 1.3-1.5 2.15-2H8.5c-.28 0-.5.22-.5.5V12m13 4c0-2.76-2.24-5-5-5s-5 2.24-5 5s2.24 5 5 5s5-2.24 5-5Z"/></svg></div>
					<div class="px:4 fg:gray-80 white-space:nowrap as:center font:bold">Latest user:</div>
					<div class="px:6 overflow:hidden white-space:nowrap text-overflow:ellipsis as:center flex"><a href={link_user_prefix+$latest_user[0].slug} title={$latest_user[0].username} class="fg:black:hover">{$latest_user[0].username}</a><p class="px:3 hidden@<2xs"> joined {dayjs($latest_user[0].created_at).fromNow()}</p></div>
				</div>
		</div>

		<h1 class="fg:yellow-50 my:50 text:underline f:40">Latest posts</h1>

		{#if $posts.length > 0}
			{#each $posts as post, i (post.id)}
			<div class="my:10 bg:yellow-50 fg:black/.7 r:5 p:10 overflow:hidden" id={'post_' + i}
			transition:slide={{ delay: 250, duration: 600, easing: quintOut, axis: 'y' }}>
				<div class="flex ">
					<div class="text:right w:full">
						Written {dayjs(post.created_at).fromNow()}
						by <a class="fg:black/.7 fg:black:hover" href={`/author/${post.author.slug}`} title={post.author.username}>{post.author.username}</a>
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
