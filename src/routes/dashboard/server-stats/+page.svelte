<script lang="ts">
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<section>
  {#await data.totalUsers}
    <p>Loading...</p>
  {:then totalUsers}
    <p>Total users: {totalUsers}</p>
  {:catch}
    <p>Failed to load data</p>
  {/await}

  {#await data.totalEvents}
    <p>Loading...</p>
  {:then totalEvents}
    <p>Total events: {totalEvents}</p>
  {:catch}
    <p>Failed to load data</p>
  {/await}

  {#await data.totalCalendars}
    <p>Loading...</p>
  {:then totalCalendars}
    <p>Total calendars: {totalCalendars}</p>
  {:catch}
    <p>Failed to load data</p>
  {/await}
</section>
