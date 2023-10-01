import WalletCardList from "../../components/wallets/WalletCardList";
import Layout from "../../hocs/layouts/Layout";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import {
  get_wallet_user_list
} from "../../redux/actions/wallet/wallet"
import { connect } from "react-redux"
import { useEffect, useState } from "react"
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

function Wallets({
  get_wallet_user_list,
  wallet_list, isLoading }

) {
  useEffect(() => {
    get_wallet_user_list()
  }, [])

  const [isNewWalletFormOpen, setIsNewWalletFormOpen] = useState(false);

  const toggleForm = () => {
    const DIV_FORM = document.getElementById("divForm");
    setIsNewWalletFormOpen(!isNewWalletFormOpen);
    isNewWalletFormOpen !== true ? DIV_FORM?.classList.remove("hidden") : DIV_FORM?.classList.add("hidden")
  };
  const [formData, setFormData] = useState({
    name: '',
    balance: 0
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const config = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
        'Authorization': `JWT ${localStorage.getItem('access')}`
      }
    };
    const fetchData = async () => {
      try {
        const res = await axios.post('http://127.0.0.1:8000/api/wallet/create', formData, config)
        if (res.status === 201) {
          setFormData({
            name: '',
            balance: 0,
          });
          toast.success('Bolsillo creado!')
          get_wallet_user_list()
          console.log('Solicitud exitosa');
        } else { console.log('Solicitud fallida') }
      } catch (error) {
        console.error(`Error:${error}`)
      }
    }
    fetchData()
  }
  var totalBalance = 0
  wallet_list ? wallet_list.map((wallet) => (
    totalBalance += Number(wallet.balance)
  )) : <></>


  return (
    <Layout>
      <Toaster />
      <div className="flex mr-2 sssm:mr-8 sm:mr-2 mb-2 -mt-2 justify-end">
        <span className="text-3xl font-bold text-zinc-50 sssm:-ml-3">Total: 💲<span className="sssm:-ml-2"></span>{wallet_list ? totalBalance.toLocaleString() : "0"}</span>
      </div>
      <div className="flex ml-2 sssm:ml-8 sm:ml-3 cursor-pointer w-min"
        onClick={toggleForm}
        onMouseEnter={() => {
          const ICON = document.getElementById("addIcon");
          const TEXT = document.getElementById("addText");
          TEXT?.classList.remove("text-zinc-400");
          TEXT?.classList.add("text-zinc-50");
          ICON?.classList.remove("text-zinc-400");
          ICON?.classList.add("text-zinc-50");
        }}
        onMouseLeave={() => {
          const ICON = document.getElementById("addIcon");
          const TEXT = document.getElementById("addText");
          TEXT?.classList.remove("text-zinc-50");
          TEXT?.classList.add("text-zinc-400");
          ICON?.classList.remove("text-zinc-50");
          ICON?.classList.add("text-zinc-400");
        }}
      >
        <span>
          <MdOutlineAddCircleOutline
            id="addIcon"
            className="absolute text-zinc-400 transition: duration-300 ease-in-out"
            size={30}
          />
        </span>
        <span
          id="addText"
          className="ml-8 text-zinc-400 font-semibold text-lg whitespace-nowrap transition: duration-300 ease-in-out"
        >
          Nuevo bolsillo
        </span>
      </div>



      <div id="divForm" className="hidden bg-wallet-form shadow-xl w-min mt-3 sm:ml-3 sssm:ml-8 rounded-lg p-4 ">
        <form onSubmit={handleSubmit} className="grid gap-2 justify-center">
          <span className="text-zinc-50 font-semibold text-xl whitespace-nowrap tracking-wide">Nombre de tu bolsillo</span>
          <input
            id="inputName"
            type="text"
            name="name"
            onChange={handleChange}
            className="rounded-md h-8 pl-3 pb-1"
            autoComplete="off"
            required
          />
          <span className="text-zinc-50 font-semibold text-xl whitespace-nowrap tracking-wide">Cantidad de dinero</span>
          <input
            id="inputBalance"
            type="number"
            name="balance"
            onChange={handleChange}
            className="rounded-md h-8 pl-3 pb-1"
            autoComplete="off"
            required
          />
          <button
            type="submit"
            onClick={() => {
              toggleForm()
            }} className="bg-violet-800 hover:bg-violet-700 transition duration-300 ease-in-out p-2 rounded-lg mt-4 text-zinc-50 font-semibold">Crear Bolsillo</button>
        </form>
      </div>

      {isLoading === true ? <div>Cargando...</div> : ""}
      {wallet_list && wallet_list ?
        <div className="px-6 sssm:mt-4 max-h-[680px] overflow-y-auto">
          <WalletCardList wallet_list={wallet_list} />
        </div>
        : <></>}
    </Layout>
  );
}

const mapStateToProps = state => ({
  wallet_list: state.wallet.wallet_list,
  isLoading: state.wallet.isLoading
})

export default connect(mapStateToProps, {
  get_wallet_user_list
})(Wallets)
