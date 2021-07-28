import FusionCharts from "fusioncharts";
import charts from "fusioncharts/fusioncharts.charts";
import React, { useEffect, useState } from "react";
import ReactFusioncharts from "react-fusioncharts";

// Resolves charts dependancy
charts(FusionCharts);

const initialdata = {
  chart: {
    caption: "Company stock price",
    yaxisname: "stock price",
    // subcaption: "2012-2016",
    numberprefix: "Rs ",
    rotatelabels: "1",
    setadaptiveymin: "1",
    theme: "fusion",
  },
  data: [
    {
      label: "2005",
      value: "89.45",
    },
  ],
};

const sortDates = (a, b) => {
  return Date.parse(a) < Date.parse(b) ? -1 : 1;
};

var getDaysArray = function (s, e) {
  for (var a = [], d = new Date(s); d <= e; d.setDate(d.getDate() + 1)) {
    a.push(new Date(d).toLocaleDateString());
  }
  return a;
};

export default function SingleSeries(props) {
  const [datasource, setDatasource] = useState({});

  const prepareData = async () => {
    var keys = Object.keys(props.data);
    keys = keys.sort(sortDates);
    keys = getDaysArray(Date.parse(keys[0]), Date.parse(keys[keys.length - 1]));
    var data = [];
    keys.map((key) => {
      data.push({
        label: props.data[key][0],
        value: props.data[key][1],
      });
    });
    var tempdatasource = Object.assign({}, initialdata);
    tempdatasource.data = data;
    await setDatasource(tempdatasource);
    // });

    // props.data[0].map((data) => {});
    // console.log([company1, company2]);
  };

  useEffect(async () => {
    console.log(props.data);
    console.log("check");
    await prepareData();
  }, [props.data]);

  useEffect(async () => {
    console.log(datasource);
  }, [datasource]);

  return (
    <ReactFusioncharts
      type="line"
      width="100%"
      height="80%"
      dataFormat="JSON"
      dataSource={datasource}
    />
  );
}
