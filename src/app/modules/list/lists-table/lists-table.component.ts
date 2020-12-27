import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';

import { ListService } from '../services/list.service';

import { ListActionComponent } from '../list-action/list-action.component';
import { ListDeleteComponent } from '../list-delete/list-delete.component';

@Component({
  selector: 'app-lists-table',
  templateUrl: './lists-table.component.html',
  styleUrls: ['./lists-table.component.scss']
})

export class ListsTableComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'items', 'actions'];
  isLoadingResults = true;
  dataSource = [];

  constructor(private listService: ListService, private dialog: MatDialog,
              private router: Router) { }

  ngOnInit() {
    this.getLists();
  }

  getLists() {
    this.listService.getLists().subscribe(rs => {
      rs.map((item: IListDetail) => {
        item.actions = '';
        item.items = item.tasks;
      });
      this.dataSource = rs;
      this.isLoadingResults = false;
    });
  }

  openActionDialog(listDetail?: IListDetail): void {
    const list = { name: '', id: null };
    if (listDetail) {
      list.name = listDetail.name;
      list.id = listDetail.id;
    }
    const dialogRef = this.dialog.open(ListActionComponent, {
      panelClass: 'action-dialog',
      data: list,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }
      const param: IList =  {name : result};
      if (!list.id) {
        this.listService.create(param).subscribe(rs => {
          this.getLists();
        }, () => {
          console.log('Err - Can not create data');
        });
      } else {
        this.listService.updateById(list.id, param).subscribe(rs => {
          this.getLists();
        }, () => {
          console.log('Err - can not update data');
        });
      }
    });
  }

  openDeleteDialog(listDetail: IListDetail) {
    const dialogRef = this.dialog.open(ListDeleteComponent, {
      panelClass: 'delete-dialog',
      data: listDetail,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.listService.delete(listDetail.id).subscribe(rs => {
          this.getLists();
        }, () => {
          console.log('Err- Can not delete');
        });
      }
    });
  }

  goToTasks(listId: number) {
    this.router.navigate(['/task'], { queryParams: { listId } });
  }
}
