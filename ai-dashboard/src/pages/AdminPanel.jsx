import { useEffect, useState } from "react";
import api from "../api/api.js";

export default function AdminPanel() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.get("/admin/users").then(res => setUsers(res.data));
  }, []);

  const deleteUser = async (id) => {
    await api.delete(`/admin/users/${id}`);
    setUsers(users.filter(u => u._id !== id));
  };

  return (
    <div className="p-10 text-white">
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>

      <div className="space-y-4">
        {users.map(user => (
          <div
            key={user._id}
            className="bg-gray-900 p-4 rounded flex justify-between"
          >
            <div>
              <p>{user.email}</p>
              <p className="text-sm text-gray-400">{user.plan}</p>
            </div>
            <button
              onClick={() => deleteUser(user._id)}
              className="text-red-500"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}