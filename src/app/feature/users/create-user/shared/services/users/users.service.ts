import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@environments/environment';
import { DataResponse } from '@feature/users/shared/interfaces/data';
import { UserRequest } from '@feature/users/shared/interfaces/user';

/**
 * El nombre de las clases o métodos no se pueden cambiar
 * */
@Injectable({
  providedIn: 'root',
})
export class UsersService {
  baseUrl = environment.API;

  constructor(private http: HttpClient) {}

  getUsers(page: number): Promise<DataResponse> {
    return new Promise((resolve, reject) => {
      this.http
        .get<DataResponse>(`${this.baseUrl}/users?page=${page}`)
        .toPromise()
        .then(
          (response) => resolve(response),
          (error) => reject(error),
        );
    });
  }

  createUser(user: UserRequest): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http
        .post<any>(`${this.baseUrl}/users`, user)
        .toPromise()
        .then(
          (response) => resolve(response),
          (error) => reject(error),
        );
    });
  }

  deleteUserForIndex(index: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.http
        .delete(`${this.baseUrl}/users/${index}`)
        .toPromise()
        .then(
          () => resolve(true),
          () => reject(false),
        );
    });
  }
}
