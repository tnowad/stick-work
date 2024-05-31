import admin from '$lib/firebase/firebase.admin';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

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
};

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