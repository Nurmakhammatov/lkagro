import ReactECharts from "echarts-for-react"

const FieldChart = ({ chartData, getChartDetailByPoints }) => {
  localStorage.setItem("chartLength", chartData?.[0]?.analysis.length)

  const options = {
    title: {
      text: "",
      textStyle: {
        fontSize: 20,
        fontWeight: "bolder"
      }
    },

    color: ["#45a746"],
    tooltip: {
      formatter: (params) => {
        let tooltip
        chartData?.[0]?.analysis.map((d, index) => {
          if (index === params.dataIndex) {
            tooltip = `<div style="display: flex; justify-content: space-between; flex-direction: column" class='tooltip-key'><div style="display: flex; justify-content: space-between"> ${"Мин"}
            <span style="margin: 0px 20px 0px 0px"> ${" - "}${d.min}</div>
            <div style="display: flex; justify-content: space-between"> ${"Ўрта "}
            <span style="margin: 0px 20px 0px 0px"> ${" - "}${d.mean}</div>
            <div style="display: flex; justify-content: space-between"> ${"Макс "}
            <span style="margin: 0px 20px 0px 0px"> ${"  - "}${d.max}</div>
            </div>`
          }
        })
        return tooltip
      },
      trigger: "item",
      axisPointer: {
        animation: false,
        label: {
          backgroundColor: "black"
        }
      }
    },
    legend: {
      data: [],
      textStyle: {
        fontSize: 40,
        fontFamily: "sans-serif"
      }
    },
    grid: {
      left: "2%",
      right: "2%",
      top: "10%",
      bottom: "0%",
      containLabel: true
    },
    xAxis: [
      {
        type: "category",
        boundaryGap: false,
        data: chartData?.[0]?.analysis?.map((d) => d.the_day),
        axisLabel: {
          formatter: "{value}",
          textStyle: {
            fontSize: "10px",
            letterSpacing: "30px",
            color: "black"
          }
        }
      }
    ],
    yAxis: [
      {
        type: "value",
        axisLabel: {
          formatter: "{value}",
          textStyle: {
            fontSize: "12px",
            letterSpacing: "30px",
            color: "black"
          }
        }
      }
    ],
    series: [
      {
        smooth: true,
        type: "line",
        label: {
          show: false,
          position: "bottom"
        },

        lineStyle: { color: "#45a746" },
        areaStyle: {
          opacity: 0,
          color: "black"
        },
        emphasis: {
          focus: "series"
        },
        data: chartData?.[0]?.graph.map((d) => d),
        symbol: "circle",
        symbolSize: 10,
        markPoint: { itemStyle: { color: "red" } }
      }
    ]
  }

  const onChartLegendselectchanged = (param) => {
    chartData?.[0]?.analysis.map((d, index) => {
      if (index === param.fromActionPayload.dataIndexInside) {
        getChartDetailByPoints(d.the_date, index, d.id)
      }
    })
  }

  return (
    <>
      <div style={{ height: "100%" }}>
        <ReactECharts theme="dark_theme" option={options} style={{ height: "100%" }} onEvents={{ selectChanged: onChartLegendselectchanged }} />
      </div>
    </>
  )
}

export default FieldChart
