import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Grid } from "@mui/material";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function EditJob() {
  const location = useLocation();

  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [name, setName] = useState(location.state.categoryWize.name);
  const [overview, setOverview] = useState(
    location.state.categoryWize.overview
  );
  const [responsibility, setResponsibility] = useState(
    location.state.categoryWize.responsibility
  );
  const [requirement, setRequirement] = useState(
    location.state.categoryWize.requirement
  );
  const [salary, setSalary] = useState(location.state.categoryWize.salary);
  const [category, setCategory] = useState(
    location.state.categoryWize.category
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    // http://localhost:5000/api/job/edit/${location.state.categoryWize._id}

    axios
      .put(
        `https://backend-tech-foring-production.up.railway.app/api/job/edit/${location.state.categoryWize._id}`,
        {
          name,
          overview,
          responsibility,
          requirement,
          category,
          salary,
        }
      )
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
      <h1>Edit Job </h1>
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
            color="primary"
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
            color="primary"
            focused
            id="outlined-multiline-static"
            label="overview"
            placeholder="overview"
            multiline
            rows={4}
            value={overview}
            onChange={(e) => setOverview(e.target.value)}
          />
          <br />
          <TextField
            color="primary"
            focused
            id="outlined-multiline-static"
            label="Responsibilities"
            multiline
            rows={4}
            value={responsibility}
            onChange={(e) => setResponsibility(e.target.value)}
          />
          <br />
          <TextField
            color="primary"
            focused
            id="outlined-multiline-static"
            label="Requirements"
            multiline
            rows={4}
            value={requirement}
            onChange={(e) => setRequirement(e.target.value)}
          />
          <TextField
            color="primary"
            focused
            id="outlined-multiline-static"
            label="Category"
            multiline
            rows={4}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <Grid item xs={8} sm={6}>
            <TextField
              color="primary"
              focused
              id="outlined-textarea"
              label="Salary"
              placeholder="salary"
              rows={4}
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
            />
          </Grid>
        </div>
        <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
          Edit Job
        </Button>
      </Box>
    </>
  );
}
