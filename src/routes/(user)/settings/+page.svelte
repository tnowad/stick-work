<script lang="ts">
  import { onMount } from 'svelte';

  const { data } = $props();

  let user = $state({
    displayName: '',
    email: '',
    phoneNumber: '',
    photoURL: ''
  });

  let settings = $state({
    notifications: {
      email: false,
      sms: false
    },
    theme: 'light'
  });

  onMount(() => {
    if (data.user) {
      user = {
        displayName: data.user.displayName || '',
        email: data.user.email || '',
        phoneNumber: data.user.phoneNumber || '',
        photoURL: data.user.photoURL || ''
      };
      if (data.user.settings) {
        settings = {
          ...settings,
          ...data.user.settings
        };
      }
    }
  });

  const handleSubmit = async (event: Event) => {
    event.preventDefault();
    console.log('Updated user data:', user);
    console.log('Updated settings:', settings);
  };
</script>

<main class="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
  <div class="card w-full max-w-md shadow-xl bg-white">
    {#if data.user}
      <form onsubmit={handleSubmit} class="card-body">
        <div class="flex items-center space-x-4">
          {#if user.photoURL}
            <img src={user.photoURL} alt="Profile" class="w-16 h-16 rounded-full" />
          {/if}
        </div>
        <div class="mt-4">
          <label class="block mb-2 text-sm font-bold text-gray-700" for="displayName">
            Display Name
          </label>
          <input
            id="displayName"
            type="text"
            bind:value={user.displayName}
            class="input input-bordered w-full"
          />
        </div>
        <div class="mt-4">
          <label class="block mb-2 text-sm font-bold text-gray-700" for="email"> Email </label>
          <input
            id="email"
            type="email"
            bind:value={user.email}
            class="input input-bordered w-full"
          />
        </div>
        <div class="mt-4">
          <label class="block mb-2 text-sm font-bold text-gray-700" for="phoneNumber">
            Phone Number
          </label>
          <input
            id="phoneNumber"
            type="text"
            bind:value={user.phoneNumber}
            class="input input-bordered w-full"
          />
        </div>
        <div class="mt-4">
          <label class="block mb-2 text-sm font-bold text-gray-700" for="photoURL">
            Photo URL
          </label>
          <input
            id="photoURL"
            type="text"
            bind:value={user.photoURL}
            class="input input-bordered w-full"
          />
        </div>
        <div class="mt-4">
          <h3 class="text-lg font-bold">Notification Settings</h3>
          <label class="cursor-pointer label">
            <span class="label-text">Email Notifications</span>
            <input
              type="checkbox"
              bind:checked={settings.notifications.email}
              class="toggle toggle-primary"
            />
          </label>
          <label class="cursor-pointer label">
            <span class="label-text">SMS Notifications</span>
            <input
              type="checkbox"
              bind:checked={settings.notifications.sms}
              class="toggle toggle-primary"
            />
          </label>
        </div>
        <div class="mt-4">
          <h3 class="text-lg font-bold">Theme Settings</h3>
          <label class="cursor-pointer label">
            <span class="label-text">Theme</span>
            <select bind:value={settings.theme} class="select select-bordered w-full">
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </label>
        </div>
        <div class="mt-6">
          <button type="submit" class="btn btn-primary w-full"> Update Profile </button>
        </div>
      </form>
    {/if}
  </div>
</main>
