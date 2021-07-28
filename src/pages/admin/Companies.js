import React, { useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import ReactPaginate from "react-paginate";
import { AddCompany } from "../../components/company/AddCompany";
import PagesContainer from "../../components/pagesContainer";
import { get, search } from "../utils/companyUtils";
import "./styles.css";

export default function Companies(props) {
  const N = 5;
  const [companies, setCompanies] = React.useState([]);
  const [text, setText] = React.useState("company1");

  const refresh = async () => {
    await setText("");
    await get(setCompanies, refresh, props.admin === false ? false : true);
    // await search(text, setCompanies, refresh);
  };

  const searchT = async () => {
    if (text != "") {
      await search(text, setCompanies, refresh);
    }
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
          <Col className="d-flex justify-content-end align-items-top">
            {props.admin !== false ? (
              <Button className=" AddButton" onClick={showAdd}>
                Add Company
              </Button>
            ) : (
              <InputGroup className="search">
                <FormControl
                  placeholder="search text"
                  aria-describedby="basic-addon2"
                  value={text}
                  onChange={(target) => {
                    setText(target.target.value);
                  }}
                />
                <Button
                  variant="outline-secondary"
                  id="button-addon2"
                  onClick={searchT}
                >
                  search
                </Button>
                <Button
                  variant="outline-secondary outline-none"
                  id="button-addon2"
                  onClick={async (e) => {
                    e.preventDefault();
                    await refresh();
                  }}
                >
                  clear
                </Button>
              </InputGroup>
            )}
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
