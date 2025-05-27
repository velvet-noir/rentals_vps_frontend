import { Navbar, Container, Nav } from 'react-bootstrap';
import styles from './Header.module.css';

function Header() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className={`mb-4 ${styles.navbarCustom}`}>
      <Container>
        <Navbar.Brand className={styles.brandCustom}>VPS Rental</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="#" className={styles.navLinkCustom}>Главная</Nav.Link>
          <Nav.Link href="#" className={styles.navLinkCustom}>О нас</Nav.Link>
          <Nav.Link href="#" className={styles.navLinkCustom}>Контакты</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;
