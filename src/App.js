import "./App.css";
import React, { createContext, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import Job from "./pages/Job/Job";
import EditJob from "./pages/Job/EditJob";
import Navbar from "./Component/Navbar";
import PrivateRoute from "./route/PrivateRoute";
import axios from "axios";
import SingleJob from "./pages/Job/SingleJob";
export const AuthContext = createContext();
function App() {
  const [token, setToken] = useState("");
  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  console.log(token);
  return (
    <div className="App">
      <AuthContext.Provider value={[token, setToken]}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route
              path="/addjob"
              element={
                <PrivateRoute token={token}>
                  <Job />
                </PrivateRoute>
              }
            />
            <Route
              path="/editjob/:id"
              element={
                <PrivateRoute token={token}>
                  <EditJob />
                </PrivateRoute>
              }
            />

            <Route
              path="/singlejob/:id"
              element={
                <PrivateRoute token={token}>
                  <SingleJob />
                </PrivateRoute>
              }
            />

            {/* <Route path="/addjob" element={<Job />} /> */}
            {/* <Route path="/editjob/:id" element={<EditJob />} /> */}
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
