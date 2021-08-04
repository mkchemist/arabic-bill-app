import React from "react";
import Swal from "sweetalert2";
import db from "../../db/database";
import Model from "../../models/model";

const billProductTemplate = {
  product: null,
  quantity: null,
  comment: null,
  patch_no: null,
  bounce: null
};

const billProductInitialState = [billProductTemplate];

function AddBill() {
  let [products, loadProducts] = React.useState([]);
  let [clients, loadClients] = React.useState([]);
  let [billProducts, setBillProducts] = React.useState(billProductInitialState);
  let [clientId, setClientId] = React.useState(null);
  let [billDate, setBillDate] = React.useState(null);
  let [billSerial, setBillSerial] = React.useState(null);

  /**
   * fetch all products from database
   */
  const fetchProductsFromDatabase = async () => {
    let rows = await Model.all("products");
    loadProducts(rows);
  };
  /**
   * fetch all clients from database
   */
  const fetchClientsFromDatabase = async () => {
    let rows = await Model.all("clients");
    loadClients(rows);
  };

  /**
   * add new product to bill
   */
  const addNewProductTobill = () => {
    setBillProducts((state) => [...state, billProductTemplate]);
  };

  /**
   * remove product from bill
   *
   * @param {Number} i
   */
  const removeProductFromBill = (i) => {
    let $p = billProducts;
    $p = $p.filter((item, index) => index !== i);
    console.log($p, i);

    setBillProducts($p);
  };

  const updateBillProduct = (index, prop, value) => {
    let product = billProducts[index];
    product[prop] = value;
    billProducts[index] = {
      ...billProducts[index],
      ...product,
    };

    setBillProducts(billProducts);
  };

  /**
   * save bill
   *
   * @param {Object} e
   */
  const addNewBill = (e) => {
    e.preventDefault(); 


    let sql = `INSERT INTO bills (product_id, client_id,serial,patch_no,bill_date,quantity,bounce,comment) VALUES `;

    let parts = [];
    billProducts.map((item) => {
      parts.push(`(
        '${item.product}',
        '${clientId}',
        '${billSerial}',
        '${item.patch_no}',
        '${billDate}',
        '${item.quantity}',
        '${item.bounce}',
        '${item.comment}'
        )`);
    });

    parts = parts.join(",");

    sql += parts;
    console.log(sql);
    let stmt = db.prepare(sql);
    let info = stmt.run();

    Swal.fire({
      title: `تم بنجاح`,
      text: `تم اضافة الفاتورة`,
      icon: "success",
    });
  };

  React.useEffect(fetchProductsFromDatabase, []);
  React.useEffect(fetchClientsFromDatabase, []);

  return (
    <div>
      {/* title */}
      <h1>إنشاء فاتورة جديد</h1>
      {/* Form container */}
      <div className="container">
        {/* bill create form */}
        <form onSubmit={addNewBill}>
          {/* client and date and bill number */}
          <div className="row mx-auto px-0 mb-3">
            {/* client */}
            <div className="col px-0">
              <label htmlFor="">العميل</label>
              <select
                className="form-control form-control-sm"
                onChange={(e) => setClientId(e.target.value)}
                required
              >
                <option value="">إختر العميل</option>
                {clients.map((client) => (
                  <option value={client.id} key={client.id}>
                    {client.name}
                  </option>
                ))}
              </select>
            </div>
            {/* end of client */}
            {/* date */}
            <div className="col ">
              <label htmlFor="">تاريخ الفاتورة</label>
              <input
                type="date"
                className="form-control form-control-sm"
                onChange={(e) => setBillDate(e.target.value)}
                required
              />
            </div>
            {/* end of date */}
            {/* serial */}
            <div className="col ">
              <label htmlFor="">رقم الفاتورة</label>
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="اكتب رقم الفاتورة"
                onChange={(e) => setBillSerial(e.target.value)}
                required
              />
            </div>
            {/* end of serial */}
          </div>
          {/* end of client and date and bill number */}
          {/* product controller */}
          <div className="mb-3">
            <div>
              <button
                className="btn btn-sm btn-primary"
                onClick={addNewProductTobill}
                type="button"
              >
                <span className="fa fa-plus-circle mx-1"></span>
                <span>إضافة منتج اخر</span>
              </button>
            </div>
            {billProducts.map((item, i) => (
              <div
                key={`product_row_${i}`}
                className="row mx-auto align-items-center"
              >
                <div className="col-lg-11">
                  <div className="row mx-auto my-2 align-items-center">
                    <div className="col px-0">
                      <label htmlFor="">المنتج</label>
                      <select
                        className="form-control form-control-sm"
                        required
                        onChange={(e) =>
                          updateBillProduct(
                            i,
                            "product",
                            parseInt(e.target.value)
                          )
                        }
                      >
                        <option value="">اختر المنتج</option>
                        {products.map((product) => (
                          <option key={product.id} value={product.id}>
                            {product.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col">
                      <label htmlFor="">الكمية</label>
                      <input
                        type="number"
                        className="form-control form-control-sm"
                        min="0"
                        placeholder="اكتب الكمية"
                        required
                        onChange={(e) =>
                          updateBillProduct(
                            i,
                            "quantity",
                            parseInt(e.target.value)
                          )
                        }
                      />
                    </div>
                    <div className="col">
                      <label htmlFor="">البونص</label>
                      <input
                        type="number"
                        className="form-control form-control-sm"
                        min="0"
                        placeholder="كمية البونص "
                        required
                        onChange={(e) =>
                          updateBillProduct(
                            i,
                            "bounce",
                            parseInt(e.target.value)
                          )
                        }
                      />
                    </div>
                  </div>
                  <div className="row mx-auto my-2 align-items-center">
                    <div className="col px-0">
                      <label htmlFor="">رقم التشغيلة</label>
                      <input
                        type="number"
                        className="form-control form-control-sm"
                        placeholder="اكتب رقم التشغيلة"
                        required
                        onChange={(e) =>
                          updateBillProduct(i, "patch_no", e.target.value)
                        }
                      />
                    </div>
                    <div className="col">
                      <label htmlFor="">ملاحظات</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        placeholder="اكتب ملاحظاتك"
                        onChange={(e) =>
                          updateBillProduct(i, "comment", e.target.value)
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="col-lg-1">
                  <div className="col-auto">
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={(e) => removeProductFromBill(i)}
                      type="button"
                    >
                      <span className="fa fa-times"></span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/*  end of product controller*/}
          {/* form controller */}
          <div className="mb-3">
            <button className="btn btn-sm btn-primary">
              <span className="fa fa-save mx-1"></span>
              <span>حفظ الفاتورة</span>
            </button>
          </div>
          {/* end of form controller */}
        </form>
        {/* end of bill create form */}
      </div>
      {/* end of formcontrianer */}
    </div>
  );
}

export default AddBill;
