<template>
  <div class="todo-list">
    <div class="header-section">
      <h1>Todo List</h1>
      <Button label="Add Todo" @click="redirectToRouteAddTodo" />
      <Button label="Clear All" @click="clearAll" :disabled="todos?.length === 0" />
    </div>
    <div v-if="todos?.length > 0">
      <div v-for="(todo, index) in todosGroups" :key="index">
        <Card :priority="todo[0]" :todos="todo[1]" />
      </div>
    </div>
    <div v-else class="card-warper">
      <div class="card">
        <p style="font-size: 20px; text-justify: center">
          No todos available. Click on Add Todo button to add new todo item
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapStores, mapState, mapActions } from 'pinia'
import Button from '@/components/Button/Button.vue'
import { useTodosStore } from '@/stores/todos'
import { groupTodosByPriority } from '@/utils/todos'
import type { TodoGroup } from '@/utils/todos'
import Card from '@/views/Card/Card.vue'
import type { Priority } from '@/models/todo'

export default defineComponent({
  name: 'TodoList',
  components: {
    Button,
    Card,
  },

  data: () => ({
    todosGroups: [] as [
      Priority,
      { id: string; title: string; priority: Priority; createdAt: string }[],
    ][],
  }),

  computed: {
    // gives access to this.useTodosStore
    ...mapStores(useTodosStore),
    // gives read access to this.todos
    ...mapState(useTodosStore, ['todos']),
  },

  created() {
    const groupedData = groupTodosByPriority(this.todos)
    this.todosGroups = Array.from(groupedData.entries())
  },
  watch: {
    todos() {
      const groupedData = groupTodosByPriority(this.todos)
      this.todosGroups = Array.from(groupedData.entries())
    },
  },

  methods: {
    ...mapActions(useTodosStore, ['clearAllTodos']),
    redirectToRouteAddTodo() {
      this.$router.push({ name: 'AddTodo' })
    },
    clearAll() {
      // Logic to clear all todos
      this.clearAllTodos()
    },
  },
})
</script>

<style scoped>
.header-section {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: center;
}
.todo-list {
  max-width: 600px;
  min-width: 500px;
  margin: 0 auto;
}
.card-wrapper {
  border-radius: 8px;
  margin: 0 auto;
  background-color: #f9f9f9;
  min-height: 40px;
}
.card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  margin: 0 auto;
  background-color: #f9f9f9;
  min-height: 40px;
  margin-bottom: 20px;
}
</style>
