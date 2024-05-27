<script lang="ts">
  import { AppRoute } from '$lib/constants';
  import type { PageData } from './$types';

  export let data: PageData;
  console.log(data);
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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          aria-hidden="true"
          role="img"
          class="text-base-content/60"
          font-size="15"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
          ><g
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            ><circle cx="11" cy="11" r="8"></circle><path d="m21 21l-4.3-4.3"></path></g
          ></svg
        ><input
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
                <button aria-label="Edit user" class="btn btn-sm btn-square btn-ghost"
                  ><svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    aria-hidden="true"
                    role="img"
                    class="text-base-content/70"
                    font-size="15"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                    ><path
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5L2 22l1.5-5.5Zm-2 2l4 4"
                    ></path></svg
                  ></button
                ><button aria-label="Show user" class="btn btn-sm btn-square btn-ghost"
                  ><svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    aria-hidden="true"
                    role="img"
                    class="text-base-content/70"
                    font-size="16"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                    ><g
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      ><path d="M2 12s3-7 10-7s10 7 10 7s-3 7-10 7s-10-7-10-7Z"></path><circle
                        cx="12"
                        cy="12"
                        r="3"
                      ></circle></g
                    ></svg
                  ></button
                ><button
                  aria-label="Delete user"
                  class="btn text-error/70 hover:bg-error/20 btn-sm btn-square btn-ghost"
                  ><svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    aria-hidden="true"
                    role="img"
                    class=""
                    font-size="16"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                    ><path
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 6h18m-2 0v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"
                    ></path></svg
                  ></button
                >
              </div>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</section>
