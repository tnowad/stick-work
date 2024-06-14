<script lang="ts">
  import ThemeSelect from '$lib/components/theme-select.svelte';
  import { AppRoute } from '$lib/constants';
  import type { User } from '$lib/types';
  import Icon from '@iconify/svelte';
  import type { MenuItem } from './navbar';

  export let user: User | undefined;
  export let menuItems: MenuItem[];
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
          {#each menuItems as { title, href, badge, icon }}
            <li>
              <a {href} role="menuitem">
                {#if icon}
                  <Icon {icon} class="w-5 h-5" />
                {/if}
                {title}
                {#if badge}
                  <span class="badge badge-primary">{badge}</span>
                {/if}
              </a>
            </li>
          {/each}
        </ul>
      </div>
    {:else}
      <a href={AppRoute.AUTH_SIGN_IN} class="btn btn-primary">Sign In</a>
    {/if}
  </div>
</div>
