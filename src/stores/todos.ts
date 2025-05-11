import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Todo } from '@/models/todo'

export const useTodosStore = defineStore('todos', () => {
  const todos = ref<Todo[]>(localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos") as string) : [])

  const saveTodosLocalStorage=()=>{
    localStorage.setItem("todos", JSON.stringify(todos?.value));
  }

  const addTodo = (todo: Todo) => {
    todos.value.push(todo)
    saveTodosLocalStorage()
  }

  const removeTodo = (id: string) => {
    todos.value = todos.value.filter((todo) => todo?.id !== id)
    saveTodosLocalStorage()
  }

  const editTodo = (id: string, updatedTodo: Todo) => {
    const index = todos?.value?.findIndex((todo) => todo.id === id)
    if (index !== -1) {
      todos.value[index] = { ...todos.value[index], ...updatedTodo }
    }
    saveTodosLocalStorage()
  }

  const clearAllTodos = () => {
    todos.value.length = 0
    saveTodosLocalStorage()
  }

  const sortTodosByPriority = (sortOrderASC: boolean) => {
    todos.value=todos.value.slice().sort((a, b) => {
      return sortOrderASC ? a.priority.localeCompare(b.priority) : b.priority.localeCompare(a.priority)
    })

    saveTodosLocalStorage()
  }

  return {
    todos,
    addTodo,
    editTodo,
    removeTodo,
    clearAllTodos,
    sortTodosByPriority
  }
})
