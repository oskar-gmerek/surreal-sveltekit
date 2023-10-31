export type User = {
	id: string;
	username: string;
	slug: string;
	password: string;
	created_at: Date;
	etoro?: string;
	github?: string;
	linkedin?: string;
	website?: string;
};
