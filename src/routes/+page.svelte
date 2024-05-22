<script>
// @ts-nocheck

    import { isUserLogged } from '$lib/store.js';
	export let data;

    isUserLogged.set(data.user.loggedIn)
</script>

<div class="root">
    <div class="content">
        {#if data.user.loggedIn==true}
            <h1>{data.post.title}</h1>
            <div>{@html data.post.content}</div>
        {/if}
    </div>
</div>

<style>
    .root{
        padding: 1rem;
        display: flex;
        align-items: center;
    }
    .content {
        margin-left: 12rem;
        margin-right: 12rem;
        padding: 1rem;
        text-align: center;
    }
</style>