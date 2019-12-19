import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  constructor(private snackBar: MatSnackBar) { }

  showSnackbar(message, action, duration) {
    this.snackBar.open(message, action, {
      duration: duration
    });
  }
}
