import { Component, OnInit, ViewChild } from '@angular/core';
import { Contact } from '../models/contact';
import { MatTableDataSource, MatCheckboxChange, MatDialog } from '@angular/material';
import { EditContactDialogComponent } from '../edit-contact-dialog/edit-contact-dialog.component';


@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  @ViewChild("mCheck", { static: false }) mCheck: any;
  @ViewChild("fCheck", { static: false }) fCheck: any;

  displayedColumns: string[] = ['name', 'email', 'phone', 'edit', 'delete'];

  dataSource;
  filterData;


  applyFilter(filterValue: string) {
    this.filterData.filter = filterValue.trim().toLowerCase();

  }

  constructor(public dialog: MatDialog) {

  }


  ngOnInit() {

    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
    this.filterData = new MatTableDataSource(ELEMENT_DATA);

  }


  delete(id: number) {
    this.filterData.data = this.filterData.data.filter(item => item.id !== id);

  }


  add(): void {
    const dialogRef = this.dialog.open(EditContactDialogComponent, {
      width: '250px',
      data: { name: '', phone: '', email: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      const data: Contact = result;
      if (this.filterData.data.length > 0) {
        data.id = this.filterData.data[this.filterData.data.length - 1].id + 1;
      } else {
        data.id = 1;
      }
      this.filterData.data.push(result);
      this.filterData.data = this.filterData.data.slice();
    });

  }

  edit(id: number): void {
    const contact = this.filterData.data.find(item => item.id === id);
    const dialogRef = this.dialog.open(EditContactDialogComponent, {
      width: '250px',
      data: contact
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


  FilterContacts(filter: any) {
    switch (filter) {
      case 'frequent': {

        this.filterData.data = this.dataSource.data.filter(item => item.frequent);
        break;
      }
      case 'starred': {

        this.filterData.data = this.dataSource.data.filter(item => item.starred);
        break;
      }
      case 'all': {
        
        this.filterData.data = this.dataSource.data;
        break;
      }



    }

  }
}


const ELEMENT_DATA: Contact[] = [
  { id: 1, name: 'Charlie', email: 'charlie@gmail.com', gender: 'male', phone: 9999999999, frequent: false, starred: true },
  { id: 2, name: 'Rose', email: 'rose@gmail.com', gender: 'female', phone: 9999999999, frequent: true, starred: true },
  { id: 3, name: 'Peter', email: 'peter@gmail.com', gender: 'male', phone: 9999999999, frequent: true, starred: true },
  { id: 4, name: 'Lilly', email: 'lilly@gmail.com', gender: 'female', phone: 9999999999, frequent: true, starred: false },
  { id: 5, name: 'Alex', email: 'alex@gmail.com', gender: 'male', phone: 9999999999, frequent: false, starred: false },
  { id: 6, name: 'Julie', email: 'julie@gmail.com', gender: 'female', phone: 9999999999, frequent: false, starred: true },
];
