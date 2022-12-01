import React, { useContext, useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
//import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../App";

const theme = createTheme();

export default function Login() {
  const [token, setToken] = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedUser, setLoggedUser] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    //
    //http://localhost:5000/api/user/login
    await axios
      .post(
        `https://backend-tech-foring-production.up.railway.app/api/user/login`,
        {
          email,
          password,
        }
      )
      .then((res) => {
        setToken(res.data.token);
        localStorage.setItem("token", res.data.token);
        //console.log(res);
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

//http://localhost:5000/api/user/jwt-token
    await axios
      .post(`https://backend-tech-foring-production.up.railway.app/api/user/jwt-token`, {
        token: localStorage.getItem("token"),
      })
      .then((res) => {
        setLoggedUser(res.data.name);

        console.log(res.data.name);
      })
      .catch((err) => {
        localStorage.removeItem("token");
        setLoggedUser("");
      });

    console.log(loggedUser);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            {/* <LockOutlinedIcon /> */}
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            {error && <Typography color="red">{errorMsg}</Typography>}
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link to="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
