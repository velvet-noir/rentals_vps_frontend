// import { Navbar, Nav, Button, Container } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
// import styles from './Header.module.css';

// const Header = () => {
//   return (
//     <Navbar className={styles.header} variant="dark" expand="lg">
//       <Container className={styles.header__container}>
//         <div className={styles.header__left}>
//           <Navbar.Brand as={Link} to="/">
//             VPS Rental
//           </Navbar.Brand>
//         </div>

//         <Nav className={styles.header__center}>
//           <Nav.Link as={Link} to="/">Главная</Nav.Link>
//           <Nav.Link as={Link} to="/about">О нас</Nav.Link>
//           <Nav.Link as={Link} to="/contacts">Контакты</Nav.Link>
//         </Nav>

//         <div className={styles.header__right}>
//           <Button variant="outline-light" size="sm" className="me-2">
//             Вход
//           </Button>
//           <Button variant="outline-light" size="sm">
//             Регистрация
//           </Button>
//         </div>
//       </Container>
//     </Navbar>
//   );
// };

// export default Header;


import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import AuthButton from '../AuthButton/AuthButton';


const Header = () => {
  return (
    <Navbar className={styles.header} variant="dark" expand="lg">
      <Container className={styles.header__container}>
        <div className={styles.header__left}>
          <Navbar.Brand as={Link} to="/" className={styles.brand}>
            VPS Rental
          </Navbar.Brand>
        </div>

        <Nav className={styles.header__center}>
          <Nav.Link as={Link} to="/" className={styles.navLink}>Главная</Nav.Link>
          <Nav.Link as={Link} to="/about" className={styles.navLink}>О нас</Nav.Link>
          <Nav.Link as={Link} to="/contacts" className={styles.navLink}>Контакты</Nav.Link>
        </Nav>

        <div className={styles.header__right}>
          <AuthButton />
        </div>
      </Container>
    </Navbar>
  );
};

export default Header;
