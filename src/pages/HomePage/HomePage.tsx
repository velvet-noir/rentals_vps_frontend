import { useEffect, useState } from 'react';
import ProductCard from '../../components/ProductCard/ProductCard';
import styles from './HomePage.module.css';

interface Product {
  id: number;
  name: string;
  image: string;
  mini_description: string;
  price: string;
  is_active: boolean;
}

function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/services/', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      credentials: 'include'
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Загрузка данных...</p>;
  if (error) return <p>Ошибка загрузки: {error}</p>;

  return (
    <div className={styles.pageContent}>
      <h1>Добро пожаловать в VPS Rental</h1>
      <p>Выберите подходящий VPS сервер из списка ниже.</p>

      <div className={styles.cardsContainer}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            image={product.image}
            mini_description={product.mini_description}
            price={product.price}
          />
        ))}
      </div>
    </div>
  );
}


export default HomePage;
