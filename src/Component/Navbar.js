import React, { useContext, useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Search } from "@mui/icons-material";
import { AuthContext } from "../App";

export default function Navbar({ name }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = () => {
    setToken("");
    localStorage.removeItem("token");

    navigate("/");
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="center">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            {/* need logo  <MenuIcon /> */}
          </IconButton>

          {"  "}

          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            <Link to="/" style={{ color: "white", textDecoration: "none" }}>
              <Button color="inherit">Home</Button>
            </Link>
            <Link
              to="/addjob"
              style={{ color: "white", textDecoration: "none" }}
            >
              <Button color="inherit">Add Jobs</Button>
            </Link>
            {!token && (
              <>
                {" "}
                <Link
                  to="/login"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  <Button color="inherit">Login</Button>
                </Link>
                <Link
                  to="/register"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  <Button color="inherit">Register</Button>
                </Link>
              </>
            )}
          </Typography>
          {token && (
            <>
              <p style={{ fontSize: "20px" }}>{name}</p>
              {"  "}
              <Button color="inherit" onClick={logout}>
                Logout
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
