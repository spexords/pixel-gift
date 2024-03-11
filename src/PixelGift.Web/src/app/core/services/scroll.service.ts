import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ScrollService {
  moveToErrors() {
    const errorValidationMessagesElements =
      document.getElementsByClassName('error-validation');

    if (errorValidationMessagesElements.length > 0) {
      const firstErrorValidationMessagesElement =
        errorValidationMessagesElements[0];
      firstErrorValidationMessagesElement.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }
}
