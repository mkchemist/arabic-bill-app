import propTypes from "prop-types";

function TableComponent(props) {
  let menu_length = props.menuLength ||  [1, 2, 3];
  
  function changeResultPerPage(e) {
    props.onResultPerPageChange(e.target.value)
  }

  function nextPage() {
    setCurrentPage(currentPage + 1);
  }

  function prevPage() {
    setCurrentPage(currentPage - 1);
  }



  return (
    <div>
      <div className="p-2 my-2">
        <div className="row mx-auto">
          <div className="col">
            <label htmlFor="" className="col-2">عدد النتائج</label>
            <select className="col-10" onChange={changeResultPerPage}>
              {menu_length.map((item,i) => (
                <option value={item} key={`item_length_${i}`}>{item}</option>
              ))}
            </select>
          </div>
          <div className="col">
            { props.children }
          </div>
        </div>
      </div>
      <table
        className={
          props.tableClass || "table table-striped table-sm small table-light"
        }
      >
        <thead>
          <tr>
            {props.cols.map((col, colIndex) => {
              return <th key={`col_index_${colIndex}`}>{col.title}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {props.data.map((item, itemIndex) => (
            <tr key={`item_index_${itemIndex}`}>
              {props.cols.map((col, colIndex) => (
                <td key={`item_index_col_${colIndex}`}>
                  {item[col.name] || col.fallback}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
     
    </div>
  );
}

TableComponent.propTypes = {
  cols: propTypes.array.isRequired,
  data: propTypes.array.isRequired,
  tableClass: propTypes.string,
  tableHeadClass: propTypes.string,
  onResultPerPageChange: propTypes.func,
  menuLength: propTypes.array
};

export default TableComponent;
