<script lang="ts">
  import { enhance } from '$app/forms';
  import Scheduler from '$lib/components/scheduler.svelte';

  const { data, form } = $props();
</script>

<svelte:head>
  <title>{data.meta.title}</title>
</svelte:head>

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

<div class="w-full min-h-screen">
  <form class="flex justify-center items-center">
    <input
      type="text"
      class="w-1/2 p-2 border border-gray-300 rounded-md"
      placeholder="Search for events"
    />
    <button type="submit" class="p-2 ml-2 bg-blue-500 text-white rounded-md"> Search </button>
  </form>

  <form method="post" action="?/createCalendar" use:enhance>
    <h3>Create Calendar</h3>
    <label for="calendar-name">Name</label>
    <input type="text" name="calendarName" id="calendar-name" />

    {#if form?.errors?.calendarName}
      <p>{form.errors?.calendarName}</p>
    {/if}

    <button type="submit">Create</button>
  </form>

  <form>
    <h3>Calendars</h3>
    <ul>
      {#each data.calendars as calendar}
        <li>
          <input type="checkbox" id={calendar.id} name="calendars" value={calendar.id} />
          <label for={calendar.id}>{calendar.name}</label>
        </li>
      {/each}
    </ul>
  </form>

  <Scheduler />
</div>
