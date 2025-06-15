import styles from "./Login.module.css";

import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setIsStaff, setUsername } from "../../store/userSlice";
import type { AppDispatch } from "../../store";
import { fetchUserRole } from "../../api/user";

const LoginPage: React.FC = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getCsrfToken = () => {
    const match = document.cookie.match(/csrftoken=([\w-]+)/);
    return match ? match[1] : "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    const url = isRegistering ? "/api/register/" : "/api/login/";
    const body = isRegistering
      ? formData
      : { username: formData.username, password: formData.password };

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFTOKEN": getCsrfToken(),
        },
        body: JSON.stringify(body),
        credentials: "include",
      });

      const data = await res.json();
      if (res.ok) {
        setMessage(data.message || "Успешно");
        setFormData({ username: "", email: "", password: "" });

        if (!isRegistering) {
          try {
            const userData = await fetchUserRole();
            dispatch(setIsStaff(userData.is_staff));
            dispatch(setUsername(userData.username));
            console.log("username из Redux:", userData.username);
            navigate("/");
          } catch (err) {
            setError(
              (err as Error).message ||
                "Ошибка сети при получении данных пользователя",
            );
          }
        }
      } else {
        setError(data.error || "Ошибка при выполнении запроса");
      }
    } catch {
      setError("Ошибка сети");
    }
  };

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>{isRegistering ? "Регистрация" : "Вход"}</h2>

      <Form onSubmit={handleSubmit} className={styles.form}>
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>Имя пользователя</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {isRegistering && (
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Электронная почта</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>
        )}

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Пароль</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button type="submit" variant="primary" className={styles.submitBtn}>
          {isRegistering ? "Зарегистрироваться" : "Войти"}
        </Button>

        <div className={styles.switchMode}>
          {isRegistering ? "Уже есть аккаунт?" : "Нет аккаунта?"}{" "}
          <span
            onClick={() => setIsRegistering(!isRegistering)}
            style={{ cursor: "pointer", color: "#2563eb" }}
          >
            {isRegistering ? "Войти" : "Зарегистрироваться"}
          </span>
        </div>

        {message && (
          <Alert variant="success" className="mt-3">
            {message}
          </Alert>
        )}
        {error && (
          <Alert variant="danger" className="mt-3">
            {error}
          </Alert>
        )}
      </Form>
    </div>
  );
};

export default LoginPage;
