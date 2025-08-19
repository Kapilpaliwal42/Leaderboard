import React from 'react';

const AddUser = ({ newUser, setNewUser, handleAddUser }) => {
  return (
    <>
      <h2 className="text-2xl font-bold mb-4">➕ Add New User</h2>
      <div className="flex mb-4 gap-2">
        <input
          className="border p-2 flex-1 rounded"
          placeholder="Enter new user name"
          value={newUser}
          onChange={(e) => setNewUser(e.target.value)}
        />
        <button
          onClick={handleAddUser}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>
    </>
  );
};

export default AddUser;