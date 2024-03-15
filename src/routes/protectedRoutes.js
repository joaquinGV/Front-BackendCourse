import Cart from "../components/Cart/Cart";
import Home from "../components/Home";
import Products from "../components/Products/Products";
import UpdateUsers from "../components/Users/UpdateUsers";

const routes = [
  {
    id: "login",
    path: "/Ecommerce/home",
    Element: Home,
    role: ["user", "admin"],
  },
  {
    id: "update-users",
    path: "/Ecommerce/update-users",
    Element: UpdateUsers,
    role: ["ADMIN"],
  },
  {
    id: "show-products",
    path: "/Ecommerce/products",
    Element: Products,
    role: ["USER", "PREMIUM", "ADMIN"],
  },
  {
    id: "cart-products",
    path: "/Ecommerce/cart",
    Element: Cart,
    role: ["USER", "PREMIUM", "ADMIN"],
  },
];

export default routes;
