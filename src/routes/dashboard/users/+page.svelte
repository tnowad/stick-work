<script lang="ts">
  import type { PageData } from './$types';

  export let data: PageData;
  console.log(data);
</script>

<div class="overflow-x-auto">
  <table class="table table-zebra">
    <thead>
      <tr>
        <th>UID</th>
        <th>Name</th>
        <th>email</th>
        <th>Banned</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {#each data.users as user}
        <tr>
          <td>{user.uid}</td>
          <td>{user.displayName ?? '<Empty>'}</td>
          <td>{user.email}</td>
          <td>{user.disabled ? 'Yes' : 'No'}</td>
          {#if user.disabled}
            <td>
              <button class="btn btn-sm btn-primary">Enable</button>
            </td>
          {:else}
            <td>
              <button class="btn btn-sm btn-danger">Disable</button>
            </td>
          {/if}
        </tr>
      {/each}
    </tbody>
    <tfoot>
      <tr>
        <th>UID</th>
        <th>Name</th>
        <th>email</th>
        <th>Disable</th>
      </tr>
    </tfoot>
  </table>
</div>
