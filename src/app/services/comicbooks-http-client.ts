import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from 'src/environments/environment';
import {Observable} from 'rxjs';

@Injectable()
export class ComicbooksHttpClient {

	private baseUrl: string = environment.serviceUrl;

	constructor(private http: HttpClient) {
	}

	get<T>(url: string): Observable<T> {
		return this.http.get<T>(this.baseUrl + url, this.getOptions());
	}

	put<T>(url: string, body: any): Observable<T> {
		return this.http.put<T>(this.baseUrl + url, body, this.getOptions());
	}

	post<T>(url: string, body: any): Observable<T> {
		return this.http.post<T>(this.baseUrl + url, body, this.getOptions());
	}

	delete<T>(url: string): Observable<T> {
		return this.http.delete<T>(this.baseUrl + url, this.getOptions());
	}

	protected getOptions(): { headers: HttpHeaders } {
		const headers = new HttpHeaders({
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		});
		return {headers: headers};
	}
}
