import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-list-delete',
  templateUrl: './list-delete.component.html',
  styleUrls: ['./list-delete.component.scss']
})
export class ListDeleteComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: IListDetail) { }

  ngOnInit() {
  }

}
