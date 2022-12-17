import { Component, OnInit } from '@angular/core';

import { MessageService } from '@shared/services/message/message.service';
import { UsersService } from '../create-user/shared/services/users/users.service';
import { DataResponse } from '../shared/interfaces/data';
import { UserResponse } from '../shared/interfaces/user';

@Component({
  selector: 'list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss'],
})
export class ListUsersComponent implements OnInit {
  columns = ['Avatar', 'First Name', 'Email', 'Actions'];
  users: UserResponse[];
  firstPage: number = 1;
  page: number = this.firstPage;
  perPage: number;
  total: number;
  totalPages: number;
  filter: string = '';

  get isFirstPage(): boolean {
    return this.page === this.firstPage;
  }

  get isLastPage(): boolean {
    return this.page === this.totalPages;
  }

  constructor(
    private readonly usersService: UsersService,
    private readonly messageService: MessageService,
  ) {}

  ngOnInit() {
    this.getUsers();
  }

  backPage(): void {
    this.page--;
    this.getUsers();
  }

  deleteUser(index: number) {
    this.usersService.deleteUserForIndex(index).then(
      () => {
        this.users = this.users.filter((user) => user.id !== index);
        this.messageService.showMessage('User deleted successfully');
      },
      (error) => {
        console.error(error);
      },
    );
  }

  forwardPage(): void {
    this.page++;
    this.getUsers();
  }

  generateId(index: number, col?: string): string {
    const id = 'user-list__table-item';
    return col ? `${id}-${index}-${col}` : `${id}-${index}`;
  }

  getUsers(): void {
    this.usersService.getUsers(this.page).then(
      (response: DataResponse) => {
        const { data, page, per_page, total, total_pages } = response;
        this.users = data;
        this.page = page;
        this.perPage = per_page;
        this.total = total;
        this.totalPages = total_pages;
      },
      (error) => {
        console.error(error);
      },
    );
  }
}
