import { connect } from "react-redux";
import { Link } from "react-router-dom";

function Start() {
  return (
    <>
      <section className="">
        <div className="container flex flex-col justify-center p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-between">
          <div className="flex items-center justify-center p-6 mt-8 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
            <img
              src="src/assets/images/cartera-w.png"
              alt=""
              className="object-contain h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128"
            />
          </div>
          <div className="flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
            <h1 className="text-zinc-50 text-5xl font-bold sm:text-6xl">
              Aún no has creado un bolsillo
            </h1>
            <p className="text-zinc-50 mt-6 mb-8 text-xl sm:mb-12">
              Crea uno para empezar a llevar un registro de tus gastos y
              ahorros.
            </p>
            <div className="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
              <Link
                to="/bolsillos"
                className="px-8 py-3 text-lg font-semibold rounded-md bg-purple-menu hover:bg-violet-700 transition: duration-300 ease-in-out dark:text-zinc-50"
              >
                Empezar
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

const mapStateToProps = state => ({

})

export default connect(mapStateToProps, {

})(Start)
