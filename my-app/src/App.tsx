import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import { HomePage } from "./app/pages/Home";
import { ProjectsPage } from "./app/pages/Projects";
import { AboutPage } from "./app/pages/About";
import { ResumePage } from "./app/pages/Resume";
import { FunPage } from "./app/pages/Fun";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/projects" element={<ProjectsPage />} />
      <Route path="/resume" element={<ResumePage />} />
      <Route path="/fun" element={<FunPage />} />
    </Routes>
  );
};

export default App;
