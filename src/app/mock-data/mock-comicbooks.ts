import { Comicbook } from '../model/comicbook';
import { frontPageImage } from './attachment';
import { HEROES1, HEROES2, HEROES3, HEROES4, HEROES5, HEROES6, HEROES7 } from './mock-heroes';
import { PUBLISHER1, PUBLISHER2, PUBLISHER3, PUBLISHER4 } from './mock-publishers';

export const COMICBOOKS: Comicbook[] = [
  {
    id: 1,
    number: 1,
    title: 'Comicbook 1',
    frontPageImage: frontPageImage,
    publisher: PUBLISHER1,
    heroes: HEROES1
  },
  {
    id: 2,
    number: 2,
    title: 'Comicbook 2',
    frontPageImage: frontPageImage,
    publisher: PUBLISHER2,
    heroes: HEROES2
  },
  {
    id: 3,
    number: 3,
    title: 'Comicbook 3',
    frontPageImage: frontPageImage,
    publisher: PUBLISHER3,
    heroes: HEROES3
  },
  {
    id: 4,
    number: 4,
    title: 'Comicbook 4',
    frontPageImage: frontPageImage,
    publisher: PUBLISHER4,
    heroes: HEROES4
  },
  {
    id: 5,
    number: 5,
    title: 'Comicbook 5',
    frontPageImage: frontPageImage,
    publisher: PUBLISHER1,
    heroes: HEROES5
  },
  {
    id: 6,
    number: 6,
    title: 'Comicbook 6',
    frontPageImage: frontPageImage,
    publisher: PUBLISHER2,
    heroes: HEROES6
  },
  {
    id: 7,
    number: 7,
    title: 'Comicbook 7',
    frontPageImage: frontPageImage,
    publisher: PUBLISHER3,
    heroes: HEROES7
  }
];
