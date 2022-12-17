import { requiredMessages } from './required-messages';

export const ValidationMessage = {
  email: 'Invalid format',
  required: (control: string) => {
    return requiredMessages[`${control}`];
  },
  minLength: 'The minimum of characters will be 8',
};
