// import React from "react";
// import { Navbar as RBNavbar, Nav, Container, Button } from "react-bootstrap";
// import { NavLink, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import type { RootState } from "../../store";
// import { clearUser } from "../../store/userSlice";
// import { logoutUser } from "../../api/user";
// import styles from "./Navbar.module.css";

// const Navbar: React.FC = () => {
//   const username = useSelector((state: RootState) => state.user.username);
//   const isStaff = useSelector((state: RootState) => state.user.isStaff);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     try {
//       await logoutUser();
//       dispatch(clearUser());
//       navigate("/");
//     } catch (error) {
//       console.error((error as Error).message);
//     }
//   };

//   return (
//     <RBNavbar className={styles.navbar} bg="light" expand="lg">
//       <Container>
//         <RBNavbar.Brand as={NavLink} to="/" className={styles.navbarBrand}>
//           Rental VPS
//         </RBNavbar.Brand>
//         <RBNavbar.Toggle aria-controls="basic-navbar-nav" />
//         <RBNavbar.Collapse id="basic-navbar-nav">
//           <Nav className="me-auto">
//             <Nav.Item className={styles.navItem}>
//               <NavLink
//                 to="/"
//                 end
//                 className={({ isActive }) =>
//                   isActive
//                     ? `${styles.activeLink} ${styles.navLink}`
//                     : styles.navLink
//                 }
//               >
//                 Главная
//               </NavLink>
//             </Nav.Item>

//             {isStaff && (
//               <Nav.Item className={styles.navItem}>
//                 <NavLink
//                   to="/orders"
//                   className={({ isActive }) =>
//                     isActive
//                       ? `${styles.activeLink} ${styles.navLink}`
//                       : styles.navLink
//                   }
//                 >
//                   Заявки
//                 </NavLink>
//               </Nav.Item>
//             )}
//           </Nav>

//           <Nav className={styles.navRight}>
//             <Nav.Item className={styles.navItem}>
//               <NavLink
//                 to="/cart"
//                 className={({ isActive }) =>
//                   isActive
//                     ? `${styles.activeLink} ${styles.navLink}`
//                     : styles.navLink
//                 }
//               >
//                 Корзина
//               </NavLink>
//             </Nav.Item>

//             {username ? (
//               <>
//                 <Nav.Item className={styles.navItem}>
//                   <span className={styles.username}>{username}</span>
//                 </Nav.Item>
//                 <Nav.Item className={styles.navItem}>
//                   <Button variant="outline-secondary" size="sm" onClick={handleLogout}>
//                     Выйти
//                   </Button>
//                 </Nav.Item>
//               </>
//             ) : (
//               <Nav.Item className={styles.navItem}>
//                 <NavLink
//                   to="/login"
//                   className={({ isActive }) =>
//                     isActive
//                       ? `${styles.activeLink} ${styles.navLink}`
//                       : styles.navLink
//                   }
//                 >
//                   Вход/регистрация
//                 </NavLink>
//               </Nav.Item>
//             )}
//           </Nav>
//         </RBNavbar.Collapse>
//       </Container>
//     </RBNavbar>
//   );
// };

// export default Navbar;

import React from "react";
import { Navbar as RBNavbar, Nav, Container, Button } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store";
import { clearUser } from "../../store/userSlice";
import { logoutUser } from "../../api/user";
import styles from "./Navbar.module.css";

const Navbar: React.FC = () => {
  const username = useSelector((state: RootState) => state.user.username);
  const isStaff = useSelector((state: RootState) => state.user.isStaff);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();
      dispatch(clearUser());
      navigate("/");
    } catch (error) {
      console.error((error as Error).message);
    }
  };

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

            {isStaff && (
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
            )}
          </Nav>

          <Nav className={styles.navRight}>
            {username && (
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
            )}

            {username ? (
              <>
                <Nav.Item className={styles.navItem}>
                  <span className={styles.username}>{username}</span>
                </Nav.Item>
                <Nav.Item className={styles.navItem}>
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={handleLogout}
                  >
                    Выйти
                  </Button>
                </Nav.Item>
              </>
            ) : (
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
            )}
          </Nav>
        </RBNavbar.Collapse>
      </Container>
    </RBNavbar>
  );
};

export default Navbar;
