import React, { useEffect } from "react";
import {
  Container,
  Card,
  Col,
  Row,
  Button,
  Modal,
  InputGroup,
  FormControl,
  DropdownButton,
  Form,
} from "react-bootstrap";
import { editCompany } from "../../api/companyApi";
import {
  addCompanyToStockExchang,
  getStockExchanges,
} from "../../api/stockExchangeApi";
import "../styles.css";

export function EditCompany(props) {
  const data = props.data;
  const [editData, setEditData] = React.useState({ ...props.data });
  const [error, setError] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [stockExchange, setStockExchange] = React.useState("");
  const [stockExchanges, setStockExchanges] = React.useState([]);

  useEffect(async () => {
    setEditData({ ...props.data });
    var StockExchanges = (await getStockExchanges()).message;
    setStockExchanges(StockExchanges);
  }, [props.data]);

  const reset = async () => {
    setEditData({ ...props.data });
  };

  const update = async () => {
    var res = await editCompany(editData);
    if (res.error === true) {
      await setError(res.error);
      setMessage(res.errorMessage);
    } else {
      await setError(false);
      setMessage("Successfully updated!");
    }
    await props.refresh();
  };

  const addStockExchange = async () => {
    await addCompanyToStockExchang(editData.id, stockExchange);
    await props.refresh();
  };

  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={true}
      onHide={props.hideEdit}
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
        <h5>
          <span className="text-secondary">Stock Exchanges listed in :</span>{" "}
          {editData.stockExchangeList.toString()}
        </h5>
        <Row>
          <Col>
            <div>
              <select
                className="w-100 p-1 mt-1"
                aria-label="Default select example"
                defaultValue="disabled"
                onChange={(target) => setStockExchange(target.target.value)}
              >
                <option value="disabled" disabled>
                  SELECT EXCHANGE
                </option>
                {stockExchanges.map((se) => {
                  return <option value={se.id}>{se.name}</option>;
                })}
              </select>
            </div>
          </Col>
          <Col>
            <Button
              variant="success w-100"
              disabled={stockExchange === "" ? true : false}
              onClick={addStockExchange}
            >
              Add stock exchange
            </Button>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={reset}>
          reset
        </Button>
        <Button variant="secondary" onClick={props.hideEdit}>
          Close
        </Button>
        <Button variant="primary" onClick={update}>
          update
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
