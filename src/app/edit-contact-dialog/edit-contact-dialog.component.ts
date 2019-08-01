import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Contact } from '../models/contact';

@Component({
  selector: 'app-edit-contact-dialog',
  templateUrl: './edit-contact-dialog.component.html',
  styleUrls: ['./edit-contact-dialog.component.css']
})
export class EditContactDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EditContactDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Contact) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
