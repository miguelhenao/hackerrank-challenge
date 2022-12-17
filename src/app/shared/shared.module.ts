import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterUserByNamePipe } from '@shared/pipes/filter-user-by-name/filter-user-by-name.pipe';
import { MessageComponent } from './components/message/message.component';

@NgModule({
  declarations: [FilterUserByNamePipe, MessageComponent],
  imports: [CommonModule],
  exports: [FilterUserByNamePipe, MessageComponent],
})
export class SharedModule {}
