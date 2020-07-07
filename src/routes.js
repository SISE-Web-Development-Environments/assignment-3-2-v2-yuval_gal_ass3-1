import Main from "./pages/MainPage";
import NotFound from "./pages/NotFoundPage";

const routes = [
  {
    path: "/",
    name: "main",
    component: Main,
  },
  {
    path: "/register",
    name: "register",
    component: () => import("./pages/RegisterPage"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./pages/LoginPage"),
  },
  {
    path: "/search",
    name: "search",
    component: () => import("./pages/SearchPage"),
  },
  {
    path: "/recipe/:recipeId",
    name: "recipe",
    component: () => import("./pages/RecipeViewPage"),
    meta: {
      requireAuth: true
    }
  },
  {
    path: "/user/favorites",
    name: "MyFavorites",
    component: () => import("./pages/Favorites"),
    meta: {
      requireAuth: true
    }
  },
  {
    path: "/user/family",
    name: "Family",
    component: () => import("./pages/FamilyPage"),
    meta: {
      requireAuth: true
    }
  },
  {
    path: "/user/personal",
    name: "Personal",
    component: () => import("./pages/PersonalPage"),
    meta: {
      requireAuth: true
    }
  },
  {
    path: "*",
    name: "notFound",
    component: NotFound,
  },
];

export default routes;
