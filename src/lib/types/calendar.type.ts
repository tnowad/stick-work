import type { Event } from './event.type';

/**
 * Represents a calendar which contains multiple events.
 */
export type Calendar = {
  /**
   * Unique identifier for the calendar.
   */
  id: string;

  /**
   * Name or title of the calendar.
   */
  name: string;

  /**
   * Optional list of events in the calendar.
   */
  events?: Event[];

  /**
   * The ID of the user who owns the calendar.
   */
  userId: string;
};
