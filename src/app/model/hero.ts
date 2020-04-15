import { Attachment } from './attachment';
import { Comicbook } from './comicbook';

export interface Hero {
    id: number;
    name: string;
    picture: Attachment;
    comicbooks?: Comicbook[];
}
