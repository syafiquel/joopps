import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-dialog-over-view',
  templateUrl: './auth-dialog-over-view.component.html',
  styleUrls: ['./auth-dialog-over-view.component.css']
})
export class AuthDialogOverViewComponent {

  constructor(
    public router: Router,
    public dialogRef: MatDialogRef<AuthDialogOverViewComponent>) {}

    onNoClick(): void {
      this.dialogRef.close();
    }

    onYesClick() {
      this.dialogRef.close();
      this.router.navigate(['/login']);
    }

}
