<script lang="ts">
  import ThemeSelect from '$lib/components/theme-select.svelte';
  import { AppRoute } from '$lib/constants';
  import type { DecodedIdToken } from 'firebase-admin/auth';

  export let user: DecodedIdToken | undefined;
  export let role: 'admin' | 'user' | undefined;
</script>

<div class="navbar bg-base-100">
  <div class="flex-1">
    <a href={AppRoute.HOME} class="btn btn-ghost text-xl">Stick Work</a>
  </div>
  <div class="flex-none gap-2">
    <div class="form-control">
      <input type="text" placeholder="Search" class="input input-bordered w-24 md:w-auto" />
    </div>
    <ThemeSelect />
    {#if user}
      <div class="dropdown dropdown-end">
        <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
          <div class="w-10 rounded-full">
            <img alt="avatar" src={user.picture ?? '/avatar.jpg'} />
          </div>
        </div>
        <ul
          role="menu"
          tabindex="0"
          class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
        >
          <li>
            <a href={AppRoute.PROFILE} class="justify-between">
              Profile
              <span class="badge">New</span>
            </a>
          </li>
          <li><a href={AppRoute.SETTINGS}>Settings</a></li>

          {#if role === 'admin'}
            <li><a href={AppRoute.DASHBOARD}>Dashboard</a></li>
          {/if}

          <li><a href={AppRoute.AUTH_SIGN_OUT}>Sign out</a></li>
        </ul>
      </div>
    {:else}
      <a href={AppRoute.AUTH_SIGN_IN} class="btn btn-primary">Sign In</a>
    {/if}
  </div>
</div>
