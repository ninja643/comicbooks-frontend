import { Publisher } from './publisher';
import { Hero } from './hero';
import { Attachment } from './attachment';

export interface Comicbook {
	id: number;
	number: number;
	title: string;
	frontPageImage: Attachment;
	publisher?: Publisher;
	heroes?: Hero[];
}
