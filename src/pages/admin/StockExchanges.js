import React, { useEffect } from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import { get } from "../utils/stockExchangeUtils";
import PagesContainer from "../../components/pagesContainer";
import { AddStockExchange } from "../../components/stockExchanges/AddStockExchange";

export default function StockExchanges(props) {
  const [stockExchanges, setStockExchanges] = React.useState([]);

  const refresh = async () => {
    await get(setStockExchanges, refresh);
  };

  useEffect(async () => {
    await refresh();
  }, []);

  const [add, setAdd] = React.useState(false);

  const showAdd = async () => {
    setAdd(true);
  };

  const hideAdd = async () => {
    setAdd(false);
  };

  return (
    <div className="BodyContainer">
      <Container className="CompaniesContainer pt-5">
        <Row>
          <Col>
            {" "}
            <h3 className=" text-uppercase">Stock Exchanges</h3>
          </Col>
          <Col className="d-flex justify-content-end align-items-top">
            <Button className=" AddButton" onClick={showAdd}>
              Add Stock Exchange
            </Button>
          </Col>
        </Row>
        {add === true && (
          <AddStockExchange refresh={refresh} hideAdd={hideAdd} />
        )}
        <div className="pt-3">
          <PagesContainer data={stockExchanges} />
        </div>
      </Container>
    </div>
  );
}
