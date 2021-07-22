import React, { useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { getIpos } from "../../api/companyApi";
import Ipo from "../../components/Ipo/Ipo";
import PagesContainer from "../../components/pagesContainer";

export default function Ipos(props) {
  const [ipos, setIpos] = React.useState([]);

  const refresh = async () => {
    var response = await getIpos();
    var result = [];
    if (response.error !== true) {
      result = response.message.map((data) => {
        return <Ipo key={data.id} data={data} refresh={refresh} admin={true} />;
      });
      setIpos(result);
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
      <Container className="CompaniesContainer">
        <Row className="pt-4">
          <Col>
            {" "}
            <h3 className=" text-uppercase">Ipos</h3>
          </Col>
          <Col>
            <Button className="w-100" onClick={showAdd}>
              Add Ipo
            </Button>
          </Col>
        </Row>
        {/* {add === true && <AddCompany refresh={refresh} hideAdd={hideAdd} />} */}
        <div className="pt-3">
          <PagesContainer data={ipos} />
        </div>
      </Container>
    </div>
  );
}
