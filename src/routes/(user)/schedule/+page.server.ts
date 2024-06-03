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
    name: doc.data().name
  }));

  const events: Event[] = eventsSnapshot.docs.map((doc) => ({
    id: doc.id,
    name: doc.data().name,
    start: doc.data().start.toDate(),
    end: doc.data().end.toDate(),
    repeat: doc.data().repeat
      ? {
          type: doc.data().repeat.type,
          interval: doc.data().repeat.interval,
          start: doc.data().repeat.start.toDate(),
          end: doc.data().repeat.end.toDate()
        }
      : undefined,
    allDay: doc.data().allDay
      ? {
          start: doc.data().allDay.start.toDate(),
          end: doc.data().allDay.end.toDate()
        }
      : undefined,
    description: doc.data().description,
    calendarId: doc.data().calendarId
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
  }
};
