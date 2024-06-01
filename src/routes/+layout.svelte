<script lang="ts">
	import '../app.css';
    import "@fortawesome/fontawesome-free/css/all.min.css";
    import { setTheme, currentTheme } from '$lib/theme';
	import { loadTheme } from '$lib/theme';
	import { onMount } from 'svelte';
    import { isUserLogged } from '$lib/store.js';
	import { redirect } from '@sveltejs/kit';

    async function logout() {
        const response = await fetch('/auth/logout');
        const data = await response.json();
        if (response.ok) {
            isUserLogged.set('false')
        } else {
            console.error('Logout failed');
        }
    }

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
        <b class="link">Made by SalaniLeo!</b>
    </div>
    <div class="right">
		<div class="user-management">
			{#if $isUserLogged == "true"}
            <!-- <form method="POST" action="?/logout"> -->
				<a href="/auth/login" on:click={logout}>Log Out <span class="hide2"><i class="fa-solid fa-right-from-bracket"></i></span></a>
            <!-- </form> -->
            {:else if $isUserLogged == 'false'}
				<a href="/auth/login">Log In <span class="hide2"><i class="fa-solid fa-right-to-bracket"></i></span></a>
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