import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function AddUser() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: ''
  });

  const navigate = useNavigate(); // Hook to navigate programmatically

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8000/api/user", formData);
      toast.success("User added successfully!", {
        position: "top-right",
        autoClose: 3000
      });
      setFormData({ name: '', email: '', address: '' });

      navigate("/");

    } catch (error) {
      toast.error("❌ Failed to add user!", {
        position: "top-right",
        autoClose: 3000
      });
      console.error("Error adding user:", error);
    }
  };


  const goToHome = () => {
    navigate('/');
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-xl rounded-xl p-8">
      {/* Go to home page button */}
      <div className="mb-4">
        <button
          onClick={goToHome}
          className="text-sm bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md border border-gray-300 transition cursor-pointer"
        >
          ⬅ Go to Home
        </button>
      </div>

      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Add New User</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-1">Name :</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="John Doe"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Email :</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="john@example.com"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Address :</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            placeholder="123, Elm Street"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300 cursor-pointer"
        >
          Add User
        </button>
      </form>
    </div>
  );
}

export default AddUser;
