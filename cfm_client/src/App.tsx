import { BrowserRouter as Router } from "react-router-dom";
import AnimatedRoutes from "./hocs/routes/Routes";
import { Provider } from 'react-redux';
import store from './redux/store';

function App() {
  return (
    <>
      <Provider store={store}>
        <Router>
          <AnimatedRoutes />
        </Router>
      </Provider>
    </>
  );
}

export default App;
