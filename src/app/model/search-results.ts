import { SearchRequest } from './search-request';

export interface SearchResult<T> extends SearchRequest {
	totalCount: number;
	items: T[];
}
