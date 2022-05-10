import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent {

  @Output() addTodo = new EventEmitter();
  @ViewChild('todo') input: ElementRef | undefined;

  onAddTodo(title: string) {
    this.addTodo.emit({id:0,title: title, done:false});
    this.input!.nativeElement.value = '';
  }

}
