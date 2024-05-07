import admin from '$lib/firebase/firebase.admin';
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
    return { status: 401, error: new Error('Unauthorized') };
  }

  const db = admin.firestore();

  const calendarsCollection = db.collection('calendars');
  const eventsCollection = db.collection('events');

  const [calendarsSnapshot, eventsSnapshot] = await Promise.all([
    calendarsCollection.where('userId', '==', uid).get(),
    eventsCollection.where('userId', '==', uid).get()
  ]);

  const calendars = calendarsSnapshot.docs.map((doc) => ({
    id: doc.id
  }));

  const events = eventsSnapshot.docs.map((doc) => ({
    id: doc.id
  }));

  return {
    calendars,
    events
  };
};
