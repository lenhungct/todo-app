import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
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
export class TasksTableComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'listName', 'completed', 'createdAt', 'completedAt', 'actions'];
  dataSource = [];
  lists: IListDetail[] = [];
  selectedList = null;
  isLoadingResults = true;

  constructor(private taskService: TaskService, private listService: ListService,
              private dialog: MatDialog, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.setData();
  }

  setData() {
    this.route.queryParams.subscribe(param => {
      if (Object.keys(param).length === 0 && param.constructor === Object) {
        this.selectedList = null;
      } else {
        this.selectedList = Number(param.listId);
      }
      this.getData(this.selectedList);
    });
  }

  getData(listId?: number) {
    const arr: Array<any> = [
      this.listService.getLists(),
      this.taskService.getTasks()
    ];
    if (listId) {
      arr[1] = this.taskService.getByListId(listId);
    }
    forkJoin(arr).subscribe(([lists, tasks]) => {
      this.lists = lists;
      tasks.map((item: ITaskDetail) => {
        const itemList = this.lists.find(list => list.id === item.list_id);
        item.listName = itemList ? itemList.name : '';
        item.actions = '';
      });
      this.dataSource = tasks;
      this.isLoadingResults = false;
    });
  }

  openActionDialog(taskDetail?: ITaskDetail) {
    if (!taskDetail) {
      taskDetail = {
        id: null,
        name: '',
        list_id: this.selectedList,
        listId: this.selectedList,
        completed: false,
        createdAt: null,
      };
    } else {
      taskDetail.listId = taskDetail.list_id;
    }
    const dialogRef = this.dialog.open(TaskActionComponent, {
      panelClass: 'action-dialog',
      data: { data: taskDetail, lists: this.lists },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }
      if (!taskDetail.id) {
        const param: INewTask =  { name : result.name, completed : result.completed };
        this.taskService.create(taskDetail.listId, param).subscribe(rs => {
          this.getData(this.selectedList);
        }, () => {
          console.log('Err - Can not create data');
        });
      } else {
        const param: ITask =  { name : result.name, completed : result.completed, listId: result.listId };
        this.taskService.updateById(taskDetail.listId, taskDetail.id, param).subscribe(rs => {
          this.getData(this.selectedList);
        }, () => {
          console.log('Err - can not update data');
        });
      }
    });
  }

  openDeleteDialog(taskDetail: ITaskDetail) {
    const dialogRef = this.dialog.open(TaskDeleteComponent, {
      panelClass: 'delete-dialog',
      data: taskDetail,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.taskService.delete(taskDetail.listId, taskDetail.id).subscribe(rs => {
          this.getData(this.selectedList);
        }, () => {
          console.log('Err- Can not delete');
        });
      }
    });
  }

  completeTask(taskDetail: ITaskDetail) {
    taskDetail.listId = taskDetail.list_id;
    const param: ITask =  { name : taskDetail.name, completed : true, listId: taskDetail.listId };
    this.taskService.updateById(taskDetail.listId, taskDetail.id, param).subscribe(rs => {
      this.getData(this.selectedList);
    }, () => {
      console.log('Err - can not update data');
    });
  }

  onFilterList(selectedListId: number) {
    if (selectedListId) {
      this.router.navigate([], { queryParams: { listId: selectedListId } });
    } else {
      this.router.navigate([]);
    }
  }
}
