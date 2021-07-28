import React, { useEffect } from "react";
import { Container, Card, Col, Row, Button, Modal } from "react-bootstrap";
import "../styles.css";

export default function StockExchange(props) {
  var data = props.data;

  useEffect(() => {
    data = props.data;
  }, [props.data]);

  return (
    <Card className="CardContainer">
      <Row className="d-flex justify-content-sm-between">
        <Col sm={2} className="text-secondary pl-3 align-self-center">
          {data.id}
        </Col>
        <Col sm={2} className="text-uppercase text-primary">
          {data.name}
        </Col>

        <Col sm={2}>{data.brief}</Col>
      </Row>
    </Card>
  );
}
