<script lang="ts">
	import type { PageData } from './$types';
	import dayjs from 'dayjs';
	import relativeTime from 'dayjs/plugin/relativeTime' 
	dayjs.extend(relativeTime)

	export let data: PageData;

</script>

<div class="m:auto max-w:800 p:70|0@>2xs p:70|20">

	<div class="fg:gray-10 bg:yellow-70 p:50 flex r:5">
		<div class="256x256_svg">
			<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M12 16q-1.725 0-3.225.525T6 18v2h12v-2q-1.275-.95-2.775-1.475T12 16Zm-6 6q-.825 0-1.413-.588T4 20V4q0-.825.588-1.413T6 2h12q.825 0 1.413.588T20 4v16q0 .825-.588 1.413T18 22H6Zm6-8q1.45 0 2.475-1.025T15.5 10.5q0-1.45-1.025-2.475T12 7q-1.45 0-2.475 1.025T8.5 10.5q0 1.45 1.025 2.475T12 14Z"/></svg>
		</div>
		<div class="py:30 overflow:hidden">
			<h1>{data.author?.username}</h1>
			<p>	Joined {dayjs(data.author?.created_at).fromNow()}</p>
			<div class="py:20">
				
				{#if data.author?.website}
				<p>	Website: <a href={data.author?.website } title={`Let's connect!`}>{data.author?.website}</a></p>
				{/if}
				{#if data.author?.linkedin}
				<p>	LinkedIn: <a href={data.author?.linkedin} title={`Connect with ${data.author.username} on LinkedIn`}>Connect on LinkedIn</a></p>
				{/if}
				{#if data.author?.github}
				<p>	GitHub: <a href={data.author?.github } title={`Check ${data.author.username}'s GitHub profile`}>Check GitHub profile</a></p>
				{/if}

			</div>
			{#if data.author?.etoro}
			<p>Copy investment portfolio on	eToro: <span class="font:bold">{data.author?.etoro}</span></p>
			{/if}
	
	
		</div>
	</div>
	
</div>