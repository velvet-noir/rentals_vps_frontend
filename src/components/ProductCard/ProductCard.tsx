import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from './ProductCard.module.css';
import cardImage from '../../assets/no_image.png';


interface ProductCardProps {
  id: string;
  title: string;
  description: string;
  price: string;
}

function ProductCard({ id, title, description, price }: ProductCardProps) {
  return (
    <Card className={styles.card}>
      <Card.Img variant="top" src={cardImage} alt={title} />
      <Card.Body className={styles.cardBody}>
        <Card.Title className={styles.title}>{title}</Card.Title>
        <Card.Text className={styles.description}>{description}</Card.Text>
        <Card.Text className={styles.price}>{price}</Card.Text>
        <Link to={`/product/${id}`}>
          <Button variant="primary" className={styles.button}>Подробнее</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;
