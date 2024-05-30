<script lang="ts">
  import type { PageData } from './$types';

  export let data: PageData;

  console.log(data);
</script>

<svelte:head>
  <title>{data.meta.title}</title>
</svelte:head>

<div class="w-full min-h-screen">
  <!-- Header show current date, button to change view (day, week, month, agenda) -->
  <!-- Sidebar show calender, filter events -->

  <!--
    Show week view contain all events in week
    headers: day of week (Mon, Tue, Wed, Thu, Fri, Sat, Sun) and date
    show global events and user events from all calendars
    show events in day view (show all events)
    show events in week view (show all events)
    show events in month view (show only event all day)
    show agenda view (show all events)
  -->
</div>
