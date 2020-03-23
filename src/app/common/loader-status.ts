export class LoaderStatus {
    constructor(private counter: number = 0) {

    };

    get isLoaderVisible(): boolean {
        return !!this.counter;
    }

    showLoader(): void {
        this.counter++;
    }

    hideLoader(): void {
        this.counter--;
    }

    updateVisibility(visible: boolean): void {
        this.counter += visible ? 1 : -1;
    }
}