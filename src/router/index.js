import { createRouter, createWebHistory } from 'vue-router'
import { questionsIsExists } from '../utils/properties'

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: () => import('@/views/Dashboard'),
    children: [
      {
        path: '/',
        name: 'wordPackages',
        component: () => import('@/views/WordPackages')
      },
      {
        path: '/create',
        name: 'create',
        component: () => import('@/views/Create')
      },
      {
        path: '/confirm-questions',
        name: 'confirmQuestions',
        component: () => import('@/views/ConfirmQuestions')
      },
      {
        path: '/my-word-list',
        name: 'myWordList',
        component: () => import('@/views/WordList')
      },
      {
        path: '/quiz/:id',
        name: 'quiz',
        component: () => import('@/views/Quiz')
      },
    ]
  },
  {
    path: '/auth',
    name: 'auth',
    component: () => import('@/views/Auth'),
  },
  {
    path: '/:pathMatch(.*)',
    name: 'notFound',
    component: () => import('@/views/NotFound')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
