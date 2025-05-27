import { Button, ButtonGroup } from 'react-bootstrap';
import styles from './AuthButton.module.css';

const AuthButton = () => {
  return (
    <ButtonGroup className={styles.authButtonGroup}>
      <Button variant="outline-light" size="sm">
        Вход
      </Button>
      <Button variant="outline-light" size="sm">
        Регистрация
      </Button>
    </ButtonGroup>
  );
};

export default AuthButton;
