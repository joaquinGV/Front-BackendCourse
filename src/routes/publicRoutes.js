import RenderLogin from "../components/Auth/Login/RenderLogin";
import RenderRegister from "../components/Auth/Register/RenderRegister";
import Home from "../components/Home";

const routes = [
  {
    id: "Home",
    path: "/Ecommerce/",
    Element: Home,
  },
  {
    id: "login",
    path: "/Ecommerce/login",
    Element: RenderLogin,
  },
  {
    id: "register",
    path: "/Ecommerce/register",
    Element: RenderRegister,
  },
  // {
  //   id: "password-email",
  //   path: "/Ecommerce/password-email",
  //   Element: ,
  // },
  // {
  //   id: "change-password",
  //   path: "/Ecommerce/change-password",
  //   Element: ,
  // },
];

export default routes;
