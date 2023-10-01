import { Link, useParams } from "react-router-dom";
import Layout from "../../hocs/layouts/Layout";
import { useEffect, useState } from "react";
import { get_categories } from "../../redux/actions/category/category"
import { get_spending_by_id } from "../../redux/actions/spending/spending"
import { connect } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { get_wallet_by_id } from "../../redux/actions/wallet/wallet";

function EditSpending({ get_categories, categories, spending, walletDetail, get_spending_by_id,
}) {
    const params = useParams();
    const wallet_id = Number(params.id);
    const spending_id = Number(params.idSpending)
    const navigate = useNavigate();
    type Category = {
        id: number;
        name: string;
    };
    var curr = new Date();
    curr.setDate(curr.getDate());
    var category_: Category[] = []
    var defaultAmount = '0'
    var defaultDescription = ""
    const [categorySelected, setCategorySelected] = useState("")
    categories ? category_ = categories : <></>
    const [dataFetched, setDataFetched] = useState(false)
    const [formData, setFormData] = useState({
        amount: defaultAmount,
        date: '',
        description: defaultDescription
    })
    var MAX = 0
    useEffect(() => {
        if (!dataFetched) {
            get_categories()
            get_spending_by_id(spending_id)
            get_wallet_by_id(wallet_id)
            setDataFetched(true)
        }
        spending ? formData.amount = String(spending.amount) : <></>
        spending ? formData.date = spending.date : <></>
        spending ? formData.description = spending.description : <></>
        spending ? setCategorySelected(spending.category) : <></>

    }, [spending, walletDetail])

    walletDetail && spending ? MAX = Number(walletDetail.balance) + Number(spending.amount) : <></>
    const categoryNumber = parseInt(categorySelected);
    const handleAmountChange = (e) => {
        setFormData({
            ...formData,
            amount: e.target.value
        })

    }
    const handleCategoryChange = (e) => {
        setCategorySelected(e.target.value)
    }

    const handleDateChange = (e) => {
        setFormData({
            ...formData,
            date: e.target.value,
        });
    };

    const handleDescriptionChange = (e) => {
        setFormData({
            ...formData,
            description: e.target.value,
        });
    };



    const handleSubmit = (e) => {
        e.preventDefault()
        const FormDataToSend = {
            'amount': parseInt(formData.amount),
            'date': formData.date,
            'description': formData.description
        }
        if (FormDataToSend.amount > MAX || walletDetail.balance < 0) {
            toast.error('Fondos insuficientes!')
            console.log("MAX es: ", MAX)
        }
        else {
            JSON.stringify(FormDataToSend)
            const categoryId = categoryNumber
            const config = {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${localStorage.getItem('access')}`
                }
            }
            const fetchData = async () => {
                console.log(FormDataToSend)
                try {
                    const res = await axios.put(`http://127.0.0.1:8000/api/wallet/${wallet_id}/spending/${spending_id}/${categoryId}/update`, FormDataToSend, config)
                    if (res.status === 204) {
                        toast.success('Gasto modificado!')
                        setTimeout(() => {
                            navigate(`/bolsillo/${wallet_id}/gastos`)
                        }, 1500);

                        console.log('Solicitud exitosa');
                    } else { console.log('Solicitud fallida') }
                } catch (error) {
                    console.error(`Error:${error}`)
                }
            }
            fetchData()
        }
    }
    return (
        <Layout>
            <Toaster />
            <form onSubmit={handleSubmit}>
                <div className="mx-4 bg-purple-menu bg-opacity-30 px-4 pt-1 rounded-lg">
                    <div className="border-b border-gray-900/10 pb-4">
                        <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-4">

                                <div className="mt-2">

                                    <div className="grid mt-1 rounded-md sm:max-w-md">
                                        <label htmlFor="amount" className="block text-xl font-medium leading-6 text-zinc-50">
                                            Valor
                                        </label>
                                        <p className="mt-3 text-md leading-6 text-zinc-300">
                                            Establece la cantidad del gasto.
                                        </p>
                                        <input
                                            type="number"
                                            id="amount"
                                            min={0}
                                            required
                                            onChange={handleAmountChange}
                                            value={formData.amount}
                                            className="block flex-1 border-0 bg-zinc-50 rounded-md py-1.5 px-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                                <div className="w-72 mt-8">
                                    <label htmlFor="category"
                                        className="block text-xl font-medium leading-6 text-zinc-50"

                                    >
                                        Categoría
                                    </label>
                                    <select id="category" onChange={handleCategoryChange}
                                        required
                                        value={categorySelected} className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-zinc-50 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-700 dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <option value="" className="">Selecciona una opción</option>
                                        {category_.map((category) => (
                                            <option key={category.id} value={category.id}>
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                            </div>

                            <div className="col-span-full">
                                <label htmlFor="date"
                                    className="block text-xl  font-medium leading-6 text-zinc-50"
                                >
                                    Fecha
                                </label>
                                <p className="mt-3 text-md leading-6 text-zinc-300">
                                    Selecciona el dia en que registrarás tu gasto.
                                </p>
                                <input
                                    id="date"
                                    type="date"
                                    onChange={handleDateChange}
                                    required
                                    defaultValue={formData.date}
                                    className="appearance-none cursor-text py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                                />
                            </div>

                            <div className="col-span-full">
                                <label
                                    htmlFor="description"
                                    className="block text-xl  font-medium leading-6 text-zinc-50"
                                >
                                    Descripción
                                </label>
                                <p className="mt-3 text-md leading-6 text-zinc-300">
                                    Escribe una breve descripción sobre tu gasto.
                                </p>
                                <textarea
                                    id="description"
                                    name="description"
                                    onChange={handleDescriptionChange}
                                    required
                                    value={formData.description}
                                    className="block max-h-32 min-h-[4rem] w-full rounded-md border-0 py-1.5 px-2  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                ></textarea>
                            </div>


                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-end gap-x-6 sssm:mr-4">
                    <Link
                        to={`/bolsillo/${wallet_id}/gastos`}
                        type="button"
                        className="text-lg font-medium mt-6 p-2 px-4 text-zinc-400 hover:text-zinc-50 transition duration-300 ease-in-out"
                    >
                        Cancelar
                    </Link>
                    <button
                        type="submit"
                        className="rounded-md font-medium mt-6 p-2 px-4 hover:text-zinc-50 hover:hover:bg-violet-700 text-lg text-zinc-400 bg-purple-menu w-min   transition duration-300 ease-in-out"
                    >
                        Guardar
                    </button>
                </div>
            </form>
        </Layout>
    );
}


const mapStateToProps = (state) => ({
    categories: state.categories.categories,
    spending: state.spending.spending,
    walletDetail: state.wallet.walletDetail,
})

export default connect(mapStateToProps, {
    get_categories,
    get_spending_by_id,
    get_wallet_by_id
})(EditSpending)
