import {Component, Input, OnInit} from '@angular/core';
import {Publisher} from '../../model/publisher';
import {ActivatedRoute} from '@angular/router';
import {PublisherService} from '../../services/publisher.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-publisher-details',
  templateUrl: './publisher-details.component.html',
  styleUrls: ['./publisher-details.component.css']
})
export class PublisherDetailsComponent implements OnInit {

  @Input() publisher: Publisher;

  constructor(private route: ActivatedRoute,
              private publisherService: PublisherService,
              private location: Location) { }

  ngOnInit() {
    this.getPublisher();
  }

  getPublisher(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.publisherService.getPublisher(id)
      .subscribe(publisher => this.publisher = publisher);

  }

  goBack(): void {
    this.location.back();
  }
}
