import { useParams, Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import styles from './ProductPage.module.css';
import cardImage from '../../assets/no_image.png';

function ProductPage() {
  const { id } = useParams<{ id: string }>();

  const product = {
    id,
    name: 'VPS Pro',
    image: 'http://localhost:9000/r-vps-media/logo/vps.png',
    mini_description: 'Улучшенный VPS-тариф для высоконагруженных проектов и стабильной работы.',
    full_description: 'Этот VPS Pro сервер предоставляет расширенные возможности для хранения данных, высокой скорости доступа и надежности. Идеально подходит для средних и крупных проектов.',
    price: '1199.00'
  };

  const imageUrl = product.image ? product.image : cardImage;

  return (
    <div className={styles.pageContainer}>
      <Card className={styles.productCard}>
        <Link to="/" className={styles.backButton}>← Назад</Link>
        <div className={styles.imageTitleWrapper}>
          <Card.Img variant="top" src={imageUrl} alt={product.name} />
          <Card.Title className={styles.title}>{product.name}</Card.Title>
        </div>
        <Card.Body>
          <Card.Text className={styles.description}>{product.full_description}</Card.Text>
          <Card.Text className={styles.price}>{product.price} ₽ / месяц</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default ProductPage;
