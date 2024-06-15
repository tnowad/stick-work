<script lang="ts">
  import { enhance } from '$app/forms';
  import type { Event } from '$lib/types/event.type';

  const { data, form } = $props();

  let currentTimePercent = $state(timeToPercent(new Date()));

  setInterval(() => {
    currentTimePercent = timeToPercent(new Date());
  }, 1000);

  const events: Event[] = [
    {
      id: '1',
      name: 'Today event 2 hours',
      userId: '1',
      startTime: new Date(),
      endTime: new Date(new Date().getTime() + 2 * 60 * 60 * 1000),
      isAllDay: false,
      calendarId: '1',
      recurrence: { type: 'none' },
      description: 'This is a description for the event'
    }
  ];

  function timeToPercent(date: Date) {
    const totalSecondsInDay = 24 * 60 * 60;
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    return (totalSeconds / totalSecondsInDay) * 100;
  }
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
  <div class="grid grid-cols-12">
    <div class="col-span-3">
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
    </div>

    <div class="col-span-9">
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

      <div class="h-fit grid grid-cols-9 grid-rows-[repeat(27,_minmax(0,_1fr))]">
        <div class="col-start-1 col-end-2 row-start-1 row-end-2">Time</div>
        <div class="col-start-2 col-end-3 row-start-1 row-end-2">Mon</div>
        <div class="col-start-3 col-end-4 row-start-1 row-end-2">Tue</div>
        <div class="col-start-4 col-end-5 row-start-1 row-end-2">Wed</div>
        <div class="col-start-5 col-end-6 row-start-1 row-end-2">Thu</div>
        <div class="col-start-6 col-end-7 row-start-1 row-end-2">Fri</div>
        <div class="col-start-7 col-end-8 row-start-1 row-end-2">Sat</div>
        <div class="col-start-8 col-end-9 row-start-1 row-end-2">Sun</div>
        <div class="col-start-9 col-end-10 row-start-1 row-end-2">Time</div>

        <div class="col-start-1 col-end-10 row-start-2 row-end-[26] relative -z-10">
          <div
            class="absolute h-[2px] bg-error w-full top-[var(--current-time-percent)]"
            style="--current-time-percent: {currentTimePercent}%;"
          ></div>
        </div>

        <div class="col-start-1 col-end-2 row-start-2 row-end-[26]">
          {#each Array.from({ length: 24 }).map((_, index) => index) as hour}
            <div
              class="row-start-[var(--row-start)] row-end-[var(--row-end)]"
              style="
                --row-start: {hour + 2};
                --row-end: {hour + 3};
              "
            >
              {hour}:00
            </div>
          {/each}
        </div>

        {#each Array.from({ length: 7 }).map((_, index) => index) as day}
          <div
            class="row-start-2 row-end-[26] col-start-[var(--col-start)] relative"
            style="--col-start: {day + 2}"
          >
            {#each events as event}
              <div
                class="absolute w-full top-[var(--start-time-percent)] bottom-[var(--end-time-percent)] bg-primary"
                style="
                  --start-time-percent: {timeToPercent(event.startTime)}%;
                  --end-time-percent: {timeToPercent(event.endTime)}%;
                "
              >
                {event.name}
              </div>
            {/each}
          </div>
        {/each}
        <div class="col-start-9 col-end-10 row-start-2 row-end-[26]">
          {#each Array.from({ length: 24 }).map((_, index) => index) as hour}
            <div
              class="row-start-[var(--row-start)] row-end-[var(--row-end)]"
              style="--row-start: {hour + 2}; --row-end: {hour + 3}"
            >
              {hour}:00
            </div>
          {/each}
        </div>

        <div class="col-start-1 col-end-2 row-start-[26] row-end-[27]">Time</div>
        <div class="col-start-2 col-end-3 row-start-[26] row-end-[27]">Mon</div>
        <div class="col-start-3 col-end-4 row-start-[26] row-end-[27]">Tue</div>
        <div class="col-start-4 col-end-5 row-start-[26] row-end-[27]">Wed</div>
        <div class="col-start-5 col-end-6 row-start-[26] row-end-[27]">Thu</div>
        <div class="col-start-6 col-end-7 row-start-[26] row-end-[27]">Fri</div>
        <div class="col-start-7 col-end-8 row-start-[26] row-end-[27]">Sat</div>
        <div class="col-start-8 col-end-9 row-start-[26] row-end-[27]">Sun</div>
        <div class="col-start-9 col-end-10 row-start-[26] row-end-[27]">Time</div>
      </div>

      <!-- <Scheduler /> -->
    </div>
  </div>
</div>
