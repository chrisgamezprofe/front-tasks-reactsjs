import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import Docs from "./pages/Docs";
import NoPage from "./pages/NoPage";
import Layout from "./components/Layout";
import "semantic-ui-css/semantic.min.css";
import Task from "./components/Task";
import TasksForm from "./components/TasksForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/new" element={<TasksForm />} />
          <Route path="/find/:idTask" element={<TasksForm />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
