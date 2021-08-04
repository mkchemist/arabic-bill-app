/* import XLSX from 'xlsx' */
import { Link } from "react-router-dom";
import TableComponent from "../../components/TableComponent";
import database from "../../db/database";
import Model from "../../models/model";
import {
  alertWithError,
  alertWithSuccess,
  alertWithWarning,
} from "../../utils/alerts";

function ClientList() {
  let [clients, setClients] = React.useState([]);
  let [rpp, setRpp] = React.useState(30);
  let [offset, setOffset] = React.useState(0);
  let [start, setStart] = React.useState(1);
  let [totalRows, setTotalRows] = React.useState(0);
  let [search, setSearch] = React.useState(null);
  let cols = [
    {
      title: "الرقم المسلسل",
      name: "id",
    },
    {
      title: "اسم العميل",
      name: "name",
    },
    {
      title: "رقم الهاتف",
      name: "phone",
      fallback: "لا يوجد",
    },
    {
      title: "العنوان",
      name: "address",
      fallback: "لا يوجد",
    },
  ];

  const fetchAllClients = () => {
 /*    let whereCondition = "";
    if(search && search !== "") {
      whereCondition = `WHERE name LIKE '%${search}%'`
    }
    let sql = `SELECT * FROM clients ${whereCondition} LIMIT ? OFFSET ?`
    let stmt = database.prepare(sql);
    let data = stmt.all(rpp, offset);
    setClients(data); */
    let $model = new Model("clients");
    if(search && search !== "" ) {
      $model = $model.whereLike('name', search)
    }

    let res = $model.get();

    res.then(data => setClients(data))


    /* Model.create('clients',{
      'name' : 'Ahmed',
      'phone': '01277800887'
    }); */

    
   /*  let res = Model.all('clients')
    res.then(data => {
      setClients(data)
    }); */
  };

  React.useEffect(() => {
    fetchAllClients();
  }, [rpp, offset, start, search]);

  React.useEffect(() => {
    let stmt = database.prepare("SELECT COUNT(*) as total FROM clients");
    let res = stmt.get();
    setTotalRows(res.total);
  }, [totalRows]);

  const deleteClient = (client) => {
    window.event.preventDefault();
    alertWithWarning({
      text: `هل تود حقا حذف العميل ${client.name}`,
      showCancelButton: true,
    }).then((res) => {
      if (res.isConfirmed) {
        try {
          let stmt = database.prepare(`DELETE FROM clients WHERE id = ?`);
          let res = stmt.run(client.id);
          console.log(res);
          alertWithSuccess({
            text: `تم حذف ${client.name}`,
            confirmButtonText: `موافق`,
          });
          fetchAllClients();
        } catch (e) {
          alertWithError({
            text: "خطأ",
            confirmButtonText: "موافق",
          });
        }
      }
    });
  };

  function changeResultPerPage(n) {
    setRpp(parseInt(n));
    setOffset(0);
  }

  function nextPage() {
    let $off = offset + rpp;
    if ($off < totalRows) {
      setOffset($off);
    }
  }

  function prevPage() {
    if (offset > 0) {
      let $off = offset - rpp;
      setOffset($off);
    }
  }
  
  function download() {
    let sheet = XLSX.utils.json_to_sheet(clients)
    let wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, sheet, "Export")
    XLSX.writeFile(wb,'download.xlsx')
  }

  return (
    <div className="p-3">
      <h3>قائمة العملاء</h3>
      <div>
        <div className="row mx-auto">
          <div className="col">
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="ابحث عن عميل"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="col">
            <button className="btn btn-sm btn-success" onClick={download}>
              <span className="fa fa-file-excel mx-1"></span>
              <span>تصدير</span>
            </button>
          </div>
        </div>
        {clients.length ? (
          <div>
           {/*  <TableComponent
              cols={cols}
              data={clients}
              onResultPerPageChange={changeResultPerPage}
              menuLength={[15, 30, 50, 100, 150, 200]}
            >
              <button className="btn btn-sm btn-success" onClick={download}>
                <span className="fa fa-file-excel mx-2"></span>
                <span>تحميل</span>
              </button>
            </TableComponent> */}
            <table className="table table-sm table-striped table-dark">
              <thead>
                <tr>
                  <th></th>
                  <th>الرقم المسلسل </th>
                  <th>اسم العميل</th>
                  <th>رقم الهاتف</th>
                  <th>العنوان</th>
                </tr>
              </thead>
              <tbody>
                {clients.map(client => 
                  <tr key={client.id}>
                    <td className="dropdown">
                      <a href="" className="dropdown-toggle text-light" data-bs-toggle="dropdown">الادوات</a>
                      <div className="dropdown-menu">
                        <Link to={`/clients/edit/${client.id}`} className="dropdown-item nav-link text-dark small">
                          <span className="fa fa-edit mx-1"></span>
                          <span>تعديل</span>
                        </Link>
                        <a href="" className="dropdown-item nav-link text-dark small" onClick={e => deleteClient(client)}>
                          <span className="fa fa-trash mx-1"></span>
                          <span>حذف</span>
                        </a>
                      </div>
                    </td>
                    <td>{client.id}</td>
                    <td>{client.name}</td>
                    <td>{client.phone}</td>
                    <td>{client.address || 'لا يوجد'}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="my-2">
            <p className="lead text-center">
              <span className="fa fa-check-circle text-success"></span>
              <span>لا يوجد عملاء مسجلين</span>
            </p>
          </div>
        )}
        <div className="my-2">
          <button
            className="btn btn-sm btn-light mx-1"
            onClick={prevPage}
            disabled={offset === 0}
          >
            <span className="fa fa-arrow-right mx-1"></span>
            <span>السابق</span>
          </button>
          <button
            className="btn btn-sm btn-light mx-1"
            onClick={nextPage}
            disabled={offset + rpp >= totalRows}
          >
            <span>التالي</span>
            <span className="fa fa-arrow-left mx-1"></span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ClientList;
