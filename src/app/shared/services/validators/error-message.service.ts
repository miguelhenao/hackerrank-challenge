import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { ValidationMessage } from '@shared/constants/validation-message';
import { AbstractControlErrorCode } from '@shared/enums/abstract-control-error-code';

type ErrorMessage = {
  key: AbstractControlErrorCode;
  message: (ac: AbstractControl, name: string) => string | any;
};

@Injectable({
  providedIn: 'root',
})
export class ErrorMessageService {
  private errorMessages: ErrorMessage[] = [
    { key: AbstractControlErrorCode.Email, message: () => ValidationMessage.email },
    {
      key: AbstractControlErrorCode.Required,
      message: (_, name) => {
        return ValidationMessage.required(name);
      },
    },
    { key: AbstractControlErrorCode.MinLength, message: () => ValidationMessage.minLength },
  ];

  /**
   * If the AbstractControl has an error, find the error message that matches the error key and return
   * the message
   * @param {AbstractControl} ac - AbstractControl - the form control that has the error
   * @param {string} name - The name of the field.
   * @returns The error message.
   */
  getErrorMessage(ac: AbstractControl, name: string): string | undefined {
    const error = this.errorMessages.find((item) => ac.hasError(item.key));
    return error?.message(ac, name);
  }

  /**
   * If the AbstractControl has any of the errors in the errorMessages array, return true.
   * @param {AbstractControl} ac - AbstractControl - the form control that you want to check for errors
   * @returns The errorMessages array is being filtered by the hasError method.
   */
  hasError(ac: AbstractControl): boolean {
    return this.errorMessages.some((item) => ac.hasError(item.key));
  }
}
