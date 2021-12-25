import Home from "pages/Home";
import Login from "pages/Login";
export const PUBLIC_ROUTES = [
  {
    path: "/login",
    component: Login,
  },
];

export const PRIVATE_ROUTES = [
  {
    path: "/home",
    component: Home,
  },
];
