import HomePage from "./pages/HomePage/HomePage";
import ProductPage from "./pages/ProductPage/ProductPage";

const AboutPage = () => (
  <div>
    <h2>О нас</h2>
    <p>Информация пока отсутствует.</p>
  </div>
);
const ContactsPage = () => (
  <div>
    <h2>Контакты</h2>
    <p>Контактные данные скоро появятся.</p>
  </div>
);

const routes = [
  { path: "/", element: <HomePage /> },
  { path: "/product/:id", element: <ProductPage /> },
  { path: "/about", element: <AboutPage /> },
  { path: "/contacts", element: <ContactsPage /> },
];

export default routes;
