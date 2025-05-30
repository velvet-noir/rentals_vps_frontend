import { Link, useLocation } from "react-router-dom";
import styles from "./Breadcrumbs.module.css";

function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter(Boolean);

  return (
    <nav className={styles.breadcrumbs}>
      <Link to="/">Главная</Link>
      {pathnames.map((value, index) => {
        const to = "/" + pathnames.slice(0, index + 1).join("/");
        const isLast = index === pathnames.length - 1;
        return (
          <span key={to}>
            {" / "}
            {isLast ? (
              <span>{decodeURIComponent(value)}</span>
            ) : (
              <Link to={to}>{decodeURIComponent(value)}</Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}

export default Breadcrumbs;
