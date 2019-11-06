import {Component, Input, OnInit} from '@angular/core';
import {Publisher} from '../../model/publisher';

@Component({
  selector: 'app-publisher-details',
  templateUrl: './publisher-details.component.html',
  styleUrls: ['./publisher-details.component.css']
})
export class PublisherDetailsComponent implements OnInit {

  @Input() publisher: Publisher;

  constructor() { }

  ngOnInit() {
  }

}
