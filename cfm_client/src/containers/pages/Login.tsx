import { useEffect, useState } from "react";
import { connect } from "react-redux"
import { Navigate } from "react-router-dom";
import React from "react";
import { check_authenticated, load_user, login, refresh } from "../../redux/actions/auth/auth";

function Login({ login,
  isAuthenticated,
  user,
  refresh,
  check_authenticated,
  load_user }) {
  useEffect(() => {
    isAuthenticated ? <></> :
      <>
        {refresh()}
        {check_authenticated()}
        {load_user()}
      </>
  }, []);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const {
    email,
    password
  } = formData;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await login(email, password)
    if (user === null) {
      handleDataIncorrect()
    }
  }

  if (isAuthenticated) {
    return <Navigate to='/' />
  }

  const handleEmailFocus = () => {
    setIsEmailFocused(true);
    const EMAIL = document.getElementById("lbEmail");
    EMAIL?.classList.remove("hidden");
  };

  const handleEmailBlur = () => {
    setIsEmailFocused(false);
    const EMAIL = document.getElementById("lbEmail");
    EMAIL?.classList.add("hidden");
  };
  const handlePasswordFocus = () => {
    setIsPasswordFocused(true);
    const PASSWORD = document.getElementById("lbPassword");
    PASSWORD?.classList.remove("hidden");
  };

  const handlePasswordBlur = () => {
    setIsPasswordFocused(false);
    const PASSWORD = document.getElementById("lbPassword");
    PASSWORD?.classList.add("hidden");
  };

  const handleDataIncorrect = () => {
    const ERROR = document.getElementById("spanError");
    ERROR?.classList.remove("hidden");
    ERROR?.classList.add("flex");

  }

  return (
    <>
      <div id="LoginContainer" className="flex min-h-full max-w-full flex-col justify-center px-6 lg:px-8">
        <div className=" mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="text-center">
            <img
              src="\src\assets\images\p1.png"
              alt=""
              className=" mx-auto h-48"
            />

            <span className="block whitespace-nowrap  -mt-16 font-mono text-2xl rounded-lg text-zinc-50 hover:tracking-widest transition: duration-300 ease-in-out">
              CashFlow Manager
            </span>

            <img
              src="\src\assets\images\p2.png"
              alt=""
              className="mx-auto  h-48"
            />
          </div>
          <h1 className="text-center text-2xl font-bold leading-9 tracking-tight text-zinc-50">
            Inicia sesión en tu cuenta
          </h1>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-6"
            action="#"
            method="POST"
            onSubmit={e => {
              onSubmit(e);
            }}
          >
            <div>
              <label
                id="lbEmail"
                htmlFor="email"
                className="hidden transition: duration-300 ease-in-out text-sm font-medium leading-6 text-zinc-50 "
              >
                Correo
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder={
                    !isEmailFocused ? "Introduce tu correo electrónico" : ""
                  }
                  onFocus={handleEmailFocus}
                  onBlur={handleEmailBlur}
                  onChange={e => onChange(e)}
                  required
                  className="block w-full px-1 rounded-md border-0 py-1.5 text-neutral-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  id="lbPassword"
                  htmlFor="password"
                  className="hidden text-sm font-medium leading-6 text-zinc-50"
                >
                  Contraseña
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-700 hover:text-indigo-500"
                  >
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder={
                    !isPasswordFocused ? "Introduce tu contraseña" : ""
                  }
                  required
                  className="block w-full px-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-500 sm:text-sm sm:leading-6"
                  onFocus={handlePasswordFocus}
                  onBlur={handlePasswordBlur}
                  onChange={e => onChange(e)}
                />
                <span id="spanError" className="hidden mt-1 text-red-700 font-medium">Usuario o contraseña incorrectos</span>
              </div>

            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-purple-menu px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-violet-800  transition duration-300 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Iniciar sesión
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-300">
            ¿No tienes una cuenta?
            <a
              href="#"
              className="font-semibold leading-6 text-indigo-700 hover:text-indigo-500 ml-1"
            >
              Crea una aquí
            </a>
          </p>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
  user: state.auth.user
})

export default connect(mapStateToProps, {
  login,
  refresh,
  check_authenticated,
  load_user,
})(Login)
