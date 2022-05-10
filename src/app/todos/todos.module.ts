import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodosRoutingModule } from './todos-routing.module';
import { TodosPage } from './todos.page';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoListFilterComponent } from './components/todo-list-filter/todo-list-filter.component';
import { TodoAddComponent } from './components/todo-add/todo-add.component';
import { TodoFormComponent } from './components/todo-form/todo-form.component';
import { TodoItemComponent } from './components/todo-item/todo-item.component';
import { TodoSearchComponent } from './components/todo-search/todo-search.component';


@NgModule({
  declarations: [
    TodosPage,
    TodoListComponent,
    TodoListFilterComponent,
    TodoAddComponent,
    TodoFormComponent,
    TodoItemComponent,
    TodoSearchComponent
  ],
  imports: [
    CommonModule,
    TodosRoutingModule
  ]
})
export class TodosModule { }
