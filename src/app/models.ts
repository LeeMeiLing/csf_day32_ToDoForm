export interface Todo{
    name: string
    dueDate: string
    tasks: Task[]
}

export interface Task{
    taskName: string
    priority: string
}