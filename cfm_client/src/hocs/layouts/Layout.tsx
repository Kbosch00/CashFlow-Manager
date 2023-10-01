import { Link, useNavigate, Navigate } from 'react-router-dom'
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MdAccountCircle } from "react-icons/md";
import { AiOutlineMenu } from "react-icons/ai";
import { connect } from "react-redux"
import { check_authenticated, load_user, logout, refresh } from '../../redux/actions/auth/auth'

function Layout({ children, refresh,
  check_authenticated,
  isAuthenticated,
  load_user,
  user,
  logout }) {

  useEffect(() => {
    refresh()
    check_authenticated()
    load_user()
  }, [])

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navigate = useNavigate()

  if (!isAuthenticated) {
    return <Navigate to='/login' />
  }


  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <>
      <div className="lg:h-screen h-full">
        <nav className="bg-violet-950 shadow-xl">
          <div className="mx-auto max-w-7xl  px-8">
            <div className="flex h-16 items-center justify-between flex-row">
              <div className="md:flex items-center w-full">
                <div className="flex items-center mb-1 ">
                  <Link to="/" className="flex items-center whitespace-nowrap">
                    <img
                      className="h-12 w-12 flex-none"
                      src="\src\assets\logo-es-wbg.png"
                      alt="CashFlow Manager"
                    />
                    <span className="px-2 text-xl text-gray-100 font-semibold">
                      CashFlow Manager
                    </span>
                  </Link>
                  <button
                    type="button"
                    className="md:hidden ml-auto"
                    aria-expanded="false"
                    id="mobileMenu"
                    aria-haspopup="true"
                    onClick={toggleMenu}
                  >
                    <AiOutlineMenu
                      className="text-white rounded-lg pt-1 hover:scale-110 transition: duration-100 ease-in-out"
                      size={40}
                    />
                  </button>
                </div>

                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    {/* <Link
                      to="/bolsillos"
                      className="hover:bg-violet-900 transition duration-300 ease-in-out text-white rounded-md px-3 py-2 text-md font-medium"
                    >
                      Bolsillos
                    </Link> */}
                    {/* <Link
                      to="/estadisticas"
                      className="text-gray-100 hover:bg-violet-900 transition duration-300 ease-in-out hover:text-white rounded-md px-3 py-2 text-md  font-medium"
                    >
                      Estadisticas
                    </Link>
                    <Link
                      to="/recordatorios"
                      className="text-gray-100 hover:bg-violet-900 transition duration-300 ease-in-out hover:text-white rounded-md px-3 py-2 text-md  font-medium"
                    >
                      Recordatorios
                    </Link> */}
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6">
                  <span className='text-lg text-zinc-200 font-medium'>{user && user.first_name}</span>
                  <div className="relative ml-3">
                    <div>
                      <button
                        type="button"
                        className="relative flex max-w-xs items-center rounded-full  text-sm focus:outline-none "
                        id="user-menu-button"
                        aria-expanded={isDropdownOpen}
                        aria-haspopup="true"
                        onClick={toggleDropdown}
                      >
                        <MdAccountCircle
                          className="text-white rounded-lg pt-1 hover:scale-110 transition: duration-100 ease-in-out"
                          size={40}
                        />
                      </button>
                    </div>
                    {isDropdownOpen && (
                      <motion.div
                        onMouseLeave={closeDropdown}
                        className="z-50 origin-top-right absolute right-0 mt-1 mr-1 w-48 rounded-md shadow-lg bg-purple-drop ring-1 ring-black ring-opacity-5"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, transition: { duration: 1 } }}
                      >
                        <div className="py-1">
                          <button
                            className="block text-left px-4 py-2 text-md min-w-full hover:bg-violet-800 transition duration-300 ease-in-out text-zinc-300 hover:text-zinc-50"
                            onClick={handleLogout}
                          >
                            Cerrar sesión
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {isMenuOpen && (
            <motion.div
              className="md:hidden"
              id="mobile-menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 1 } }}
            >
              {/* <div className="space-y-1 px-2 pb-3 pt-2  bg-purple-menu">
                <Link
                  to="/bolsillos"
                  className="text-gray-300 hover:bg-violet-900 transition: duration-300 ease-in-out hover:text-white block rounded-md px-3 py-2 text-base font-medium"
                  aria-current="page"
                >
                  Bolsillos
                </Link>
                <Link
                  to="/estadisticas"
                  className="text-gray-300 hover:bg-violet-900 transition: duration-300 ease-in-out hover:text-white block rounded-md px-3 py-2 text-base font-medium"
                >
                  Estadisticas
                </Link>
                <Link
                  to="/recordatorios"
                  className="text-gray-300 hover:bg-violet-900 transition: duration-300 ease-in-out hover:text-white block rounded-md px-3 py-2 text-base font-medium"
                >
                  Recordatorios
                </Link>
              </div>
              <hr /> */}
              <div className="flex border-gray-300 pb-3 pt-3 bg-wallet-form bg-opacity-80">
                <button
                  type="button"
                  className="relative flex max-w-xs items-center rounded-full  text-sm focus:outline-none "
                  id="user-menu-button"
                  aria-expanded={isDropdownOpen}
                  aria-haspopup="true"
                >
                  <MdAccountCircle
                    className="text-white rounded-lg pt-1 ml-4 hover:scale-110 transition: duration-100 ease-in-out"
                    size={40}
                  />
                </button>
                <span className="pt-2 ml-2 text-gray-300 font-medium">{user && user.first_name}</span>
                <span className="pt-2 ml-2 text-gray-300">|</span>
                <button
                  className="ml-2 text-gray-300 font-medium transition: duration-300 ease-in-out hover:text-white"
                  onClick={handleLogout}
                >
                  Cerrar sesión
                </button>
              </div>
            </motion.div>
          )}
        </nav>
        <main className="">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1 } }}
          >
            <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
              {children}
            </div>
          </motion.div>
        </main>
      </div>
    </>
  );
}

const mapStateToProps = (state: any) => ({
  user_loading: state.auth.user_loading,
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
})

export default connect(mapStateToProps, {
  refresh,
  check_authenticated,
  load_user,
  logout
})(Layout)
