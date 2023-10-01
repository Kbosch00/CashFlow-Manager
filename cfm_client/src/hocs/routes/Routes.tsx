import {
  Route,
  Routes
} from "react-router-dom";

import Home from "../../containers/pages/Home";
import Error404 from "../../containers/errors/Error404";
import Wallets from "../../containers/pages/Wallets";
import Statistics from "../../containers/pages/Statistics";
import Recordatorios from "../../containers/pages/Reminders";
import Login from "../../containers/pages/Login";
import WalletDetail from "../../components/wallets/WalletDetail";
import SavingList from "../../components/savings/SavingList";
import SpendingList from "../../components/spendings/SpendingList";
import NewSaving from "../../components/savings/NewSaving";
import NewSpending from "../../components/spendings/NewSpending";
import EditSaving from "../../components/savings/EditSaving";
import EditSpending from "../../components/spendings/EditSpending";

function AnimatedRoutes() {

  return (
    <Routes>
      <Route path="*" element={<Error404 />}></Route>
      <Route path="/" element={<Home />}></Route>
      <Route path="/bolsillos" element={<Wallets />}></Route>
      <Route path="/estadisticas" element={<Statistics />}></Route>
      <Route path="/recordatorios" element={<Recordatorios />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/bolsillo/:id/ahorros" element={<SavingList />}></Route>
      <Route path="/bolsillo/:id/ahorros/nuevo" element={<NewSaving />}></Route>
      <Route path="/bolsillo/:id/ahorros/:idSaving/editar" element={<EditSaving />}></Route>
      <Route path="/bolsillo/:id/gastos" element={<SpendingList />}></Route>
      <Route path="/bolsillo/:id/gastos/nuevo" element={<NewSpending />}></Route>
      <Route path="/bolsillo/:id/gastos/:idSpending/editar" element={<EditSpending />}></Route>
      <Route path="/bolsillo/detalles/:id" element={<WalletDetail />}></Route>
    </Routes>
  );
}

export default AnimatedRoutes;
