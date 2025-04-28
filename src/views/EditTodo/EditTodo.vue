<template>
  <AddTodo :is-edit-flow="isEditFlow" :todo="todo" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AddTodo from '../AddTodo/AddTodo.vue'
import type { Todo } from '@/models/todo'
import { useTodosStore } from '@/stores/todos'
import { mapState } from 'pinia'

export default defineComponent({
  name: 'EditTodo',
  components: {
    AddTodo,
  },

  computed: {
    // gives read access to this.todos
    ...mapState(useTodosStore, ['todos']),

    todoId(): string {
      const id = this.$route.params.id
      if (!id) {
        throw new Error('Todo ID is required')
      }
      return id as string
    },

    todo(): Todo {
      const todoId = this.todoId
      return this.todos.find((todo) => todo.id === todoId) as Todo
    },

    isEditFlow(): boolean {
      return this.$route.name === 'EditTodo'
    },
  },
})
</script>
