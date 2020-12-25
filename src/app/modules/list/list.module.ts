import { NgModule } from '@angular/core';
import { MatTableModule, MatPaginatorModule, MatInputModule, MatDialogModule, MatButtonModule, MatIconModule,
  MatTooltipModule } from '@angular/material';
import { ListsTableComponent } from './lists-table/lists-table.component';
import { ListActionComponent } from './list-action/list-action.component';
import { FormsModule } from '@angular/forms';
import { ListDeleteComponent } from './list-delete/list-delete.component';

@NgModule({
  declarations: [
    ListsTableComponent,
    ListActionComponent,
    ListDeleteComponent
  ],
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    FormsModule,
    MatIconModule,
    MatTooltipModule
  ],
  providers: [],
  exports: [
    ListsTableComponent,
  ],
  entryComponents: [
    ListActionComponent,
    ListDeleteComponent
  ]
})
export class ListModule { }
