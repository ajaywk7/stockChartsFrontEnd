import FusionCharts from "fusioncharts";
import charts from "fusioncharts/fusioncharts.charts";
import React, { useEffect, useState } from "react";
import ReactFusioncharts from "react-fusioncharts";

// Resolves charts dependancy
charts(FusionCharts);

const initialdata = {
  chart: {
    caption: "Company stock price comparison",
    yaxisname: "stock price",
    subcaption: "2012-2016",
    showhovereffect: "1",
    numbersuffix: "%",
    drawcrossline: "1",
    plottooltext: "Rs <b>$dataValue</b> of  $seriesName 's stock ",
    theme: "candy",
  },
  categories: [
    {
      category: [],
    },
  ],
  dataset: [],
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

export default function TimeChart(props) {
  const [datasource, setDatasource] = useState({});

  const prepareData = async () => {
    var compan1keys = Object.keys(props.data[0]);
    var compan2keys = Object.keys(props.data[1]);
    var keys = [...compan1keys];
    compan2keys.map((data) => {
      !keys.includes(data) && keys.push(data);
    });
    keys = keys.sort(sortDates);
    var company1 = {
      seriesname:
        compan1keys.length > 0 ? props.data[0][compan1keys[0]][2] : "company1",
      data: [],
    };
    var company2 = {
      seriesname:
        compan2keys.length > 0 ? props.data[1][compan2keys[0]][2] : "company2",
      data: [],
    };
    var category = [];
    keys = getDaysArray(Date.parse(keys[0]), Date.parse(keys[keys.length - 1]));
    keys.map((key) => {
      company1.data.push(
        props.data[0][key]
          ? {
              value: props.data[0][key][1],
            }
          : {}
      );
      company2.data.push(
        props.data[1][key]
          ? {
              value: props.data[1][key][1],
            }
          : {}
      );
      category.push({
        label: key,
      });
    });
    var tempdatasource = Object.assign({}, initialdata);
    tempdatasource.categories[0].category = category;
    tempdatasource.dataset = [company1, company2];
    setDatasource(tempdatasource);
    // });

    // props.data[0].map((data) => {});
    // console.log([company1, company2]);
  };

  useEffect(async () => {
    console.log(props.data);
    await prepareData();
  }, [props.data]);

  useEffect(async () => {
    console.log(datasource);
  }, [datasource]);

  return (
    <ReactFusioncharts
      type="msline"
      width="100%"
      height="80%"
      dataFormat="JSON"
      dataSource={datasource}
    />
  );
}
