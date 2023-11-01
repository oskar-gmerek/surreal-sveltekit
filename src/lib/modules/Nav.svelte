<script lang="ts">
	import { page } from '$app/stores';
	import type { User } from '$types';

	export let user: User | undefined;

	const mcssNav =
		'rel flex bg:yellow-70 w:full top:0 h:70 fg:gray-10/.75 f:bold ai:center px:30  px:2@<2xs';

</script>

{#if user}
	<div class={`${mcssNav}`}>
		<div class="flex w:full jc:left px:10 fg:black_a:hover">
			<span class="pr:3 hidden@<2xs">Welcome,</span><a
				href={`/author/${user.slug}`}
				title="Register">{user.username}</a
			><span class="hidden@<2xs">!</span>
		</div>
		{#if $page.route.id !== '/(user)'}
			<div class="flex w:full jc:center px:10 fg:black_a:hover br:2|solid|black_a br:0_a:last px:5_a">
					<a href="/" title="">back to Homepage</a>
			</div>
			{/if}
		<div class="flex  w:full jc:right px:10_button fg:black_button:hover">
            <form method="POST" action="/?/logout">
                <button type='submit' class="font:bold">Log out</button>
            </form>
		</div>
	</div>
{:else}
	<div class={`${mcssNav}`}>
		<div class="flex w:full jc:right px:10_a fg:black_a:hover">
			<a href="/login" title="Log in">Log in</a>
			<a href="/register" title="Register">Create account</a>
		</div>
	</div>
{/if}
