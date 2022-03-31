import ReactECharts from "echarts-for-react";
import { useEffect, useState } from "react";

const FieldChart = ({ chartData, getChartDetailByPoints }) => {
  const [time, setTime] = useState([]);
  const [chiqishArr, setChiqishArr] = useState([]);
  const [kirishArr, setKirishArr] = useState([]);
  const [chiqish, setChiqish] = useState([]);
  const [kirish, setKirish] = useState([]);

  localStorage.setItem("chartLength", chartData?.[0]?.analysis.length);

  const options = {
    title: {
      text: "",
      textStyle: {
        fontSize: 20,
        fontWeight: "bolder",
      },
    },

    color: ["#45a746"],
    tooltip: {
      formatter: (params) => {
        let tooltip;
        chartData?.[0]?.analysis.map((d, index) => {
          if (index === params.dataIndex) {
            tooltip = `<div style="display: flex; justify-content: space-between; flex-direction: column" class='tooltip-key'><div style="display: flex; justify-content: space-between"> ${"Мин"}
            <span style="margin: 0px 20px 0px 0px"> ${" - "}${d.min}</div>
            <div style="display: flex; justify-content: space-between"> ${"Ўрта "}
            <span style="margin: 0px 20px 0px 0px"> ${" - "}${d.mean}</div>
            <div style="display: flex; justify-content: space-between"> ${"Макс "}
            <span style="margin: 0px 20px 0px 0px"> ${"  - "}${d.max}</div>
            </div>`;
          }
        });
        return tooltip;
      },
      trigger: "item",
      axisPointer: {
        animation: false,
        label: {
          backgroundColor: "black",
        },
      },
    },
    legend: {
      data: [],
      textStyle: {
        fontSize: 40,
        fontFamily: "sans-serif",
      },
    },
    grid: {
      left: "2%",
      right: "2%",
      top: "10%",
      bottom: "0%",
      containLabel: true,
    },
    xAxis: [
      {
        type: "category",
        boundaryGap: false,
        data: chartData?.[0]?.analysis?.map((d) => d.the_day),
        axisLabel: {
          // rotate: 45,
          formatter: "{value}",
          textStyle: {
            fontSize: "10px",
            letterSpacing: "30px",
            color: "black",
          },
        },
      },
    ],
    yAxis: [
      {
        // min: 0,
        // max: 1,
        // interval: 0.1,
        type: "value",
        axisLabel: {
          formatter: "{value}",
          textStyle: {
            fontSize: "12px",
            letterSpacing: "30px",
            color: "black",
          },
        },
      },
    ],
    series: [
      {
        smooth: true,
        type: "line",
        label: {
          show: false,
          position: "bottom",
        },

        lineStyle: { color: "#45a746" },
        areaStyle: {
          opacity: 0,
          color: "black",
        },
        emphasis: {
          focus: "series",
        },
        data: chartData?.[0]?.graph.map((d) => d),
        symbol: "circle",
        symbolSize: 10,
        markPoint: { itemStyle: { color: "red" } },
      },
    ],
  };

  async function fetchNewData() {
    // try {
    //   const { data: apiData } = await dashboardApi.getPerimeterDaily(
    //     sendDate,
    //     dynamictimeType ? dynamictimeType?.value : timeType?.value
    //   );
    //   if (apiData) {
    //     setLoading(false);
    //     // setDayTimer(true)
    //   }
    //   if (apiData) setPending(0);
    //   let kirish = 0,
    //     chiqish = 0;
    //   const kirishArr = [],
    //     chiqishArr = [],
    //     xArr = [];
    //   apiData.data.forEach((d, i) => {
    //     if (i !== apiData.data.length) {
    //       kirish += +d.kirish;
    //       chiqish += +d.chiqish;
    //       kirishArr.push(d.kirish);
    //       chiqishArr.push(d.chiqish);
    //       if (apiData.data && apiData.data.length > 0) xArr.push(d.the_time);
    //     }
    //   });
    //   setTime(xArr);
    //   setChiqishArr(chiqishArr);
    //   setKirishArr(kirishArr);
    //   setChiqish(chiqish);
    //   setKirish(kirish);
    //   setTotal(chiqish + kirish);
    // } catch (error) {
    //   setLoading(false);
    // }
  }

  //   useEffect(() => {
  //     if (active === "1") fetchNewData();
  //   }, [sendDate, active]);

  //   useEffect(() => {
  //     if (active === "1") {
  //       if (pending === 0) {
  //         if (
  //           new Date(moment(sendDate[1], "DD/MM/YYYY HH:mm:ss")).valueOf() >
  //           moment(new Date()).valueOf()
  //         ) {
  //           const timer = setInterval(() => {
  //             fetchNewData();
  //           }, 10000);
  //           return () => clearInterval(timer);
  //         }
  //       }
  //     }
  //   }, [active, sendDate, pending]);

  const onChartLegendselectchanged = (param) => {
    chartData?.[0]?.analysis.map((d, index) => {
      if (index === param.fromActionPayload.dataIndexInside) {
        getChartDetailByPoints(d.the_date, index, d.id);
      }
    });
  };

  return (
    <>
      <div style={{ height: "100%" }}>
        {/* {active === "1" && <Timer name={intl.formatMessage({ id: "NtfsInfoModalGeneral" })} condition={dayTimer} />} */}
        {/* <h1
          style={{ position: "absolute", right: "5%", top: "10px" }}
        >{`${intl.formatMessage({
          id: "TableTotal",
        })}: ${new Intl.NumberFormat().format(total)}`}</h1> */}
        <ReactECharts
          theme="dark_theme"
          option={options}
          style={{ height: "100%" }}
          onEvents={{ selectChanged: onChartLegendselectchanged }}
          //   theme={"theme_name"}
        />
      </div>
    </>
  );
};

export default FieldChart;
