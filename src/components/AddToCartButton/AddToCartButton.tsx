import React from "react";
import { Button } from "react-bootstrap";
import styles from "./AddToCartButton.module.css";

const AddToCartButton: React.FC = () => {
  return (
    <Button variant="primary" className={styles.addToCartButton}>
      В корзину
    </Button>
  );
};

export default AddToCartButton;
