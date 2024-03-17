import RenderLogin from "../components/Auth/Login/RenderLogin";
import RenderRegister from "../components/Auth/Register/RenderRegister";
import Home from "../components/Home";
import StoreNavigation from "../components/StoreComponents/StoreNavigation";

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
  {
    id: "store-nav",
    path: "/Ecommerce/store",
    Element: StoreNavigation,
  },
];

export default routes;
