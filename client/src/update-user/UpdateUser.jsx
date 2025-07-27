import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import AppContext from '../context/AppContext.jsx';

function UpdateUser() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: ''
  });

  const { backendUrl } = useContext(AppContext);
  const api = backendUrl.replace(/\/$/, "");

  const navigate = useNavigate(); // Hook to navigate programmatically
  const { id } = useParams(); // 👈 Grab user ID from URL

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${api}/user/${id}`);
        setFormData(res.data); // 👈 Set form values with existing user

      } catch (error) {
        toast.error("Failed to load user data");
        console.error("Fetch error:", error);
      }
    };

    fetchUser();
  }, [api, id]);

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
      await axios.put(`${api}/update/user/${id}`, formData);
      toast.success("User updated successfully!", {
        position: "top-right",
        autoClose: 3000
      });
      setFormData({ name: '', email: '', address: '' });

      navigate("/");

    } catch (error) {
      toast.error("Failed to update user!", {
        position: "top-right",
        autoClose: 3000
      });
      console.error("Update error:", error);
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

      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Update User</h2>

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
          Update User
        </button>
      </form>
    </div>
  );
}

export default UpdateUser;
