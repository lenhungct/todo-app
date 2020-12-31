import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-list-action',
  templateUrl: './list-action.component.html',
  styleUrls: ['./list-action.component.scss']
})
export class ListActionComponent implements OnInit {
  acceptButton = 'Create';
  title = 'Add new list';

  constructor(private dialogRef: MatDialogRef<ListActionComponent>, @Inject(MAT_DIALOG_DATA) public data: IList) { }

  ngOnInit() {
    if (this.data.id) {
      this.acceptButton = 'Update';
      this.title = 'Edit list';
    }
  }

  onNoClick() {
    this.dialogRef.close();
  }
}
