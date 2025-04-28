export type Todo = {
  id: string
  title: string
  priority: Priority
  createdAt: string
}

export type Priority = 'Critical' | 'Moderate' | 'Optional'
