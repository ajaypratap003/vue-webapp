import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Todo } from '@/models/todo'

export const useTodosStore = defineStore('todos', () => {
  const todos = ref<Todo[]>([])

  const addTodo = (todo: Todo) => {
    todos.value.push(todo)
  }

  const removeTodo = (id: string) => {
    todos.value = todos.value.filter((todo) => todo?.id !== id)
  }

  const editTodo = (id: string, updatedTodo: Todo) => {
    const index = todos?.value?.findIndex((todo) => todo.id === id)
    if (index !== -1) {
      todos.value[index] = { ...todos.value[index], ...updatedTodo }
    }
  }

  const clearAllTodos = () => {
    todos.value.length = 0
  }

  return {
    todos,
    addTodo,
    editTodo,
    removeTodo,
    clearAllTodos,
  }
})
