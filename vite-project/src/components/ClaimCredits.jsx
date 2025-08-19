import React from 'react';

const ClaimCredits = ({ users, selectedUser, setSelectedUser, handleClaim, loading, message }) => {
  return (
    <>
      <div className="flex mb-4 gap-2">
        <select
          className="border p-2 flex-1 rounded"
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
        >
          <option value="">Select a user</option>
          {users.map((u) => (
            <option key={u._id} value={u._id}>
              {u.name}
            </option>
          ))}
        </select>
        <button
          onClick={handleClaim}
          disabled={loading}
          className="bg-green-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {loading ? "Claiming..." : "Claim Points"}
        </button>
      </div>
      {message && <p className="mb-4 text-green-600">{message}</p>}
    </>
  );
};

export default ClaimCredits;