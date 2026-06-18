import { redirect } from '@sveltejs/kit';

export const load = (event) => {
  const tripId = event.params.tripId;

  throw redirect(307, `/trips/${tripId}`);
};
