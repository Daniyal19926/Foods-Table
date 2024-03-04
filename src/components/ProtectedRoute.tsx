import { auth } from "@services";

import { Outlet, Navigate } from "react-router-dom";

function ProtectedRoute() {
  const user = auth.getCurrentUser();
  if (!user) return <Navigate to="/login" />;

  return <Outlet />;
}

export default ProtectedRoute;
