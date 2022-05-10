import { BehaviorSubject, map, Observable, withLatestFrom } from 'rxjs';
import { Injectable } from '@angular/core';
import { ApiService } from './api/api.service';
import { Todo } from './todo.types';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  initialTodos:Todo[] = [{id:0,title:'enter a title',description:"todo", completed:false}]
  private store: BehaviorSubject<Todo[]> = new BehaviorSubject(this.initialTodos);

  constructor(private api: ApiService) {
    this.loadData();
  }

  get todos$(): Observable<Todo[]> {
    return this.store.asObservable();
  }

  getTodoById(id: number): Observable<Todo | undefined> {
    return this.todos$.pipe(
      map(todos => todos.find(todo => todo.id === id))
    );
  }

  loadData(search?: string) {
    this.api.getTodos(search)
      .subscribe(
          todos => {
              this.store.next(todos);
          },
          err => console.log('Error retrieving Todos')
      );
  }

  addTodo(newtodo: Todo): Observable<Todo> {
    const observable = this.api.saveTodo(newtodo);

    observable.pipe(
      withLatestFrom(this.todos$),
    ).subscribe(([savedTodo, todos]) => {
      this.store.next(todos.concat(savedTodo));
    });

    return observable;
  }

  editTodo(todo: Todo): Observable<Todo> {
    const observable = this.api.updateTodo(todo);

    observable.pipe(
      withLatestFrom(this.todos$)
    ).subscribe(([savedTodo, todos]) => {
      const index = todos.findIndex((d: Todo) => d.id === todo.id);
      this.store.next([
        ...todos.slice(0, index),
        savedTodo,
        ...todos.slice(index + 1)
      ]);
    });

    return observable;
  }


  deleteTodo(deleted: Todo): Observable<{}> {
    const observable = this.api.deleteTodo(deleted);

    observable.pipe(
      withLatestFrom(this.todos$)
    ).subscribe(([empty, todos]) => {
      const index = todos.findIndex((todo) => todo.id === deleted.id);
      this.store.next([
        ...todos.slice(0, index),
        ...todos.slice(index + 1)
      ]);
    });

    return observable;
  }
}
