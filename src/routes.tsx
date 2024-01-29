import App from "@App";
import { CustomersPage, FoodsPage, OrdersPage } from "@pages";
import NotFoundPage from "@pages/NotfoundPage";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      { path: "/foods", element: <FoodsPage /> },
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
]);
export default router;
