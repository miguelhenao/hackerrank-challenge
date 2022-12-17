import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ErrorMessageService } from '@shared/services/validators/error-message.service';
import { MessageService } from '@shared/services/message/message.service';
import { UsersService } from '../create-user/shared/services/users/users.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent implements OnInit {
  formGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    job: new FormControl('', Validators.required),
  });
  showMessage: boolean = false;

  constructor(
    private readonly router: Router,
    private readonly usersService: UsersService,
    private readonly errorMessageService: ErrorMessageService,
    private readonly messageService: MessageService,
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }

  /**
   * If the control exists, return the error message, otherwise return undefined.
   * @param {string} controlName - string - the name of the control in the form
   * @returns The error message for the control.
   */
  getErrorMessage(controlName: string): string | undefined {
    const control = this.formGroup.get(controlName);
    return control ? this.errorMessageService.getErrorMessage(control, controlName) : undefined;
  }

  /**
   * If the control is dirty or touched, return true if the control has an error, otherwise return
   * false.
   * @param {string} controlName - string - the name of the control you want to check
   * @returns The return value is a boolean.
   */
  isControlHasError(controlName: string): boolean {
    const control = this.formGroup.get(controlName);
    return control ? this.errorMessageService.hasError(control) : false;
  }

  onSubmit(): void {
    this.usersService.createUser(this.formGroup.value).then(
      () => {
        this.messageService.showMessage('User created successfully');
        this.redirectToListUsers();
      },
      (error) => {
        console.error(error);
      },
    );
  }

  /**
   * Este método no se puede modificar
   * */
  public redirectToListUsers(): void {
    this.router.navigateByUrl('/users/list');
  }
}
