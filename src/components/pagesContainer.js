import React, { useEffect } from "react";
import ReactPaginate from "react-paginate";
import { Container } from "react-bootstrap";
import "./styles.css";

export default function PagesContainer(props) {
  const N = 5;
  const [total, setTotal] = React.useState();
  const [current, setCurrent] = React.useState(0);
  const [pageData, setPageData] = React.useState();

  useEffect(async () => {
    var offset = current * N;
    await setPageData(props.data.slice(offset, offset + N));
  }, [current]);

  useEffect(async () => {
    console.log("varthu");
    await setTotal(Math.ceil(props.data.length / N));
    var offset = current * N;
    await setPageData(props.data.slice(offset, offset + N));
  }, [props.data]);

  useEffect(() => console.log(pageData), [pageData]);

  return (
    <Container fluid className="p-0">
      {pageData && pageData.length < 1 && (
        <Container
          style={{
            height: "70vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            marginTop: 10,
            padding: 0,
          }}
        >
          No records found
        </Container>
      )}
      {pageData && pageData.length > 0 && (
        <Container
          style={{
            height: "70vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            marginTop: 10,
            padding: 0,
          }}
        >
          {pageData}
        </Container>
      )}

      <div className="d-flex">
        <ReactPaginate
          previousLabel={"prev"}
          nextLabel={"next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={total}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={(e) => setCurrent(e.selected)}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
        />
      </div>
    </Container>
  );
}
