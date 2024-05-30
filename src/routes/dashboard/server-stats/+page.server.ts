import admin from '$lib/firebase/firebase.admin';
import type { PageServerLoad } from './$types';
import NodeCache from 'node-cache';

const cache = new NodeCache({ stdTTL: 60 * 60 * 24 });

const countUsers = async () => {
  const cachedValue = cache.get('totalUsers');

  if (cachedValue) {
    return cachedValue;
  }

  let count = 0;
  let nextPageToken = undefined;

  do {
    const result = await admin.auth().listUsers(1000, nextPageToken);
    count += result.users.length;
    nextPageToken = result.pageToken;
  } while (nextPageToken);

  cache.set('totalUsers', count);

  return count;
};

const countCalendars = async () => {
  const cachedValue = cache.get('totalCalendars');

  if (cachedValue) {
    return cachedValue;
  }

  const calendarsSnapshot = await admin.firestore().collection('calendars').get();
  const count = calendarsSnapshot.size;

  cache.set('totalCalendars', count);

  return count;
};

const countEvents = async () => {
  const cachedValue = cache.get('totalEvents');

  if (cachedValue) {
    return cachedValue;
  }

  const eventsSnapshot = await admin.firestore().collection('events').get();
  const count = eventsSnapshot.size;

  cache.set('totalEvents', count);

  return count;
};

export const load: PageServerLoad = async () => {
  const totalUsersPromise = countUsers();
  const totalCalendarsPromise = countCalendars();
  const totalEventsPromise = countEvents();

  return {
    totalUsers: totalUsersPromise,
    totalCalendars: totalCalendarsPromise,
    totalEvents: totalEventsPromise,
    meta: {
      title: 'Server Stats'
    }
  };
};
