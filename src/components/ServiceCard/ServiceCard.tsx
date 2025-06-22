import React from "react";
import { Card, Button } from "react-bootstrap";
import styles from "./ServiceCard.module.css";
import { useNavigate } from "react-router-dom";

interface ServiceCardProps {
  id: number;
  name: string;
  image: string;
  mini_description: string;
  price: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  id,
  name,
  image,
  mini_description,
  price,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/service/${id}`);
  };

  const imageSrc = image && image.trim() !== "" ? image : "/images/image.png";
  return (
    <Card className={styles.card} onClick={handleClick}>
      <Card.Img variant="top" src={imageSrc} className={styles.image} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>{mini_description}</Card.Text>
        <div className={styles.price}>от {price} ₽/мес.</div>
        <Button variant="primary" className={styles.button}>
          Подробнее
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ServiceCard;
