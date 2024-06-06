import type { Calendar } from './calendar.type';

/**
 * Represents an event in the calendar.
 */
export type Event = {
  /**
   * Unique identifier for the event.
   */
  id: string;

  /**
   * Name or title of the event.
   */
  name: string;

  /**
   * Description or details about the event.
   */
  description: string;

  /**
   * The start time of the event.
   */
  startTime: Date;

  /**
   * The end time of the event.
   */
  endTime: Date;

  /**
   * Indicates whether the event lasts the whole day.
   */
  isAllDay: boolean;

  /**
   * The recurrence pattern of the event.
   */
  recurrence: Recurrence;

  /**
   * The ID of the calendar this event belongs to.
   */
  calendarId: string;

  /**
   * Optional reference to the calendar this event belongs to.
   */
  calendar?: Calendar;

  /**
   * The ID of the user who created the event.
   */
  userId: string;
};

/**
 * Represents the recurrence pattern for an event.
 */
type Recurrence =
  | RecurrenceNone
  | RecurrenceDaily
  | RecurrenceWeekly
  | RecurrenceMonthly
  | RecurrenceYearly
  | RecurrenceCustom;

/**
 * Represents an event with no recurrence.
 */
type RecurrenceNone = {
  /**
   * Indicates no recurrence.
   */
  type: 'none';
};

/**
 * Represents a daily recurrence pattern.
 */
type RecurrenceDaily = {
  /**
   * Indicates daily recurrence.
   */
  type: 'daily';

  /**
   * The interval between recurrences in days.
   */
  interval: number;

  /**
   * Optional end date for the recurrence pattern.
   */
  endDate?: Date;
};

/**
 * Represents a weekly recurrence pattern.
 */
type RecurrenceWeekly = {
  /**
   * Indicates weekly recurrence.
   */
  type: 'weekly';

  /**
   * The interval between recurrences in weeks.
   */
  interval: number;

  /**
   * Optional end date for the recurrence pattern.
   */
  endDate?: Date;

  /**
   * List of days of the week on which the event recurs (0 for Sunday, 1 for Monday, etc.).
   */
  daysOfWeek: number[];
};

/**
 * Represents a monthly recurrence pattern.
 */
type RecurrenceMonthly = {
  /**
   * Indicates monthly recurrence.
   */
  type: 'monthly';

  /**
   * The interval between recurrences in months.
   */
  interval: number;

  /**
   * Optional end date for the recurrence pattern.
   */
  endDate?: Date;

  /**
   * List of days of the month on which the event recurs (1 for the first day, 2 for the second day, etc.).
   */
  daysOfMonth: number[];
};

/**
 * Represents a yearly recurrence pattern.
 */
type RecurrenceYearly = {
  /**
   * Indicates yearly recurrence.
   */
  type: 'yearly';

  /**
   * The interval between recurrences in years.
   */
  interval: number;

  /**
   * Optional end date for the recurrence pattern.
   */
  endDate?: Date;

  /**
   * List of months of the year on which the event recurs (1 for January, 2 for February, etc.).
   */
  monthsOfYear: number[];
};

/**
 * Represents a custom recurrence pattern with specific dates.
 */
type RecurrenceCustom = {
  /**
   * Indicates custom recurrence.
   */
  type: 'custom';

  /**
   * List of specific dates on which the event recurs.
   */
  customDates: Date[];
};
