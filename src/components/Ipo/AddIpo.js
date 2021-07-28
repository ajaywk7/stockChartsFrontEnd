import React, { useEffect } from "react";
import { Button, Modal, InputGroup, FormControl } from "react-bootstrap";
import "../styles.css";
import DateTimePicker from "react-datetime-picker";
import { addIpo, getCompanies } from "../../api/companyApi";

export function AddIpo(props) {
  const [editData, setEditData] = React.useState({
    pricePerShare: "",
    totalNumberOfShares: "",
    companyId: "",
    openDateTime: new Date(Date.now()).toISOString(),
  });
  const [error, setError] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [companies, setCompanies] = React.useState([]);

  useEffect(async () => {
    var response = await getCompanies();
    if (response.error !== true) {
      await setCompanies(response.message);
    }
  }, []);

  const update = async () => {
    var res = await addIpo(editData);
    if (res.error === true) {
      await setError(res.error);
      setMessage(res.errorMessage);
    } else {
      await props.hideAdd();

      await setError(false);
      setMessage("Successfully Added!");
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
          <InputGroup.Text>Company id</InputGroup.Text>
          <select
            className="form-select"
            defaultValue={-1}
            onChange={async (t) => {
              await setEditData({
                ...editData,
                companyId: t.target.value,
              });
            }}
          >
            <option value={-1} disabled>
              select Company
            </option>
            {companies.map((key, index) => {
              return <option value={key.id}>{key.companyName}</option>;
            })}
          </select>
          {/* <FormControl
            aria-label="First name"
            defaultValue={editData.companyId}
            value={editData.companyId}
            onChange={(target) =>
              setEditData({ ...editData, companyId: target.target.value })
            }
          /> */}
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
        <Button variant="secondary" onClick={props.hideAdd}>
          Close
        </Button>
        <Button variant="primary" onClick={update}>
          save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
