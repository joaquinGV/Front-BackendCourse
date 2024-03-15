import { Navigate } from "react-router";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";

const Protected = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user) {
    return (
      <>
        <div>Rutas privadas</div>
        <Link to={"/Ecommerce/home"}>Home</Link>
        <br />
        <Link to={"/Ecommerce/update-users"}>Update Users</Link>
        <br />
        <Link to={"/Ecommerce/products"}>Products</Link>
        <br />
        <Link to={"/Ecommerce/cart"}>Cart</Link>
        <Outlet />
      </>
    );
  }

  // Redirigir al usuario a la página principal si ya está autenticado
  return <Navigate to={"/Ecommerce/login"} />;
};

export default Protected;
