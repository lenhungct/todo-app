import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MatTableModule, MatPaginatorModule, MatInputModule, MatDialogModule,
  MatButtonModule, MatIconModule, MatTooltipModule, MatProgressSpinnerModule
} from '@angular/material';

import { ListsTableComponent } from './lists-table/lists-table.component';
import { ListActionComponent } from './list-action/list-action.component';
import { ListDeleteComponent } from './list-delete/list-delete.component';

@NgModule({
  declarations: [
    ListsTableComponent,
    ListActionComponent,
    ListDeleteComponent
  ],
  imports: [
    BrowserModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    FormsModule,
    MatIconModule,
    MatTooltipModule,
    MatProgressSpinnerModule
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
