import React, { useState, useEffect } from "react";
import { fetchApplicationsByStatus, updateApplicationStatus } from "../config/firebaseUtils";

const JobApplications = ({ status }) => {
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  const [workExpFilter, setWorkExpFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [sourceFilter, setSourceFilter] = useState("");
  const [selectedDateRange, setSelectedDateRange] = useState("");

  // Move fetchData outside useEffect so it can be called elsewhere
  const fetchData = async () => {
    const data = await fetchApplicationsByStatus("pending");
    setApplications(data);
  };

  useEffect(() => {
    fetchData();
  }, [status]);

  useEffect(() => {
    let filtered = filterByDateRange(applications);

    if (workExpFilter !== "") {
      filtered = filtered.filter(
        (app) => app.workExp === parseInt(workExpFilter)
      );
    }
    if (locationFilter !== "") {
      filtered = filtered.filter((app) => app.location === locationFilter);
    }
    if (sourceFilter !== "") {
      filtered = filtered.filter((app) => app.source === sourceFilter);
    }

    setFilteredApplications(filtered);
  }, [workExpFilter, locationFilter, sourceFilter, selectedDateRange, applications]);

  const handleAccept = async (applicationId) => {
    // Update status in Firestore to 'accepted'
    await updateApplicationStatus(applicationId, "accepted");
    // Re-fetch pending applications
    fetchData();
    setSuccessMessage("Application accepted!");
    setTimeout(() => setSuccessMessage(""), 2000);
  };
  
  const handleReject = async (applicationId) => {
    // Update status in Firestore to 'rejected'
    await updateApplicationStatus(applicationId, "rejected");
    // Re-fetch pending applications
    fetchData();
    setSuccessMessage("Application rejected!");
    setTimeout(() => setSuccessMessage(""), 2000);
  };
  const filterByDateRange = (data) => {
    const now = new Date();
    return data.filter((item) => {
      const appliedDate = new Date(item.appliedDate);
      switch (selectedDateRange) {
        case "last7days":
          return (now - appliedDate) / (1000 * 60 * 60 * 24) <= 7;
        case "thisMonth":
          return (
            appliedDate.getMonth() === now.getMonth() &&
            appliedDate.getFullYear() === now.getFullYear()
          );
        case "janToMar":
          return (
            appliedDate.getMonth() >= 0 &&
            appliedDate.getMonth() <= 2 &&
            appliedDate.getFullYear() === 2025
          );
        case "aprToJun":
          return (
            appliedDate.getMonth() >= 3 &&
            appliedDate.getMonth() <= 5 &&
            appliedDate.getFullYear() === 2025
          );
        default:
          return true;
      }
    });
  };

  const uniqueWorkExps = [...new Set(applications.map((app) => app.workExp))];
  const uniqueLocations = [...new Set(applications.map((app) => app.location))];
  const uniqueSources = [...new Set(applications.map((app) => app.source))];

  return (
    <div className="p-4">
      {successMessage && (
        <div className="mb-4 p-2 bg-green-100 text-green-800 rounded">
          {successMessage}
        </div>
      )}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Job Applications</h2>
        <div className="flex gap-3 flex-wrap">
          <select
            value={workExpFilter}
            onChange={(e) => setWorkExpFilter(e.target.value)}
            className="px-4 py-1 border border-gray-400 rounded text-sm"
          >
            <option value="">Work Experience</option>
            {uniqueWorkExps.map((exp) => (
              <option key={exp} value={exp}>
                {exp} Year
              </option>
            ))}
          </select>

          <select
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="px-4 py-1 border border-gray-400 rounded text-sm"
          >
            <option value="">Location</option>
            {uniqueLocations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>

          <select
            value={sourceFilter}
            onChange={(e) => setSourceFilter(e.target.value)}
            className="px-4 py-1 border border-gray-400 rounded text-sm"
          >
            <option value="">Source</option>
            {uniqueSources.map((src) => (
              <option key={src} value={src}>
                {src}
              </option>
            ))}
          </select>

          <select
            onChange={(e) => setSelectedDateRange(e.target.value)}
            className="border p-1 rounded"
          >
            <option value="">Date</option>
            <option value="last7days">Last 7 Days</option>
            <option value="thisMonth">This Month</option>
            <option value="janToMar">Jan - Mar 2025</option>
            <option value="aprToJun">Apr - Jun 2025</option>
          </select>
        </div>
      </div>

      <div className="w-full overflow-x-auto">
        <table className="min-w-full text-sm border border-gray-300 border-collapse">
          <thead className="bg-gray-100 text-gray-700  text-left">
            <tr>
              <th className="p-2 border border-gray-300">
                <input type="checkbox" />
              </th>
              <th className="p-2 border border-gray-300 font-semibold">Name</th>
              <th className="p-2 border border-gray-300 font-semibold">Job Title</th>
              <th className="p-2 border border-gray-300 font-semibold">Domain</th>
              <th className="p-2 border border-gray-300 font-semibold">Contact</th>
              <th className="p-2 border border-gray-300 font-semibold">Work Exp</th>
              <th className="p-2 border border-gray-300 font-semibold">Email</th>
              <th className="p-2 border border-gray-300 font-semibold">Location</th>
              <th className="p-2 border border-gray-300 font-semibold">Source</th>
              <th className="p-2 border border-gray-300 font-semibold">Applied Date</th>
              <th className="p-2 border border-gray-300 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredApplications.map((app) => (
              <tr key={app.id} className="border-b hover:bg-gray-50">
                <td className="p-2 border border-gray-300">
                  <input type="checkbox" />
                </td>
                <td className="p-2 border border-gray-300">{app.name}</td>
                <td className="p-2 border border-gray-300">{app.jobTitle}</td>
                <td className="p-2 border border-gray-300">{app.domain}</td>
                <td className="p-2 border border-gray-300">{app.contact}</td>

                <td className="p-2 border border-gray-300">{app.workExp}</td>
                <td className="p-2 border border-gray-300">{app.email}</td>

                <td className="p-2 border border-gray-300">{app.location}</td>
                <td className="p-2 border border-gray-300">{app.source}</td>
                <td className="p-2 border border-gray-300">{app.appliedDate}</td>
                <td className="p-2 border border-gray-300">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAccept(app.id)}
                      className="border border-green-500 text-green-500 px-2 py-1 text-xs rounded hover:bg-green-100"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleReject(app.id)}
                      className="border border-red-500 text-red-500 px-2 py-1 text-xs rounded hover:bg-red-100"
                    >
                      Reject
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default JobApplications;
