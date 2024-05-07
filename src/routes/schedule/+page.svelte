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
</div>
