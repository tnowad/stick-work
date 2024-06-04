import admin from '$lib/firebase/firebase.admin';
import { error, fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import type { Calendar, Event } from '$lib/types';
import { zfd } from 'zod-form-data';
import { ZodError, z } from 'zod';
import { StatusCodes } from 'http-status-codes';
import { logger } from '$lib/logger';

export const load: PageServerLoad = async ({ locals }) => {
  const uid = locals.user?.uid;

  if (!uid) {
    throw error(401, 'Unauthorized');
  }

  const db = admin.firestore();

  const calendarsCollection = db.collection('calendars');
  const eventsCollection = db.collection('events');

  const [calendarsSnapshot, eventsSnapshot] = await Promise.all([
    calendarsCollection.where('userId', '==', uid).get(),
    eventsCollection.where('userId', '==', uid).get()
  ]);

  const calendars: Calendar[] = calendarsSnapshot.docs.map((doc) => ({
    id: doc.id,
    name: doc.data().name,
    userId: doc.data().userId
  }));

  const events: Event[] = eventsSnapshot.docs.map((doc) => ({
    id: doc.id,
    name: doc.data().name,
    startTime: doc.data().start.toDate(),
    endTime: doc.data().end.toDate(),
    description: doc.data().description,
    calendarId: doc.data().calendarId,
    userId: doc.data().userId,
    isAllDay: doc.data().isAllDay ?? false,
    recurrence: doc.data().recurrence
  }));

  return {
    meta: {
      title: 'Schedule',
      description: 'Your schedule'
    },
    calendars,
    events
  };
};

export const actions: Actions = {
  createCalendar: async ({ request, locals }) => {
    const uid = locals.user?.uid;
    if (!uid) {
      logger.warn('Unauthorized access attempt');
      throw error(StatusCodes.UNAUTHORIZED, 'Unauthorized');
    }

    let formData;
    try {
      formData = await request.formData();
    } catch (err) {
      logger.error('Failed to parse form data', { error: err });
      return fail(StatusCodes.BAD_REQUEST, {
        success: false,
        message: 'Invalid form data'
      });
    }

    try {
      const schema = zfd.formData({
        calendarName: zfd.text(z.string().min(1).max(100))
      });

      const { calendarName: name } = schema.parse(formData);

      const db = admin.firestore();
      await db.collection('calendars').add({
        userId: uid,
        name
      });

      logger.info('Calendar created successfully', { userId: uid, calendarName: name });

      return {
        success: true,
        message: 'Calendar created successfully'
      };
    } catch (err) {
      if (err instanceof ZodError) {
        logger.warn('Validation error', { errors: err.flatten().fieldErrors });
        return fail(StatusCodes.UNPROCESSABLE_ENTITY, {
          success: false,
          errors: err.flatten().fieldErrors
        });
      }

      logger.error('Failed to create calendar', { error: err });
      return fail(StatusCodes.INTERNAL_SERVER_ERROR, {
        success: false,
        message: 'An unknown error occurred'
      });
    }
  },

  createEvent: async ({ request, locals }) => {
    const uid = locals.user?.uid;
    if (!uid) {
      logger.warn('Unauthorized access attempt');
      throw error(StatusCodes.UNAUTHORIZED, 'Unauthorized');
    }

    let formData;
    try {
      formData = await request.formData();
    } catch (err) {
      logger.error('Failed to parse form data', { error: err });
      return fail(StatusCodes.BAD_REQUEST, {
        success: false,
        message: 'Invalid form data'
      });
    }

    try {
      // TODO: Add validation for start and end dates (end must be after start)
      const schema = zfd.formData({
        eventName: zfd.text(z.string().min(1).max(100)),
        eventStart: zfd.text(z.coerce.date()),
        eventEnd: zfd.text(z.coerce.date()),
        eventDescription: zfd.text(z.string().min(0).max(500).optional()),
        eventCalendar: zfd.text(z.string().min(1))
      });

      const {
        eventName: name,
        eventStart: start,
        eventEnd: end,
        eventDescription: description = '',
        eventCalendar: calendarId
      } = schema.parse(formData);

      // TODO: Add validation for calendarId (must exist and belong to the user)
      const db = admin.firestore();
      await db.collection('events').add({
        userId: uid,
        name,
        start,
        end,
        description,
        calendarId,
        repeat: {
          start: new Date(),
          end: new Date(),
          type: 'none',
          interval: 0
        }
      });

      logger.info('Event created successfully', { userId: uid, eventName: name });

      return {
        success: true,
        message: 'Event created successfully'
      };
    } catch (err) {
      if (err instanceof ZodError) {
        logger.warn('Validation error', { errors: err.flatten().fieldErrors });
        return fail(StatusCodes.UNPROCESSABLE_ENTITY, {
          success: false,
          errors: err.flatten().fieldErrors
        });
      }

      logger.error('Failed to create event', { error: err });
      return fail(StatusCodes.INTERNAL_SERVER_ERROR, {
        success: false,
        message: 'An unknown error occurred'
      });
    }
  }
};
