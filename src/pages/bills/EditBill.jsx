import React from 'react'
import { useParams } from 'react-router-dom'
import db from '../../db/database'

function EditBill() {
  let {serial} = useParams()
  let [bill, setBill] = React.useState([])
  
  const fetchBill = () => {
    let stmt = db.prepare(
        `
        SELECT
        bill.*,
        product.name as product_name,
        client.name as client_name
        FROM bills as bill 
        JOIN products as product ON product.id = bill.product_id
        JOIN clients as client ON client.id = bill.client_id
        WHERE bill.serial = ${serial}
      `
    );

    let res = stmt.all()
    console.log(res)
    setBill(res)
  }

  React.useEffect(fetchBill, []);

  return (
    <div>
        <h1>تعديل فاتورة { serial }</h1>
        <div>
          {bill.length ? (
            <div>
              <div className="row mx-auto mb-3">
                <div className="col px-0">
                  <label htmlFor=""></label>
                  <input type="text" />
                </div>
              </div>
            </div>
          ) : (
            <div className="p-5">
              <div className="spinner-border"></div>
            </div>
          )}
        </div>
    </div>
  )
}

export default EditBill
