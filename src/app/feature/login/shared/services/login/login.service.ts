import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '@environments/environment';
import { IToken } from '@shared/interfaces/token';
import { IUser } from '@shared/interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  baseUrl = environment.API;
  constructor(private readonly http: HttpClient) {}

  /**
   * El nombre de este metodo no debería ser cambiado, pero de ser necesario podrías cambiar la firma
   * */
  public login(payload: IUser): Promise<IToken> {
    return new Promise((resolve, reject) => {
      this.http
        .post<IToken>(`${this.baseUrl}/login`, payload)
        .toPromise()
        .then(
          (response) => resolve(response),
          (error) => reject(error),
        );
    });
  }
}
