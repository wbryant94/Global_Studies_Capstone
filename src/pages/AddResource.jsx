import React, { useState } from "react";
import axios from "axios";
import { countryArray } from "../data/countryArray.js";
import { UNCADepartmentsArray } from "../data/UNCADepartmentsArray.js";

import MultiSelect from "../components/UI/CountryMultiSelect";
import Select from 'react-select'
import AddResourceStyle from "./AddResourceStyle.module.css";

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

  // For React-select for departments 
  const [isSearchable, setIsSearchable] = useState(true);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log("inputs :",inputs)
  };

  const handleCountryChange = (e) => {
    setCountry(e.target.value);
  };

  const handleDepartmentChange = (option) => {
    setInputs((prev) => ({ ...prev, department: option.value }));
    console.log("updated department: ",inputs)
/*    
    setInputs({department: option.value }) */

  }



  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    console.log(country);

    fetch("http://localhost:8800/api/resources/professor", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputs),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.insertId);

        fetch("http://localhost:8800/api/resources/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            professor_id: data.insertId,
            country: country,
          }),
        })
          .then((response) => response.json())
          .then((data) => console.log(data))
          .catch((error) => console.error(error));
      })
      .catch((error) => console.error(error));

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

export default AddResource;
