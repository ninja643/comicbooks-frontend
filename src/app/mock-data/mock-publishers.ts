import { Publisher } from '../model/publisher';
import { frontPageImageMock } from './attachment';

export const PUBLISHER1: Publisher = {
	id: 1,
	name: 'Zlatna Serija',
	picture: frontPageImageMock
};
export const PUBLISHER2: Publisher = {
	id: 2,
	name: 'Lunov Magnus Strip',
	picture: frontPageImageMock
};
export const PUBLISHER3: Publisher = {
	id: 3,
	name: 'Veseli četvrtak',
	picture: frontPageImageMock
};
export const PUBLISHER4: Publisher = {
	id: 4,
	name: 'Ludens',
	picture: frontPageImageMock
};

export const allPublishers: Publisher[] = [PUBLISHER1, PUBLISHER2, PUBLISHER3, PUBLISHER4];
