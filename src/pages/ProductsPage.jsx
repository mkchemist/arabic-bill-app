import React from 'react'
import { Link, Switch, useRouteMatch, Route } from 'react-router-dom';
import Model from '../models/model';
import AddProduct from './products/AddProduct';
import EditProduct from './products/EditProduct';
import ProductList from './products/ProductList';

function ProductsPage() {
  
  let {path, url} = useRouteMatch();

  return (
    <div>
      <h1>صفحة المنتجات</h1>
      <div className="my-2">
        <ul className="nav"> 
          <li className="nav-item mx-1">
            <Link to={`${url}/add`} className="nav-link btn btn-sm btn-light" >
              <span className="fa fa-plus mx-1"></span>
              <span>منتج جديد</span>
            </Link>
          </li>
        </ul>
      </div>
      <div className="my-2">
        <Switch>
          <Route  path={`${path}`} exact>
            <ProductList />
          </Route>
          <Route  path={`${path}/add`} exact>
            <AddProduct />
          </Route>
          <Route path={`${path}/edit/:id`}  exact>
            <EditProduct />
          </Route>
        </Switch>
      </div>
    </div>
  )
}

export default ProductsPage
