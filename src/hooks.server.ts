// Add the middleware to the server

import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	// You can add server-side session validation here if needed
	return resolve(event);
};
