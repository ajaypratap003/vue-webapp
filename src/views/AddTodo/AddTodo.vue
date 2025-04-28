<template>
  <div class="add-todo-wrapper">
    <p style="color: green">{{ message }}</p>
    <form v-on:submit.prevent="handleSubmit">
      <InputField
        label="Title"
        placeholder="Enter title"
        v-model:value="form.title"
        :error="errors.title"
        @change:value="onChaneTitle"
      />
      <Dropdown
        id="priority"
        label="Priority"
        :options="options"
        v-model:modelValue="form.priority"
      />
      <div class="button-group">
        <Button label="Back" type="button" variant="secondary" @click="redirectToRouteTodoList" />
        <Button
          :label="isEditFlow ? 'Update Todo' : 'Add Todo'"
          type="submit"
          variant="primary"
          :disabled="!isFormValid"
        />
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import InputField from '@/components/InputField/InputField.vue'
import Button from '@/components/Button/Button.vue'
import Dropdown from '@/components/Dropdown/Dropdown.vue'
import { nanoid } from 'nanoid'
import type { Todo, Priority } from '@/models/todo'
import { useTodosStore } from '@/stores/todos'
import { getCurrentDate } from '@/utils/date'

const todosStore = useTodosStore()

export default defineComponent({
  name: 'AddTodo',
  props: {
    isEditFlow: {
      type: Boolean,
      default: false,
    },
    todo: {
      type: Object as () => Todo,
      default: () => ({
        id: '',
        title: '',
        priority: 'Moderate',
        createdAt: '',
      }),
    },
  },
  components: {
    InputField,
    Button,
    Dropdown,
  },

  computed: {
    isFormValid() {
      const { title } = this.errors
      if (title?.trim().length === 0) {
        return true
      }
      return false
    },
  },

  data() {
    return {
      message: '',
      form: {
        id: this.todo?.id || '',
        title: this.todo?.title || '',
        priority: this.todo?.priority || 'Moderate',
        createdAt: this.todo?.createdAt || '',
      },
      errors: {
        title: '',
        priority: '',
      },
      todos: [] as Todo[],
    }
  },

  methods: {
    resetFormFields() {
      this.form = {
        id: '',
        title: '',
        priority: 'Moderate',
        createdAt: '',
      }
      this.errors = {
        title: '',
        priority: '',
      }
      this.message = ''
    },

    addTodo() {
      const { title, priority } = this.form
      const newTodo: Todo = {
        id: nanoid(),
        title,
        priority: priority as Priority,
        createdAt: getCurrentDate(),
      }
      todosStore.addTodo(newTodo)
      this.resetFormFields()
    },

    editTodo() {
      const { title, priority } = this.form
      const updatedTodo: Todo = {
        id: this.todo.id,
        title,
        priority: priority as Priority,
        createdAt: this.todo.createdAt,
      }
      todosStore.editTodo(this.todo.id, updatedTodo)
      this.resetFormFields()
    },

    validateTitle() {
      if (!this.form.title.trim()) {
        this.errors.title = 'Title is required.'
      } else if (this.form.title.length > 20) {
        this.errors.title = 'Title must not exceed 20 characters.'
      } else {
        this.errors.title = ''
      }
    },

    redirectToRouteTodoList() {
      this.$router.push({ name: 'TodoList' })
    },

    onChaneTitle(title: string) {
      this.form.title = title
      this.validateTitle()
    },

    handleSubmit() {
      this.validateTitle()
      if (this.isFormValid) {
        if (this.isEditFlow) {
          if (this.form.title.trim().length > 0 && this.errors.title.length === 0) {
            this.editTodo()
            this.message = 'Updated todo item successfully'
          }
        } else {
          if (this.form.title.trim().length > 0 && this.errors.title.length === 0) {
            this.addTodo()
            this.message = 'Todo added successfully'
          }
        }

        setTimeout(() => {
          this.redirectToRouteTodoList()
        }, 500)
      }
    },
  },

  setup() {
    return {
      options: [
        { label: 'Critical', value: 'Critical' },
        { label: 'Moderate', value: 'Moderate' },
        { label: 'Optional', value: 'Optional' },
      ],
    }
  },
})
</script>

<style scoped>
.button-group {
  display: flex;
  float: right;
  gap: 1rem;
  margin-top: 2rem;
}
.add-todo-wrapper {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}
span {
  color: red;
  font-size: 0.9em;
}
</style>
