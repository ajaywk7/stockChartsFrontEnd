import React, { useEffect } from "react";
import { Container, Button, Form } from "react-bootstrap";
import { getCompanies } from "../../api/companyApi";
import { getCompanyDetails } from "../../api/stockDetailsApi";
import SingleSeries from "../../components/charts/SingleSeries";
import TimeChart from "../../components/charts/TimeChart";
import DateTimePicker from "react-datetime-picker";

import "../styles.css";
import { getSectors } from "../../api/sectorsApi";

const initialOptionData = {
  data1: {},
  data2: {},
  st: new Date(Date.now()).toISOString(),
  et: new Date(Date.now()).toISOString(),
};

export default function ComparePage(props) {
  const [option, setOption] = React.useState();
  const [optionData, setOptionData] = React.useState(initialOptionData);
  const [view, setView] = React.useState(false);
  const [company1, setCompany1] = React.useState();
  const [company2, setCompany2] = React.useState();
  const [companies, setCompanies] = React.useState([]);
  const [sectors, setSectors] = React.useState([]);

  const showView = async () => {
    setView(true);
  };

  const hideView = async () => {
    setView(false);
  };

  useEffect(async () => {
    var response = await getCompanies();
    if (response.error !== true) {
      await setCompanies(response.message);
    }
    var response = await getSectors();
    if (response.error !== true) {
      await setSectors(response.message);
    }
    // await setCompany1(
    //   await getCompanyDetails(
    //     3,
    //     "2019-06-06T18:20:00",
    //     "2020-02-01T18:20:00",
    //     "copmpany1"
    //   )
    // );
    // await setCompany2(
    //   await getCompanyDetails(
    //     4,
    //     "2019-06-06T18:20:00",
    //     "2020-02-01T18:20:00",
    //     "copmpany2"
    //   )
    // );
  }, []);

  useEffect(() => {
    console.log(companies);
  }, [companies]);

  const generateCharts = async () => {
    if (option === "0" || option === "2") {
      await setCompany1(
        await getCompanyDetails(
          optionData.data1,
          optionData.st.substring(0, optionData.st.length - 1),
          optionData.et.substring(0, optionData.et.length - 1),
          companies.filter(
            (data) => data.id.toString() === optionData.data1.toString()
          )[0].companyName
        )
      );
    }
    if (option === "2") {
      await setCompany2(
        await getCompanyDetails(
          optionData.data2,
          optionData.st.substring(0, optionData.st.length - 1),
          optionData.et.substring(0, optionData.et.length - 1),
          companies.filter(
            (data) => data.id.toString() === optionData.data2.toString()
          )[0].companyName
        )
      );
    }
    await showView();
  };

  return (
    <Container fluid className="BodyContainer">
      {view === false && (
        <div className="CompareBox">
          <h5 className="text-uppercase font-weight-bolder">Analyse</h5>
          <div className="p-2">
            <select
              className="form-select"
              defaultValue={-1}
              onChange={async (t) => {
                await setOption(t.target.value);
              }}
            >
              <option value={-1} disabled>
                select option
              </option>
              <option value={0}>Single company</option>
              <option value={2}>Multiple Company</option>
            </select>

            <div>
              {(option === "0" || option === "2") && (
                <div>
                  <span className="very-small">select company :</span>

                  <select
                    className="form-select"
                    defaultValue={-1}
                    onChange={async (t) => {
                      var temp = Object.assign({}, optionData);
                      temp.data1 = t.target.value;

                      await setOptionData(temp);
                    }}
                  >
                    <option value={-1} disabled>
                      select Company
                    </option>
                    {companies.map((key, index) => {
                      return <option value={key.id}>{key.companyName}</option>;
                    })}
                  </select>
                </div>
              )}
              {(option === "1" || option === "3") && (
                <div>
                  <span className="very-small">select sector :</span>

                  <select
                    className="form-select"
                    defaultValue={-1}
                    onChange={async (t) => {
                      var temp = Object.assign({}, optionData);
                      temp.data1 = t.target.value;

                      await setOptionData(temp);
                    }}
                  >
                    <option value={-1} disabled>
                      select sector
                    </option>
                    {sectors.map((key, index) => {
                      return <option value={key.id}>{key.name}</option>;
                    })}
                  </select>
                </div>
              )}
              {option === "2" && (
                <div>
                  <span className="very-small">select other company:</span>

                  <select
                    className="form-select"
                    defaultValue={-1}
                    onChange={async (t) => {
                      var temp = Object.assign({}, optionData);
                      temp.data2 = t.target.value;
                      console.log(t.target.value);
                      await setOptionData(temp);
                    }}
                  >
                    <option value={-1} disabled>
                      select Company
                    </option>
                    {companies.map((key, index) => {
                      return <option value={key.id}>{key.companyName}</option>;
                    })}
                  </select>
                </div>
              )}
              <span className="very-small">start time :</span>
              <DateTimePicker
                className="w-100"
                value={new Date(optionData.st)}
                onChange={async (time) => {
                  await setOptionData({
                    ...optionData,
                    st: time.toISOString(),
                  });
                }}
              />
              <br />
              <span className="very-small">end time :</span>
              <DateTimePicker
                className="w-100"
                value={new Date(optionData.et)}
                onChange={async (time) => {
                  await setOptionData({
                    ...optionData,
                    et: time.toISOString(),
                  });
                }}
              />
            </div>
          </div>
          <div style={{ paddingTop: 10, paddingLeft: 3, paddingRight: 3 }}>
            <Button
              className="AddButton w-100 mt-3 mb-2"
              onClick={generateCharts}
            >
              Generate charts
            </Button>
          </div>
        </div>
      )}

      {view === true && (
        <div className="h-70 p-5 d-flex-row justify-content-center align-items-center">
          <Button onClick={hideView}>Go back</Button>
          {/*  */}
          {option === "0" && <SingleSeries data={company1} />}
          {option === "2" && <TimeChart data={[company1, company2]} />}
        </div>
      )}
    </Container>
  );
}
