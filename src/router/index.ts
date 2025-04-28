import { createRouter, createWebHistory } from 'vue-router'
import TodoList from '@/views/TodoList/TodoList.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/add-todo',
      name: 'AddTodo', // This is the name of the route
      // route level code-splitting
      // this generates a separate chunk (AddTodo.[hash].js) for this route
      component: () => import('../views/AddTodo/AddTodo.vue'),
    },
    {
      path: '/edit-todo/:id',
      name: 'EditTodo', // This is the name of the route
      // route level code-splitting
      // this generates a separate chunk (EditTodo.[hash].js) for this route
      component: () => import('../views/EditTodo/EditTodo.vue'),
    },
    {
      path: '/',
      name: 'TodoList',
      component: TodoList
    },
  ],
})

export default router
