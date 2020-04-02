import { Publisher } from '../model/publisher';
import { frontPageImage } from './attachment';

export const PUBLISHER1: Publisher = {
  id: 1,
  name: 'Zlatna Serija',
  picture: frontPageImage
};
export const PUBLISHER2: Publisher = {
  id: 2,
  name: 'Lunov Magnus Strip',
  picture: frontPageImage
};
export const PUBLISHER3: Publisher = {
  id: 3,
  name: 'Veseli četvrtak',
  picture: frontPageImage
}
export const PUBLISHER4: Publisher = {
  id: 4,
  name: 'Ludens',
  picture: frontPageImage
};

export const allPublishers: Publisher[] = [PUBLISHER1, PUBLISHER2, PUBLISHER3, PUBLISHER4];