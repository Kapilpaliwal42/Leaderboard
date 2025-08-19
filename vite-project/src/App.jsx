import { useEffect, useState } from "react";
import Leaderboard from "./components/Leaderboard";
import History from "./components/History";
import AddUser from "./components/AddUser";
import ClaimCredits from "./components/ClaimCredits";

export default function LeaderboardApp() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [newUser, setNewUser] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [history, setHistory] = useState([]);
  const [view, setView] = useState("users");

  const API_BASE = import.meta.env.VITE_BACKEND_API_URL;

  const fetchUsers = async () => {
    try {
      const res = await fetch(`${API_BASE}/users`);
      if (res.ok) {
        const data = await res.json();
        setUsers(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchHistory = async () => {
    try {
      console.log("Fetching history...");
      const res = await fetch(`${API_BASE}/users/history`);
      if (res.ok) {
        const data = await res.json();
        setHistory(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddUser = async () => {
    if (!newUser.trim()) return;
    try {
      const res = await fetch(`${API_BASE}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newUser, credits: Math.floor(Math.random() * 100) + 1 }),
      });
      if (res.ok) {
        setNewUser("");
        fetchUsers();
      } else {
        console.error("Failed to add user");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleClaim = async () => {
    if (!selectedUser) return;
    setLoading(true);
    try {
      const randomPoints = Math.floor(Math.random() * 10) + 1;
      const res = await fetch(`${API_BASE}/users/credits`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: selectedUser, credits: randomPoints }),
      });
      if (res.ok) {
        const data = await res.json();
        setMessage(`+${randomPoints} points awarded to ${data.user.name}`);
        fetchUsers();
        fetchHistory();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchHistory();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className='flex flex-row items-center fixed top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 p-4 shadow-lg border-4 border-white rounded-4xl gap-4 w-[700px] justify-center'>
        <h1
          onClick={() => setView("users")}
          className={`text-xl font-bold text-white cursor-pointer px-3 py-1 rounded-full ${view === "users" ? "bg-blue-600" : ""}`}
        >
          Users
        </h1>
        <h1
          onClick={() => setView("history")}
          className={`text-xl font-bold text-white cursor-pointer px-3 py-1 rounded-full ${view === "history" ? "bg-blue-600" : ""}`}
        >
          History
        </h1>
        <h1
          onClick={() => setView("addUser")}
          className={`text-xl font-bold text-white cursor-pointer px-3 py-1 rounded-full ${view === "addUser" ? "bg-blue-600" : ""}`}
        >
          Add User
        </h1>
      </div>

      <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow mt-28">
        {view === "users" && (
          <>
            <h1 className="text-2xl font-bold mb-4">🏆 Leaderboard</h1>
            <ClaimCredits
              users={users}
              selectedUser={selectedUser}
              setSelectedUser={setSelectedUser}
              handleClaim={handleClaim}
              loading={loading}
              message={message}
            />
            <Leaderboard users={users} />
          </>
        )}

        {view === "history" && <History history={history} />}

        {view === "addUser" && (
          <AddUser
            newUser={newUser}
            setNewUser={setNewUser}
            handleAddUser={handleAddUser}
          />
        )}
      </div>
    </div>
  );
}
