import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-help-dialog-overview',
  templateUrl: './help-dialog-overview.component.html',
  styleUrls: ['./help-dialog-overview.component.css']
})
export class HelpDialogOverviewComponent {

  constructor(
    public dialogRef: MatDialogRef<HelpDialogOverviewComponent>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
