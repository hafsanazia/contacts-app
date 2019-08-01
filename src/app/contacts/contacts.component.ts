import { Component, OnInit } from '@angular/core';
import { Contact } from '../models/contact';
import { MatDialog } from '@angular/material/dialog';
import { EditContactDialogComponent } from '../edit-contact-dialog/edit-contact-dialog.component';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  displayedColumns: string[] = ['name', 'phone', 'edit', 'delete', ];
  dataSource = ELEMENT_DATA;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  delete(id: number) {
    this.dataSource = this.dataSource.filter(item => item.id !== id );
  }

  add(): void {
    const dialogRef = this.dialog.open(EditContactDialogComponent, {
      width: '250px',
      data: {name: '', phone: 0}
    });

    dialogRef.afterClosed().subscribe(result => {
      const data: Contact = result;
      if (this.dataSource.length > 0) {
        data.id = this.dataSource[this.dataSource.length - 1].id + 1;
      } else {
        data.id = 1;
      }
      this.dataSource.push(data);
      this.dataSource = this.dataSource.slice();
    });
  }

  edit(id: number): void {
    const contact = this.dataSource.find(item => item.id === id);
    const dialogRef = this.dialog.open(EditContactDialogComponent, {
      width: '250px',
      data: contact
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}

const ELEMENT_DATA: Contact[] = [
  {id: 1, name: 'Alex', phone: 9999999999},
  {id: 2, name: 'Alex', phone: 9999999999},
  {id: 3, name: 'Alex', phone: 9999999999},
  {id: 4, name: 'Alex', phone: 9999999999},
  {id: 5, name: 'Alex', phone: 9999999999},
  {id: 6, name: 'Alex', phone: 9999999999},
];
