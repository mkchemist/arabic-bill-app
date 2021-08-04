import database from "../../db/database";
import { alertWithInfo, alertWithSuccess } from "../../utils/alerts";
import { useParams } from "react-router-dom";

function EditClient(props) {
  let params = useParams();
  let [id] = React.useState(params.id)
  let [name, setName] = React.useState(null);
  let [address, setAddress] = React.useState(null);
  let [phone, setPhone] = React.useState(null);
  let [isFetched, setIsFetched] = React.useState(false)

  React.useEffect(() => {
    if(id) {
      let stmt = database.prepare("SELECT * FROM clients WHERE id = ?")
      let res = stmt.get(params.id)
      setName(res.name);
      setAddress(res.address)
      setPhone(res.phone)
      setIsFetched(true)
    }
  }, [id]);

  const updateClient = () => {
    let client = {
      name,
      address,
      phone,
    };
    if (!name) {
      alertWithInfo({
        text: "يجب ادخال اسم العميل",
        confirmButtonText: "موافق",
      });
      return;
    }

    let stmt = database.prepare(
      "UPDATE clients SET name=?,phone=?,address=? WHERE id=?"
    );
    let info = stmt.run(name, phone, address, id);
    alertWithSuccess({
      text: "تم تعديل العميل",
      confirmButtonText: "تم",
    });
  };

  return (
    <div>
      <h1>تعديل {name}</h1>
      {isFetched ? (

        <div className="my-2">
          <div className="row mx-auto">
            <div className="col px-0">
              <label htmlFor="">اسم العميل</label>
              <input
                type="text"
                placeholder="اكتب اسم العميل"
                className="form-control form-control-sm"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>
            <div className="col px-0 ms-1">
              <label htmlFor=""> رقم الهاتف</label>
              <input
                type="text"
                placeholder="اكتب رقم الهاتف"
                className="form-control form-control-sm"
                onChange={(e) => setPhone(e.target.value)}
                value={phone !== null ? phone : ''}
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
              value={address !== null ? address: ''}
            ></textarea>
          </div>
          <hr />
          <div className="">
            <button className="btn btn-sm btn-success" onClick={updateClient}>
              <span>تعديل</span>
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="spinner-border"></div>
        </div>
      )}
    </div>
  );
}

export default EditClient;
