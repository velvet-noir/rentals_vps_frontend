import ProductCard from '../../components/ProductCard/ProductCard';
import styles from './HomePage.module.css';


const products = [
  {
    id: 1,
    name: "VPS Base",
    image: "http://localhost:9000/r-vps-media/logo/vps.png",
    mini_description: "Базовое решение для размещения сайтов и приложений на виртуальных серверах.",
    price: "449.00",
    is_active: true
  },
  {
    id: 2,
    name: "VPS Pro",
    image: "http://localhost:9000/r-vps-media/logo/vps.png",
    mini_description: "Улучшенный VPS-тариф для высоконагруженных проектов и стабильной работы.",
    price: "1199.00",
    is_active: true
  },
  {
    id: 3,
    name: "Storage VPS Base",
    image: "http://localhost:9000/r-vps-media/logo/storade_vps.png",
    mini_description: "Надёжный виртуальный сервер с приоритетом на хранение данных и резервные копии.",
    price: "1499.00",
    is_active: true
  },
  {
    id: 4,
    name: "Storage VPS Pro",
    image: "http://localhost:9000/r-vps-media/logo/storade_vps.png",
    mini_description: "Профессиональный VPS для хранения большого объёма информации с высокой скоростью доступа.",
    price: "4999.00",
    is_active: true
  },
  {
    id: 5,
    name: "Dedicated Server",
    image: "http://localhost:9000/r-vps-media/logo/dedicated_server.png",
    mini_description: "Идеальный выделенный сервер для бизнеса - стабильность, мощность и контроль.",
    price: "39999.00",
    is_active: true
  },
  {
    id: 6,
    name: "Dedicated Server Enterprise",
    image: "http://localhost:9000/r-vps-media/logo/dedicated_server.png",
    mini_description: "Корпоративный сервер с максимальной производительностью для критичных задач.",
    price: "89999.00",
    is_active: true
  }
];


function HomePage() {
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
