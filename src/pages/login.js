import React from "react";
import { Form, Button, Tabs, Tab, Alert } from "react-bootstrap";
import { AuthContext } from "../context/AuthProvider";
import "./styles.css";
export default function Login(props) {
  const [tab, setTab] = React.useState("Login");
  const [username, setUsername] = React.useState();
  const [password, setPassword] = React.useState();
  const { login, register } = React.useContext(AuthContext);
  const [error, setError] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const submit = async () => {
    if (tab === "Login") {
      console.log(await login(username, password));
    }
    if (tab === "Register") {
      await register(username, password, setError, setSuccess);
    }
  };

  return (
    <div className="AppContainer">
      <div className="Tabs">
        <Tabs
          defaultActiveKey={tab}
          id="auth-tab"
          onSelect={async (value) => await setTab(value)}
        >
          <Tab eventKey="Login" title="Login"></Tab>
          <Tab eventKey="Register" title="Register"></Tab>
        </Tabs>
      </div>
      <div className="AuthBox">
        {tab === "Register" && (
          <div>
            {success === true && error === false && (
              <Alert variant={"success"}>successfully created</Alert>
            )}
            {error === true && success === false && (
              <Alert variant={"danger"}>Invalid</Alert>
            )}
          </div>
        )}

        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="username"
            placeholder="Enter username"
            defaultValue={username}
            onChange={(target) => setUsername(target.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            defaultValue={password}
            onChange={(target) => setPassword(target.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Remember me" />
        </Form.Group>
        <Button variant="primary" className="AuthButton" onClick={submit}>
          {tab}
        </Button>
      </div>
    </div>
  );
}
