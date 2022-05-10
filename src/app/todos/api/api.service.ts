import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// rxjs
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';
// todos feature
import { Todo } from '../todo.types';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  base = 'http://localhost:3000/todos';
  search: string | undefined;
  headers = new HttpHeaders({
    "content-type":"application/json"
  })
  constructor(private http: HttpClient) { }

  getTodos(search?: string): Observable<Todo[]> {
    let url;
    if (search || this.search) {
      this.search = search;
      url = this.base + '?q=' + this.search;
    }
    return this.http.get<Todo[]>(url || this.base);
  }

  searchTodos(search: string): Observable<Todo[]> {
    return this.getTodos(search);
  }

  saveTodo(newTodo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.base, newTodo, {headers: this.headers}).pipe(share());
  }

  deleteTodo(deletedTodo: Todo): Observable<{}> {
    return this.http.delete(`${this.base}/${deletedTodo.id}`, {headers:this.headers}).pipe(share());
  }

  updateTodo(updatedTodo: Todo): Observable<Todo> {
    return this.http.put<Todo>(`${this.base}/${updatedTodo.id}`, updatedTodo, {headers:this.headers}).pipe(share());
  }
}
