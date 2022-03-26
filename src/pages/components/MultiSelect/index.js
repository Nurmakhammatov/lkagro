import React, { useState } from "react";

import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useSelector } from "react-redux";

export default function MultipleSelect({
  setSelectedChartTypes,
  selectedChartTypes,
}) {
  const indexes = useSelector((state) => state.sideBarToggle.indexes);
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedChartTypes(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <FormControl sx={{ width: "100%", mt: 2 }}>
      <InputLabel id="demo-multiple-name-label">Танланг</InputLabel>
      <Select
        labelId="demo-multiple-name-label"
        id="demo-multiple-name"
        multiple
        value={selectedChartTypes}
        onChange={handleChange}
        input={<OutlinedInput label="Танланг" sx={{ width: "100%" }} />}
        // MenuProps={MenuProps}
      >
        {indexes?.[0].index.map((name) => (
          <MenuItem key={name} value={name}>
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
