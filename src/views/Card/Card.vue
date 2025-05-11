<template>
  <div class="card-wrapper">
    <div class="card">
      <div class="card-header" @click="toggleCard">
        <p>{{ priority }} ({{ todos.length }})</p>
        <span>{{ isExpanded ? '▼' : '▶' }}</span>
      </div>
      <div v-if="isExpanded">
        <div v-for="{ id, title, priority, createdAt } in todos" :key="id" class="card-item" :test-id="id">
          <p>Title: {{ title }}</p>
          <p>Priority: {{ priority }}</p>
          <p>Created: {{ createdAt }}</p>
           <div class="action-buttons">
            <span class="icon" @click="editTodo(id)">✏️</span>
            <span class="icon" @click="deleteTodo(id)">🗑️</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import type { Priority, Todo } from '@/models/todo'
import Button from '@/components/Button/Button.vue'
import { useTodosStore } from '@/stores/todos'
import { mapActions } from 'pinia'

export default defineComponent({
  name: 'Card',
  components: {
    Button,
  },
  props: {
    priority: {
      type: String as PropType<Priority>,
      required: true,
    },
    todos: {
      type: Object as PropType<Todo[]>,
      required: true,
    },
  },

  data() {
    return {
      isExpanded: true,
    }
  },

  methods: {
    ...mapActions(useTodosStore, ['editTodo', 'removeTodo', 'clearAllTodos']),
    toggleCard() {
      this.isExpanded = !this.isExpanded
    },
    redirectToRouteAddTodo() {
      this.$router.push({ name: 'AddTodo' })
    },
    editTodo(id: string) {
      // Logic to edit a todo
      this.$router.push({ name: 'EditTodo', params: { id } })
    },
    deleteTodo(id: string) {
      // Logic to delete a todo
      this.removeTodo(id)
    },
  },
})
</script>

<style scoped>
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
.card-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  float: right;
  min-width: 100%;
  background-color: #f0f0f0;
  border-radius: 5px 5px 0 0;
  cursor: pointer;
  margin-bottom: 15px;
}
.card-item {
  border-bottom: 1px solid #ddd;
  padding: 8px 0;
  min-height: 200px;
}
.card-item:last-child {
  border-bottom: none;
  min-height: 180px;
}

.action-buttons {
    display: flex;
    gap: 10px;
    float: right;
}
.icon {
    font-size: 16px;
    cursor: pointer;
}
</style>
