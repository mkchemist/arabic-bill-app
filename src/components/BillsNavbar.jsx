import React from 'react'
import { Link } from 'react-router-dom'

function BillsNavbar() {
  return (
    <div>
      <ul className="nav">  
        <li className="nav-item mx-1">
          <Link  to="/bills/add" className="nav-link btn btn-sm btn-light">
            <span className="fa fa-plus mx-1"></span>
            <span>إنشاء فاتورة</span>
          </Link>
        </li>
        <li className="nav-item mx-1">
          <Link  to="/bills/day" className="nav-link btn btn-sm btn-light">
            <span className="fa fa-print mx-1"></span>
            <span> طباعة فاتورة مجمعة</span>
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default BillsNavbar
