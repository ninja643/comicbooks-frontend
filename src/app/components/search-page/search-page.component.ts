import {
	Component,
	EventEmitter,
	Input,
	Output,
    ContentChild
} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { RoutingService } from 'src/app/common/routing.service';
import { ItemTemplateDirective } from './item-template.directive';
import { getObjectAtPath } from 'src/app/common/utils';

@Component({
	selector: 'search-page',
	templateUrl: 'search-page.component.html',
	styleUrls: ['search-page.component.scss']
})
export class SearchPageComponent {

    @Input() items: any[] = [];
    @Input() itemPicturePath: string;
    @Input() itemNamePath: string;
    @Input() itemTrackBy: (index: number, item: any) => any = (index: number, item: any) => JSON.stringify(item);
    
    @Output() itemClicked: EventEmitter<any> = new EventEmitter<any>();

    @ContentChild(ItemTemplateDirective, {static: false}) itemTemplate: ItemTemplateDirective;
    
    getObjectAtPath = getObjectAtPath;

	onItemClicked(item: any): void {
		this.itemClicked.emit(item);
    }
}
