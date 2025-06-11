import React, { useEffect, useState } from "react";
import ServiceCard from "../../components/ServiceCard/ServiceCard";
import { Container, Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import styles from "./Home.module.css";

interface Service {
  id: number;
  name: string;
  image: string;
  mini_description: string;
  price: string;
  is_active: boolean;
}

const HomePage: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [query, setQuery] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const url = searchTerm
          ? `/api/services/?query=${encodeURIComponent(searchTerm)}`
          : "/api/services/";

        const res = await fetch(url);
        const data = await res.json();
        setServices(data.data);
        setIsLoaded(true);
      } catch (error) {
        setServices([]);
        setIsLoaded(true);
      }
    };

    fetchServices();
  }, [searchTerm]);

  const handleSearch = () => {
    setSearchTerm(query.trim());
  };

  const handleClear = () => {
    setQuery("");
    setSearchTerm("");
  };

  return (
    <Container className={styles.container}>
      <h1 className={styles.title}>Услуги</h1>

      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Поиск по названию услуги"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSearch();
            }
          }}
        />
        <Button variant="primary" onClick={handleSearch}>
          Найти
        </Button>
        <Button variant="outline-secondary" onClick={handleClear}>
          Очистить
        </Button>
      </InputGroup>

      <Row xs={1} sm={2} md={3} lg={3} className="g-4">
        {services.map((service) => (
          <Col key={service.id}>
            <ServiceCard {...service} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default HomePage;
