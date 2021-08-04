import XLSX, { read } from "xlsx";




export function exportFileToExcel(data, name) {

  let sheet = XLSX.utils.json_to_sheet(data);
  let wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, sheet, "Export");
  let dateStamp = new Date().toLocaleDateString('en-gb').split("/").reverse().join("_")
  let timeStamp = new Date().toLocaleTimeString().split(":").join("_")
  let filename = timeStamp+"_"+dateStamp+"_"+name+'.xlsx'
  let file = XLSX.write(wb, { bookType:'xlsx', bookSST:false, type:'array' });
  console.log(file)

  let blob = new Blob([file], {}, "export.xlsx")
  let reader = new FileReader;

  reader.onload = (e) => {
    let a = document.createElement('a')
    a.href=e.target.result;
    a.download = filename
    a.click()
  }

  reader.readAsDataURL(blob);

}

export function groupBy(data, item) {
  let res = {};

  data.map((row) => {
    let key = row[item];
    if (!res[key]) {
      res[key] = [];
    }
    res[key].push(row);
  });

  return res;
}

export function formatBills(data) {
  let products = new Set();
  data.map((item) => {
    products.add(item.product_name);
  });
  let groupedData = groupBy(data, "serial");
  let result = [];
  for (let client in groupedData) {
    let clientRows = groupedData[client];
    let row = {
      التاريخ: clientRows[0].date,
      "رقم الفاتورة": clientRows[0].serial,
      العميل: clientRows[0].client_name,
    };
    products.forEach((i) => (row[i] = 0));

    clientRows.map(($row) => {
      let product = $row.product_name;
      row[product] = $row.quantity;
    });

    result.push(row);
  }

  return result;
}
