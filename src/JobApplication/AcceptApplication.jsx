import React, { useEffect, useState } from "react";
import { fetchApplicationsByStatus } from "../config/firebaseUtils";

const AcceptApplication = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchApplicationsByStatus("Accepted");
      setData(result);
    };
    fetchData();
  }, []);

  return (
    <div className="overflow-x-auto">
      <h2 className="text-xl font-bold mb-4">{data.length} Accepted Applications</h2>
      <table className="min-w-full border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2 border">Name</th>
            <th className="px-4 py-2 border">Job Title</th>
            <th className="px-4 py-2 border">Work Exp</th>
            <th className="px-4 py-2 border">Location</th>
            <th className="px-4 py-2 border">Source</th>
            <th className="px-4 py-2 border">Applied Date</th>
            <th className="px-4 py-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((app) => (
            <tr key={app.id} className="text-center">
              <td className="border px-4 py-2">{app.name}</td>
              <td className="border px-4 py-2">{app.title}</td>
              <td className="border px-4 py-2">{app.exp}</td>
              <td className="border px-4 py-2">{app.location}</td>
              <td className="border px-4 py-2">{app.source}</td>
              <td className="border px-4 py-2">{app.appliedDate}</td>
              <td className="border px-4 py-2">
                {/* Optional: Add View/Download/Reject buttons here */}
                <button className="bg-blue-500 text-white px-2 py-1 rounded mr-1">View</button>
                <button className="bg-red-500 text-white px-2 py-1 rounded">Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AcceptApplication;
