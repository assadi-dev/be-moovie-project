import Main from "../pages/Main";
import Login from "../pages/Login";
import PageNotFound from "../pages/PageNotFound";
import Movie from "../pages/Movie";

const routes = [
  {
    path: "/login",
    component: Login,
    isPrivate: false,
  },
  {
    path: "/",
    component: Main,
    isPrivate: true,
  },
  {
    path: "/movie/:id",
    component: Movie,
    isPrivate: true,
  },
  {
    path: "*",
    component: PageNotFound,
    isPrivate: true,
  },
];

export default routes;
