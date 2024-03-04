import { auth } from "@services";

import { Outlet, Navigate, useLocation } from "react-router-dom";

function ProtectedRoute() {
  const user = auth.getCurrentUser();
  const location = useLocation();
  if (!user) return <Navigate to="/login" state={location.pathname} />;

  return <Outlet />;
}

export default ProtectedRoute;
