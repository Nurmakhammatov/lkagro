import ReactECharts from "echarts-for-react";
import { useEffect, useState } from "react";

const FieldChart = () => {
  const [time, setTime] = useState([]);
  const [chiqishArr, setChiqishArr] = useState([]);
  const [kirishArr, setKirishArr] = useState([]);
  const [chiqish, setChiqish] = useState([]);
  const [kirish, setKirish] = useState([]);

  const options = {
    title: {
      text: "",
      textStyle: {
        fontSize: 20,
        fontWeight: "bolder",
      },
    },
    color: ["#7367f0", "#03a9f4"],
    tooltip: {
      trigger: "axis",
      axisPointer: {
        animation: false,
        label: {
          backgroundColor: "#6a7985",
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
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: [
      {
        type: "category",
        boundaryGap: false,
        data: time,
        axisLabel: {
          rotate: 45,
          formatter: "{value}",
          textStyle: {
            fontSize: "10px",
            letterSpacing: "30px",
          },
        },
      },
    ],
    yAxis: [
      {
        type: "value",
        axisLabel: {
          formatter: "{value}",
          textStyle: {
            fontSize: "12px",
            letterSpacing: "30px",
          },
        },
      },
    ],
    series: [
      {
        smooth: true,
        name: "",
        type: "line",
        label: {
          show: false,
          position: "bottom",
        },
        areaStyle: {
          opacity: 0,
        },
        emphasis: {
          focus: "series",
        },
        data: kirishArr,
        symbol: "circle",
        symbolSize: 10,
      },
      {
        smooth: true,
        name: "",
        type: "line",
        label: {
          show: false,
          position: "top",
        },
        areaStyle: {
          opacity: 0,
        },
        emphasis: {
          focus: "series",
        },
        data: chiqishArr,
        symbol: "circle",
        symbolSize: 10,
      },
    ],
  };

  const [total, setTotal] = useState(0);
  const [pending, setPending] = useState(1);

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

  // const onChartLegendselectchanged = (param) => {
  //   const keys = Object.keys(param.selected)
  //   setKirishCond(param.selected[keys[0]])
  //   setChiqishCond(param.selected[keys[1]])
  // }

  return (
    <>
      <div>
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
          //   theme={"theme_name"}
        />
      </div>
    </>
  );
};

export default FieldChart;
