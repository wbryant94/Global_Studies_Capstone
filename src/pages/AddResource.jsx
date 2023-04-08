import React, { useState } from "react";
import axios from "axios";
import { UNCADepartmentsArray } from "../data/UNCADepartmentsArray.js";
import MultiSelect from "../components/UI/CountryMultiSelect";
import Select from "react-select";
import AddResourceStyle from "./AddResourceStyle.module.css";
import TextArea from "antd/es/input/TextArea.js";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { red } from "@mui/material/colors";
import Alert from "@mui/material/Alert";
import CountryMultiSelect from "../components/UI/CountryMultiSelect"

/* In order to populate both the resource and professor tables, the professor is created so that the 
professor_id PK may then be used as the FK in the resource table - 
TODO: Implement duplicate checks on the backend for professors 
 */

// Initial form adds professor, resource entry requires prof id (FK )
const AddResource = () => {
  // for professor add
  const [inputs, setInputs] = useState({
    fname: "",
    lname: "",
    department: "",
    description: "",
    email: "",
    image:
      "https://as2.ftcdn.net/v2/jpg/02/19/63/31/1000_F_219633151_BW6TD8D1EA9OqZu4JgdmeJGg4JBaiAHj.jpg",
  });

  const [country, setCountry] = useState([]);
  const [err, setErr] = useState(null);
  const [success, setSuccess] = useState(false);
  const [emailErr, setEmailErr] = useState(false);
  const [isSearchable, setIsSearchable] = useState(true);
  const options = UNCADepartmentsArray.slice(1);



  
  // For React-select for departments

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCountryChange = (e) => {
    setCountry(e.target);
  };

  const handleDepartmentChange = (option) => {
    setInputs((prev) => ({ ...prev, department: option.value }));
    console.log("updated department: ", inputs);
  };

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }
  const handleEmailChange = (e) => {
    if (!isValidEmail(e.target.value)) {
      setEmailErr(true);
    } else {
      setEmailErr(null);
    }

    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);
    console.log(country);
    if (!isValidEmail(inputs.email)) {
      setEmailErr(false);
      return;
    }

    try {
      await axios.post("http://localhost:8800/api/resources/professor", inputs);
    } catch (err) {
      setErr(err.response.data);
      return;
    }
    setSuccess(true);

    setTimeout(() => {
      console.log("Delayed for 4 second.");

      setInputs({
        fname: "",
        lname: "",
        department: "",
        description: "",
        email: "",
      });
      setCountry([]);
      setErr(null);
      setEmailErr(false);
      setSuccess(false)
    }, 4000);
  };

  return (
    <div className={AddResourceStyle.add}>
      {success && (
        <Alert severity="success">
          Successfull Added Professor and Connections!{" "}
        </Alert>
      )}
      <div className={AddResourceStyle.message}>
        <h1>Add New Professor and Connections</h1>
        <form
          onSubmit={handleFormSubmit}
          sx={{
            padding: 20,
          }}
        >
          <input
            type="text"
            name="fname"
            placeholder="first name"
            required
            onChange={handleChange}
            value={inputs.fname}
          />
          <input
            type="text"
            name="lname"
            placeholder="last name"
            required
            onChange={handleChange}
            value={inputs.lname}
          />
          <label>Department</label>
          <Select
            className="basic-single"
            classNamePrefix="select"
            defaultValue=""
            isSearchable={isSearchable}
            options={options}
            onChange={handleDepartmentChange}
            value={inputs.department}
            placeholder={inputs.department}
            autoFocus={true}
            menuPortalTarget={document.body}
            styles={{
              menuPortal: (base) => ({ ...base, zIndex: 401, minWidth: 200 }),
            }}
          />
          <TextArea
            type="text"
            name="description"
            placeholder="Description"
            required
            onChange={handleChange}
            value={inputs.description}
            maxLength="3000"
          />
          <CountryMultiSelect
            onChange={handleCountryChange}
            countryName={country}
            placeholder={inputs.countries}
            isSearchable={isSearchable}
            required
          />
          <input
            type="text"
            name="email"
            placeholder="email"
            required
            onChange={handleEmailChange}
            value={inputs.email}
          />
          {emailErr && <p> Error: Invalid Email Formatting </p>}

          <input
            type="text"
            name="image"
            placeholder="photo"
            onChange={handleChange}
            value={inputs.image}
          />
          <button onClick={handleFormSubmit}>Submit </button>
          {err && (
            <Button variant="outlined">
              <Link
                to={"/resources/edit"}
                state={err.professor}
                sx={{ color: red[800] }}
              >
                <p> Error: {err.message}</p>
              </Link>
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddResource;
