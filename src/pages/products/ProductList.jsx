import React from 'react'
import Model from '../../models/model';
import Swal from "sweetalert2"
import db from '../../db/database';
import { Link } from 'react-router-dom';

function ProductList() {
  let [products, setProducts] = React.useState([]);

  function fetchProducts() {
    let $model = new Model('products');

    let res = $model.get();

    res.then((data) => {
      setProducts(data)
    })
  }


  React.useState(() => {
    fetchProducts();
  }, []);


  const deleteProduct = (product) => {
    window.event.preventDefault();
    Swal.fire({
      title: "تحذير",
      text: `هل تود حقاو حذف المنتج ${product.name}`,
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: `إلغاء`,
      confirmButtonText: `احذف`
    }).then(res => {
      if(res.isConfirmed) {
        let stmt = db.prepare(`DELETE FROM  products where id = ${product.id}`)
        stmt.run();

        Swal.fire({
          title: 'نجاح',
          text: `تم حذف منتج ${product.name} بنجاح`,
          icon: 'success'
        })

        fetchProducts();
      }
    })
  }

  return (
    <div>
      <h1>قائمة المنتجات</h1>
      <div className="p-2">
        {products.length ? (
          <div>
            <table className="table table-striped table-dark small table-sm">
              <thead>
                <tr>
                  <th></th>
                  <th>الرقم المسلسل</th>
                  <th>اسم المنتج</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product.id}>
                    <td className="dropdown">
                      <a href="" className="dropdown-toggle text-light" data-bs-toggle="dropdown">الادوات</a>
                      <div className="dropdown-menu">
                        <Link to={`products/edit/${product.id}`} className="dropdown-item">
                          <span className="fa fa-edit mx-1"></span>
                          <span>تعديل</span>
                        </Link>
                        <a href="" className="dropdown-item" onClick={ e => deleteProduct(product)}>
                          <span className="fa fa-trash mx-1"></span>
                          <span>حذف</span>
                        </a>
                      </div>
                    </td>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center my-3">
            <p className="lead text-light">
              <span className="fa fa-check-circle text-success mx-1"></span>
              <span>لا يوجد منتجات محفوظة</span>
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductList
