import { Component, OnInit } from '@angular/core';
import { Todo } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  title = 'day32-workshop-todo';
  todo!:Todo
  todoList: Todo[] = []

  ngOnInit(): void {

    const d = localStorage.getItem('todo')

    // check if it is null
    if(!d)
      return 

    // @ts-ignore
    const t:any = JSON.parse(d)

    // @ts-ignore
    t['dueDate'] = new Date(t['dueDate']) // this is needed if dueDate is type Date in interface

    this.todo = {...t} // check this out
    console.log('>>> todo from local storage: ', this.todo)
    // localStorage.removeItem('todo')
    
  }

  processTodo(t : Todo){
    this.todoList.push(t)
    localStorage.setItem('todo', JSON.stringify(t)) // local storage is on browser, must use string for both key-value
  }

}
