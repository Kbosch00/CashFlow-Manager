import Layout from "../../hocs/layouts/Layout";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { get_wallet_by_id } from "../../redux/actions/wallet/wallet";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineDeleteOutline } from "react-icons/md"
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";


function WalletDetail({ walletDetail, get_wallet_by_id }) {
  const params = useParams();
  const id = Number(params.id);
  const [formData, setFormData] = useState({
    name: '',
    balance: '0'
  })
  const [dataFetched, setDataFetched] = useState(false)
  useEffect(() => {
    if (!dataFetched) {
      get_wallet_by_id(id);
      setDataFetched(true)
    }
    walletDetail ? formData.name = walletDetail.name : <></>
    walletDetail ? formData.balance = walletDetail.balance : <></>
  }, [walletDetail]);

  const [isNewWalletFormOpen, setIsNewWalletFormOpen] = useState(false);

  const handleBalanceChange = (e) => {
    setFormData({
      ...formData,
      balance: e.target.value
    })
  }

  const handleNameChange = (e) => {
    setFormData({
      ...formData,
      name: e.target.value
    })
  }

  const toggleForm = () => {
    const DIV_FORM = document.getElementById("divForm");
    setIsNewWalletFormOpen(!isNewWalletFormOpen);
    isNewWalletFormOpen !== true ? DIV_FORM?.classList.remove("hidden") : DIV_FORM?.classList.add("hidden")
  };


  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => {
    const MODAL = document.getElementById("popup-modal");
    setIsModalOpen(!isModalOpen);
    isModalOpen !== true ? MODAL?.classList.remove("hidden") : MODAL?.classList.add("hidden")
  };
  const navigate = useNavigate();
  function handleDelete(id_wallet) {
    const config = {
      headers: {
        'Authorization': `JWT ${localStorage.getItem('access')}`
      }
    }
    const fetchData = async () => {
      try {
        const res = await axios.delete(`http://127.0.0.1:8000/api/wallet/${id_wallet}/delete`, config)
        if (res.status === 204) {
          navigate("/")
        } else { console.log('Solicitud fallida') }
      } catch (error) {
        console.error(`Error:${error}`)
      }
    }
    fetchData()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const FormDataToSend = {
      'name': formData.name,
      'balance': parseInt(formData.balance)
    }
    JSON.stringify(FormDataToSend)
    const config = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `JWT ${localStorage.getItem('access')}`
      }
    };
    const fetchData = async () => {
      try {
        const res = await axios.patch(`http://127.0.0.1:8000/api/wallet/${id}/update`, formData, config)
        if (res.status === 204) {
          toast.success('Bolsillo actualizado!')
          get_wallet_by_id(id);
          console.log('Solicitud exitosa');
        } else { console.log('Solicitud fallida') }
      } catch (error) {
        console.error(`Error:${error}`)
      }
    }
    fetchData()
  }

  return (
    <Layout>
      <Toaster />
      <div className="md:flex md:justify-between  sssm:grid sssm:justify-center py-2 px-4 mx-20 sssm:mx-4 bg-violet-950 rounded-lg">

        <div className="flex gap-1">

          <span className=" whitespace-nowrap font-bold text-3xl text-zinc-50">
            {walletDetail ? walletDetail.name : ""}
          </span>
          <button title="Editar nombre"
            onClick={toggleForm}
            className="mt-1 font-bold text-3xl text-zinc-50 hover:text-blue-500 transition duration-300 ease-in-out"><AiOutlineEdit /></button>
          <button title="Eliminar"
            className="mt-1 font-bold text-3xl text-red-50 hover:text-red-500 transition duration-300 ease-in-out"
            onClick={toggleModal}
          ><MdOutlineDeleteOutline /></button>

        </div>
        <span className="text-center text-3xl font-bold text-zinc-50 sssm:-ml-3">
          <span>💲</span>
          {walletDetail ? Number(walletDetail.balance).toLocaleString() : "0"}
        </span>
      </div>
      <div id="divForm" className="hidden bg-wallet-form bg-opacity-30 w-min mt-3 sm:ml-3 sssm:ml-8 rounded-lg p-4 ">
        <form onSubmit={handleSubmit} className="grid gap-2 justify-center">
          <span className="text-zinc-50 font-semibold text-xl whitespace-nowrap tracking-wide">Nombre de tu bolsillo</span>
          <input
            id="inputName"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleNameChange}
            className="rounded-md h-8 pl-3 pb-1"
            autoComplete="off"
            required
          />
          <span className="text-zinc-50 font-semibold text-xl whitespace-nowrap tracking-wide">Cantidad de dinero</span>
          <input
            id="inputBalance"
            type="number"
            min={0}
            value={Number(formData.balance)}
            onChange={handleBalanceChange}
            className="rounded-md h-8 pl-3 pb-1"
            autoComplete="off"
            required
          />
          <button
            type="submit"
            onClick={() => {
              toggleForm()
            }} className="bg-violet-800 hover:bg-violet-700 transition duration-300 ease-in-out p-2 rounded-lg mt-4 text-zinc-50 font-semibold">Actualizar Bolsillo</button>
        </form>
      </div>
      <div className="flex sm:flex-row ssm:flex-col mt-4 sssm:mx-4 sssm:gap-10">
        <Link
          id="cardSaving"
          onMouseEnter={() => {
            const SAVING = document.getElementById(`spanSaving`);
            const CARD = document.getElementById(`cardSaving`);
            CARD?.classList.add("scale-105");
            SAVING?.classList.remove("text-zinc-400");
            SAVING?.classList.add("text-zinc-50");
          }}
          onMouseLeave={() => {
            const SAVING = document.getElementById(`spanSaving`);
            const CARD = document.getElementById(`cardSaving`);
            CARD?.classList.remove("scale-105");
            SAVING?.classList.add("text-zinc-400");
            SAVING?.classList.remove("text-zinc-50");
          }}
          className="bg-violet-950 hover:bg-violet-800 trasition duration-300 ease-in-out rounded-lg py-2 px-2 mt-2 mx-20 ssm:mx-4 pb-2"
          to={`/bolsillo/${id}/ahorros`}
        >
          <div>
            <div className="grid">
              <span
                id="spanSaving"
                className="text-center text-3xl font-medium text-zinc-400"
              >
                Ver ahorros
              </span>
            </div>
            <div>
              <img
                src="/src/assets/images/savings-w.png"
                className="object-cover w-full"
              ></img>
            </div>
          </div>
        </Link>
        <Link
          id="cardSpending"
          onMouseEnter={() => {
            const SPENDING = document.getElementById(`spanSpending`);
            const CARD = document.getElementById(`cardSpending`);
            CARD?.classList.add("scale-105");
            SPENDING?.classList.remove("text-zinc-400");
            SPENDING?.classList.add("text-zinc-50");
          }}
          onMouseLeave={() => {
            const SPENDING = document.getElementById(`spanSpending`);
            const CARD = document.getElementById(`cardSpending`);
            CARD?.classList.remove("scale-105");
            SPENDING?.classList.add("text-zinc-400");
            SPENDING?.classList.remove("text-zinc-50");
          }}
          className=" bg-violet-950 hover:bg-violet-800 trasition duration-300 ease-in-out rounded-lg py-2 px-2 mt-2 mx-20 ssm:mx-4 pb-2"
          to={`/bolsillo/${id}/gastos`}
        >
          <div>
            <div className="grid">
              <span
                id="spanSpending"
                className="text-center  text-3xl font-medium text-zinc-400 pb-6 "
              >
                Ver gastos
              </span>
            </div>
            <div>
              <img
                src="/src/assets/images/spending-w.png"
                className=" object-cover w-full h-full py-4 "
              ></img>
            </div>
          </div>
        </Link>
      </div>
      <div className="mt-12 mb-10 text-center">
        <Link
          className="bg-purple-menu p-3 px-6 rounded-lg text-2xl text-zinc-400 hover:text-zinc-50  hover:bg-violet-700 transition duration-300 ease-in-out font-medium"
          to="/"
        >
          Mis bolsillos
        </Link>
      </div>
      <div id="popup-modal" tabIndex={-1} className="fixed hidden top-20 z-50 w-96 p-4 overflow-x-hidden overflow-y-auto max-h-full">
        <div className="relative w-full max-w-md max-h-full">
          <div className="relative rounded-lg shadow bg-purple-drop">
            <button type="button" onClick={toggleModal} className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-violet-700 dark:hover:text-white" data-modal-hide="popup-modal">
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
              </svg>
              <span className="sr-only">Cerrar modal</span>
            </button>
            <div className="p-6 text-center">
              <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              <h3 className="mb-5 text-lg font-normal text-gray-200">¿Quieres eliminar de forma definitiva el bolsillo?</h3>
              <button data-modal-hide="popup-modal" onClick={() => { handleDelete(id) }} type="button" className="text-white dark:bg-red-700 dark:hover:bg-red-600 focus:outline-none font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2 transition duration-300 ease-in-out">
                Si, quiero eliminarlo
              </button>
              <button data-modal-hide="popup-modal" onClick={toggleModal} type="button" className="  rounded-lg text-sm font-medium px-5 py-2.5 hover:bg-violet-600 focus:z-10 dark:bg-violet-700 dark:text-gray-300 dark:hover:text-white transition duration-300 ease-in-out">No, cancelar</button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

const mapStateToProps = (state) => ({
  walletDetail: state.wallet.walletDetail,
});

export default connect(mapStateToProps, {
  get_wallet_by_id,
})(WalletDetail);
