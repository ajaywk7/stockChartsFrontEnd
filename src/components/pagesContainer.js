import React, { useEffect } from "react";
import ReactPaginate from "react-paginate";
import { Container } from "react-bootstrap";
import "./styles.css";

export default function PagesContainer(props) {
  const [N, setN] = React.useState((window.innerHeight - 200) / 100);
  const [total, setTotal] = React.useState();
  const [current, setCurrent] = React.useState();
  const [pageData, setPageData] = React.useState();

  useEffect(async () => {
    await setN((window.innerHeight - 200) / 100);
  }, [window.innerHeight]);

  useEffect(async () => {
    var offset = current * N;
    await setPageData(props.data.slice(offset, offset + N));
  }, [current]);

  useEffect(async () => {
    var total = total;
    var newtotal = Math.ceil(props.data.length / N);
    var offset = current * N;
    if (props.data.length < N) {
      offset = 0;
      await setCurrent(0);
    }

    await setTotal(newtotal);
    await setPageData(props.data.slice(offset, offset + N));
  }, [props.data]);

  return (
    <Container fluid className="p-0">
      {pageData && pageData.length < 1 && (
        <Container
          style={{
            height: "70vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 10,
            padding: 0,
          }}
        >
          <h4 className="text-secondary">No records found</h4>
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
