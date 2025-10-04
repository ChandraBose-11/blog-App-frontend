import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Dashboard from "./Pages/Dashboard";
import Project from "./Pages/Project";
import Signin from "./Pages/Signin";
import Signup from "./Pages/Signup";
import Header from "./Components/Header";
import FooterComp from "./Components/FooterComp";
import PrivateRoute from "./Components/PrivateRoute";
import OnlyAdminPrivateRoute from "./Components/OnlyAdminPrivateRoute";
import CreatePost from "./Pages/CreatePost";
import UpdatePost from "./Pages/UpdatePost";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route element={<OnlyAdminPrivateRoute />}>
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/update-post/:postId" element={<UpdatePost />} />
          </Route>

          <Route path="/project" element={<Project />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
        <FooterComp />
      </BrowserRouter>
    </div>
  );
};

export default App;
