import React, { useEffect, useState } from "react"
import OutlinedInput from "@mui/material/OutlinedInput"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"
import authApi from "../../../services/authService"
import { handleGetIndexes } from "../../../redux/features/sideBar/sideBarSlice"
import { useDispatch } from "react-redux"

export default function MultipleSelect({ indexesSelect }) {
  const [indexes, setIndexes] = useState([])
  useEffect(async () => {
    const { data } = await authApi.getStats()
    setIndexes(data.data.indexes)
  }, [])

  const dispatch = useDispatch()

  const handleChange = (event) => {
    const {
      target: { value }
    } = event
    dispatch(handleGetIndexes(typeof value === "string" ? value.split(",") : value))
  }

  return (
    <FormControl sx={{ width: "100%", mt: 2 }}>
      <InputLabel id="demo-multiple-name-label">Индекс</InputLabel>
      <Select labelId="demo-multiple-name-label" id="demo-multiple-name" value={indexesSelect} onChange={handleChange} input={<OutlinedInput label="Индекс" sx={{ width: "100%" }} />}>
        {indexes?.map((name) => (
          <MenuItem
            style={{
              backgroundColor: indexesSelect.includes(name.index_name) && "#fad652"
            }}
            key={name.index_name}
            value={name.index_name}
          >
            {name.index_name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
