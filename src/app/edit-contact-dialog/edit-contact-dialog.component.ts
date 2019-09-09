import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Contact } from '../models/contact';

@Component({
  selector: 'app-edit-contact-dialog',
  templateUrl: './edit-contact-dialog.component.html',
  styleUrls: ['./edit-contact-dialog.component.css']
})
export class EditContactDialogComponent implements OnInit {

  userAddressValidations: FormGroup;


  constructor(public dialogRef: MatDialogRef<EditContactDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Contact, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.userAddressValidations = this.formBuilder.group({
      Name: '',
      mobileNumber: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
      email: new FormControl('', [Validators.required, Validators.email])

    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

