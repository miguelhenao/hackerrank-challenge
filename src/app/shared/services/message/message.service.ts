import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  public message = new Subject<string>();

  showMessage(message: string) {
    this.message.next(message);
  }
}
