import { createRouter, createWebHistory } from "vue-router";

import { ROUTE_ACCESS_MAP } from "../configs/roles";

const routes = [
  {
    path: "/",
    redirect: { name: "study" },
    component: () => import("@/views/HomeView.vue"),
    children: [
      {
        path: "/study",
        name: "study",
        component: () => import("@/modules/study/views/StudyView.vue"),
        meta: { roles: ROUTE_ACCESS_MAP.study ?? [] },
      },
      {
        path: "/webinars",
        name: "webinars",
        component: () => import("@/modules/webinars/views/WebinarsView.vue"),
        meta: { roles: ROUTE_ACCESS_MAP.webinars ?? [] },
      },
      {
        path: "/tasks",
        name: "tasks",
        component: () => import("@/modules/tasks/views/TasksView.vue"),
        meta: { roles: ROUTE_ACCESS_MAP.tasks ?? [] },
      },
      {
        path: "/checks",
        name: "checks",
        component: () => import("@/modules/tasks/views/CheckView.vue"),
        meta: { roles: ROUTE_ACCESS_MAP.checks ?? [] },
      },
      {
        path: "/checks/:id",
        name: "taskcheck",
        component: () => import("@/modules/tasks/views/TaskCheckView.vue"),
        props: true,
        meta: { roles: ROUTE_ACCESS_MAP.checks ?? [] }
      },
      {
        path: "/messages",
        name: "messages",
        component: () => import("@/modules/messages/views/MessagesView.vue"),
        meta: { roles: ROUTE_ACCESS_MAP.messages ?? [] },
      },
      {
        path: "/profile",
        name: "profile",
        component: () => import("@/modules/profile/views/ProfileView.vue"),
        meta: { roles: ROUTE_ACCESS_MAP.profile ?? [] },
      },
      {
        path: "/player/:program/:module/:topic/:lesson",
        name: "player",
        component: () => import("@/modules/study/views/PlayerView.vue"),
        props: true,
        meta: { roles: ROUTE_ACCESS_MAP.player ?? [] },
      }
    ]
  },
  {
    path: "/auth",
    name: "auth",
    redirect: { name: "login" },
    component: () => import("@/views/AuthView.vue"),
    children: [
      {
        path: "/auth/login",
        name: "login",
        component: () => import("@/modules/auth/views/LoginView.vue"),
      },
      {
        path: "/auth/register",
        name: "register",
        component: () => import("@/modules/auth/views/RegisterView.vue"),
      },
      {
        path: "/auth/forgot",
        name: "forgot",
        component: () => import("@/modules/auth/views/ForgotView.vue"),
      }
    ]
  },
  {
    path: '/forbidden',
    name: 'forbidden',
    component: () => import('@/views/ForbiddenView.vue'),
    meta: { public: true }
  },
  {
    path: "/:pathMatch(.*)*",
    component: () => import("@/views/NotFoundView.vue"),
    props: true,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;