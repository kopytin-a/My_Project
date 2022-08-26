import UserPage from '@/pages/UserPage'
import Home from '@/components/Home'
import { createRouter, createWebHistory } from "vue-router"

const routes = [
    {
        path: '/UserPage',
        component: UserPage
    },
    {
        path: '/',
        component: Home
    },
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default router