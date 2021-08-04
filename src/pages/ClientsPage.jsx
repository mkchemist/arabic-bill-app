import { Link, Route, Switch, useRouteMatch } from "react-router-dom";
import AddClient from "./clients/AddClient";
import ClientList from "./clients/ClientList";
import EditClient from "./clients/EditClient";

function ClientsPage(props) {
    let {path,url} = useRouteMatch()

    
    return (
        <div className="p-3 border border-light rounded">
            <h1>صفحة العملاء</h1>   
            <hr />         
            <div className="">
                <ul className="nav nav-tabs">
                   {/*  <li className="nav-item bg-light">
                        <Link to={`${url}`} className="nav-link">
                            <span>قائمة العملاء</span>
                        </Link>
                    </li> */}
                    <li className="nav-item bg-light">
                        <Link to={`${url}/add`} className="nav-link">
                            <span> إضافة عميل</span>
                        </Link>
                    </li>
                </ul>
            </div>
            <Switch>
                <Route exact path={path}>
                    <ClientList />
                </Route>
                <Route path={`${path}/add`}>
                    <AddClient />
                </Route>
                <Route path={`${path}/edit/:id`}>
                    <EditClient />
                </Route>
            </Switch>
        </div>
    )
}

export default ClientsPage
