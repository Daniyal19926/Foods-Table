import App from "@App";
import { ProtectedRoute, Logout } from "@components";
import { createBrowserRouter } from "react-router-dom";

import {
  CustomersPage,
  FoodFormPage,
  FoodsPage,
  LoginPage,
  NotFoundPage,
  OrdersPage,
  RegisterPage,
} from "@pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      { path: "", element: <FoodsPage /> },
      { path: "foods", element: <FoodsPage /> },
      {
        path: "foods/:id",
        element: <ProtectedRoute />,
        children: [{ index: true, element: <FoodFormPage /> }],
      },
      {
        path: "customers",
        element: <CustomersPage />,
      },
      {
        path: "orders",
        element: <OrdersPage />,
      },
    ],
  },
  { path: "logout", element: <Logout /> },

  { path: "login", element: <LoginPage /> },
  { path: "register", element: <RegisterPage /> },
]);
export default router;
