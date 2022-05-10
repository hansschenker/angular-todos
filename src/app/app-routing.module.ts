import { TodoFormComponent } from './todos/components/todo-form/todo-form.component';
import { TodoListComponent } from './todos/components/todo-list/todo-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'todos'
  },
  { path: 'todos', component: TodoListComponent },
  { path: 'todos/:id', component: TodoFormComponent },
  { path: 'todos', loadChildren: () => import('./todos/todos.module').then(m => m.TodosModule) }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
