import { createBrowserRouter } from "react-router-dom";
import Layout from "./layout/Layout";
import Products from "./views/Products";
import { loader as productsLoader } from "./views/ProductsLoader";
import NewProduct from "./views/NewProduct";
import { action as newProductAction } from "./views/NewProductAction";
import EditProduct from "./views/EditProduct";

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
      },
      {
        path: 'productos/:id/editar', //ROA Patter - Resource-oriented design
        element: <EditProduct />
      }
    ]
  },
])