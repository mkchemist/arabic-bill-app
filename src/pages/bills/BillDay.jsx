import { Link } from "react-router-dom";
import Model from "../../models/model";
import { exportFileToExcel, formatBills, groupBy } from "../../utils/helpers";

function DayBill() {
  let [bills, loadBills] = React.useState([]);
  let [start, setStart] = React.useState(null);
  let [end, setEnd] = React.useState(null);
  let [clients, setClients] = React.useState([]);
  let [products, setProducts] = React.useState([]);
  let [clientId, setClientId] = React.useState(null);
  let [productId, setProductId] = React.useState(null);

  function fetchBills() {
    if(!start || !end) {
      return; 
    }
    let sql = `
    SELECT 
    bill.id,
    bill.bill_date as date,
    client.name as client_name, 
    product.name as product_name,
    bill.quantity, 
    bill.comment,
    bill.serial,
    bill.patch_no
    FROM bills as bill 
    JOIN clients as client ON client.id = bill.client_id
    JOIN products as product ON product.id = bill.product_id
    WHERE bill.bill_date BETWEEN '${start}' AND '${end}'
    `;

    let $model = Model.raw(sql);

    let res = $model.all();
    loadBills(res);
  }

  function fetchProducts() {
    Model.all("products").then((data) => setProducts(data));
  }

  function fetchClients() {
    Model.all("clients").then((data) => setClients(data));
  }

  const exportToExcel = () => {
    let data = formatBills(bills);
    exportFileToExcel(data, "bills");
  };

  React.useEffect(() => {
    fetchBills();
    fetchClients();
    fetchProducts();
  }, [clientId, productId, start, end]);

  return (
    <div>
      <h2>عرض جميع الفواتير</h2>
      <div className="my-2 p-2">
        <div className="my-2">
          <div className="row mx-auto align-items-center">
            <div className="col">
              <label htmlFor="">من</label>
              <input
                type="date"
                className="form-control from-control-sm"
                onChange={(e) => setStart(e.target.value)}
              />
            </div>
            <div className="col">
              <label htmlFor="">الي</label>
              <input
                type="date"
                className="form-control from-control-sm"
                onChange={(e) => setEnd(e.target.value)}
              />
            </div>
            <div className="col">
              <button
                type="button"
                className="btn btn-sm btn-success"
                onClick={exportToExcel}
                disabled={!bills.length}
              >
                <span className="fa fa-file-export mx-1"></span>
                <span>تصدير</span>
              </button>
            </div>
          </div>
        </div>
        <table className="table table-sm table-striped table-dark small">
          <thead>
            <tr>
              <th>الرقم المسلسل</th>
              <th>رقم الفاتورة</th>
              <th>التاريخ</th>
              <th>العميل</th>
              <th>المنتج</th>
              <th>رقم التشغيلة</th>
              <th>الكمية</th>
              <th>ملاحظات</th>
            </tr>
          </thead>
          <tbody>
            {bills.map((bill) => (
              <tr key={bill.id}>
               
                <td>{bill.id}</td>
                <td>{bill.serial}</td>
                <td>{bill.date}</td>
                <td>{bill.client_name}</td>
                <td>{bill.product_name}</td>
                <td>{bill.patch_no}</td>
                <td>{bill.quantity}</td>
                <td>{bill.comment !== "null" ? bill.comment : "لا يوجد"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DayBill;
