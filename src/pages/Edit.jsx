import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { countryArray } from "../data/countryArray.js";
import { UNCADepartmentsArray } from "../data/UNCADepartmentsArray.js";
import MultiSelect from "../components/UI/CountryMultiSelect";
import Select from "react-select";
import AddResourceStyle from "./AddResourceStyle.module.css";

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
  const [country, setCountry] = useState([]);

  // For React-select for departments
  const [isSearchable, setIsSearchable] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8800/api/resources/" + professor_id
        );

        setCountry(
          res.data.map((item) => {
            return item.country;
          })
        );
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
 
  };

  const handleCountryChange = (e) => {
    setCountry(e.target.value);
  };

  const handleDepartmentChange = (option) => {
    setInputs((prev) => ({ ...prev, department: option.value }));
    console.log("updated department: ", inputs);
    /*    
    setInputs({department: option.value }) */
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    console.log(country);

    setInputs({
      fname: "",
      lname: "",
      department: "",
      description: "",
      email: "",
    });
  };

  return (
    <div className={AddResourceStyle.add}>
      <form onSubmit={handleFormSubmit} className={AddResourceStyle.form}>
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
        <Select
          className="basic-single"
          classNamePrefix="select"
          defaultValue=""
          isSearchable={isSearchable}
          options={UNCADepartmentsArray}
          onChange={handleDepartmentChange}
          value={inputs.department}
          autoFocus={true}
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          required
          onChange={handleChange}
          value={inputs.description}
        />
        <MultiSelect
          countries={countryArray}
          onChange={handleCountryChange}
          countryName={country}
        />
        <input
          type="text"
          name="email"
          placeholder="email"
          required
          onChange={handleChange}
          value={inputs.email}
        />
        <input
          type="text"
          name="image"
          placeholder="photo"
          required
          onChange={handleChange}
          value={inputs.image}
        />
        <button type="submit">Submit </button>
      </form>
    </div>
  );
};

export default EditResource;
