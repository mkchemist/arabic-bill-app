import React from "react";
import { useParams } from "react-router-dom";
import db from "../../db/database";
import Model from "../../models/model";
import { alertWithSuccess } from "../../utils/alerts";

function EditProduct() {
  let nameRef = React.createRef();
  let { id } = useParams()
  let [product, setProduct] = React.useState(null);


  function fetchProduct() {
    let stmt = db.prepare(`SELECT * FROM products WHERE id=${id}`)
    let product = stmt.get();
    setProduct(product);
  }

  function updateProduct(e) {
    let p = {
      ...product,
      name: e.target.value
    }

    setProduct(p);
  }

  function saveProduct() {
    let stmt = db.prepare(`UPDATE products SET name=? WHERE id=${id}`)
  stmt.run(product.name);
    alertWithSuccess({
      title: 'تمت بنجاح',
      text: `تم تعديل المنتج ${product.name} بنجاح`
    })
    

  }

  const handleSubmitkey = (e) => {
    if (e.key === "Enter") {
      saveProduct()
    }
  }

  React.useEffect(fetchProduct, []);

  return (
    <div>
      <h1>تعديل منتج {product ? product.name : ''}</h1>
      <div>
        {product ? (

          <div className="mb-3">
            <label htmlFor="product">اسم المنتج</label>
            <input
              type="text"
              placeholder="اكتب اسم المنتج"
              className="form-control form-control-sm"
              ref={nameRef}
              value={product.name || ""}
              onChange={updateProduct}
              onKeyPress={handleSubmitkey}
            />
          </div>
        ) : (
          <div className="p-5">
            <div className="spinner-border"></div>
          </div>
        )}
        <div className="mb-3">
          <button className="btn btn-sm btn-primary" onClick={saveProduct} onKeyPress={handleSubmitkey}>
            <span className="fa fa-save mx-1"></span>
            <span>حفظ</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditProduct;
