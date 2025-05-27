import { useParams } from 'react-router-dom';

function ProductPage() {
  const { id } = useParams<{ id: string }>();
  return <h1>Страница товара с id: {id}</h1>;
}

export default ProductPage;
