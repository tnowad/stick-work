import admin from '$lib/firebase/firebase.admin';
import { error, fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import type { Calendar, Event } from '$lib/types';
import { zfd } from 'zod-form-data';
import { z } from 'zod';
import { StatusCodes } from 'http-status-codes';

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
    const formData = await request.formData();

    if (!uid) {
      throw error(401, 'Unauthorized');
    }

    try {
      const { calendarName: name } = zfd
        .formData({
          calendarName: zfd.text(z.string().min(1).max(100))
        })
        .parse(formData);

      const db = admin.firestore();

      await db.collection('calendars').add({
        userId: uid,
        name
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return fail(StatusCodes.UNPROCESSABLE_ENTITY, {
          success: false,
          errors: error.flatten().fieldErrors
        });
      }

      console.error(error);

      return fail(StatusCodes.INTERNAL_SERVER_ERROR, {
        success: false,
        message: 'An unknown error occurred'
      });
    }
  }
};
