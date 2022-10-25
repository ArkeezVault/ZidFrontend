import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "profile",
      component: () => import("../views/ProfileView.vue"),
    },
    {
      path: "/payment",
      name: "payment",
      component: () => import("../views/PaymentView.vue"),
    },
  ],
});

export default router;
