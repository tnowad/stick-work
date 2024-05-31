<script lang="ts">
  import ThemeSelect from '$lib/components/theme-select.svelte';
  import type { LayoutData } from './$types';
  import Icon from '@iconify/svelte';
  export let data: LayoutData;

  const notifications = [
    {
      title: 'Customer has requested a return for item',
      time: '1 Hour ago',
      image: '/avatar-2.jpg'
    },
    {
      title: 'A new review has been submitted for product',
      time: '1 Hour ago',
      image: '/avatar-3.jpg'
    },
    {
      title: 'Prepare for the upcoming weekend promotion',
      time: '1 Hour ago',
      image: '/avatar-2.jpg'
    },
    {
      title: 'Product ABC123 is running low in stock.',
      time: '1 Hour ago',
      image: '/avatar-3.jpg'
    }
  ];
</script>

<div role="navigation" aria-label="Navbar" class="navbar z-10 border-b border-base-200 px-3">
  <div class="gap-3 navbar-start">
    <button aria-label="Leftmenu toggle" class="btn btn-sm btn-square btn-ghost">
      <Icon icon="heroicons:bars-3" class="w-5 h-5" />
    </button>
    <button
      aria-label="Search button"
      class="btn hidden w-48 items-center justify-start gap-3 border-base-content/20 hover:border-transparent hover:bg-base-content/20 sm:flex btn-sm btn-outline"
    >
      <Icon icon="heroicons:magnifying-glass" class="w-5 h-5" />
      <span class="text-base-content/60">Search</span>
    </button>
    <button
      aria-label="Search button"
      class="btn flex border-base-content/20 hover:border-transparent hover:bg-base-content/20 sm:hidden btn-sm btn-circle btn-outline"
    >
      <Icon icon="heroicons:magnifying-glass" class="w-5 h-5 " />
    </button>

    <dialog aria-label="Modal" class="modal">
      <div class="modal-box p-0">
        <div class="form-control flex-row items-center rounded-box p-2 px-5">
          <Icon icon="heroicons:magnifying-glass" class="w-5 h-5" />
          <input
            placeholder="Search along files"
            class="input w-full text-base focus:border-transparent focus:outline-0 input-sm focus:outline-offset-0"
          />
          <form method="dialog">
            <button aria-label="Close search modal" class="btn gap-2 btn-sm btn-circle btn-ghost">
              <Icon icon="heroicons:x-mark" class="w-5 h-5" />
            </button>
          </form>
        </div>
        <div class="border-t border-base-content/10">
          <ul class="menu">
            <li class="menu-title">Actions</li>
            <li class="">
              <div>
                <Icon icon="heroicons:folder-plus" class="w-5 h-5" />
                <p class="grow text-sm">Create a new folder</p>
              </div>
            </li>
            <li class="">
              <div>
                <Icon icon="heroicons:document-plus" class="w-5 h-5" />
                <p class="grow text-sm">Upload new document</p>
              </div>
            </li>
            <li class="">
              <div>
                <Icon icon="heroicons:user-plus" class="w-5 h-5" />
                <p class="grow text-sm">Invite to project</p>
              </div>
            </li>
            <hr class="-mx-2 mt-3 h-px border-base-content/10" />
            <li class="menu-title">Quick Links</li>
            <li class="">
              <div>
                <Icon icon="heroicons:rectangle-stack" class="w-5 h-5" />
                <p class="grow text-sm">File Manager</p>
              </div>
            </li>
            <li class="">
              <div>
                <Icon icon="heroicons:user" class="w-5 h-5" />
                <p class="grow text-sm">Profile</p>
              </div>
            </li>
            <li class="">
              <div>
                <Icon icon="heroicons:squares-2x2" class="w-5 h-5" />
                <p class="grow text-sm">Dashboard</p>
              </div>
            </li>
            <li class="">
              <div>
                <Icon icon="heroicons:question-mark-circle" class="w-5 h-5" />
                <p class="grow text-sm">Support</p>
              </div>
            </li>
            <li class="">
              <div>
                <Icon icon="heroicons:bolt" class="w-5 h-5" />
                <p class="grow text-sm">Keyboard Shortcuts</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <form method="dialog" class="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  </div>
  <div class="navbar-center"></div>
  <div class="gap-1.5 navbar-end">
    <ThemeSelect />
    <div>
      <div class="dropdown dropdown-bottom dropdown-end">
        <div tabindex="0" class="btn btn-circle btn-ghost btn-sm" role="button">
          <Icon icon="heroicons:bell" class="w-5 h-5" />
        </div>
        <ul
          tabindex="0"
          class="dropdown-content menu bg-base-100 rounded-box card card-compact m-1 w-96 p-3 shadow"
          role="menu"
        >
          <div class="flex items-center justify-between px-2">
            <p class="text-base font-medium">Notification</p>
            <button class="btn gap-2 btn-sm btn-circle btn-ghost">
              <Icon icon="heroicons:x-mark" class="w-5 h-5" />
            </button>
          </div>

          <div class="flex items-center justify-center">
            <div class=" rounded-full border border-base-content/10 px-3 text-center">
              <p class="text-xs text-base-content/80">Today</p>
            </div>
          </div>
          <div class="mt-3">
            {#each notifications as notification}
              <div
                class="my-0.5 flex cursor-pointer items-center gap-3 rounded-box p-1.5 transition-all hover:bg-base-content/5 active:scale-[.98]"
              >
                <img
                  alt={notification.title}
                  width="128"
                  height="128"
                  class="size-9 bg-base-content/10 p-0.5 mask mask-circle"
                  style="color: transparent;"
                  loading="lazy"
                  src={notification.image}
                />
                <div class="grow">
                  <p class="text-sm">{notification.title}</p>
                  <p class="text-xs text-base-content/60">{notification.time}</p>
                </div>
              </div>
            {/each}
          </div>
          <hr class="-mx-2 mt-2 border-base-content/10" />
          <div class="flex items-center justify-between pt-2">
            <button class="btn text-primary hover:bg-primary/10 btn-sm btn-ghost">
              View All
            </button>
            <button class="btn text-base-content/80 hover:bg-base-content/10 btn-sm btn-ghost">
              Mark as read
            </button>
          </div>
        </ul>
      </div>
    </div>

    <div class="dropdown dropdown-bottom dropdown-end">
      <div
        tabindex="0"
        class="btn btn-ghost rounded-btn px-1.5 hover:bg-base-content/20"
        role="menu"
      >
        <div class="flex items-center gap-2">
          <div aria-label="Avatar photo" class="avatar">
            <div class="mask mask-squircle" style="width: 30px; height: 30px;">
              <img alt="avatar" src={data.user?.picture ?? '/avatar.jpg'} />
            </div>
          </div>
          <div class="flex flex-col items-start">
            <p class="text-sm/none">{data.user?.email}</p>
            <p class="mt-1 text-xs/none text-primary uppercase">{data.role}</p>
          </div>
        </div>
      </div>
      <ul
        tabindex="0"
        class="dropdown-content menu p-2 shadow bg-base-100 rounded-box mt-4 w-52"
        role="menu"
      >
        <li>
          <div>
            <Icon icon="heroicons:user" class="w-5 h-5" />
            My Profile
          </div>
        </li>
        <li>
          <div>
            <Icon icon="heroicons:bell" class="w-5 h-5" />
            Notification
          </div>
        </li>
        <hr class="-mx-2 my-1 border-base-content/10" />
        <li>
          <div class="text-error">
            <Icon icon="heroicons:arrow-left-start-on-rectangle" class="w-5 h-5" />
            Logout
          </div>
        </li>
      </ul>
    </div>
  </div>
</div>

<slot />
