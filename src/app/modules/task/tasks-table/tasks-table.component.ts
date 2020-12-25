import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatTableDataSource } from '@angular/material';
import { forkJoin } from 'rxjs';
import { ListService } from '../../list/services/list.service';
import { TaskService } from '../services/task.service';
import { TaskActionComponent } from '../task-action/task-action.component';
import { TaskDeleteComponent } from '../task-delete/task-delete.component';

@Component({
  selector: 'app-tasks-table',
  templateUrl: './tasks-table.component.html',
  styleUrls: ['./tasks-table.component.scss']
})
export class TasksTableComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'listName', 'completed', 'createdAt', 'completedAt', 'actions'];
  dataSource: any;
  total = 0;
  lists: IListDetail[] = [];
  testList = [{id: 1, name: 'test1'}, {id: 2, name: 'test1'}];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(private taskService: TaskService, private listService: ListService, private dialog: MatDialog) { }

  ngOnInit() {
    this.getData();
  }

  ngAfterViewInit() {
    this.getData();
  }

  getData() {
    forkJoin([
      this.listService.getLists(),
      this.taskService.getTasks()
    ]).subscribe(([lists, tasks]) => {
      this.lists = lists;
      tasks.map((item: ITaskDetail) => {
        const itemList = lists.find(list => list.id === item.list_id);
        item.listName = itemList ? itemList.name : '';
        item.actions = '';
      });
      this.dataSource = new MatTableDataSource<ITaskDetail>(tasks);
      this.dataSource.paginator = this.paginator;
      this.total = this.dataSource.length;
    });
  }

  openActionDialog(taskDetail?: ITaskDetail) {
    console.log('taskDetail - 1', taskDetail);
    if (!taskDetail) {
      taskDetail = {
        id: null,
        name: '',
        listId: null,
        completed: false,
        createAt: null,
        completeAt: null
      };
    }
    console.log('taskDetail - 2', taskDetail);
    const dialogRef = this.dialog.open(TaskActionComponent, {
      width: '250px',
      data: { data: taskDetail, lists: this.lists },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('result: ', result);
      if (!result) {
        return;
      }
      if (!taskDetail.id) {
        const param: INewTask =  { name : result.name, completed : result.completed };
        this.taskService.create(taskDetail.listId, param).subscribe(rs => {
          this.getData();
        }, () => {
          console.log('Err - Can not create data');
        });
      } else {
        const param: ITask =  { name : result.name, completed : result.completed, listId: result.listId };
        this.taskService.updateById(taskDetail.listId, taskDetail.id, param).subscribe(rs => {
          this.getData();
        }, () => {
          console.log('Err - can not update data');
        });
      }
    });
  }

  openDeleteDialog(taskDetail: ITaskDetail) {
    const dialogRef = this.dialog.open(TaskDeleteComponent, {
      width: '250px',
      data: taskDetail,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.taskService.delete(taskDetail.listId, taskDetail.id).subscribe(rs => {
          this.getData();
        }, () => {
          console.log('Err- Can not delete');
        });
      }
    });
    console.log('taskDetail', taskDetail);
  }

  getTasksByList(listId: number) {
    this.taskService.getByListId(listId).subscribe((tasks) => {
      tasks.map((item: ITaskDetail) => {
        const itemList = this.lists.find(list => list.id === item.listId);
        console.log(itemList, 'lists');
        item.listName = itemList ? itemList.name : '';
        item.actions = '';
      });
      this.dataSource = new MatTableDataSource<ITaskDetail>(tasks);
      this.dataSource.paginator = this.paginator;
      this.total = this.dataSource.length;
    });
  }

  onFilterList(selectedListId: number) {
    this.getTasksByList(selectedListId);
  }
}
