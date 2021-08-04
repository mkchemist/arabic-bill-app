import { HashRouter, Switch, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import ClientPage from "./pages/ClientsPage"
import Navbar from "./components/Navbar"
import BillsPage from "./pages/BillsPage"
import ProductsPage from "./pages/ProductsPage"
const App = () => {
  return (
    <div className="container">
      <HashRouter>
        <div className="row mx-auto" style={{ minHeight:620 }}>
          <div className="col-md-3">
            <Navbar />
          </div>
          <div className="col-md-9 p-2">
            <Switch>
              <Route path="/" component={HomePage} exact />
              <Route path="/clients" component={ClientPage} />
              <Route path="/products" component={ProductsPage} />
              <Route path="/bills" component={BillsPage} />
            </Switch>
          </div>
        </div>
      </HashRouter>
    </div>
  )
}



export default App;