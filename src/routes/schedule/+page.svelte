<script lang="ts">
  type Event = {
    id: string;
    name: string;
    start: Date;
    end: Date;
    repeat?: {
      type: 'daily' | 'weekly' | 'monthly' | 'yearly';
      interval: number;
      start: Date;
      end: Date;
    };
    allDay?: {
      start: Date;
      end: Date;
    };
    description?: string;
    calendarId: string;
  };

  type Calendar = {
    id: string;
    name: string;
    color: string;
    events: Event[];
  };
</script>

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
