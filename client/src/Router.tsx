import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../pages/Layout";
import NotFound from "../pages/NotFound";
import Home from "../pages/Home";
import FavImg from "../pages/FavImg";
import AccountSettings from "../pages/AccountSettings";
import LoginPage from "../pages/LoginPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,

    children: [
      {
        path: "/",
        element: <Home />,
        index: true,
      },
      {
        path: "/fav",
        element: <FavImg />,
      },
      {
        path: "/settings",
        element: <AccountSettings />,
      },

      {
        path: "/Login",
        element: <LoginPage />,
      },
    ],
  },
]);
