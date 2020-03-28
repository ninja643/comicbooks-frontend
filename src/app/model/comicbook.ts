import { Publisher } from './publisher';
import { Hero } from './hero';

export interface Comicbook {
    id: number;
    number: number;
    title: string;
    frontPageUrl: string;
    publisher: Publisher;
    heroes: Hero[];
  }
  