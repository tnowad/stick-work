<script lang="ts">
  import { enhance } from '$app/forms';
  import { goto } from '$app/navigation';
  import { AppRoute } from '$lib/constants';
  import { onMount } from 'svelte';

  let confirmSignOutModal: HTMLDialogElement;

  onMount(() => {
    confirmSignOutModal.showModal();
  });
</script>

<dialog class="modal" bind:this={confirmSignOutModal} on:close={() => goto(AppRoute.HOME)}>
  <div class="modal-box">
    <h3 class="font-bold text-lg">Sign Out!</h3>
    <p class="py-4">Do you want to sign out?</p>
    <div class="modal-action">
      <form
        method="post"
        action="/sign-out"
        use:enhance={() => {
          return async ({ result }) => {
            if (result.type === 'success') {
              await goto(AppRoute.HOME, { invalidateAll: true });
              return;
            }
          };
        }}
      >
        <button type="submit" class="btn">Yes</button>
        <button
          on:click|preventDefault={() => {
            history.back();
          }}
          class="btn">No</button
        >
      </form>
    </div>
  </div>
</dialog>
