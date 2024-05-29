<script lang="ts">
  const options = [
    { value: 'dark', label: 'Dark' },
    { value: 'light', label: 'Light' }
  ];

  const handleThemeChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    document.documentElement.setAttribute('data-theme', target.value);
    localStorage.setItem('theme', target.value);
  };
</script>

<div class="dropdown">
  <div tabindex="0" role="button" class="btn m-1">
    Theme
    <svg
      width="12px"
      height="12px"
      class="h-2 w-2 fill-current opacity-60 inline-block"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 2048 2048"
      ><path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path></svg
    >
  </div>
  <ul
    role="menu"
    tabindex="0"
    class="dropdown-content z-[1] p-2 shadow-2xl bg-base-300 rounded-box w-32"
  >
    {#each options as { value, label }}
      <li>
        <input
          type="radio"
          name="theme-dropdown"
          class="theme-controller btn btn-sm btn-block btn-ghost justify-start"
          on:change={handleThemeChange}
          aria-label={label}
          {value}
        />
      </li>
    {/each}
  </ul>
</div>
