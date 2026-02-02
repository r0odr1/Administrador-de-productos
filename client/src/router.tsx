import { createBrowserRouter } from "react-router-dom";
import Layout from "./layout/Layout";
import Products, { loader as productsLoader } from "./views/Products";
import NewProduct from "./views/NewProduct";
import { action as newProductAction } from "./views/NewProductAction";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Products />,
        loader: productsLoader
      },
      {
        path: 'productos/nuevo',
        element: <NewProduct />,
        action: newProductAction
      }
    ]
  },
])