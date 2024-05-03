<script lang="ts">
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';

  let confirmSignOutModal: HTMLDialogElement;

  onMount(() => {
    confirmSignOutModal.showModal();
  });
</script>

<dialog class="modal" bind:this={confirmSignOutModal} on:close={() => goto('/')}>
  <div class="modal-box">
    <h3 class="font-bold text-lg">Sign Out!</h3>
    <p class="py-4">Do you want to sign out?</p>
    <div class="modal-action">
      <form method="dialog">
        <button type="submit" class="btn">Yes</button>
        <button class="btn">No</button>
      </form>
    </div>
  </div>
</dialog>
