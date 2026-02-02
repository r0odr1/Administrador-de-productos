import type { LoaderFunctionArgs } from "react-router-dom";

export async function loader ({params} : LoaderFunctionArgs) {
  console.log('desde edit loader', params.id);

  return {}

}