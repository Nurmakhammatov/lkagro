import React from "react"
import ButtonPrimary from "../Button"
import Pen from "../../../assets/signature.png"
import { lfMapInstance } from "../../Map/BasicMap"

const DrawArea = ({ setOpen }) => {
  const handleDrawPolygon = () => {
    setOpen(false)
    lfMapInstance.lfMap.drawPolygon(true)
  }

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        padding: "0px 30px"
      }}
    >
      <div
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          alignItems: "center"
        }}
      >
        <img style={{ width: 48, height: 48 }} src={Pen} alt="Pen" />

        <ButtonPrimary onClick={handleDrawPolygon} title={"Майдон чизиш"} width={"100%"} minWidth={"100%"} />
      </div>
    </div>
  )
}

export default DrawArea
