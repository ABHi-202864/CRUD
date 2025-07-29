import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";
import { IoPersonAddSharp } from "react-icons/io5";
import AppContext from "../context/AppContext.jsx";

function User() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // ⬅️ Added loading state

  const { backendUrl } = useContext(AppContext);
  const api = backendUrl.replace(/\/$/, "");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // start loading
        const response = await axios.get(`${api}/api/users`);
        setUsers(response.data);
      } catch (error) {
        toast.error("Failed to load users!");
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false); // stop loading
      }
    };

    fetchData();
  }, [api]);

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`${api}/api/delete/user/${userId}`);
      toast.success("User deleted successfully!");
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
    } catch (error) {
      toast.error("Failed to delete user!");
      console.error("Delete error:", error);
    }
  };

  return (
    <>
      <div className="flex justify-center mt-16 px-4">
        <div className="w-full max-w-6xl overflow-x-auto rounded-xl shadow-lg">

          <div className="flex justify-end mb-4">
            <Link
              to="/add-user"
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition"
            >
              <span><IoPersonAddSharp className="w-4 h-4" /></span> Add New User
            </Link>
          </div>

          {/* Loading Spinner */}
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block w-12 h-12 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
              <p className="text-gray-300 mt-4 font-medium text-lg">Loading users...</p>
            </div>
          ) : users.length === 0 ? (
            <div className="text-center h-40">
              <h2 className="text-5xl font-semibold text-gray-700">No Data to display!</h2>
              <p className="text-gray-700 text-2xl font-semibold my-5">Please add new user.</p>
            </div>
          ) : (
            <table className="min-w-full text-sm text-left text-gray-400 border border-gray-600 bg-[#1E293B]">
              <thead className="text-xs uppercase bg-[#334155] text-gray-200">
                <tr>
                  <th className="px-6 py-4 border border-gray-600">S.No.</th>
                  <th className="px-6 py-4 border border-gray-600">Name</th>
                  <th className="px-6 py-4 border border-gray-600">Email</th>
                  <th className="px-6 py-4 border border-gray-600 w-2/6">Address</th>
                  <th className="px-6 py-4 border border-gray-600 w-2/12">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user._id || index} className="hover:bg-[#2D3748] transition">
                    <td className="px-6 py-4 border border-gray-700">{index + 1}.</td>
                    <td className="px-6 py-4 border border-gray-700">{user.name}</td>
                    <td className="px-6 py-4 border border-gray-700">{user.email}</td>
                    <td className="px-6 py-4 border border-gray-700">{user.address}</td>
                    <td className="px-6 py-4 border border-gray-700 flex gap-2">
                      <Link
                        to={`/update-user/${user._id}`}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-md text-xs font-semibold cursor-pointer"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-md text-xs font-semibold cursor-pointer"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}

export default User;
