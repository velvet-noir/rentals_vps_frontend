import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Button,
  Spinner,
  Alert,
  ListGroup,
  Row,
  Col,
  Table,
} from "react-bootstrap";

interface Service {
  id: number;
  name: string;
  price: string;
}

interface Draft {
  pk: number;
  status: string;
  created_at: string;
  updated_at: string;
  user_creator: number;
  user_moderator: number | null;
  services: Service[];
}

interface Order {
  pk: number;
  status: string;
  created_at: string;
  updated_at: string;
  user_creator: number;
  user_moderator: number | null;
  services: Service[];
}

const Cart: React.FC = () => {
  const [viewMode, setViewMode] = useState<"draft" | "history">("draft");
  const [draft, setDraft] = useState<Draft | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getCsrfToken = () => {
    const match = document.cookie.match(/csrftoken=([\w-]+)/);
    return match ? match[1] : "";
  };

  const fetchDraft = () => {
    setLoading(true);
    setError(null);

    axios
      .get("/api/app/draft/", {
        headers: {
          "X-CSRFTOKEN": getCsrfToken(),
          Accept: "application/json",
        },
        withCredentials: true,
      })
      .then((res) => {
        setDraft(res.data.data);
        setLoading(false);
      })
      .catch((error) => {
        const message =
          error.response?.data?.detail ||
          error.message ||
          "Ошибка загрузки черновика";
        if (message === "Черновая заявка не найдена") {
          setDraft(null);
        } else {
          setError(message);
        }
        setLoading(false);
      });
  };

  const fetchOrders = () => {
    setLoading(true);
    setError(null);

    axios
      .get("/api/app/", {
        headers: {
          "X-CSRFTOKEN": getCsrfToken(),
          Accept: "application/json",
        },
        withCredentials: true,
      })
      .then((res) => {
        setOrders(res.data.data);
        setLoading(false);
      })
      .catch((error) => {
        const message =
          error.response?.data?.detail ||
          error.message ||
          "Ошибка загрузки истории заказов";
        setError(message);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (viewMode === "draft") {
      fetchDraft();
    } else {
      fetchOrders();
    }
  }, [viewMode]);

  const handleFormDraft = () => {
    if (!draft) return;
    setLoading(true);
    setError(null);

    axios
      .put(`/api/app/${draft.pk}/formed/`, null, {
        headers: {
          "X-CSRFTOKEN": getCsrfToken(),
          Accept: "application/json",
        },
        withCredentials: true,
      })
      .then(() => {
        fetchDraft();
      })
      .catch((error) => {
        setError(error.message || "Ошибка формирования заявки");
        setLoading(false);
      });
  };

  const handleDelete = (serviceId: number) => {
    setLoading(true);
    setError(null);

    axios
      .delete(`/api/app/del/${serviceId}`, {
        headers: {
          "X-CSRFTOKEN": getCsrfToken(),
          Accept: "application/json",
        },
        withCredentials: true,
      })
      .then(() => {
        fetchDraft();
      })
      .catch((error) => {
        setError(error.message || "Ошибка удаления услуги");
        setLoading(false);
      });
  };

  return (
    <Container style={{ padding: "2rem" }}>
      <h2>Корзина</h2>

      <div className="mb-3">
        <Button
          variant={viewMode === "draft" ? "primary" : "outline-primary"}
          onClick={() => setViewMode("draft")}
          className="me-2"
        >
          Черновик
        </Button>
        <Button
          variant={viewMode === "history" ? "primary" : "outline-primary"}
          onClick={() => setViewMode("history")}
        >
          История заказов
        </Button>
      </div>

      {loading && (
        <div style={{ textAlign: "center" }}>
          <Spinner animation="border" />
        </div>
      )}

      {error && <Alert variant="danger">{error}</Alert>}

      {!loading && !error && viewMode === "draft" && (
        <>
          {draft && draft.services.length > 0 ? (
            <>
              <ListGroup>
                {draft.services.map((service) => (
                  <ListGroup.Item key={service.id}>
                    <Row className="align-items-center">
                      <Col>
                        {service.name} — {service.price} ₽/мес.
                      </Col>
                      <Col xs="auto">
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDelete(service.id)}
                        >
                          Удалить
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
              <div className="mt-3 text-end">
                <Button variant="success" onClick={handleFormDraft}>
                  Сформировать
                </Button>
              </div>
            </>
          ) : (
            <p>Корзина пуста.</p>
          )}
        </>
      )}

      {!loading && !error && viewMode === "history" && (
        <>
          {orders.length > 0 ? (
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>№ заявки (pk)</th>
                  <th>Статус</th>
                  <th>Дата создания</th>
                  <th>Сервисы</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.pk}>
                    <td>{order.pk}</td>
                    <td>{order.status}</td>
                    <td>{new Date(order.created_at).toLocaleString()}</td>
                    <td>{order.services.map((s) => s.name).join(", ")}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p>История заказов пуста.</p>
          )}
        </>
      )}
    </Container>
  );
};

export default Cart;
