import React, { useEffect } from "react";
import { Button, Modal, InputGroup, FormControl } from "react-bootstrap";
import { addSector } from "../../api/sectorsApi";
import { addStockExchange } from "../../api/stockExchangeApi";
import "../styles.css";

export function AddStockExchange(props) {
  const [editData, setEditData] = React.useState({
    name: "",
    breif: "",
  });
  const [error, setError] = React.useState(false);
  const [message, setMessage] = React.useState("");

  const add = async () => {
    if (props.sector) {
      var response = await addSector(editData);
    } else {
      var response = await addStockExchange(editData);
    }
    setError(response.error);
    setMessage(response.error === true ? "invalid" : "");
    if (response.error === false) {
      props.hideAdd();
    }
    await props.refresh();
  };

  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={true}
      onHide={props.hideAdd}
      scrollable={true}
    >
      <Modal.Header closeButton>
        <Modal.Title>{"Edit"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error === true && (
          <h5 className="text-danger text-center">{message}</h5>
        )}
        {error === false && message !== "" && (
          <h5 className="text-success text-center">{message}</h5>
        )}

        <InputGroup className="mb-3 pt-2">
          <InputGroup.Text>
            {props.sector ? "Sector name" : "Exchange name"}
          </InputGroup.Text>
          <FormControl
            aria-label="First name"
            defaultValue={editData.name}
            value={editData.name}
            onChange={(target) =>
              setEditData({ ...editData, name: target.target.value })
            }
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text>Brief</InputGroup.Text>
          <FormControl
            aria-label="First name"
            value={editData.brief}
            onChange={(target) =>
              setEditData({ ...editData, brief: target.target.value })
            }
          />
        </InputGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.hideAdd}>
          Close
        </Button>
        <Button variant="primary" onClick={add}>
          add
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
