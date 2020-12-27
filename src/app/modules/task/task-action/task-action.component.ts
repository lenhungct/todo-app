import { stringify } from '@angular/compiler/src/util';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { ListActionComponent } from '../../list/list-action/list-action.component';

@Component({
  selector: 'app-task-action',
  templateUrl: './task-action.component.html',
  styleUrls: ['./task-action.component.scss']
})
export class TaskActionComponent implements OnInit {

  acceptButton = 'Create';
  title = 'Add new task';
  data: ITaskDetail;
  lists: IListDetail[] = [];
  constructor(private dialogRef: MatDialogRef<ListActionComponent>, @Inject(MAT_DIALOG_DATA) public actionData: any) {
    this.data = this.actionData.data;
    this.lists = this.actionData.lists;
  }

  ngOnInit() {
    if (this.data.id) {
      this.acceptButton = 'Update';
      this.title = 'Edit task';
    }
  }

  onNoClick() {
    this.dialogRef.close();
  }

}
