<template>
 <div class="card-wrapper">
    <div class="card">
        <div class="card-header" @click="toggleCard">
            <p>{{ priority }} ({{todos.length}})</p>
           <button  class="toggle-button">{{ isExpanded ? '-' : '+' }}</button>
        </div>
        <div v-if="isExpanded">
                <div v-for="{id, title, priority, createdAt} in todos" :key="id" class="card-item">
                    <p>Title: {{ title }}</p>
                    <p>Priority: {{ priority }}</p>
                    <p>Created: {{ createdAt }}</p>
                    <div class="card-actions">
                        <Button label="Edit" style="margin-left: 10px;" @click="editTodo(id)"/>
                        <Button label="Delete" variant="danger" @click="deleteTodo(id)"/>
                    </div>
                </div>
        </div>
    </div>
 </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';
import type {Priority, Todo} from '@/models/todo';
import Button from '@/components/Button/Button.vue';
import {useTodosStore} from '@/stores/todos';
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
        };
    },

    methods: {
        ...mapActions(useTodosStore, ['editTodo','removeTodo','clearAllTodos']),
        toggleCard() {
            this.isExpanded = !this.isExpanded;
        },
        redirectToRouteAddTodo() {
            this.$router.push({ name: 'AddTodo' }); 
        },
        editTodo(id: string) {
            // Logic to edit a todo
            this.$router.push({ name: 'EditTodo', params: { id } });
        },
        deleteTodo(id: string) {
            // Logic to delete a todo
            this.removeTodo(id);
        },
    },
});

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
.card-header{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    float: right;
    min-width: 100%;
    background-color: #f0f0f0;
    border-radius: 5px 5px 0 0;
    cursor: pointer;
}
.card-item{
    border-bottom: 1px solid #ddd;
    padding: 8px 0;
    min-height: 185px;
}
.card-item:last-child {
    border-bottom: none;
    min-height: 165px;
}
</style>