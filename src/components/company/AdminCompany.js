import React, { useEffect } from "react";
import { Container, Card, Col, Row, Button, Modal } from "react-bootstrap";
import { EditCompany } from "./EditCompany";
import "./styles.css";
import { ViewCompany } from "./ViewCompany";

export default function AdminCompany(props) {
  var data = props.data;

  const [view, setView] = React.useState(false);
  const [edit, setEdit] = React.useState(false);
  const [editData, setEditData] = React.useState({ ...props.data });

  const showView = async () => {
    setView(true);
  };

  const hideView = async () => {
    setView(false);
  };

  const showEdit = async () => {
    setEdit(true);
  };

  const hideEdit = async () => {
    setEdit(false);
  };

  const resetEdit = async () => {
    setEditData({ ...props.data });
  };

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
          {data.companyName}
        </Col>

        <Col sm={2}>
          {data.stockExchangeList.map((s) => " " + s + " ").toString()}
        </Col>
        <Col sm={3}>
          <Button
            className="w-100 bg-secondary border-secondary"
            onClick={showView}
          >
            View
          </Button>
        </Col>
        {props.admin === true && (
          <Col sm={2}>
            <Button className="w-100 " onClick={showEdit}>
              Edit
            </Button>
          </Col>
        )}
      </Row>
      {view === true && <ViewCompany data={props.data} hideView={hideView} />}
      {edit === true && (
        <EditCompany
          data={props.data}
          hideEdit={hideEdit}
          refresh={props.refresh}
        />
      )}
    </Card>
  );
}
