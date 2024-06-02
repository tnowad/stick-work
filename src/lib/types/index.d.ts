export type Event = {
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

export type Calendar = {
  id: string;
  name: string;
};
