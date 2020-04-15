import {Attachment} from './attachment';
import {Comicbook} from './comicbook';

export interface Publisher {
	id: number;
	name: string;
	picture: Attachment;
	comicbooks?: Comicbook[];
}
