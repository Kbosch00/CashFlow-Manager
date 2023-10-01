import { connect, } from "react-redux"
import Layout from "../../hocs/layouts/Layout"
import { get_savings_list } from "../../redux/actions/saving/saving"
import { Link, useParams } from "react-router-dom"
import { useEffect } from "react"
import { MdOutlineAddCircleOutline } from "react-icons/md"

import toast, { Toaster } from "react-hot-toast"
import axios from "axios"
import { get_wallet_by_id } from "../../redux/actions/wallet/wallet"

function SavingList({
    get_savings_list, saving_list, walletDetail, get_wallet_by_id
}) {

    const params = useParams()
    const id = Number(params.id);
    const VOLVER = document.getElementById("btnVolver");

    useEffect(() => {
        get_savings_list(id)
        get_wallet_by_id(id)
    }, [id])

    function handleDelete(id_saving) {
        const config = {
            headers: {
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        }
        const fetchData = async () => {
            try {
                const res = await axios.delete(`http://127.0.0.1:8000/api/wallet/${id}/saving/${id_saving}/delete`, config)
                if (res.status === 204) {
                    toast.success('Ahorro eliminado!')
                    get_savings_list(id)
                    get_wallet_by_id(id)
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
            {saving_list && saving_list ?
                <>
                    <div className="xl:flex md:flex sm:flex sssm:justify-center   sssm:grid  sm:justify-between py-2 px-4 mx-20 sssm:mx-4 bg-violet-950 rounded-lg">
                        <span className="font-bold text-3xl text-zinc-50 sssm:text-center">{walletDetail ? walletDetail.name : ""}</span>
                        <span className="text-4xl font-semibold text-zinc-50"></span>
                        <span className="text-3xl font-bold text-zinc-50 sssm:-ml-3"><span>💲</span>{walletDetail ? Number(walletDetail.balance).toLocaleString() : "0"}</span>
                    </div>
                    <Link
                        className="flex ml-4 cursor-pointer mb-4 mt-2 w-min"
                        to={`/bolsillo/${id}/ahorros/nuevo`}
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
                                className=" text-zinc-400 transition: duration-300 ease-in-out"
                                size={30}
                            />
                        </span>
                        <span
                            id="addText"
                            className="pl-1 text-zinc-400 font-semibold text-lg whitespace-nowrap transition: duration-300 ease-in-out"

                        >
                            Nuevo ahorro
                        </span>
                    </Link>
                    <div className="relative overflow-x-auto max-h-[630px] overflow-y-auto shadow-md sssm:rounded-lg mx-4">
                        <table className="w-full text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-x uppercase text-base bg-violet-950 bg-opacity-60 text-zinc-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Descripción
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        <div className="flex items-center">
                                            Cantidad
                                            <a href="#"><svg className="w-3 h-3 ml-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                            </svg></a>
                                        </div>
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        <div className="flex items-center">
                                            Categoría
                                            <a href="#"><svg className="w-3 h-3 ml-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                            </svg></a>
                                        </div>
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        <div className="flex items-center">
                                            Fecha
                                            <a href="#"><svg className="w-3 h-3 ml-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                            </svg></a>
                                        </div>
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        <div className="flex items-center">
                                            Editar
                                        </div>
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        <div className="flex items-center">
                                            Eliminar
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="text-base">
                                {saving_list ? VOLVER?.classList.remove("hidden") : <></>}
                                {saving_list.map((saving, index) => (
                                    <tr key={index} className="cursor-default  bg-violet-950 bg-opacity-10 border-b border-white">
                                        <th scope="row" className="px-6 py-4 font-semibold text-gray-100 whitespace-nowrap ">
                                            {saving.description}
                                        </th>
                                        <td className="px-6 py-4 font-semibold text-gray-100">
                                            {Number(saving.amount).toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4 font-semibold text-gray-100">
                                            {saving.category.name}
                                        </td>
                                        <td className="px-6 py-4 font-semibold text-gray-100">
                                            {saving.date}
                                        </td>
                                        <td className="py-4 pl-5">
                                            <Link to={`/bolsillo/${id}/ahorros/${saving.id}/editar`} className="bg-indigo-700 hover:bg-indigo-500 transition duration-300 ease-in-out p-2 rounded-md font-medium text-zinc-50 uppercase">Editar</Link>
                                        </td>
                                        <td className="py-4 pl-5">
                                            <button onClick={() => handleDelete(saving.id)} className="bg-red-700 hover:bg-red-500 transition duration-300 ease-in-out p-2 rounded-md font-medium text-zinc-50 uppercase">Eliminar</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                    </div>
                    <div id="btnVolver" className="hidden gap-x-3 justify-center mt-10 text-center">
                        <Link className="whitespace-nowrap font-medium mt-6 p-3 px-6 rounded-lg hover:text-zinc-50 hover:hover:bg-violet-700 text-2xl text-zinc-400 bg-purple-menu w-min   transition duration-300 ease-in-out" to={`/bolsillo/detalles/${id}`}>Volver</Link></div>
                </>
                :
                <div>
                    <div className="h-96 w-96 mx-auto"><img
                        src="/src/assets/images/empty-saving.png"
                        className="mb-2 h-96 rounded-t-lg object-cover"
                    />
                    </div>
                    <div className="grid grid-cols-1 justify-center text-center">
                        <span className="whitespace-nowrap text-4xl text-zinc-200 font-semibold text-center">Aun no has registrado un ahorro</span>
                        <div className="flex gap-x-3 justify-center"><Link className="whitespace-nowrap font-medium mt-6 p-3 rounded-lg hover:text-zinc-50 hover:hover:bg-violet-700 text-2xl text-zinc-400 bg-purple-menu w-min  transition duration-300 ease-in-out" to={`/bolsillo/${id}/ahorros/nuevo`}>Nuevo ahorro</Link>
                            <Link className="whitespace-nowrap font-medium mt-6 p-3 rounded-lg hover:text-zinc-50 hover:hover:bg-violet-700 text-2xl text-zinc-400 bg-purple-menu w-min   transition duration-300 ease-in-out" to={`/bolsillo/detalles/${id}`}>Volver</Link></div>
                    </div>
                </div>
            }

        </Layout>
    )
}

const mapStateToProps = (state) => ({
    saving_list: state.saving.saving_list,
    walletDetail: state.wallet.walletDetail,

})

export default connect(mapStateToProps, {
    get_savings_list,
    get_wallet_by_id
})(SavingList)