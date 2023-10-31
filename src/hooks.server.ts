import { error, redirect, type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import type { User } from '$types';
import { db } from '$lib/surreal';
import { logout } from '$lib/logout';
import * as config from './master.css';
import { render } from '@master/css-server'

// MasterCSS integration: https://beta.css.master.co/docs/installation
const mcss = (async ({ event, resolve }) => {
	return await resolve(event, {
		transformPageChunk: ({ html }) => render(html, config.default).html
	});
}) satisfies Handle;

// Authentication and Authorization
const auth = (async ({ event, resolve }) => {
	const { cookies } = event;
	const token = cookies.get('token'); // Get token from cookie.
	const secureRoute = event.route.id?.includes('(user)'); // Detect protected route.
	const loginRoute = event.url.pathname.includes('/login'); // Detect login form.
	const registrationRoute = event.url.pathname.includes('/register'); // Detect registration form.
	const authRoute = loginRoute || registrationRoute;

	// If cookie with token exist and user is under protected route, authenticate user in SurrealDB.
	if (token && secureRoute) {
		const authenticated = await db.authenticate(token).catch(async (err: Error) => {
			console.log(`Error: ${err.message}. Session invalidation.`);
			// If something wrong with token - invalidate session client side, server side and in SurrealDB.
			await logout(event);
		});
		if (authenticated) {
			// Get authenticated user info and add it to request
			if (!event.locals.user) {
				const user = (await db.info().catch((err: Error) => {
					console.log(`error: ${err.message}`);
					throw error(500, 'Something wrong with database connection.');
				})) as User;
				event.locals.user = user;
			}
		} else {
			// If not authenticated - invalidate session client side, server side and in SurrealDB.
			await logout(event);
		}
	}

	if (secureRoute) {
		if (!event.locals.user || !token) {
			// If user is in protected route, but cookie with token or user info in request is missing - invalidate session client side, server side and in SurrealDB.
			await logout(event);
		}
	}
	if (authRoute && token) {
		// Prevent logged in users from navigating to login / register forms.
		throw redirect(303, '/');
	}

	// If no problems found - let's go.
	const response = await resolve(event);
	return response;
}) satisfies Handle;

export const handle = sequence(mcss, auth);
