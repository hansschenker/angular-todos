import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription, Subject, filter, debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'todo-search',
  templateUrl: './todo-search.component.html',
  styleUrls: ['./todo-search.component.css']
})
export class TodoSearchComponent implements OnInit, OnDestroy {

  @Output() search = new EventEmitter<string>();

  changeSub: Subscription | undefined;
  searchStream = new Subject<string>();

  ngOnInit() {
    this.changeSub = this.searchStream.pipe(
      filter(searchText => searchText.length > 2),  // min length
      debounceTime(300),                            // wait for break in keystrokes
      distinctUntilChanged()                        // only if value changes
    ).subscribe(searchText => this.search.emit(searchText));
  }

  ngOnDestroy() {
    if (this.changeSub) { this.changeSub.unsubscribe(); }
  }

  onSearch(searchText: string) {
    this.searchStream.next(searchText);
  }

}
