import { Publisher } from '../model/publisher';
import { frontPageZS13 } from './attachment';

export const PUBLISHER1: Publisher = {
	id: 1,
	name: 'Zlatna Serija',
	picture: frontPageZS13
};
export const PUBLISHER2: Publisher = {
	id: 2,
	name: 'Lunov Magnus Strip',
	picture: frontPageZS13
};
export const PUBLISHER3: Publisher = {
	id: 3,
	name: 'Veseli četvrtak',
	picture: frontPageZS13
};
export const PUBLISHER4: Publisher = {
	id: 4,
	name: 'Ludens',
	picture: frontPageZS13
};

export const allPublishers: Publisher[] = [PUBLISHER1, PUBLISHER2, PUBLISHER3, PUBLISHER4];
