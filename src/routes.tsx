import HomePage from './pages/HomePage/HomePage';
import ProductPage from './pages/ProductPage/ProductPage';

const routes = [
  { path: '/', element: <HomePage /> },
  { path: '/product/:id', element: <ProductPage /> },
];

export default routes;
