import Layout from "../../hocs/layouts/Layout";
import Start from "./Start";
import { connect } from "react-redux"
import {
  get_wallet_user_list
} from "../../redux/actions/wallet/wallet"
import { useEffect } from "react";
import { Navigate, } from "react-router-dom";


function Home({ get_wallet_user_list, wallet_list }) {
  useEffect(() => {
    wallet_list ? <></> : get_wallet_user_list()
  }, [])
  return (
    <Layout>
      {wallet_list === null ? <Start /> : <Navigate to="/bolsillos" />}
    </Layout>
  );
}

const mapStateToProps = state => ({
  wallet_list: state.wallet.wallet_list,
})

export default connect(mapStateToProps, {
  get_wallet_user_list
})(Home)
