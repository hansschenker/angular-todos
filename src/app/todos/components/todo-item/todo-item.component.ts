import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Todo } from '../../todo.types';

@Component({
  selector: 'todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent {
  @Input() todo: Todo | undefined;
  @Output() toggleTodo = new EventEmitter<boolean>();
  @Output() deleteTodo = new EventEmitter();

  constructor(private router: Router) {}

  onEditTodo() {
    this.router.navigate(['/todo', this.todo!.id]);
  }


}
