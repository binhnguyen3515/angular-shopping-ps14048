import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor() {}
  warningMessage(message: String) {
    Swal.fire({
      title: 'Warning!',
      text: `${message}`,
      icon: 'warning',
      confirmButtonText: 'OK',
    });
  }
  successMessage(message: String) {
    Swal.fire({
      title: 'Success!',
      text: `${message}`,
      icon: 'success',
      confirmButtonText: 'OK',
    });
  }
  errorMessage(message: String) {
    Swal.fire({
      title: 'Error!',
      text: `${message}`,
      icon: 'error',
      confirmButtonText: 'OK',
    });
  }
}
