import { Comicbook } from '../model/comicbook';
import { PUBLISHER1, PUBLISHER2, PUBLISHER3, PUBLISHER4 } from './mock-publishers';
import { HEROES2, HEROES3, HEROES4, HEROES5, HEROES6, HEROES7, HEROES1 } from './mock-heroes';
import { Attachment, AttachmentType } from '../model/attachment';

export const logo = 'https://scontent.fbeg5-1.fna.fbcdn.net/v/t1.0-9/p960x960/54518077_2327064720646046_5115715385689112576_o.jpg?_nc_cat=101&_nc_sid=85a577&_nc_oc=AQlGs7GBdrLCJKNUOtJeV15tt7cQOX2vOJML2q8ItoWdhXIV1tXguYQ5LQL8LqvqMdk&_nc_ht=scontent.fbeg5-1.fna&_nc_tp=6&oh=ea9d29cd39d45995d8c85690347f444d&oe=5EA09BED';
export const frontPageImage: Attachment = {
  id: 'fsdfds',
  type: AttachmentType.Image,
  name: 'dsds',
  url: logo
}

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
