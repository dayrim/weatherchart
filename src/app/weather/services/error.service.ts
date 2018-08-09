import { ErrorHandler, Injectable } from '@angular/core';
import { BAD_REQUEST, OK } from 'http-status-codes';

@Injectable()
export class GlobalErrorHandlerService implements ErrorHandler {
  static readonly DEFAULT_ERROR_TITLE: string = 'Something went wrong';
  constructor() {}

  public handleError(error: any) {
    console.error(error);
    const httpErrorCode = error.status;
    switch (httpErrorCode) {
      case OK:
        this.showError(error.message);
        break;
      case BAD_REQUEST:
        this.showError(error.message);
        break;
      default:
        this.showError(GlobalErrorHandlerService.DEFAULT_ERROR_TITLE);
    }
  }

  private showError(message: string): void {
    console.log(message);
  }
}
