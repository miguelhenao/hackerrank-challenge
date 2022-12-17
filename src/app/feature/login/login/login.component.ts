import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginService } from '../shared/services/login/login.service';
import { ErrorMessageService } from '@shared/services/validators/error-message.service';
import { IToken } from '@shared/interfaces/token';
import { IUser } from '@shared/interfaces/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  errorMessage: string = '';
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  constructor(
    private readonly router: Router,
    private readonly errorMessageService: ErrorMessageService,
    private readonly loginService: LoginService,
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.redirectUsers();
    }
  }

  /**
   * If the control exists, return the error message, otherwise return undefined.
   * @param {string} controlName - string - the name of the control in the form
   * @returns The error message for the control.
   */
  getErrorMessage(controlName: string): string | undefined {
    const control = this.loginForm.get(controlName);
    return control ? this.errorMessageService.getErrorMessage(control, controlName) : undefined;
  }

  /**
   * If the control is dirty or touched, return true if the control has an error, otherwise return
   * false.
   * @param {string} controlName - string - the name of the control you want to check
   * @returns The return value is a boolean.
   */
  isControlHasError(controlName: string): boolean {
    const control = this.loginForm.get(controlName);
    if (control?.dirty || control?.touched) {
      return control ? this.errorMessageService.hasError(control) : true;
    }
    return false;
  }

  /**
   * The function takes the form values and passes them to the login service. If the login is
   * successful, the token is stored in local storage and the user is redirected to the home page. If
   * the login is unsuccessful, the error message is displayed.
   */
  onSubmit(): void {
    const user: IUser = this.loginForm.value;
    this.loginService.login(user).then(
      (success: IToken) => {
        localStorage.setItem('token', success.token);
        this.redirectUsers();
      },
      (error) => {
        this.errorMessage = error.error.error || 'Error login';
      },
    );
  }

  /**
   * Este método no se puede modificar
   * */
  public redirectUsers(): void {
    this.router.navigateByUrl('/users/list');
  }
}
