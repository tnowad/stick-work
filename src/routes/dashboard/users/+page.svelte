<script lang="ts">
  import { AppRoute } from '$lib/constants';
  import type { PageData } from './$types';
  import { urlBuilder } from '$lib/utils/route.util';
  import Icon from '@iconify/svelte';

  export let data: PageData;
</script>

<svelte:head>
  <title>{data.meta.title}</title>
</svelte:head>

<div class="flex items-center justify-between">
  <h3 class="text-lg font-medium">Users</h3>
  <div class="text-sm breadcrumbs">
    <ul>
      <li><a href={AppRoute.DASHBOARD}>Dashboard</a></li>
      <li><a href={AppRoute.DASHBOARD_USER_MANAGEMENT}>Users</a></li>
    </ul>
  </div>
</div>

<section>
  <div class="flex items-center justify-between px-5 pt-5">
    <div class="inline-flex items-center gap-3">
      <div
        class="form-control flex flex-row items-center rounded-box border border-base-content/20 px-2"
      >
        <Icon icon="heroicons:magnifying-glass" class="w-5 h-5" />
        <input
          placeholder="Search along users"
          class="input w-full focus:border-transparent focus:outline-0 input-sm focus:outline-offset-0"
        />
      </div>
    </div>
  </div>
  <div class="overflow-x-auto mt-3">
    <table class="table">
      <thead>
        <tr>
          <th><input aria-label="Single check" class="checkbox checkbox-xs" type="checkbox" /></th>
          <th>UID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Banned</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {#each data.users as user}
          <tr class="cursor-pointer hover:bg-base-200/40">
            <th><input aria-label="Single check" class="checkbox checkbox-xs" type="checkbox" /></th
            >
            <td>{user.uid}</td>
            <td>{user.displayName ?? '<Empty>'}</td>
            <td>{user.email}</td>
            <td>{user.disabled ? 'Yes' : 'No'}</td>
            <td>
              <div class="inline-flex w-fit">
                <button aria-label="Edit user" class="btn btn-sm btn-square btn-ghost">
                  <Icon icon="heroicons:pencil" class="w-4 h-4" />
                </button>
                <a
                  aria-label="Show user"
                  class="btn btn-sm btn-square btn-ghost"
                  href={urlBuilder(AppRoute.DASHBOARD_USER_DETAIL, { params: { id: user.uid } })}
                >
                  <Icon icon="heroicons:eye" class="w-4 h-4" />
                </a>
                <button
                  aria-label="Delete user"
                  class="btn text-error/70 hover:bg-error/20 btn-sm btn-square btn-ghost"
                >
                  <Icon icon="heroicons:trash" class="w-4 h-4" />
                </button>
              </div>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</section>
