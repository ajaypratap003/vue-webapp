import type { Todo, Priority } from '@/models/todo'

export type TodoGroup = Record<
  Priority,
  { id: string; title: string; priority: Priority; createdAt: string }
>
export type TodoGroups = Record<
  Priority,
  { id: string; title: string; priority: Priority; createdAt: string }[]
>

export const groupTodosByPriority = (data: Todo[]) => {
  const groupedTodos = new Map<
    Priority,
    { id: string; title: string; priority: Priority; createdAt: string }[]
  >()

  data.forEach((todo) => {
    const { priority, id, title, createdAt } = todo
    if (!groupedTodos.has(priority)) {
      groupedTodos.set(priority, [{ id, title, priority, createdAt }])
    } else {
      groupedTodos.get(priority)?.push({ id, title, priority, createdAt })
    }
  })
  return groupedTodos
}
