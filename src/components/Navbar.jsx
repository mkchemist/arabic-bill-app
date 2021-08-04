import { Link, NavLink } from "react-router-dom";
import { AppSideMenu } from "../constant/app";
import NavbarLogo from "../assets/images/report.png"
function Navbar() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
        <div>
            <div className="p-3">
                <img src={NavbarLogo} alt="Navbar logo" className="img-fluid" />
            </div>
            <hr />
            <nav className="nav text-center">
                {AppSideMenu.map((item, itemIndex) => (
                <li key={`nav_item_${itemIndex}`} className="nav-item col-12">
                    <NavLink
                    to={item.link}
                    title={item.label}
                    activeClassName="active"
                    className="nav-link  text-light"
                    exact={true}
                    >
                    {item.icon && <span className={`${item.icon} mx-1`}></span>}
                    <span>{item.title}</span>
                    </NavLink>
                </li>
                ))}
            </nav>
        </div>
    </div>
  );
}

export default Navbar;
