import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import User from "./get-user/User";
import AddUser from "./add-user/AddUser";
import UpdateUser from "./update-user/UpdateUser";

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode !== null) {
      return savedMode === "true";
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    const html = document.documentElement;
    if (darkMode) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <BrowserRouter>
      <div className={`min-h-screen transition-colors duration-300 ${darkMode ? "dark bg-gray-900 text-white" : "bg-white text-black"}`}>
        <ToastContainer position="top-right" autoClose={3000} />

        {/* 🔄 Toggle Button */}
        <div className="p-4 flex justify-end">
          <button
            onClick={() => setDarkMode(prev => !prev)}
            aria-label="Toggle dark mode"
            className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 dark:text-white text-black shadow-md cursor-pointer"
          >
            {darkMode ? "Switch to Light 🌞" : "Switch to Dark 🌙"}
          </button>
        </div>

        {/* 🧭 App Routing */}
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<User />} />
            <Route path="/add-user" element={<AddUser />} />
            <Route path="/update-user/:id" element={<UpdateUser />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
