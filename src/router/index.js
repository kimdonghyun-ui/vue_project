import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import store from "../store";

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/LoginPage.vue"),
  },
  {
    path: "/home",
    name: "home",
    // redirect: "/login",
    component: HomeView,
    meta: { auth: true },
  },
  {
    path: "/chat",
    name: "chat",
    // redirect: "/login",
    component: () => import("../views/ChatPage.vue"),
    meta: { auth: true },
  },
  {
    path: "/users",
    name: "users",
    component: () => import("../views/UsersPage.vue"),
    meta: { auth: true },
  },
  {
    path: "/signup",
    name: "signup",
    component: () => import("../views/SignupPage.vue"),
  },
  {
    path: "/:catchAll(.*)",
    component: () => import("../views/NotFoundPage.vue"),
    meta: { auth: true },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  // to: 이동하려는 라우트 객체
  // from: 현재 라우트 객체
  // next: 다음 라우트로 이동하는 함수

  // 예: 사용자가 로그인한 경우에만 특정 라우트로 이동을 허용
  if (to.meta.auth && !store.getters.isLogin) {
    // 로그인이 필요한 페이지에 로그인하지 않은 경우
    alert("인증이 필요합니다");
    next("/login");
    return;
  } else {
    // 로그인이 필요하지 않거나 로그인한 경우
    next(); // 계속 진행
  }
});

export default router;
