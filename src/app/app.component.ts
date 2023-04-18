import { Component } from '@angular/core';
import { Todo } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'day32-workshop-todo';
  todoList: Todo[] = []

  processTodo(t : Todo){
    this.todoList.push(t)
  }

}
