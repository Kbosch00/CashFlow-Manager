import { useEffect } from "react";
import Layout from "../../hocs/layouts/Layout";
import { connect } from "react-redux"


function Statistics() {
  useEffect(() => {
  }, [])

  return (
    <Layout>
      <div>
        <span className="text-zinc-50 text-4xl font-semibold">
          Aquí irán las Estadisticas:
        </span>
      </div>
    </Layout>
  );
}

const mapStateToProps = state => ({
})

export default connect(mapStateToProps, {

})(Statistics)
