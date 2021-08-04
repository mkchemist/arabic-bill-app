import React from "react";
import Model from "../../models/model";
import { alertWithSuccess } from "../../utils/alerts";

function AddProduct() {
  let [name, setName] = React.useState(null);
  let nameRef = React.createRef();

  function saveProduct() {
    if(name !== "" && name !== null) {
      Model.create('products',{
        name
      })
      alertWithSuccess({
        title: 'تمت بنجاح',
        text: `تم اضافة المنتج ${name} بنجاح`
      })
      nameRef.current.value = "";
    }
  }

  const handleSubmitkey = (e) => {
    if(e.key === "Enter") {
      saveProduct()
    }
  }

  return (
    <div>
      <h1>منتج جديد</h1>
      <div>
        <div className="mb-3">
          <label htmlFor="product">اسم المنتج</label>
          <input
            type="text"
            placeholder="اكتب اسم المنتج"
            name="product"
            id="product"
            className="form-control form-control-sm"
            ref={nameRef}
            onChange={e => setName(e.target.value)}
            onKeyPress={handleSubmitkey}
          />
        </div>
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

export default AddProduct;
