import React, { useState } from "react";

import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function MultipleSelect({ names }) {
  const [selectedChartTypes, setSelectedChartTypes] = useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedChartTypes(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <FormControl sx={{ width: "100%", mt: 1 }}>
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
        {names.map((name) => (
          <MenuItem key={name} value={name}>
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
