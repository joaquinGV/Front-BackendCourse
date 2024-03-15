import { Navigate } from "react-router";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";

const PublicRoutes = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return (
      <>
        <div>Rutas públicas visibles</div>
        <Link to={"/Ecommerce/login"}>Login</Link>
        <br />
        <Link to={"/Ecommerce/register"}>Register</Link>
        <Outlet />
      </>
    );
  }

  // Redirigir al usuario a la página principal si ya está autenticado
  return <Navigate to={"/Ecommerce/home"} />;
};

export default PublicRoutes;
