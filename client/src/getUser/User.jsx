import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";

function User() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/users");

        setUsers(response.data);

      } catch (error) {
        toast.error("Failed to load users!");
      }
    }

    fetchData();
  }, []);

  return (
    <>
      <div className="flex justify-center mt-16 px-4">
        <div className="w-full max-w-6xl overflow-x-auto rounded-xl shadow-lg">
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
                      to="/add-user"
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded-md text-xs font-semibold cursor-pointer"
                    >
                      Add
                    </Link>
                    <button
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-md text-xs font-semibold cursor-pointer"
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-md text-xs font-semibold cursor-pointer"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default User;
