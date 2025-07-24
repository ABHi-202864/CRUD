import User from "./getUser/User"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import AddUser from "./addUser/AddUser";
import UpdateUser from "./updateUser/UpdateUser";


function App() {

  return (
    <>
      {/* For Toastify Notification */}
      <ToastContainer position="top-right" autoClose={3000} />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<User />} />
          <Route path="/add-user" element={<AddUser />} />
          <Route path="/update-user/:id" element={<UpdateUser />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
