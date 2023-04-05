import * as React from "react";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { countryArray } from "../../data/countryArray";
import axios from "axios";

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
  const [countryOptions, setCountryOptions] = React.useState([]);

  //get countries to select from //
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8800/api/resources/countries"
        );
        setCountryOptions([...res.data]);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const theme = useTheme();

  return (
    <div>
      <FormControl sx={{ m: 2, width: "auto", minWidth: 180 }}>
        <InputLabel id="demo-multiple-name-label">
          Selected Countries
        </InputLabel>
        <Select
          labelId="multiple-name-label"
          id="multiple-name"
          multiple
          value={[...props.countryName]}
          onChange={props.onChange}
          input={<OutlinedInput label="Country" />}
          MenuProps={MenuProps}
        >
          {countryOptions.map((country) => (
            <MenuItem
              key={country.country_id}
              value={country}
              style={getStyles(country.name, props.countryName, theme)}
            >
              {country.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
