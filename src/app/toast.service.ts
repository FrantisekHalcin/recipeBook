import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private snackbar: MatSnackBar) { }

    snack(t:string, d?:string){
        this.snackbar.open(t, '', {
            duration: 2500,
            horizontalPosition: "start",
            verticalPosition: "bottom",
            panelClass: ['snackBox', d]
        });
    }
}
