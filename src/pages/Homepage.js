import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import aCompanies from "./admin/Companies";
import aIpos from "./admin/Ipos";
import aStockExchanges from "./admin/StockExchanges";
import ImportData from "./admin/ImportData";
import uCompanies from "./user/Companies";
import uIpos from "./user/Ipos";
import ComparePage from "./user/ComparePage";
import Sectors from "./admin/Sectors";

import "./styles.css";

export default function Homepage(props) {
  const { user, logout } = React.useContext(AuthContext);
  const ADMIN = "admin";
  const USER = "user";
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        {user.role === ADMIN && (
          <Container>
            <Navbar.Brand href="">Admin Panel</Navbar.Brand>
            <Nav className="ml-auto">
              <Nav.Link href="/">Import</Nav.Link>
              <Nav.Link href="/companies">Companies</Nav.Link>
              <Nav.Link href="/sectors">Sectors</Nav.Link>
              <Nav.Link href="/stockexchanges">Stock Exchanges</Nav.Link>
              <Nav.Link href="/ipos">IPO</Nav.Link>
              <Nav.Link href="/" onClick={logout}>
                {" "}
                Logout{" "}
              </Nav.Link>
            </Nav>
          </Container>
        )}
        {user.role === USER && (
          <Container>
            <Navbar.Brand href="">Stock Charts</Navbar.Brand>
            <Nav className="ml-auto">
              <Nav.Link href="">Upcoming IPOs</Nav.Link>
              <Nav.Link href="companies">Companies</Nav.Link>
              <Nav.Link href="compare">Compare</Nav.Link>
              <Nav.Link href="/" onClick={logout}>
                {" "}
                Logout{" "}
              </Nav.Link>
            </Nav>
          </Container>
        )}
      </Navbar>
      <BrowserRouter className="Body">
        {user.role === ADMIN && (
          <Switch>
            <Route exact path="/" component={ImportData} />
            <Route exact path="/companies" component={aCompanies} />
            <Route exact path="/ipos" component={aIpos} />
            <Route exact path="/sectors" component={Sectors} />
            <Route exact path="/stockexchanges" component={aStockExchanges} />
          </Switch>
        )}
        {user.role === USER && (
          <Switch>
            <Route exact path="/" component={uIpos} />
            <Route exact path="/companies" component={uCompanies} />
            <Route exact path="/compare" component={ComparePage} />
          </Switch>
        )}
      </BrowserRouter>
    </div>
  );
}
