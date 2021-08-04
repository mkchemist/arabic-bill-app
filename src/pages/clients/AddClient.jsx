import database from "../../db/database";
import { alertWithInfo, alertWithSuccess } from "../../utils/alerts";

function AddClient() {
  let [name, setName] = React.useState(null);
  let [address, setAddress] = React.useState(null);
  let [phone, setPhone] = React.useState(null);

 

  const addClient = () => {
    let client = {
      name,
      address,
      phone
    }
    if(!name) {
      alertWithInfo({
        text: 'يجب ادخال اسم العميل',
        confirmButtonText: 'موافق'
      })
      return;
    }

    let stmt = database.prepare("INSERT INTO clients (name,phone,address) VALUES(?,?,?)")
    let info = stmt.run(name, phone, address);
    alertWithSuccess({
      text: 'تمت إضافة العميل',
      confirmButtonText: 'تم'
    })
  }

  return (
    <div>
      <h1>إضافة عميل</h1>
      <div className="my-2">
        <div className="row mx-auto">
          <div className="col px-0">
            <label htmlFor="">اسم العميل</label>
            <input
              type="text"
              placeholder="اكتب اسم العميل"
              className="form-control form-control-sm"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="col px-0 ms-1">
            <label htmlFor=""> رقم الهاتف</label>
            <input
              type="text"
              placeholder="اكتب رقم الهاتف"
              className="form-control form-control-sm"
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>
        <div className="my-2">
          <label htmlFor="">عنوان العميل</label>
          <textarea
            placeholder="اكتب عنوان العميل"
            cols="30"
            rows="5"
            className="form-control-sm form-control"
            onChange={(e) => setAddress(e.target.value)}
          ></textarea>
        </div>
        <hr />
        <div className="">
            <button className="btn btn-sm btn-primary" onClick={addClient}>
                <span>إضافة</span>
            </button>
        </div>
      </div>
    </div>
  );
}

export default AddClient;
