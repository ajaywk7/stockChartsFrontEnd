import React, { useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import { AddCompany } from "../../components/company/AddCompany";
import PagesContainer from "../../components/pagesContainer";
import { get } from "../utils/companyUtils";
import "./styles.css";

export default function Companies(props) {
  const N = 5;
  const [companies, setCompanies] = React.useState([]);

  const refresh = async () => {
    await get(setCompanies, refresh, true);
  };

  useEffect(async () => {
    await refresh();
  }, []);

  useEffect(() => console.log(companies.length), [companies]);

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
            <h3 className=" text-uppercase">Companies</h3>
          </Col>
          <Col>
            <Button className="w-100" onClick={showAdd}>
              Add Company
            </Button>
          </Col>
        </Row>
        {add === true && <AddCompany refresh={refresh} hideAdd={hideAdd} />}
        <div className="pt-3">
          <PagesContainer data={companies} />
        </div>
      </Container>
    </div>
  );
}
