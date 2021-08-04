import db from "../db/database";
const HomePage = () => {
  let [totalClients, setTotalClients] = React.useState(0);
  let [totalProducts, setTotalProducts] = React.useState(0);
  let [totalBills, setTotalBills] = React.useState(0);

  function fetchClients() {
    let res = db.prepare("SELECT COUNT(*) as total FROM clients").get();
    console.log(res)
    setTotalClients(res.total);
  }

  function fetchProducts() {
    let res = db.prepare("SELECT COUNT(*) as total FROM products").get();

    setTotalProducts(res.total);
  }

  function fetchBills() {
    let res = db.prepare("SELECT COUNT(*) as total FROM bills").get();

    setTotalBills(res.total);
  }

  React.useEffect(() => {
    fetchClients();
    fetchProducts();
    fetchBills();
  }, []);

  return (
    <div className="p-3">
      <h1 className="display-5">الصفحة الرئيسية</h1>

      <div className="row mx-auto">
        <div className="col-lg-3 p-5">
          <p>العملاء</p>
          <p className=" text-info"><span className="display-6">{totalClients}</span> <span>عميل</span></p>

        </div>
        <div className="col-lg-3 p-5">
          <p>المنتجات</p>
          <p className=" text-info"><span className="display-6">{totalProducts}</span> <span>منتج</span></p>

        </div>
        <div className="col-lg-3 p-5">
          <p>عدد الفواتير</p>
          <p className=" text-info"><span className="display-6">{totalBills}</span> <span>فاتورة</span></p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
