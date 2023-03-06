import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import axios from "axios";

const url1 = "https://run.mocky.io/v3/a55c4590-c635-49af-a01f-7ee2e6a85669";
const url2 = "https://run.mocky.io/v3/7ec8da10-b0ee-4016-86a0-100925968a0c";
function Form() {
  const [formInput, setFormInput] = useState([]);
  const fetchData = async () => {
    try {
      const response = await axios.get(url2);
      //   console.log(response.data);
      setFormInput(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  if (formInput.length === 0) {
    return <h2>Loading....</h2>;
  }
  return (
    <Box sx={{ margin: "auto" }}>
      {console.log("Input", formInput)}
      <FormControl action="" sx={{ gap: 3, width: 1 }}>
        <h1>React Dynamic Form</h1>
        {formInput.map((val, idx) => {
          const form_type = val?.ui_element_type;
          switch (form_type) {
            case "input_text":
              return (
                <div key={idx}>
                  {/* <label htmlFor={val.id}>{val.name}</label> */}
                  <TextField
                    label={val.name}
                    name={val.name}
                    id={val.id}
                    defaultValue={val.defaultVal}
                    variant="filled"
                  />
                </div>
              );

            case "input_number":
              return (
                <div key={idx}>
                  {/* <label htmlFor={val.id}>{val.name}</label> */}
                  <TextField
                    label={val.name}
                    type="number"
                    name={val.name}
                    id={val.id}
                    defaultValue={val.defaultVal}
                    min={val.min}
                    max={val.max}
                    variant="filled"
                  />
                </div>
              );

            case "input_radio":
              return (
                <FormControl key={idx}>
                  <FormLabel id={val.id}>{val.name}</FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby={val.id}
                    name={val.name}
                    defaultValue={val.defaultVal}
                    // sx={{ justifyContent: "center" }}
                  >
                    {val.data.map((ele, idx) => {
                      return (
                        <FormControlLabel
                          key={idx}
                          value={ele.id}
                          label={ele.name}
                          control={<Radio />}
                        />
                      );
                    })}
                  </RadioGroup>
                </FormControl>
              );

            // case "input_dropdown":
            //   return (
            //     <div key={idx}>
            //       <label htmlFor={val.id}>{val.name}:</label>
            //       <select
            //         name={val.name}
            //         id={val.id}
            //         defaultValue={val.defaultVal}
            //       >
            //         {val.data.map((data, index) => {
            //           return (
            //             <option key={index} value={data.id}>
            //               {data.name}
            //             </option>
            //           );
            //         })}
            //       </select>
            //     </div>
            //   );

            default:
              return null;
          }
        })}
        {/* <button type="submit">Submit</button> */}
      </FormControl>
    </Box>
  );
}

export default Form;
