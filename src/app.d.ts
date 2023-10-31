/// <reference types="@sveltejs/kit" />
declare namespace App {
	// interface Error {}
	interface Locals {
		surreal: import('surrealdb.js').Surreal;
		user: import('$types').User | undefined;
	}
	// interface PageData {}
	// interface Platform {}
}
