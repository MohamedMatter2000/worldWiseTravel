import { NavLink } from "react-router-dom";
import Logo from "./Logo";
import style from "./PageNav.module.css";
export default function PageNav() {
  return (
    <nav className={style.nav}>
      <Logo />
      <ul>
        <li>
          <NavLink to="/product">Product</NavLink>
        </li>
        <li>
          <NavLink to="/pricing">Pricing</NavLink>
        </li>
        <li>
          <NavLink to="/login" className={style.ctaLink}>
            LOG IN
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
