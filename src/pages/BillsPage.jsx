import { Route, Switch, useRouteMatch } from "react-router-dom"
import BillsNavbar from "../components/BillsNavbar"
import AddBill from "./bills/AddBill"
import DayBill from "./bills/BillDay"
import BillsHome from "./bills/BillsHome"
import EditBill from "./bills/EditBill"
import ViewBill from "./bills/ViewBill"

function BillsPage() {
  let {path, url} = useRouteMatch()
  return (
    <div>
      <h1>الفواتير</h1>     
     <BillsNavbar />
      <div>
        <Switch >
          <Route path={`${path}`} exact>
            <BillsHome />
          </Route>
          <Route path={`${path}/add`} >
            <AddBill />
          </Route>
          <Route path={`${path}/view/:serial`} >
            <ViewBill />
          </Route>
          <Route path={`${path}/day`} >
            <DayBill />
          </Route>
        </Switch>
      </div>
    </div>
  )
}

export default BillsPage
