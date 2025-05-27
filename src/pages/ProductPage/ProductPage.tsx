import { useParams, Link } from 'react-router-dom';

function ProductPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <h1>Детали продукта: {id}</h1>
      <p>Здесь будет информация о выбранном VPS сервере.</p>
      <Link to="/">← Вернуться на главную</Link>
    </div>
  );
}

export default ProductPage;
