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

  <form method="post" action="?/createCalendar" use:enhance class="card max-w-sm card-bordered">
    <h3>Create Calendar</h3>
    <label for="calendar-name">Name</label>
    <input type="text" name="calendarName" id="calendar-name" />

    {#if form?.errors?.calendarName}
      <p>{form.errors?.calendarName}</p>
    {/if}

    <button type="submit" class="btn btn-primary btn-sm">Create</button>
  </form>

  <form method="post" action="?/createEvent" use:enhance class="card max-w-sm card-bordered">
    <h3>Create Event</h3>

    <label for="event-calendar">Calendar</label>
    <select name="eventCalendar" id="event-calendar">
      {#each data.calendars as calendar}
        <option value={calendar.id}>{calendar.name}</option>
      {/each}
    </select>

    <label for="event-name">Name</label>
    <input type="text" name="eventName" id="event-name" />

    {#if form?.errors?.eventName}
      <p>{form.errors?.eventName}</p>
    {/if}

    <label for="event-start">Start</label>
    <input type="datetime-local" name="eventStart" id="event-start" />

    {#if form?.errors?.eventStart}
      <p>{form.errors?.eventStart}</p>
    {/if}

    <label for="event-end">End</label>
    <input type="datetime-local" name="eventEnd" id="event-end" />

    {#if form?.errors?.eventEnd}
      <p>{form.errors?.eventEnd}</p>
    {/if}

    <label for="event-description">Description</label>
    <textarea name="eventDescription" id="event-description"></textarea>

    {#if form?.errors?.eventDescription}
      <p>{form.errors?.eventDescription}</p>
    {/if}

    <button type="submit" class="btn btn-primary btn-sm">Create</button>
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

  <form>
    <h3>Events</h3>
    <ul>
      {#each data.events as event}
        <li>
          <input type="checkbox" id={event.id} name="events" value={event.id} />
          <label for={event.id}>{event.name}</label>
        </li>
      {/each}
    </ul>
  </form>

  <Scheduler />
</div>
