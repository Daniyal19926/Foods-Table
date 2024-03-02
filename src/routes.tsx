import App from "@App";
import Logout from "@components/common/Logout";

import {
  CustomersPage,
  FoodFormPage,
  FoodsPage,
  LoginPage,
  OrdersPage,
  RegisterPage,
} from "@pages";

import NotFoundPage from "@pages/NotfoundPage";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      { path: "/", element: <FoodsPage /> },
      { path: "/foods", element: <FoodsPage /> },
      {
        path: "/foods/:id",
        element: <FoodFormPage />,
      },
      {
        path: "/customers",
        element: <CustomersPage />,
      },
      {
        path: "/orders",
        element: <OrdersPage />,
      },
    ],
  },
  { path: "/logout", element: <Logout /> },

  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
]);
export default router;
