import React from 'react';

const Leaderboard = ({ users }) => {
    users = users.sort((a, b) => b.credits - a.credits).slice(0, 10);

  return (
    <>
      <h2 className="text-xl font-semibold mb-2">Leaderboard</h2>
      <table className="w-full border-collapse mb-6">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 text-left">Rank</th>
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-left">Credits</th>
          </tr>
        </thead>
        <tbody>
          {users
            .sort((a, b) => b.credits - a.credits)
            .map((u, idx) => (
              <tr key={u._id} className="border-b">
                <td className="p-2">{idx + 1}</td>
                <td className="p-2">{u.name}</td>
                <td className="p-2 font-semibold">{u.credits}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default Leaderboard;