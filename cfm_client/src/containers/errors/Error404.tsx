import { Link } from "react-router-dom";
import Layout from "../../hocs/layouts/Layout";

function Error404() {
  return (
    <Layout>
      <div className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-8xl font-semibold text-violet-700 ">404</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-200 sm:text-5xl">
            Página no encontrada
          </h1>
          <p className="mt-6 font-medium leading-7 text-lg text-gray-300">
            Lo sentimos, no pudimos encontrar la página que estabas buscando.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to="/"
              className="rounded-md bg-purple-menu px-3.5 py-2.5 text-xl font-medium text-white shadow-sm hover:bg-violet-700 transition: duration-300 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Error404;
