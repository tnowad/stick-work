<script lang="ts">
  const { data } = $props();
</script>

<main class="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
  <div class="card w-full max-w-md shadow-xl bg-white">
    {#if data.user}
      <div class="card-body">
        <div class="flex items-center space-x-4">
          {#if data.user.photoURL}
            <img src={data.user.photoURL} alt="Profile" class="w-16 h-16 rounded-full" />
          {/if}
          <div>
            <h2 class="card-title">{data.user.displayName}</h2>
            <p class="text-sm text-gray-500">{data.user.email}</p>
          </div>
        </div>
        <div class="mt-4">
          <p><strong>UID:</strong> {data.user.uid}</p>
          <p><strong>Role:</strong> {data.user.role}</p>
          <p><strong>Email Verified:</strong> {data.user.emailVerified ? 'Yes' : 'No'}</p>
          <p><strong>Phone Number:</strong> {data.user.phoneNumber || 'N/A'}</p>
          <p><strong>Account Disabled:</strong> {data.user.disabled ? 'Yes' : 'No'}</p>
        </div>
        <div class="mt-4">
          <h3 class="text-lg font-bold">Custom Claims:</h3>
          <pre class="p-2 bg-gray-100 rounded">{JSON.stringify(
              data.user.customClaims,
              null,
              2
            )}</pre>
        </div>
      </div>
    {/if}
  </div>
</main>
