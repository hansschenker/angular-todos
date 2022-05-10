import { Component, OnInit } from '@angular/core';
// rxjs
import { Observable } from 'rxjs';
// todos
import { TodoService } from '../../todo.service';
import { Todo } from '../../todo.types';

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent {

  todos$: Observable<Todo[]> = this.todoStore.todos$;

  constructor (private todoStore: TodoService) {}

  toggleTodo(todo: Todo, completed: boolean) {
    this.todoStore.editTodo({...todo, completed});
  }

  addTodo(todo: Todo) {
    this.todoStore.addTodo(todo);
  }

  deleteTodo(todo: Todo) {
    this.todoStore.deleteTodo(todo);
  }

  searchTodos(search: string) {
    this.todoStore.loadData(search);
  }

}
