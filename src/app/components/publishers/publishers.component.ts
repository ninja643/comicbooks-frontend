import {Component, OnInit} from '@angular/core';
import {PUBLISHERS} from '../../mock-data/mock-publishers';
import {Publisher} from '../../model/publisher';

@Component({
  selector: 'app-publishers',
  templateUrl: './publishers.component.html',
  styleUrls: ['./publishers.component.css']
})
export class PublishersComponent implements OnInit {

  publishers = PUBLISHERS;
  selectedPublisher: Publisher;

  constructor() {
  }

  ngOnInit() {
  }

  onSelect(publisher: Publisher) {
    this.selectedPublisher = publisher;
  }
}
