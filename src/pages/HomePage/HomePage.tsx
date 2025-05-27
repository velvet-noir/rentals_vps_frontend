import ProductCard from '../../components/ProductCard/ProductCard';

const products = [
  { id: 'basic', title: 'VPS Basic', description: 'Базовый VPS сервер', price: '5$ / месяц' },
  { id: 'pro', title: 'VPS Pro', description: 'Продвинутый VPS сервер', price: '15$ / месяц' },
  { id: 'ultra', title: 'VPS Ultra', description: 'Максимальная мощность', price: '30$ / месяц' },
  { id: 'ultra1', title: 'VPS Ultra', description: 'Максимальная мощность', price: '30$ / месяц' },
  { id: 'ultra2', title: 'VPS Ultra', description: 'Максимальная мощность', price: '30$ / месяц' },
  { id: 'ultra3', title: 'VPS Ultra', description: 'Максимальная мощность', price: '30$ / месяц' },
  { id: 'ultra4', title: 'VPS Ultra', description: 'Максимальная мощность', price: '30$ / месяц' },
  { id: 'ultra5', title: 'VPS Ultra', description: 'Максимальная мощность', price: '30$ / месяц' },
  { id: 'ultra6', title: 'йцукйцуйцуйцу', description: 'Максимальная мощность', price: '30$ / месяц' },
  { id: 'ultra7', title: 'фывфывфывфыв', description: 'Максимальная мощность', price: '30$ / месяц' },
];

function HomePage() {
  return (
    <div>
      <h1>Добро пожаловать в VPS Rental</h1>
      <p>Выберите подходящий VPS сервер из списка ниже.</p>

      <div className="d-flex flex-wrap gap-3">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            title={product.title}
            description={product.description}
            price={product.price}
          />
        ))}
      </div>
    </div>
  );
}


export default HomePage;
