import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchInputs, handleInputChange } from "../store/formSlice";
import {
  Box,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
  TextField,
  MenuItem,
  Select,
  Button,
  Typography,
} from "@mui/material";

function Form() {
  const form = useSelector((state) => state.form);
  const inputs = form.inputs;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchInputs());
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        my: "5rem",
        width: 400,
        mx: "auto",
        py: "3rem",
        px: "5rem",
        backgroundColor: "primary",
        boxShadow: "2px 2px 3px 3px gray",
      }}
    >
      <FormControl
        sx={{ gap: 3, width: 1 }}
        onSubmit={(e) => {
          console.log(e.target);
          console.log("clicked");
        }}
      >
        <Typography variant="h3">Dynamic-Form</Typography>
        {form.loading && <div>Loading...</div>}
        {!form.loading && form.error ? <div>Error: {form.error}</div> : null}
        {inputs.map((value, index) => {
          const inputType = value?.ui_element_type;
          switch (inputType) {
            case "input_text":
              return (
                <TextField
                  key={index}
                  name={value.name}
                  label={value.name}
                  id={value.id}
                  defaultValue={value.defaultVal}
                  variant="standard"
                  type="text"
                  onChange={(events) =>
                    dispatch(
                      handleInputChange({
                        key: value.id,
                        val: events.target.value,
                      })
                    )
                  }
                />
              );

            case "input_number":
              return (
                <TextField
                  key={index}
                  name={value.name}
                  label={value.name}
                  id={value.id}
                  defaultValue={value.defaultVal}
                  InputProps={{
                    inputProps: { min: value.min, max: value.max },
                  }}
                  variant="standard"
                  type="number"
                  onChange={(events) =>
                    dispatch(
                      handleInputChange({
                        key: value.id,
                        val: events.target.value,
                      })
                    )
                  }
                />
              );

            case "input_radio":
              return (
                <FormControl
                  sx={{ flexDirection: "row", gap: "1rem" }}
                  key={index}
                >
                  <FormLabel
                    sx={{ alignSelf: "center" }}
                    variant="h5"
                    id={value.id}
                  >
                    {value.name}:
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby={value.id}
                    defaultValue={value.defaultVal}
                    name="radio-buttons-group"
                    sx={{ justifyContent: "center" }}
                  >
                    {value.data.map((opt, idx) => {
                      {
                        console.log(opt.id);
                      }
                      return (
                        <FormControlLabel
                          key={idx}
                          value={opt.id}
                          label={opt.name}
                          control={<Radio />}
                        />
                      );
                    })}
                  </RadioGroup>
                </FormControl>
              );

            case "input_dropdown":
              return (
                <FormControl key={index}>
                  <FormLabel variant="h5" id={value.id}>
                    {value.name}
                  </FormLabel>
                  <Select
                    aria-labelledby={value.id}
                    defaultValue={value.defaultVal}
                    inputProps={{ "aria-label": "Without label" }}
                  >
                    {value.data.map((select, idx) => {
                      return (
                        <MenuItem key={idx} value={select.id}>
                          {select.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              );
          }
        })}
        <Button variant="contained" type="submit" size="medium">
          Submit
        </Button>
      </FormControl>
    </Box>
  );
}

export default Form;
