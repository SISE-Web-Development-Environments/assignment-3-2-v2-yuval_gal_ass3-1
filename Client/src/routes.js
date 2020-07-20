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
    path: "/about",
    name: "about",
    component: () => import("./pages/AboutPage"),
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
      requireAuth: false
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
    path: "/user/personal",
    name: "PersonalRecipes",
    component: () => import("./pages/PersonalRecipes"),
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
    //TODO: Should be removed before submitting the assignment
    path: "/test",
    name: "test",
    component: () => import("./pages/test"),
  },
  {
    path: "*",
    name: "notFound",
    component: NotFound,
  },
];

export default routes;
