import { Component, OnInit } from '@angular/core';

import { MessageService } from '../../services/message/message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements OnInit {
  message!: string;
  showMessage: boolean = false;

  constructor(private readonly messageService: MessageService) {}

  ngOnInit(): void {
    this.listenMessageService();
  }

  listenMessageService(): void {
    this.messageService.message.subscribe((message: string) => {
      this.message = message;
      this.showMessage = true;
      setTimeout(() => (this.showMessage = false), 5000);
    });
  }
}
