import * as React from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { FormHelperText } from "@mui/material";

const DropDown = ({ items, handleDropDownChange, value, error }) => {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth error={error ? true : false}>
        <Select
          value={value ?? ""}
          onChange={handleDropDownChange}
          labelId="demo-simple-select-error-label"
          id="demo-simple-select-error"
        >
          {items?.map((item) => (
            <MenuItem value={item} key={item?._id}>
              {item?.name}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>{error ? error : "Please select stock"}</FormHelperText>
      </FormControl>
    </Box>
  );
};

export default DropDown;
