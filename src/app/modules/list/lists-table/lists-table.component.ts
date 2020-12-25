import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ListActionComponent } from '../list-action/list-action.component';
import { ListDeleteComponent } from '../list-delete/list-delete.component';
import { ListService } from '../services/list.service';

@Component({
  selector: 'app-lists-table',
  templateUrl: './lists-table.component.html',
  styleUrls: ['./lists-table.component.scss']
})

export class ListsTableComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['id', 'name', 'items', 'actions'];
  isLoadingResults = true;
  data: IListDetail[] = [];
  total = 0;
  // dataSource: MatTableDataSource<IListDetail>;
  dataSource: any;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private listService: ListService, public dialog: MatDialog) { }

  ngOnInit() {
    this.getLists();
  }

  ngAfterViewInit() {
    this.getLists();
  }

  getLists() {
    this.listService.getLists().subscribe(rs => {
      rs.map((item: IListDetail) => {
        item.actions = '';
      });
      this.dataSource = new MatTableDataSource<IListDetail>(rs);
      this.dataSource.paginator = this.paginator;
      this.total = this.dataSource.length;
    });
  }

  openActionDialog(listDetail?: IListDetail): void {
    const list = { name: '', id: null };
    if (listDetail) {
      list.name = listDetail.name;
      list.id = listDetail.id;
    }
    const dialogRef = this.dialog.open(ListActionComponent, {
      width: '250px',
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
      width: '250px',
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

}
