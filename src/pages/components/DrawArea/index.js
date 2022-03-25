import React from "react";
import ButtonPrimary from "../Button";
import Pen from "../../../assets/signature.png";
import { lfMapInstance } from "../../Map/BasicMap";

const DrawArea = ({ setOpen }) => {
  const handleDrawPolygon = () => {
    setOpen(false);
    lfMapInstance.lfMap.drawPolygon(true);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        padding: "0px 30px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img style={{ width: 48, height: 48 }} src={Pen} alt="Pen" />
      </div>
      <p>
        lorem30sadfas dfas fasdf dasf dskjfk sdajkfhjka shdjk fhajksdh jkfhdsajk
      </p>
      <ButtonPrimary
        onClick={handleDrawPolygon}
        title={"Maydon chizish"}
        width={"100%"}
        minWidth={"100%"}
      />
    </div>
  );
};

export default DrawArea;
