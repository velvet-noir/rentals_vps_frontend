import React from 'react';
import { Container } from 'react-bootstrap';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <Container className={styles.footerContent}>
        <p className={styles.text}>© {new Date().getFullYear()} Rentals_VPS</p>
        <a
          href="https://github.com/velvet-noir"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          GitHub
        </a>
      </Container>
    </footer>
  );
};

export default Footer;
