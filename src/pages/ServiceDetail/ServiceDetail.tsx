// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import {
//   Container,
//   Row,
//   Col,
//   Spinner,
//   Button,
//   Modal,
//   Form,
// } from "react-bootstrap";
// import styles from "./ServiceDetail.module.css";
// import { useSelector } from "react-redux";
// import type { RootState } from "../../store";
// import { addToCart } from "../../api/cart";

// interface Service {
//   id: number;
//   name: string;
//   mini_description: string;
//   price: string;
//   is_active: boolean;
//   image: string;
//   description: string;
//   processor: string;
//   ram: string;
//   disk: string;
//   internet_speed: string;
// }

// const getCsrfToken = (): string | null => {
//   const match = document.cookie.match(/csrftoken=([^;]+)/);
//   return match ? match[1] : null;
// };

// const ServiceDetail: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const [service, setService] = useState<Service | null>(null);
//   const [loading, setLoading] = useState(true);
//   const username = useSelector((state: RootState) => state.user.username);
//   const isStaff = useSelector((state: RootState) => state.user.isStaff);
//   const navigate = useNavigate();
  

//   const [showEditModal, setShowEditModal] = useState(false);

//   const [editForm, setEditForm] = useState({
//     name: "",
//     mini_description: "",
//     price: "",
//     is_active: false,
//     description: "",
//     processor: "",
//     ram: "",
//     disk: "",
//     internet_speed: "",
//   });

//   useEffect(() => {
//     if (!id) return;

//     setLoading(true);
//     fetch(`/api/services/${id}/`)
//       .then((res) => res.json())
//       .then((data) => {
//         setService(data.data);
//         setEditForm({
//           name: data.data.name || "",
//           mini_description: data.data.mini_description || "",
//           price: data.data.price || "",
//           is_active: data.data.is_active || false,
//           description: data.data.description || "",
//           processor: data.data.processor || "",
//           ram: data.data.ram || "",
//           disk: data.data.disk || "",
//           internet_speed: data.data.internet_speed || "",
//         });
//         setLoading(false);
//       })
//       .catch(() => setLoading(false));
//   }, [id]);

//   const handleAddToCart = async () => {
//     try {
//       if (service) {
//         await addToCart(service.id);
//         alert("Добавлено в корзину!");
//       }
//       navigate("/");
//     } catch (error) {
//       console.error("Ошибка при добавлении в корзину", error);
//       alert("Ошибка при добавлении в корзину.");
//     }
//   };

//   const handleEditClick = () => {
//     setShowEditModal(true);
//   };

//   const handleCloseModal = () => {
//     setShowEditModal(false);
//   };

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setEditForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, checked } = e.target;
//     setEditForm((prev) => ({ ...prev, [name]: checked }));
//   };

//   const handleSave = async () => {
//     if (!service) return;

//     const csrfToken = getCsrfToken();
//     if (!csrfToken) {
//       alert("CSRF токен не найден. Обновите страницу и попробуйте снова.");
//       return;
//     }

//     try {
//       const response = await fetch(`/api/services/${service.id}/`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           "X-CSRFTOKEN": csrfToken,
//         },
//         body: JSON.stringify(editForm),
//       });

//       if (!response.ok) {
//         throw new Error("Ошибка обновления услуги");
//       }

//       const data = await response.json();
//       setService(data.data);
//       setShowEditModal(false);
//       alert("Услуга успешно обновлена");
//     } catch (error) {
//       console.error(error);
//       alert("Ошибка при обновлении услуги");
//     }
//   };

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
//           <img className={styles.image} src={service.image} alt={service.name} />
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
//           {username && (
//             <div style={{ textAlign: "right", marginTop: "1.5rem" }}>
//               <Button
//                 variant="primary"
//                 onClick={handleAddToCart}
//                 className="me-2"
//               >
//                 Добавить в корзину
//               </Button>
//               {isStaff && (
//                 <Button
//                   variant="outline-secondary"
//                   onClick={handleEditClick}
//                 >
//                   Редактировать
//                 </Button>
//               )}
//             </div>
//           )}
//         </Col>
//       </Row>

//       <Modal show={showEditModal} onHide={handleCloseModal} centered size="lg">
//         <Modal.Header closeButton>
//           <Modal.Title>Редактировать услугу</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group className="mb-3" controlId="formName">
//               <Form.Label>Название</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="name"
//                 value={editForm.name}
//                 onChange={handleChange}
//               />
//             </Form.Group>

//             <Form.Group className="mb-3" controlId="formMiniDescription">
//               <Form.Label>Мини-описание</Form.Label>
//               <Form.Control
//                 as="textarea"
//                 rows={2}
//                 name="mini_description"
//                 value={editForm.mini_description}
//                 onChange={handleChange}
//               />
//             </Form.Group>

//             <Form.Group className="mb-3" controlId="formPrice">
//               <Form.Label>Цена (₽/мес.)</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="price"
//                 value={editForm.price}
//                 onChange={handleChange}
//               />
//             </Form.Group>

//             <Form.Group className="mb-3" controlId="formIsActive">
//               <Form.Check
//                 type="checkbox"
//                 label="Активна"
//                 name="is_active"
//                 checked={editForm.is_active}
//                 onChange={handleCheckboxChange}
//               />
//             </Form.Group>

//             <Form.Group className="mb-3" controlId="formDescription">
//               <Form.Label>Описание</Form.Label>
//               <Form.Control
//                 as="textarea"
//                 rows={4}
//                 name="description"
//                 value={editForm.description}
//                 onChange={handleChange}
//               />
//             </Form.Group>

//             <Form.Group className="mb-3" controlId="formProcessor">
//               <Form.Label>Процессор</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="processor"
//                 value={editForm.processor}
//                 onChange={handleChange}
//               />
//             </Form.Group>

//             <Form.Group className="mb-3" controlId="formRAM">
//               <Form.Label>RAM</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="ram"
//                 value={editForm.ram}
//                 onChange={handleChange}
//               />
//             </Form.Group>

//             <Form.Group className="mb-3" controlId="formDisk">
//               <Form.Label>Диск</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="disk"
//                 value={editForm.disk}
//                 onChange={handleChange}
//               />
//             </Form.Group>

//             <Form.Group className="mb-3" controlId="formInternetSpeed">
//               <Form.Label>Скорость интернета</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="internet_speed"
//                 value={editForm.internet_speed}
//                 onChange={handleChange}
//               />
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleCloseModal}>
//             Отмена
//           </Button>
//           <Button variant="primary" onClick={handleSave}>
//             Сохранить
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </Container>
//   );
// };

// export default ServiceDetail;

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Spinner,
  Button,
  Modal,
  Form,
} from "react-bootstrap";
import styles from "./ServiceDetail.module.css";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import { addToCart } from "../../api/cart";

interface Service {
  id: number;
  name: string;
  mini_description: string;
  price: string;
  is_active: boolean;
  image: string | null;
  description: string;
  processor: string;
  ram: string;
  disk: string;
  internet_speed: string;
}

const getCsrfToken = (): string | null => {
  const match = document.cookie.match(/csrftoken=([^;]+)/);
  return match ? match[1] : null;
};

const ServiceDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const username = useSelector((state: RootState) => state.user.username);
  const isStaff = useSelector((state: RootState) => state.user.isStaff);
  const navigate = useNavigate();

  const [showEditModal, setShowEditModal] = useState(false);

  const [editForm, setEditForm] = useState({
    name: "",
    mini_description: "",
    price: "",
    is_active: false,
    description: "",
    processor: "",
    ram: "",
    disk: "",
    internet_speed: "",
  });

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    fetch(`/api/services/${id}/`)
      .then((res) => res.json())
      .then((data) => {
        setService(data.data);
        setEditForm({
          name: data.data.name || "",
          mini_description: data.data.mini_description || "",
          price: data.data.price || "",
          is_active: data.data.is_active || false,
          description: data.data.description || "",
          processor: data.data.processor || "",
          ram: data.data.ram || "",
          disk: data.data.disk || "",
          internet_speed: data.data.internet_speed || "",
        });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

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

  const handleEditClick = () => {
    setShowEditModal(true);
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSave = async () => {
    if (!service) return;

    const csrfToken = getCsrfToken();
    if (!csrfToken) {
      alert("CSRF токен не найден. Обновите страницу и попробуйте снова.");
      return;
    }

    try {
      const response = await fetch(`/api/services/${service.id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFTOKEN": csrfToken,
        },
        body: JSON.stringify(editForm),
      });

      if (!response.ok) {
        throw new Error("Ошибка обновления услуги");
      }

      const data = await response.json();
      setService(data.data);
      setShowEditModal(false);
      alert("Услуга успешно обновлена");
    } catch (error) {
      console.error(error);
      alert("Ошибка при обновлении услуги");
    }
  };

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

  // Если картинки нет (null или пустая строка), подставляем заглушку из public/images/placeholder.png
  const imageSrc =
    service.image && service.image.trim() !== ""
      ? service.image
      : "/images/image.png";

  return (
    <Container className={styles.container}>
      <Row>
        <Col md={5}>
          <img className={styles.image} src={imageSrc} alt={service.name} />
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
              <Button
                variant="primary"
                onClick={handleAddToCart}
                className="me-2"
              >
                Добавить в корзину
              </Button>
              {isStaff && (
                <Button variant="outline-secondary" onClick={handleEditClick}>
                  Редактировать
                </Button>
              )}
            </div>
          )}
        </Col>
      </Row>

      <Modal show={showEditModal} onHide={handleCloseModal} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Редактировать услугу</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Название</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={editForm.name}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formMiniDescription">
              <Form.Label>Мини-описание</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                name="mini_description"
                value={editForm.mini_description}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPrice">
              <Form.Label>Цена (₽/мес.)</Form.Label>
              <Form.Control
                type="text"
                name="price"
                value={editForm.price}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formIsActive">
              <Form.Check
                type="checkbox"
                label="Активна"
                name="is_active"
                checked={editForm.is_active}
                onChange={handleCheckboxChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDescription">
              <Form.Label>Описание</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                name="description"
                value={editForm.description}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formProcessor">
              <Form.Label>Процессор</Form.Label>
              <Form.Control
                type="text"
                name="processor"
                value={editForm.processor}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formRAM">
              <Form.Label>RAM</Form.Label>
              <Form.Control
                type="text"
                name="ram"
                value={editForm.ram}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDisk">
              <Form.Label>Диск</Form.Label>
              <Form.Control
                type="text"
                name="disk"
                value={editForm.disk}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formInternetSpeed">
              <Form.Label>Скорость интернета</Form.Label>
              <Form.Control
                type="text"
                name="internet_speed"
                value={editForm.internet_speed}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Отмена
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Сохранить
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ServiceDetail;
