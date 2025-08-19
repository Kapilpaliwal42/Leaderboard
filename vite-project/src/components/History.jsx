import React from 'react';

const History = ({ history }) => {
  return (
    <>
      <h2 className="text-2xl font-bold mb-4">📜 Claim History</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 text-left">User ID</th>
            <th className="p-2 text-left">Credits</th>
            <th className="p-2 text-left">Time</th>
          </tr>
        </thead>
        <tbody>
          {history.map((h, idx) => (
            <tr key={idx} className="border-b">
              <td className="p-2">{h.userId}</td>
              <td className="p-2 font-semibold">+{h.credits}</td>
              <td className="p-2">{new Date(h.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default History;