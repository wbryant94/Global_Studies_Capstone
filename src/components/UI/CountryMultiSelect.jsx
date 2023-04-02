import * as React from "react";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { countryArray } from "../../data/countryArray";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, countryName, theme) {
  return {
    fontWeight:
      countryName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelect(props) {
  const theme = useTheme();
  let countryList = [...new Set(countryArray)];

  return (
    <div>
      <FormControl sx={{ m: 2, width: 200 }}>
        <InputLabel id="demo-multiple-name-label">
          Selected Countries
        </InputLabel>
        <Select
          labelId="multiple-name-label"
          id="multiple-name"
          required
          multiple
          value={[...props.countryName]}
          onChange={props.onChange}
          input={<OutlinedInput label="Country" />}
          MenuProps={MenuProps}
        >
          {console.log("attempting to map")}
          {countryList.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, props.countryName, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
