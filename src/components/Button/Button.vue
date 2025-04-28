<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'

export default defineComponent({
  name: 'Button',
  props: {
    type: {
      type: String as PropType<'button' | 'submit' | 'reset'>,
      default: 'button',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    variant: {
      type: String as PropType<'primary' | 'secondary' | 'danger'>,
      default: 'primary',
    },
    label: {
      type: String as PropType<string>,
      default: 'Save',
    },
  },
  computed: {
    buttonClass(): string {
      return `btn btn-${this.variant}`
    },
  },
  methods: {
    handleClick(event: MouseEvent) {
      this.$emit('click', event)
    },
  },
})
</script>

<template>
  <button :class="buttonClass" :disabled="disabled" @click="handleClick">
    {{ label }}
    <slot />
  </button>
</template>

<style scoped>
.btn {
  padding: 0.5rem 1rem;
  float: right;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-danger {
  background-color: #dc3545;
  color: white;
}

.btn:disabled {
  background-color: #e0e0e0;
  color: #6c757d;
  cursor: not-allowed;
}
</style>
