import React, { useEffect } from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import PagesContainer from "../../components/pagesContainer";
import StockExchange from "../../components/stockExchanges/StockExchange";
import { AddStockExchange } from "../../components/stockExchanges/AddStockExchange";
import "./styles.css";
import { getSectors } from "../../api/sectorsApi";

export default function Sectors(props) {
  const [sectors, setSectors] = React.useState([]);

  const refresh = async () => {
    var response = await getSectors();
    var result = [];
    if (response.error !== true) {
      result = response.message.map((data) => {
        return <StockExchange key={data.id} data={data} refresh={refresh} />;
      });
      setSectors(result);
    }
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
            <h3 className=" text-uppercase">Sectors</h3>
          </Col>
          <Col className="d-flex justify-content-end align-items-top">
            <Button className=" AddButton" onClick={showAdd}>
              Add Sector
            </Button>
          </Col>
        </Row>
        {add === true && (
          <AddStockExchange refresh={refresh} hideAdd={hideAdd} sector={true} />
        )}
        <div className="pt-3">
          <PagesContainer data={sectors} />
        </div>
      </Container>
    </div>
  );
}
