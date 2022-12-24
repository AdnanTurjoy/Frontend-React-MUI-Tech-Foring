import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Grid } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Job() {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [name, setName] = useState("");
  const [overview, setOverview] = useState("");
  const [responsibility, setResponsibility] = useState("");
  const [requirement, setRequirement] = useState("");
  const [salary, setSalary] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    //http://localhost:5000/api/job/addjob
    axios
      .post(`https://backend-tech-foring.onrender.com/api/job/addjob`, {
        name,
        overview,
        responsibility,
        requirement,
        category,
        salary,
      })
      .then((res) => {
        navigate("/");
      })
      .catch((err) => {
        setError(true);
        setErrorMsg(err.response.data.error);
        setTimeout(() => {
          setError(false);
          setErrorMsg("");
        }, 3000);
      });
  };

  return (
    <>
      <h1>Add Job </h1>
      <hr />
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "55ch" },
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <div>
          <TextField
            color="success"
            focused
            id="outlined-textarea"
            label="Job name"
            placeholder="job name"
            rows={4}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <TextField
            color="success"
            focused
            id="outlined-multiline-static"
            label="overview"
            placeholder="overview"
            multiline
            rows={4}
            onChange={(e) => setOverview(e.target.value)}
          />
          <br />
          <TextField
            color="success"
            focused
            id="outlined-multiline-static"
            label="Responsibilities"
            multiline
            rows={4}
            onChange={(e) => setResponsibility(e.target.value)}
          />
          <br />
          <TextField
            color="success"
            focused
            id="outlined-multiline-static"
            label="Requirements"
            multiline
            rows={4}
            onChange={(e) => setRequirement(e.target.value)}
          />
          <TextField
            color="success"
            focused
            id="outlined-multiline-static"
            label="Category"
            multiline
            rows={4}
            onChange={(e) => setCategory(e.target.value)}
          />
          <Grid item xs={8} sm={6}>
            <TextField
              color="success"
              focused
              id="outlined-textarea"
              label="Salary"
              placeholder="salary"
              rows={4}
              onChange={(e) => setSalary(e.target.value)}
            />
          </Grid>
        </div>
        <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
          Add Job
        </Button>
      </Box>
    </>
  );
}
