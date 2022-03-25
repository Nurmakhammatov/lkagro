import React from "react";
import ButtonPrimary from "../Button";
import Pen from "../../../assets/signature.png";

const DrawArea = () => {
  return (
    <div>
      <div>
        <img style={{ width: 48, height: 48 }} src={Pen} alt="Pen" />
      </div>
      <ButtonPrimary title={"Maydon chizish"} />
    </div>
  );
};

export default DrawArea;
