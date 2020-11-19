export class LoaderStatus {
	isLoaderVisible = false;

	constructor(private counter: number = 0) {

	}

	showLoader(): void {
		this.counter++;
		this.determineIfLoaderIsVisible();
	}

	hideLoader(): void {
		this.counter--;
		this.determineIfLoaderIsVisible();
	}

	private determineIfLoaderIsVisible(): void {
		this.isLoaderVisible = !!this.counter;
	}
}
