import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { ListsTableComponent } from './modules/list/lists-table/lists-table.component';
import { TasksTableComponent } from './modules/task/tasks-table/tasks-table.component';
import { RootViewComponent } from './root/root-view/root-view.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  {
    path: '',
    component: RootViewComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: ListsTableComponent },
      { path: 'task', component: TasksTableComponent },
    ]
  },
  { path: '**', redirectTo: '/list', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
