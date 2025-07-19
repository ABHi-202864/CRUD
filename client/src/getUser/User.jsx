
function User() {
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
                <th className="px-6 py-4 border border-gray-600">Address</th>
                <th className="px-6 py-4 border border-gray-600">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-[#2D3748] transition">
                <td className="px-6 py-4 border border-gray-700">1</td>
                <td className="px-6 py-4 border border-gray-700">John</td>
                <td className="px-6 py-4 border border-gray-700">john@gmail.com</td>
                <td className="px-6 py-4 border border-gray-700">221B Baker Street</td>
                <td className="px-6 py-4 border border-gray-700 flex gap-2">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-md text-xs font-semibold">
                    Edit
                  </button>
                  <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-md text-xs font-semibold">
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default User;
