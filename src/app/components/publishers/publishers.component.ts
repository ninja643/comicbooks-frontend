import {Component, OnInit} from '@angular/core';
import {Publisher} from '../../model/publisher';
import {PublisherService} from '../../services/publisher.service';
import {MessagesService} from '../../services/util/messages.service';

@Component({
  selector: 'app-publishers',
  templateUrl: './publishers.component.html',
  styleUrls: ['./publishers.component.css']
})
export class PublishersComponent implements OnInit {

  publishers: Publisher[];

  constructor(private publisherService: PublisherService, private messageService: MessagesService) {
  }

  ngOnInit() {
    this.getPublishers();
  }

  getPublishers(): void {
    this.publisherService.getPublishers()
      .subscribe(publishers => this.publishers = publishers);
  }
}
