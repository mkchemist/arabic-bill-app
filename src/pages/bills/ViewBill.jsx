import jsPDF from "jspdf";
import React from "react";
import { Link, useParams } from "react-router-dom";
import db from "../../db/database";

function ViewBill() {
  let [bill, setBill] = React.useState([]);

  let { serial } = useParams();
  console.log(serial);
  const fetchBill = () => {
    let stmt = db.prepare(`
    SELECT 
    bill.*,
    product.name as product_name,
    client.name as client_name
    FROM bills  as bill
    JOIN clients as client ON client.id = bill.client_id
    JOIN products as product ON product.id = bill.product_id
    WHERE serial=${serial}`);

    let res = stmt.all();
    setBill(res);
  };


  const printBill = (e) => {
    e.preventDefault();
    window.print()
  }

  React.useEffect(fetchBill, []);

  return (
    <div>
      <div>
        <h1>عرض فاتورة {bill.length ? bill[0].serial : ""}</h1>
        {bill.length ? (
          <div id="bill_content">
            <div className="row mx-auto mb-3">
              <div className="px-0 col">
                <label htmlFor="">العميل</label>
                <input
                  type="text"
                  disabled
                  value={bill[0].client_name}
                  className="form-control form-control-sm"
                />
              </div>
              <div className="col">
                <label htmlFor="">تاريخ الفاتورة</label>
                <input
                  type="date"
                  disabled
                  value={bill[0].bill_date}
                  className="form-control form-control-sm"
                />
              </div>
              <div className="col">
                <label htmlFor="">رقم الفاتورة</label>
                <input
                  type="text"
                  disabled
                  value={bill[0].serial}
                  className="form-control form-control-sm"
                />
              </div>
            </div>
            <div>
              {bill.map((product) => (
                <div key={product.id} className="border rounded mb-3">
                  <div className="row mx-auto mb-3">
                    <div className="col">
                      <label htmlFor=""> المنتج</label>
                      <input
                        type="text"
                        disabled
                        value={product.product_name}
                        className="form-control form-control-sm"
                      />
                    </div>
                    <div className="col">
                      <label htmlFor=""> رقم التشغيلة</label>
                      <input
                        type="text"
                        disabled
                        value={product.patch_no}
                        className="form-control form-control-sm"
                      />
                    </div>
                  </div>
                  <div className="row mx-auto mb-3">
                    <div className="col">
                      <label htmlFor=""> الكمية</label>
                      <input
                        type="text"
                        disabled
                        value={product.quantity}
                        className="form-control form-control-sm"
                      />
                    </div>
                    <div className="col">
                      <label htmlFor=""> ملاحظات</label>
                      <input
                        type="text"
                        disabled
                        value={product.comment !== 'null' ? product.comment: 'لا يوجد'}
                        className="form-control form-control-sm"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <hr />
            <div>
              <Link to="/bills" className="btn btn-sm btn-light">الرجوع للفواتير</Link>
              <a href="" className="btn btn-sm btn-primary mx-1" onClick={printBill}>طباعة</a>
            </div>
          </div>
        ) : (
          <div className="p-5">
            <div className="spinner-border"></div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ViewBill;
