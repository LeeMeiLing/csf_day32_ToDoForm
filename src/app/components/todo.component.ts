import { Component, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task, Todo } from '../models';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit{

  todoForm!: FormGroup
  taskArray!: FormArray

  @Input()
  localTodo!:Todo

  @Output()
  sendForm = new Subject<Todo>
  
  constructor(private fb:FormBuilder){
    this.fb = fb
  }

  ngOnInit(): void {
    this.todoForm = this.createForm()
  }

  private createForm(): FormGroup{

    this.taskArray = this.fb.array([]) // create a form array

    if(this.localTodo){

      // read the task, convert to form group and store to form array
      for(let task of this.localTodo.tasks){
        this.taskArray.push(this.createTaskfromLocalTodo(task))
      }

      // create a form group
      return this.fb.group({
        name:this.fb.control<string>(this.localTodo.name,[Validators.required, Validators.minLength(3)]),
        dueDate: this.fb.control<string>(this.localTodo.dueDate.toString(),[Validators.required]),
        tasks: this.taskArray // add the form array to this form group
      })
      
    }

    // create a form group
    return this.fb.group({
      name:this.fb.control<string>('',[Validators.required, Validators.minLength(3)]),
      dueDate: this.fb.control<string>('',[Validators.required]),
      tasks: this.taskArray // add the form array to this form group
    })

  }

  isFormInvalid():boolean{

    const dd = new Date(this.todoForm.get('dueDate')?.value)
    const today = new Date()

    if ((this.taskArray.length <= 0) || (dd<today) ||this.todoForm.invalid){
      return true
    }
    
    return false;

  }

  addTask(){
    const task = this.createTask() // create a sub-formGroup 
    this.taskArray.push(task) // add the sub-formGroup to the form array
  }

  // create a sub-formGroup that contain 2 controls
  createTask():FormGroup{
    return this.fb.group({
      taskName:this.fb.control<string>('',[Validators.required]),
      priority:this.fb.control<string>('low',[Validators.required]),
    })
  }

  createTaskfromLocalTodo(task:Task):FormGroup{
    return this.fb.group({
      taskName:this.fb.control<string>(task.taskName,[Validators.required]),
      priority:this.fb.control<string>(task.priority,[Validators.required]),
    })
  }
  
  deleteItem(idx:number){
    this.taskArray.removeAt(idx)
  }

  processToDo(){

    // *** Extract formdata and store into a Todo object
    // *** Todo interface property must have same name as form control name

    // const todo: Todo = this.todoForm.value // *** use this if in interface dueDate is type string
    const todo: Todo = {
      name: this.todoForm.get('name')?.value,
      dueDate: new Date(this.todoForm.get('dueDate')?.value), //*** this is needed if interface dueDate is type Date
      tasks: this.todoForm.get('tasks')?.value
    };

    console.info('>>> todo: ', todo)
    this.sendForm.next(todo)
    this.todoForm.reset()
  }

}
