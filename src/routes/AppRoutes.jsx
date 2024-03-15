import { Route, Routes } from "react-router-dom";

import publicRoutes from "./publicRoutes";
import protectedRoutes from "./protectedRoutes";
import PublicRoutes from "./Public";
import Protected from "./Protected";

const AppRouter = () => {
  return (
    <Routes>
      {/* Rutas publicas */}
      <Route element={<PublicRoutes />}>
        {publicRoutes.map(({ id, path, Element }) => (
          <Route key={id} path={path} element={<Element />} />
        ))}
      </Route>

      {/* Rutas privadas para users */}
      <Route element={<Protected />}>
        {protectedRoutes.map(({ id, path, Element }) => (
          <Route key={id} path={path} element={<Element />} />
        ))}
      </Route>

      <Route path="*" element={<h1>404 not found</h1>} />
    </Routes>
  );
};

export default AppRouter;
