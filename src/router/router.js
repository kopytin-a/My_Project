import UserPage from "@/pages/UserPage";
import HomePage from "@/components/HomePage";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/UserPage",
    component: UserPage
  },

  {
    path: "/",
    component: HomePage
  }
]

const router = createRouter({
  routes,
  history: createWebHistory(process.env.BASE_URL)
})

export default router;