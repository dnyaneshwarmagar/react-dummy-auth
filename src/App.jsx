
import "./App.css";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";
import {Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/profile" element={<Profile />} />          
      </Routes>
    </>
  );
}

export default App;
