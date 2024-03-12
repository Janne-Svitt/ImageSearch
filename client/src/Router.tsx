import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../pages/Layout";
import NotFound from "../pages/NotFound";
import Home from "../pages/Home";
import FavImg from "../pages/FavImg";

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
    ],
  },
]);
