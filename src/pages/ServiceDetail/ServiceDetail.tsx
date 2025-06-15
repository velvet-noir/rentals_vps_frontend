// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { Container, Row, Col, Spinner } from "react-bootstrap";
// import styles from "./ServiceDetail.module.css";

// interface Service {
//   id: number;
//   name: string;
//   image: string;
//   mini_description: string;
//   price: string;
//   is_active: boolean;
//   description: string;
//   processor: string;
//   ram: string;
//   disk: string;
//   internet_speed: string;
// }

// const ServiceDetail: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const [service, setService] = useState<Service | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!id) return;

//     setLoading(true);
//     fetch(`/api/services/${id}/`)
//       .then((res) => res.json())
//       .then((data) => {
//         setService(data.data);
//         setLoading(false);
//       })
//       .catch(() => setLoading(false));
//   }, [id]);

//   if (loading) {
//     return (
//       <div style={{ padding: "2rem", textAlign: "center" }}>
//         <Spinner animation="border" />
//       </div>
//     );
//   }

//   if (!service) {
//     return (
//       <p style={{ padding: "2rem", textAlign: "center" }}>Услуга не найдена.</p>
//     );
//   }

//   return (
//     <Container className={styles.container}>
//       <Row>
//         <Col md={5}>
//           <img
//             className={styles.image}
//             src={service.image}
//             alt={service.name}
//           />
//         </Col>
//         <Col md={7}>
//           <h2 className={styles.title}>{service.name}</h2>
//           <p className={styles.price}>{service.price} ₽/мес.</p>
//           <p className={styles.description}>{service.description}</p>
//           <ul className={styles.characteristicsList}>
//             <li>
//               <strong>Процессор:</strong> {service.processor}
//             </li>
//             <li>
//               <strong>RAM:</strong> {service.ram}
//             </li>
//             <li>
//               <strong>Диск:</strong> {service.disk}
//             </li>
//             <li>
//               <strong>Скорость интернета:</strong> {service.internet_speed}
//             </li>
//           </ul>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default ServiceDetail;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Spinner, Button } from "react-bootstrap";
import styles from "./ServiceDetail.module.css";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import { addToCart } from "../../api/cart";
import { useNavigate } from "react-router-dom";

interface Service {
  id: number;
  name: string;
  image: string;
  mini_description: string;
  price: string;
  is_active: boolean;
  description: string;
  processor: string;
  ram: string;
  disk: string;
  internet_speed: string;
}

const ServiceDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const username = useSelector((state: RootState) => state.user.username);
  const navigate = useNavigate();

  const handleAddToCart = async () => {
    try {
      if (service) {
        await addToCart(service.id);
        alert("Добавлено в корзину!");
      }
      navigate("/");
    } catch (error) {
      console.error("Ошибка при добавлении в корзину", error);
      alert("Ошибка при добавлении в корзину.");
    }
  };

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    fetch(`/api/services/${id}/`)
      .then((res) => res.json())
      .then((data) => {
        setService(data.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <Spinner animation="border" />
      </div>
    );
  }

  if (!service) {
    return (
      <p style={{ padding: "2rem", textAlign: "center" }}>Услуга не найдена.</p>
    );
  }

  return (
    <Container className={styles.container}>
      <Row>
        <Col md={5}>
          <img
            className={styles.image}
            src={service.image}
            alt={service.name}
          />
        </Col>
        <Col md={7}>
          <h2 className={styles.title}>{service.name}</h2>
          <p className={styles.price}>{service.price} ₽/мес.</p>
          <p className={styles.description}>{service.description}</p>
          <ul className={styles.characteristicsList}>
            <li>
              <strong>Процессор:</strong> {service.processor}
            </li>
            <li>
              <strong>RAM:</strong> {service.ram}
            </li>
            <li>
              <strong>Диск:</strong> {service.disk}
            </li>
            <li>
              <strong>Скорость интернета:</strong> {service.internet_speed}
            </li>
          </ul>
          {username && (
            <div style={{ textAlign: "right", marginTop: "1.5rem" }}>
              <Button variant="primary" onClick={handleAddToCart}>
                Добавить в корзину
              </Button>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ServiceDetail;
