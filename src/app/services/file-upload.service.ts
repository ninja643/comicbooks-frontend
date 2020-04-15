import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ComicbooksHttpClient } from './comicbooks-http-client';
import { Attachment } from '../model/attachment';
import { frontPageImageMock } from '../mock-data/attachment';

@Injectable({
	providedIn: 'root'
})
export class FileUploadService {

	private url = '/hero';

	constructor(
		private httpClient: ComicbooksHttpClient) {
	}

	// da skinem parametar todo
	uploadFile(file: File, todo: string): Observable<Attachment> {
		return new Observable(subscriber => {
			setTimeout(() => {
				subscriber.next({
					...frontPageImageMock,
					url: todo
				});
				subscriber.complete();
			}, 1500);
		});
		const formData: FormData = new FormData();
		formData.append('file', file, file.name);
		return this.httpClient.post(this.url, formData);
	}
}
