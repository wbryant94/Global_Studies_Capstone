import React, { useEffect, useState } from "react";
import moment from "moment";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { UNCADepartmentsArray } from "../data/UNCADepartmentsArray.js";
import CountryMultiSelect from "../components/UI/CountryMultiSelect";
import Select from "react-select";
import AddResourceStyle from "./AddResourceStyle.module.css";
import { Card, InputLabel, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import TextArea from "antd/es/input/TextArea.js";
import Alert from "@mui/material/Alert";


/* In order to populate both the resource and professor tables, the professor is created so that the 
professor_id PK may then be used as the FK in the resource table - 
TODO: Implement duplicate checks on the backend for professors 
 */

// Initial form adds professor, resource entry requires prof id (FK )
const EditResource = (props) => {
  const location = useLocation();
  const propsData = location.state;
  const professor_id = propsData.professor_id;

  // for professor add
  const [inputs, setInputs] = useState({ ...propsData });
  const [countries, setCountries] = useState([]);
  const [err, setErr] = useState(null);
  const [success, setSuccess] = useState(false);
  /*   const [file, setFile] = useState(null); */

  // For React-select for departments
  const [isSearchable, setIsSearchable] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8800/api/resources/professor/" + professor_id
        );
        // ^ Gets Professor / country connections by professor_id //
        setCountries(
          res.data.map((country) => ({
            value: country.country_id,
            label: country.name,
          }))
        );
      } catch (err) {
        console.log("Error: ", err);
      }
    };
    fetchData();
  }, []);

  /* 
  TO DO - ADD IMAGE UPLOADING FOR HEADSHOTS 
  const upload = async () => {
    try {
      const formData = new FormData();
      formData.set("file", file);
      const res = await axios.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }; */

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, description: e.target.value }));
  };



  const handleCountryChange = (e) => {
    setCountries(e);
  };

  const handleDepartmentChange = (option) => {
    setInputs((prev) => ({ ...prev, department: option.value }));
    /*    
    setInputs({department: option.value }) */
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log("inputs sent:", inputs);
    console.log("countries sent:", countries);

    try {
      const res = await axios.put(
        "http://localhost:8800/api/resources/professor/" + professor_id,
        inputs
      );

      await axios.put("http://localhost:8800/api/resources/" + professor_id, {
        countries,
        professor_id,
      });
    } catch (err) {
      console.log("error: ", err.response.data.message);
      alert(`Error: ${err.response.data.message}`);
      return;
    }
    setSuccess(true);

    setTimeout(() => {
      console.log("Delayed for 4 second.");
      setErr(null);
      setSuccess(false)
    }, 4000);
  };


  return (
    <>
      <div className={AddResourceStyle.add}>
        <Card
          sx={{
            justifyContent: "center",
            textAlign: "center",
            m: 10,
            padding: 10,
          }}
        >
          <Link to="/resources">
            <ArrowBackIcon sx={{ fontSize: "40px" }} />
          </Link>
          <Typography variant="h6" color="text.primary">
            Edit Professor Details / Connections
            {success && (
  <Alert severity="success">
    Successfull Added Professor and Connections!{" "}
  </Alert>
)}
          </Typography>
        </Card>
       
        <form onSubmit={handleFormSubmit}>
          <label>First Name</label>
          <input
            type="text"
            name="fname"
            placeholder="first name"
            required
            onChange={handleChange}
            value={inputs.fname}
          />
          <label>Last Name</label>
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
            placeholder={inputs.department}
            label="test"
            isSearchable={isSearchable}
            options={UNCADepartmentsArray}
            onChange={handleDepartmentChange}
            value={inputs.department}
            autoFocus={true}
            menuPortalTarget={document.body}
            styles={{
              menuPortal: (base) => ({ ...base, zIndex: 401, minWidth: 400 }),
            }}
          />
          <InputLabel>Description</InputLabel>
          <TextArea
            name="description"
            placeholder="Professor Summary / Description"
            required
            onChange={handleChange}
            value={inputs.description}
            default=""
            styles={{
              maxWidth: 400,
              padding: 5,
              margin: 10,
            }}
           
          />
          <label>Country Connections</label>
          <CountryMultiSelect
            onChange={handleCountryChange}
            value={countries}
          />
          <label>Email</label>
          <input
            type="text"
            name="email"
            placeholder="email"
            required
            onChange={handleChange}
            value={inputs.email}
          />
          <label>Image</label>
          <input
            type="text"
            name="image"
            placeholder="photo"
            onChange={handleChange}
            value={inputs.image}
          />
          <button type="submit">Update </button>
        </form>
        {err && <Card> {err.message}</Card>}
      </div>
    </>
  );
};

export default EditResource;
