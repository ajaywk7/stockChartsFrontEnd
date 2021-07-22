import { Container, Card, Col, Row, Button, Modal } from "react-bootstrap";

export function ViewCompany(props) {
  const data = props.data;

  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={true}
      onHide={props.hideView}
    >
      <Modal.Header closeButton>
        <Modal.Title>{data.companyName}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col className="text-start">
            <h5>ceo</h5>{" "}
          </Col>
          <Col sm={1}>:</Col>
          <Col className="text-start">
            <h5>{data.ceo}</h5>
          </Col>
        </Row>
        <Row>
          <Col className="text-start">
            <h5>turnover</h5>{" "}
          </Col>
          <Col sm={1}>:</Col>
          <Col className="text-start">
            <h5>{data.turnover}</h5>
          </Col>
        </Row>
        <Row>
          <Col className="text-start">
            <h5>Board Of Directors</h5>{" "}
          </Col>
          <Col sm={1}>:</Col>
          <Col className="text-start">
            <h5>{data.boardOfDirectors}</h5>
          </Col>
        </Row>
        <Row>
          <Col className="text-start">
            <h5>Sector id</h5>{" "}
          </Col>
          <Col sm={1}>:</Col>
          <Col className="text-start">
            <h5>{data.sectorId}</h5>
          </Col>
        </Row>
        <Row>
          <Col className="text-start">
            <h5>deactivated</h5>{" "}
          </Col>
          <Col sm={1}>:</Col>
          <Col className="text-start">
            <h5>{data.deactivated ? "true" : "false"}</h5>
          </Col>
        </Row>
        <Row>
          <Col className="text-start">
            <h5>companyBrief</h5>{" "}
          </Col>
          <Col sm={1}>:</Col>
          <Col
            className="text-start"
            style={{ width: 100, overflowWrap: "break-word" }}
          >
            <p>{data.companyBrief}</p>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.hideView}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
