import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import db from "../../db/database";
import Model from "../../models/model";
import { exportFileToExcel, formatBills, groupBy } from "../../utils/helpers";

function BillsHome() {
  let [bills, loadBills] = React.useState([]);
  let [RPP, setRPP] = React.useState(50);
  let [offset, setOffset] = React.useState(0);
  let [totalRowsCount, setTotalRowsCount] = React.useState(0);
  let [clients, setClients] = React.useState([]);
  let [products, setProducts] = React.useState([]);
  let [clientId, setClientId] = React.useState(null);
  let [productId, setProductId] = React.useState(null);
  let menuLength = [20,50, 100, 150, 200];
  function fetchBills() {
    let sql = `
    SELECT 
    bill.id,
    bill.bill_date as date,
    client.name as client_name, 
    product.name as product_name,
    bill.quantity, 
    bill.comment,
    bill.serial,
    bill.patch_no,
    bill.bounce
    FROM bills as bill 
    JOIN clients as client ON client.id = bill.client_id
    JOIN products as product ON product.id = bill.product_id LIMIT ${RPP} offset ${offset}`;

    let totalSql = "SELECT COUNT(*) as total FROM bills";

    let stmt = db.prepare(totalSql).get();

    setTotalRowsCount(stmt.total);

    let where = [];
    if (clientId) {
      where.push(`client.id = ${clientId}`);
    }
    if (productId) {
      where.push(`product.id = '${productId}'`);
    }

    if (where.length) {
      sql += ` WHERE ${where.join(" AND ")}`;
    }

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

  const nextPage = () => {
    let $offset = offset + RPP;

    setOffset($offset);
  };

  const prevPage = () => {
    if (offset <= RPP) {
      setOffset(0);
    } else {
      let $offset = offset - RPP;
      setOffset($offset);
    }
  };


  const deleteBill = (bill) => {
    window.event.preventDefault();
    Swal.fire({
      title: "??????????",
      text: `???? ???????? ?????? ?????? ?????? ????????????????`,
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: '??????????',
      confirmButtonText: `??????`
    }).then(res => {
      if(res.isConfirmed) {
        db.prepare(`DELETE FROM bills WHERE serial='${bill.serial}'`).run()

        Swal.fire({
          title: "????",
          text: "???? ?????? ???????????????? ??????????",
          icon: "success"
        })

        fetchBills()
      }
    })
  }

  React.useEffect(fetchBills, [RPP, offset]);

  React.useEffect(() => {
    fetchClients();
    fetchProducts();
  }, [clientId, productId]);

  return (
    <div>
      <h2>?????? ???????? ????????????????</h2>
      <div className="my-2 p-2">
        <div className="my-2">
          <div className="row mx-auto">
            <div className="col">
              <label htmlFor="">?????? ??????????????</label>
              <select
                name="client_id"
                id="client_id"
                className="form-control form-control-sm"
                onChange={(e) => setRPP(parseInt(e.target.value))}
                defaultValue={RPP}
              >
                {menuLength.map((m, i) => (
                  <option key={`m_${i}`} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>
            <div className="col">
              <label htmlFor="">????????????</label>
              <select
                name="client_id"
                id="client_id"
                className="form-control form-control-sm"
                onChange={(e) => setClientId(parseInt(e.target.value))}
              >
                <option value="">????????????</option>
                {clients.map((client) => (
                  <option key={client.id} value={client.id}>
                    {client.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="col">
              <label htmlFor="">????????????</label>
              <select
                name="client_id"
                id="client_id"
                className="form-control form-control-sm"
                onChange={(e) => setProductId(parseInt(e.target.value))}
              >
                <option value="">????????????</option>
                {products.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <table className="table table-sm table-striped table-dark small">
          <thead>
            <tr>
              <th></th>
              <th>?????????? ??????????????</th>
              <th>?????? ????????????????</th>
              <th>??????????????</th>
              <th>????????????</th>
              <th>????????????</th>
              <th>?????? ????????????????</th>
              <th>????????????</th>
              <th>????????????</th>
              <th>??????????????</th>
            </tr>
          </thead>
          <tbody>
            {bills.map((bill) => (
              <tr key={bill.id}>
                <td className="dropdown">
                  <a
                    href=""
                    className="dropdown-toggle text-light"
                    data-bs-toggle="dropdown"
                  >
                    ??????????????
                  </a>
                  <div className="dropdown-menu">
                    <Link
                      to={`/bills/view/${bill.serial}`}
                      className="dropdown-item"
                    >
                      <span className="fa fa-book-reader mx-1"></span>
                      <span className="">??????</span>
                    </Link>

                    <a href="" className="dropdown-item" onClick={e => deleteBill(bill)}>
                      <span className="fa fa-trash mx-1"></span>
                      <span>??????</span>
                    </a>
                  </div>
                </td>
                <td>{bill.id}</td>
                <td>{bill.serial}</td>
                <td>{bill.date}</td>
                <td>{bill.client_name}</td>
                <td>{bill.product_name}</td>
                <td>{bill.patch_no}</td>
                <td>{bill.quantity}</td>
                <td>{bill.bounce}</td>
                <td>{bill.comment !== "null" ? bill.comment : "???? ????????"}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="my-2">
          <button
            className="btn btn-sm btn-light mx-1"
            type="button"
            onClick={prevPage}
            disabled={offset === 0}
          >
            ????????????
          </button>
          <button
            className="btn btn-sm btn-light mx-1"
            type="button"
            onClick={nextPage}
            disabled={offset + RPP >= totalRowsCount}
          >
            ????????????
          </button>
        </div>
      </div>
    </div>
  );
}

export default BillsHome;
