import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Contact } from '../models/contact';

@Component({
  selector: 'app-edit-contact-dialog',
  templateUrl: './edit-contact-dialog.component.html',
  styleUrls: ['./edit-contact-dialog.component.css']
})
export class EditContactDialogComponent implements OnInit {

  userAddressValidations: FormGroup;
  

  constructor(public dialogRef: MatDialogRef<EditContactDialogComponent>,  
              @Inject(MAT_DIALOG_DATA) public data: Contact, private formBuilder: FormBuilder ) { 
              //   this.myGroup = new FormGroup({
              //     firstName: new FormControl()
              //  });
              }

  ngOnInit() {
    this.userAddressValidations = this.formBuilder.group({
      Name: '',
      mobileNumber: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]]
    });

    
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  _keyPress(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
        event.preventDefault();

    }
  }
  
}
