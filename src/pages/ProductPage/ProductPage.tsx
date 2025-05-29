import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import styles from './ProductPage.module.css';
import cardImage from '../../assets/no_image.png';

function ProductPage() {
  const { id } = useParams<{ id: string }>();

  const product = {
    status: "success",
    data: {
      pk: id,
      name: "VPS Pro",
      image: "http://localhost:9000/r-vps-media/logo/vps.png",
      mini_description: "Улучшенный VPS-тариф для высоконагруженных проектов и стабильной работы.",
      price: "1199.00",
      is_active: true,
      specifications: [
        {
          id: 2,
          description: "Тариф VPS Pro подойдёт для проектов, которым требуется высокая производительность, надёжность и гибкость. Идеален для интернет-магазинов, CRM-систем, медиасерверов и других ресурсоёмких приложений.",
          processor: "2 vCPU (2.8 GHz)",
          ram: "4 ГБ RAM",
          disk: "100 ГБ SSD",
          internet_speed: "до 250 Мбит/с",
          service: 2
        }
      ]
    }
  };

  const imageUrl = product.data.image ? product.data.image : cardImage;
  const spec = product.data.specifications[0];

  const [showSpecs, setShowSpecs] = useState(false);

  return (
    <div className={styles.pageContainer}>
      <Card className={styles.productCard}>
        <Link to="/" className={styles.backButton}>← Назад</Link>
        <div className={styles.imageTitleWrapper}>
          <Card.Img variant="top" src={imageUrl} alt={product.data.name} />
          <Card.Title className={styles.title}>{product.data.name}</Card.Title>
        </div>
        <Card.Body>
          <Card.Text className={styles.description}>{spec.description}</Card.Text>
          <Card.Text className={styles.price}>{product.data.price} ₽ / месяц</Card.Text>


          <Button 
            variant="outline-primary" 
            onClick={() => setShowSpecs(!showSpecs)} 
            className={styles.toggleButton}
          >
            {showSpecs ? 'Скрыть характеристики' : 'Показать характеристики'}
          </Button>

          {showSpecs && (
            <div className={styles.specifications}>
              <ul>
                <li><strong>Процессор:</strong> {spec.processor}</li>
                <li><strong>ОЗУ:</strong> {spec.ram}</li>
                <li><strong>Диск:</strong> {spec.disk}</li>
                <li><strong>Скорость интернета:</strong> {spec.internet_speed}</li>
              </ul>
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}

export default ProductPage;
