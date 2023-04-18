export interface Todo{
    name: string
    dueDate: Date // if type is Date, use new Date(this.todoForm.get('dueDate')?.value) to extract
    tasks: Task[]
}

export interface Task{
    taskName: string
    priority: string
}