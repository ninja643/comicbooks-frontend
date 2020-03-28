import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Component, forwardRef, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';

export class SelectorItem {
    constructor(public value: any, public selected?: boolean) { }
}

@Component({
    selector: 'dropdown-select',
    templateUrl: 'dropdown-select.component.html',
    styleUrls: ['dropdown-select.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => DropdownSelectComponent),
            multi: true
        }
    ]
})
export class DropdownSelectComponent implements ControlValueAccessor, OnChanges {

    @Input() items: any[];
    @Input() displayPath: string;
    @Input() searchEnabled: boolean;
    @Input() multiselection: boolean;
    @Input() disabled: boolean;
    @Input() buttonPlaceholderText: string;
    @Input() searchPlaceholderText: string = "Search";
    @Input() trackBy: (index: number, item: any) => any;

    allItems: SelectorItem[] = [];
    filteredItems: SelectorItem[] = [];
    filter: string;
    selectedValue: any;

    protected onChange: (value: any) => void;
    protected onTouched: () => void;

    ngOnChanges(changes: SimpleChanges): void {
        const itemsChange: SimpleChange = changes['items'];
        if (itemsChange) {
            this.initializeItems();
        }
    }

    filterItems(): void {
        if (!this.filter) {
            this.filteredItems = this.allItems;
            return;
        }

        this.filteredItems = this.allItems.filter(item => {
            return this.getDisplayText(item.value).toLowerCase().includes(this.filter.toLowerCase());
        });
    }

    toggleItem(selectorItem: SelectorItem): void {
        if (this.multiselection) {
            selectorItem.selected = !selectorItem.selected;
        }
        else {
            this.allItems.forEach((item: SelectorItem) => {
                if (item == selectorItem) {
                    item.selected = !item.selected;
                }
                else {
                    item.selected = false;
                }
            })
        }
        this.selectedValueChanged();
    }

    dropdownToggled(): void {
        if (this.onTouched) {
            this.onTouched();
        }
    }

    getDisplayText = (item: any): string => {
        if (this.displayPath) {
            const segments: string[] = this.displayPath.split('.');
            let itemProperty = item;
            try {
                segments.forEach(segment => itemProperty = itemProperty[segment]);
                return itemProperty;
            }
            catch (error) {
            }
        }
        return '';
    }

    getButtonDisplayText = (selectedValue: any): string => {
        if (!selectedValue) {
            return this.buttonPlaceholderText || '';
        }
        if (this.multiselection) {
            return (<any[]>selectedValue).reduce(
                (previousValue: string, item: any) => (previousValue ? previousValue + ', ' : previousValue) + this.getDisplayText(item),
                '');
        }
        return this.getDisplayText(selectedValue);
    }

    selectorItemTrackBy = (index: number, item: SelectorItem): any => {
        return this.trackBy(index, item.value);
    }

    protected initializeItems(): void {
        const items: any[] = this.items || [];
        this.allItems = items.map(item => new SelectorItem(item));
        this.restoreSelection();
        this.filterItems();
    }

    protected restoreSelection(): void {
        if (this.allItems) {
            let selectedItems: any[];
            if (this.multiselection) {
                selectedItems = this.selectedValue || [];
            }
            else {
                selectedItems = this.selectedValue ? [this.selectedValue] : [];
            }
            selectedItems.forEach(selectedItem => {
                const selectorItem: SelectorItem = this.allItems.find(item => this.trackBy(0, item.value) == this.trackBy(0, selectedItem));
                if (selectorItem) {
                    selectorItem.selected = true;
                }
            });
        }
    }

    protected selectedValueChanged(): void {
        if (this.multiselection) {
            this.selectedValue = this.allItems.filter(item => item.selected).map(item => item.value);
        }
        else {
            const selectedItem = this.allItems.find(item => item.selected);
            this.selectedValue = selectedItem ? selectedItem.value : null;
        }
        if (this.onChange) {
            this.onChange(this.selectedValue);
        }
    }

    writeValue(obj: any): void {
        this.selectedValue = obj;

        this.restoreSelection();
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