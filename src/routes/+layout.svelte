<script>
	import '../app.css';
    import "@fortawesome/fontawesome-free/css/all.min.css";
    import { setTheme, currentTheme } from '$lib/theme';
	import { loadTheme } from '$lib/theme';
	import { onMount } from 'svelte';
    import { isUserLogged } from '$lib/store.js';

	onMount(() => {
		loadTheme()
	});

</script>
<!-- // TODO FIX POSTGRESQL  -->
<nav>
    <div class="left">
      <a href="/">Home<span class="hide2"></span></a>
    </div>
    <div class="center">
        <b class="link">Social test with JWT!</b>
    </div>
    <div class="right">
		<div class="user-management">
			{#if $isUserLogged == "true"}
                <form method="POST" action="?/logout">
                    <button type="submit" class="invbutton">Log Out {$isUserLogged}</button>
                </form>
			{:else if $isUserLogged == 'false'}
				<a href="/auth/login">Log In<span class="hide2"> {$isUserLogged}</span></a>
			{/if}
		</div>
        <div id="theme-select">
            {#if $currentTheme == 'dark'}
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <!-- svelte-ignore a11y-no-static-element-interactions -->
                <i class="fa-regular fa-sun themer" on:click={() => setTheme('light', true)}></i>
            {:else}
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <!-- svelte-ignore a11y-no-static-element-interactions -->
                <i class="fa-regular fa-moon themer" on:click={() => setTheme('dark', true)}></i>
            {/if}
        </div>
    </div>
</nav>
<slot />

<style>
    .invbutton{
        color: var(--font-link-color);
        text-decoration: underline;
        background-color: rgba(0, 0, 0, 0);
        height: 20px;
        display: flex;
        align-items: center;
        box-shadow: unset;
    }
</style>