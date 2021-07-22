import React, { useEffect } from "react";
import { Container, Card, Col, Row, Button, Modal } from "react-bootstrap";
import { getCompany } from "../../api/companyApi";
import { EditCompany, EditIpo } from "./EditIpo";
import "./styles.css";
import { ViewCompany } from "./ViewIpo";

export default function Ipo(props) {
  var data = props.data;

  const [view, setView] = React.useState(false);
  const [edit, setEdit] = React.useState(false);
  const [editData, setEditData] = React.useState({ ...props.data });
  const [company, setCompany] = React.useState();

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

  useEffect(async () => {
    data = props.data;
    await setCompany((await getCompany(data.companyId)).message);
  }, [props.data]);

  return (
    <Card className="CardContainer">
      <Row className="d-flex justify-content-sm-between">
        <Col className="text-secondary align-self-center" sm={1}>
          {data.id}
        </Col>
        {company && (
          <Col className="text-uppercase small">
            company: <br />
            <span className="text-danger">{"   " + company.companyName}</span>
          </Col>
        )}

        <Col className="text-uppercase small">
          Total shares:
          <br />
          <span className="text-success"> {data.totalNumberOfShares}</span>
        </Col>
        <Col className="text-uppercase small">
          Price :
          <br />
          <span className="text-success"> {"Rs " + data.pricePerShare}</span>
        </Col>
        <Col className="text-uppercase small">
          {data.openDateTime.split("T")[0]} <br />
          {data.openDateTime.split("T")[1].slice(0, -1)}
        </Col>
        <Col sm={2} className="justify-content-center">
          <Button
            className="w-100 bg-secondary border-secondary"
            onClick={showView}
          >
            company
          </Button>
        </Col>
        {props.admin === true && (
          <Col sm={2} className="d-flex-row align-items-center">
            <Button className="w-100 " onClick={showEdit}>
              Edit
            </Button>
          </Col>
        )}
      </Row>
      {view === true && <ViewCompany data={company} hideView={hideView} />}
      {edit === true && (
        <EditIpo
          data={props.data}
          hideEdit={hideEdit}
          refresh={props.refresh}
        />
      )}
    </Card>
  );
}
