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
            tooltip = `<div style="display: flex; justify-content: space-between; flex-direction: column; width: 110%; padding: 0px 10px 0px 0px" class='tooltip-key'>
            <div style="display: flex; justify-content: space-between"> 
            <span>Паст:</span>
            <span"> ${d.min}</span>
            </div>
            <div style="display: flex; justify-content: space-between">
            <span>Ўрта:</span>
            <span"> ${d.mean}</span>
            </div>
            <div style="display: flex; justify-content: space-between">
            <span>Юқори:</span>
            <span"> ${d.max}</span>
            </div>
            </div>`
          }
        })
        return tooltip
      },
      backgroundColor: "rgba(255, 255, 255, 0.7)",
      textStyle: {
        color: "#000"
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
        symbolSize: 10
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
