import { getProducts } from "../services/ProductService";

export async function loader() {
  const products = await getProducts()
  return products
}