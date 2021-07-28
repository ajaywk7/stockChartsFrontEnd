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
import "../styles.css";
import DateTimePicker from "react-datetime-picker";
import { addIpo } from "../../api/companyApi";

export function EditIpo(props) {
  const data = props.data;
  const [editData, setEditData] = React.useState({ ...props.data });
  const [error, setError] = React.useState(false);
  const [message, setMessage] = React.useState("");

  useEffect(async () => {
    setEditData({ ...props.data });
  }, [props.data]);

  const reset = async () => {
    setEditData({ ...props.data });
  };

  const update = async () => {
    var res = await addIpo(editData);
    if (res.error === true) {
      await setError(res.error);
      setMessage(res.errorMessage);
    } else {
      await setError(false);
      setMessage("Successfully updated!");
    }
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
          <InputGroup.Text>Company id</InputGroup.Text>
          <FormControl
            aria-label="First name"
            defaultValue={editData.companyId}
            value={editData.companyId}
            onChange={(target) =>
              setEditData({ ...editData, companyId: target.target.value })
            }
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text>pricePerShare</InputGroup.Text>
          <FormControl
            aria-label="First name"
            value={editData.pricePerShare}
            onChange={(target) =>
              setEditData({ ...editData, pricePerShare: target.target.value })
            }
          />
        </InputGroup>

        <InputGroup className="mb-3">
          <InputGroup.Text>totalNumberOfShares</InputGroup.Text>
          <FormControl
            aria-label="First name"
            value={editData.totalNumberOfShares}
            onChange={(target) =>
              setEditData({
                ...editData,
                totalNumberOfShares: target.target.value,
              })
            }
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text>openDateTime</InputGroup.Text>
          <DateTimePicker
            value={new Date(editData.openDateTime)}
            onChange={async (time) => {
              await setEditData({
                ...editData,
                openDateTime: time.toISOString(),
              });
            }}
          />
        </InputGroup>
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
