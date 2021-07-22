import React, { useEffect } from "react";
import {
  Button,
  Modal,
  InputGroup,
  FormControl,
  Row,
  Col,
} from "react-bootstrap";
import { addCompany } from "../../api/companyApi";
import {
  addStockExchange,
  getStockExchanges,
} from "../../api/stockExchangeApi";
import "./styles.css";

export function AddCompany(props) {
  const [editData, setEditData] = React.useState({
    companyName: "",
    turnover: "",
    ceo: "",
    boardOfDirectors: "",
    companyBrief: "",
    sectorId: "",
  });
  const [error, setError] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [stockExchanges, setStockExchanges] = React.useState([]);

  useEffect(async () => {
    var StockExchanges = (await getStockExchanges()).message;
    setStockExchanges(StockExchanges);
  }, []);

  const add = async () => {
    var response = await addCompany(editData);
    setError(response.error);
    console.log(response);
    setMessage(response.errorMessage);
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
        <Modal.Title>{"Add Company"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error === true && (
          <h5 className="text-danger text-center">{message}</h5>
        )}
        {error === false && message !== "" && (
          <h5 className="text-success text-center">{message}</h5>
        )}

        <InputGroup className="mb-3 pt-2">
          <InputGroup.Text>Company name</InputGroup.Text>
          <FormControl
            aria-label="First name"
            defaultValue={editData.companyName}
            value={editData.companyName}
            onChange={(target) =>
              setEditData({ ...editData, companyName: target.target.value })
            }
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text>turnover</InputGroup.Text>
          <FormControl
            aria-label="First name"
            value={editData.turnover}
            onChange={(target) =>
              setEditData({ ...editData, turnover: target.target.value })
            }
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text>ceo</InputGroup.Text>
          <FormControl
            aria-label="First name"
            value={editData.ceo}
            onChange={(target) =>
              setEditData({ ...editData, ceo: target.target.value })
            }
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text>boardOfDirectors</InputGroup.Text>
          <FormControl
            aria-label="First name"
            value={editData.boardOfDirectors}
            onChange={(target) =>
              setEditData({
                ...editData,
                boardOfDirectors: target.target.value,
              })
            }
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text>companyBrief</InputGroup.Text>
          <FormControl
            aria-label="First name"
            as="textarea"
            value={editData.companyBrief}
            onChange={(target) =>
              setEditData({ ...editData, companyBrief: target.target.value })
            }
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text>sectorId</InputGroup.Text>
          <FormControl
            aria-label="First name"
            value={editData.sectorId}
            onChange={(target) =>
              setEditData({ ...editData, sectorId: target.target.value })
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
