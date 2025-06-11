import React from "react";
import { Navbar as RBNavbar, Nav, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar: React.FC = () => {
  return (
    <RBNavbar className={styles.navbar} bg="light" expand="lg">
      <Container>
        <RBNavbar.Brand as={NavLink} to="/" className={styles.navbarBrand}>
          Rental VPS
        </RBNavbar.Brand>
        <RBNavbar.Toggle aria-controls="basic-navbar-nav" />
        <RBNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Item className={styles.navItem}>
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  isActive
                    ? `${styles.activeLink} ${styles.navLink}`
                    : styles.navLink
                }
              >
                Главная
              </NavLink>
            </Nav.Item>
            <Nav.Item className={styles.navItem}>
              <NavLink
                to="/cart"
                className={({ isActive }) =>
                  isActive
                    ? `${styles.activeLink} ${styles.navLink}`
                    : styles.navLink
                }
              >
                Корзина
              </NavLink>
            </Nav.Item>
            <Nav.Item className={styles.navItem}>
              <NavLink
                to="/orders"
                className={({ isActive }) =>
                  isActive
                    ? `${styles.activeLink} ${styles.navLink}`
                    : styles.navLink
                }
              >
                Заявки
              </NavLink>
            </Nav.Item>
            <Nav.Item className={styles.navItem}>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive
                    ? `${styles.activeLink} ${styles.navLink}`
                    : styles.navLink
                }
              >
                Вход/регистрация
              </NavLink>
            </Nav.Item>
          </Nav>
        </RBNavbar.Collapse>
      </Container>
    </RBNavbar>
  );
};

export default Navbar;
