import type { User } from './User.type';

export type Post = {
	id: string;
	title: string;
	slug: string;
	content: string;
	created_at: Date;
	updated_at?: Date;
	author: User;
};
