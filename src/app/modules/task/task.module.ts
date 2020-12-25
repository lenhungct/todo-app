import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksTableComponent } from './tasks-table/tasks-table.component';
import { FormsModule } from '@angular/forms';
import { MatTableModule, MatPaginatorModule, MatInputModule, MatDialogModule,
  MatButtonModule, MatIconModule, MatTooltipModule, MatCheckboxModule, MatSelectModule } from '@angular/material';
import { TaskActionComponent } from './task-action/task-action.component';
import { TaskDeleteComponent } from './task-delete/task-delete.component';

@NgModule({
  declarations: [TasksTableComponent, TaskActionComponent, TaskDeleteComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    FormsModule,
    MatIconModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatSelectModule
  ],
  entryComponents: [
    TaskActionComponent,
    TaskDeleteComponent
  ],
  exports: [TasksTableComponent]
})
export class TaskModule { }
