import React from "react";
import { Container, Button } from "react-bootstrap";
import "./styles.css";
import { apiCall, validateAndConvert } from "./utils/importUtils";

export default function ImportData(props) {
  const [file, setFile] = React.useState();
  const [error, setError] = React.useState(false);
  const [message, setMessage] = React.useState("");

  const onFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const setErrorMessage = async (error, message) => {
    setError(error);
    setMessage(message);
  };

  const upload = async () => {
    let jsonArary = await validateAndConvert(file, setErrorMessage);
    console.log(jsonArary);
    await apiCall(jsonArary, setErrorMessage);
  };

  return (
    <Container fluid className="BodyContainer">
      <div className="ImportBox">
        <h5 className="text-uppercase font-weight-bolder">import data</h5>
        <div style={{ paddingTop: 10, paddingLeft: 3, paddingRight: 3 }}>
          <input
            className="font-size-15 "
            type="file"
            onChange={onFileChange}
          />
          <Button className="button" onClick={upload}>
            Import
          </Button>
          {error === true && <p className="error">{message}</p>}
          {error === false && message !== "" && (
            <p className="success">{message}</p>
          )}
        </div>
      </div>
    </Container>
  );
}
