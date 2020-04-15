import {Component, forwardRef, Input} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
	selector: 'file-input',
	templateUrl: 'file-input.component.html',
	styleUrls: ['file-input.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => FileInputComponent),
			multi: true
		}
	]
})
export class FileInputComponent implements ControlValueAccessor {

	@Input() disabled: boolean;
	@Input() buttonText: string = 'Choose file';
	@Input() acceptTypes: string;

	file: File;

	private onChange: (value: File) => void;
	private onTouched: () => void;

	fileChanged(event): void {
		if (event.target && event.target.files && event.target.files.length) {
			this.file = event.target.files[0];
			if (this.onChange) {
				this.onChange(this.file);
			}
		}
	}

	markAsTouched(): void {
		if (this.onTouched) {
			this.onTouched();
		}
	}

	writeValue(obj: File): void {
		this.file = obj;
	}

	registerOnChange(fn: any): void {
		this.onChange = fn;
	}

	registerOnTouched(fn: any): void {
		this.onTouched = fn;
	}

	setDisabledState?(isDisabled: boolean): void {
		this.disabled = isDisabled;
	}
}
