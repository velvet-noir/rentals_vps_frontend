import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Spinner,
  Alert,
  Table,
  Button,
} from "react-bootstrap";

interface Service {
  id: number;
  name: string;
  price: string;
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

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getCsrfToken = () => {
    const match = document.cookie.match(/csrftoken=([\w-]+)/);
    return match ? match[1] : "";
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
        setError(error.message || "Ошибка загрузки заявок");
        setLoading(false);
      });
  };

  const handleUpdateStatus = (id: number, newStatus: "COMPLETED" | "REJECTED") => {
    axios
      .put(
        `/api/app/${id}/`,
        { status: newStatus },
        {
          headers: {
            "X-CSRFTOKEN": getCsrfToken(),
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then(() => fetchOrders())
      .catch((error) => {
        setError(error.message || "Ошибка обновления статуса");
      });
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <Container style={{ padding: "2rem" }}>
      <h2>Заявки</h2>

      {loading && (
        <div style={{ textAlign: "center" }}>
          <Spinner animation="border" />
        </div>
      )}

      {error && <Alert variant="danger">{error}</Alert>}

      {!loading && orders.length === 0 && <p>Нет заявок.</p>}

      {!loading && orders.length > 0 && (
        <Table bordered hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Статус</th>
              <th>Создана</th>
              <th>Обновлена</th>
              <th>Создатель</th>
              <th>Модератор</th>
              <th>Сервисы</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {[...orders]
              .sort(
                (a, b) =>
                  new Date(b.created_at).getTime() -
                  new Date(a.created_at).getTime()
              )
              .map((order) => (
                <tr key={order.pk}>
                  <td>{order.pk}</td>
                  <td>{order.status}</td>
                  <td>{new Date(order.created_at).toLocaleString()}</td>
                  <td>{new Date(order.updated_at).toLocaleString()}</td>
                  <td>{order.user_creator}</td>
                  <td>{order.user_moderator ?? "—"}</td>
                  <td>
                    {order.services.map((s) => s.name).join(", ")}
                  </td>
                  <td>
                    <div className="d-flex flex-column gap-1">
                      <Button
                        variant="success"
                        size="sm"
                        onClick={() => handleUpdateStatus(order.pk, "COMPLETED")}
                      >
                        Завершить
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleUpdateStatus(order.pk, "REJECTED")}
                      >
                        Отклонить
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default Orders;
