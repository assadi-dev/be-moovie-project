import Home from "../pages/Home";
import Login from "../pages/Login";
import PageNotFound from "../pages/PageNotFound";

const routes = [
  {
    path: "/login",
    component: Login,
    isPrivate: false,
  },
  {
    path: "/",
    component: Home,
    isPrivate: true,
  },
  {
    path: "/*",
    component: PageNotFound,
    isPrivate: true,
  },
];

export default routes;
