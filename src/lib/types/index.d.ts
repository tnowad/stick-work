export type Event = {
  id: string;
  name: string;

  description: string;

  startTime: Date;

  endTime: Date;

  isAllDay: boolean;

  recurrence: Recurrence;

  calendarId: string;

  calendar?: Calendar;

  userId: string;
};

export type Calendar = {
  id: string;

  name: string;

  events?: Event[];

  userId: string;
};

type Recurrence =
  | RecurrenceNone
  | RecurrenceDaily
  | RecurrenceWeekly
  | RecurrenceMonthly
  | RecurrenceYearly
  | RecurrenceCustom;

type RecurrenceNone = {
  type: 'none';
};

type RecurrenceDaily = {
  type: 'daily';

  interval: number;

  endDate?: Date;
};

type RecurrenceWeekly = {
  type: 'weekly';

  interval: number;

  endDate?: Date;

  daysOfWeek: number[];
};

type RecurrenceMonthly = {
  type: 'monthly';

  interval: number;

  endDate?: Date;

  daysOfMonth: number[];
};

type RecurrenceYearly = {
  type: 'yearly';

  interval: number;

  endDate?: Date;

  monthsOfYear: number[];
};

type RecurrenceCustom = {
  type: 'custom';

  customDates: Date[];
};
