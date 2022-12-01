import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import CameraIcon from "@mui/icons-material/PhotoCamera";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useLocation, useNavigate } from "react-router-dom";

const theme = createTheme();

export default function SingleJob() {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <ThemeProvider theme={theme}>
      <main>
        <Box
          sx={{
            bgcolor: "background.paper",
          }}
        >
          <Container maxWidth="bg" sx={{ mt: 3, mb: 2 }}>
            <Typography component="h1" variant="h2" color="text.secondary">
              {location.state.categoryWize.name}
            </Typography>
            <Typography variant="h6" color="" paragraph>
              <h2>Overview</h2>
              {location.state.categoryWize.overview}
            </Typography>
            <Typography variant="h6" color="" paragraph>
              <h2>Responsibility</h2>
              {location.state.categoryWize.responsibility}
            </Typography>
            <Typography variant="h6" color="" paragraph>
              <h2>Requirement</h2>
              {location.state.categoryWize.requirement}
            </Typography>
            <Typography variant="h6" color="" paragraph>
              <h2>Salary:</h2>
              {location.state.categoryWize.salary}
            </Typography>
            <Button variant="contained" onClick={() => navigate("/")}>
              Back to the home
            </Button>
            {"   "}
          </Container>
        </Box>
      </main>
    </ThemeProvider>
  );
}
