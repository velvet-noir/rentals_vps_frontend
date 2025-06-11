// src/components/Breadcrumbs/Breadcrumbs.tsx
import React from "react";
import { useLocation } from "react-router-dom";
import styles from "./Breadcrumbs.module.css";

const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <nav className={styles.breadcrumb}>
      <span className={styles.segment}>Главная</span>
      {pathnames.map((name, index) => (
        <React.Fragment key={index}>
          <span className={styles.separator}>/</span>
          <span className={styles.segment}>
            {decodeURIComponent(name)}
          </span>
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumbs;
