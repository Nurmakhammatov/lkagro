import { TextField } from "@mui/material";
import React from "react";

const Inputs = ({ id, name, label, value, onChange, error, helpertext }) => {
  return (
    <TextField
      fullWidth
      id={id}
      name={name}
      label={label}
      value={value}
      onChange={onChange}
      error={error}
      helpertext={helpertext}
    />
  );
};

export default Inputs;
