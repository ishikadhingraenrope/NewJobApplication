import React, { useState, useEffect } from "react";

const JobApplications = () => {
  const [applications, setApplications] = useState([
    {
      id: 1,
      jobTitle: "Business Analyst",
      domain: "Enrope Solutions",
      name: "Chetan",
      contact: "9591602192",
      email: "cmwali959@gmail.com",
      workExp: 8,
      location: "Hubli",
      source: "Other",
      appliedDate: "January 9, 2025",
      status: "New",
    },
    {
      id: 2,
      jobTitle: "Business Analyst",
      domain: "Enrope Solutions",
      name: "Vinodhi",
      contact: "9597318951",
      email: "vinov335@gmail.com",
      workExp: 2,
      location: "Coimbatore",
      source: "Indeed",
      appliedDate: "july 25, 2025",
      status: "New",
    },
    {
      id: 3,
      jobTitle: "NodeJS Developer",
      domain: "Enrope Solutions",
      name: "Piyush Suryavanshi",
      contact: "9834274896",
      email: "piyush.surya@example.com",
      workExp: 1,
      location: "Nagpur",
      source: "LinkedIn",
      appliedDate: "May 13, 2025",
      status: "New",
    },
    {
      id: 4,
      jobTitle: "Frontend Developer",
      domain: "Enrope Solutions",
      name: "Soumika Mallick",
      contact: "8319761065",
      email: "soumika.mallick@example.com",
      workExp: 1,
      location: "Gwalior",
      source: "Other",
      appliedDate: "july 7, 2025",
      status: "New",
    },
    {
      id: 5,
      jobTitle: "React Developer",
      domain: "Enrope Solutions",
      name: "Srijan Karak",
      contact: "8509534214",
      email: "srijan.k@example.com",
      workExp: 1,
      location: "Kolkata",
      source: "LinkedIn",
      appliedDate: "march 13, 2025",
      status: "New",
    },

    {
      id: 6,
      jobTitle: "Payton",
      domain: "Enrope Solutions",
      name: "Rimjim",
      contact: "8509534214",
      email: "rimjim.k@example.com",
      workExp: 15,
      location: "noida",
      source: "LinkedIn",
      appliedDate: "june 13, 2025",
      status: "New",
    },
    // Add more dummy data as needed
  ]);

  const [filteredApplications, setFilteredApplications] =
    useState(applications);

  const [workExpFilter, setWorkExpFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [sourceFilter, setSourceFilter] = useState("");
  //   const [dateFilter, setDateFilter] = useState("");
  const [selectedDateRange, setSelectedDateRange] = useState("");

  //   We use new Set() to remove duplicates so that dropdowns show only unique filter options from the applications list.
  const uniqueWorkExps = [...new Set(applications.map((app) => app.workExp))];
  const uniqueLocations = [...new Set(applications.map((app) => app.location))];
  const uniqueSources = [...new Set(applications.map((app) => app.source))];

  useEffect(() => {
    //   let filtered = applications;
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
    //     if (dateFilter !== "") {
    //     filtered = filtered.filter(app => app.appliedDate === dateFilter);
    //   }

    setFilteredApplications(filtered);
  }, [
    workExpFilter,
    locationFilter,
    sourceFilter,
    selectedDateRange,
    applications,
  ]);


 const handleAccept = (application) => {
  const accepted =
    JSON.parse(localStorage.getItem("acceptedApplications")) || [];
  const alreadyExists = accepted.find((app) => app.id === application.id);
  if (!alreadyExists) {
    const acceptedWithDate = {
      ...application,
      acceptedDate: new Date().toISOString().split("T")[0],
    };
    accepted.push(acceptedWithDate);
    localStorage.setItem("acceptedApplications", JSON.stringify(accepted));
  }
  // Remove from current applications list
  const updatedApplications = applications.filter(
    (app) => app.id !== application.id
  );
  setApplications(updatedApplications);
};



 const handleReject = (application) => {
  const rejected =
    JSON.parse(localStorage.getItem("rejectedApplications")) || [];

  const applicationWithDate = {
    ...application,
    rejectedDate: new Date().toISOString().split("T")[0],
  };
  const updatedRejected = [...rejected, applicationWithDate];
  localStorage.setItem("rejectedApplications", JSON.stringify(updatedRejected));

  // Remove from current applications list
  const updatedApplications = applications.filter(
    (app) => app.id !== application.id
  );
  setApplications(updatedApplications);
};


  // crete a date filter function
  const filterByDateRange = (data) => {
    const now = new Date(); // current date

    return data.filter((item) => {
      const appliedDate = new Date(item.appliedDate); // parse each item's applied date

      switch (selectedDateRange) {
        case "last7days":
          // Difference between today and appliedDate in days
          return (now - appliedDate) / (1000 * 60 * 60 * 24) <= 7;

        case "thisMonth":
          return (
            appliedDate.getMonth() === now.getMonth() &&
            appliedDate.getFullYear() === now.getFullYear()
          );

        case "janToMar":
          return (
            appliedDate.getMonth() >= 0 && // Jan = 0
            appliedDate.getMonth() <= 2 && // Mar = 2
            appliedDate.getFullYear() === 2025
          );

        case "aprToJun":
          return (
            appliedDate.getMonth() >= 3 && // Apr = 3
            appliedDate.getMonth() <= 5 && // Jun = 5
            appliedDate.getFullYear() === 2025
          );

        default:
          return true; // If no filter is selected, return all data
      }
    });
  };


  // clean all aplication data
  const handleClearAllApplications = () => {
  localStorage.removeItem("acceptedApplications");
  localStorage.removeItem("rejectedApplications");
  localStorage.removeItem("interviewedApplications");
  localStorage.removeItem("shortlistedApplications");
  alert("All applications cleared!");
};


  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Job Applications</h2>

        <div className="flex gap-3 flex-wrap">
          {/* Work Experience Dropdown */}
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

          {/* Location Dropdown */}
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

          {/* Source Dropdown */}
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

          {/* Date Dropdown */}
          {/* <select value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} className="px-4 py-1 border border-gray-400 rounded text-sm">
      <option value="">Date</option>
      {uniqueDates.map((date) => (
        <option key={date} value={date}>{date}</option>
      ))}
    </select> */}

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
      {/* Table */}
      <div className="w-full overflow-x-auto">
        <table className="min-w-full text-sm border border-gray-300 border-collapse">
          {/* <table className="min-w-full table-auto border border-gray-300 text-sm rounded-md"> */}
          <thead className="bg-gray-100 text-gray-700  text-left">
            <tr>
              <th className="p-2 border  border-gray-300  ">
                <input type="checkbox" />
              </th>
              <th className="p-2 border  border-gray-300 font-semibold">ID</th>
              <th className="p-2 border  border-gray-300 font-semibold ">
                Job Title
              </th>
              <th className="p-2 border  border-gray-300 font-semibold">
                Domain
              </th>
              <th className="p-2 border  border-gray-300 font-semibold">
                Name
              </th>
              <th className="p-2 border  border-gray-300 font-semibold">
                Contact
              </th>
              <th className="p-2 border   border-gray-300 w-[50px] font-semibold">
                Email
              </th>
              <th className="p-2 border  border-gray-300 font-semibold whitespace-nowrap">
                Work Exp
              </th>
              <th className="p-2 border  border-gray-300 font-semibold">
                Location
              </th>
              <th className="p-2 border  border-gray-300 font-semibold">
                Source
              </th>
              <th className="p-2 border  border-gray-300 font-semibold">
                Applied Date
              </th>
              {/* <th className="p-2 border">Status</th> */}
              <th className="p-2 border  border-gray-300 font-semibold">
                Resume
              </th>
              <th className="p-2 border   border-gray-300 font-semibold">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredApplications.map((app) => (
              <tr key={app.id} className="border-b hover:bg-gray-50">
                <td className="p-2 border  border-gray-300 ">
                  <input type="checkbox" />
                </td>
                <td className="p-2 border  border-gray-300 ">{app.id}</td>
                <td className="p-2 border  border-gray-300 max-w-[80px] truncate ">
                  {" "}
                  {app.jobTitle}
                </td>
                <td className="p-2 border  border-gray-300 max-w-[80px] truncate ">
                  {" "}
                  {app.domain}
                </td>
                <td className="p-2 border  border-gray-300">{app.name}</td>
                <td className="p-2 border  border-gray-300">{app.contact}</td>
                <td className="p-2 border  border-gray-300 max-w-[120px] truncate ">
                  {app.email}{" "}
                </td>
                <td className="p-2 border  border-gray-300">{app.workExp}</td>
                <td className="p-2 border  border-gray-300">{app.location}</td>
                <td className="p-2 border  border-gray-300 ">{app.source}</td>
                <td className="p-2  border  border-gray-300 whitespace-nowrap">
                  {app.appliedDate}
                </td>
                {/* <td className="p-2 border text-orange-500">New</td> */}
                <td className="p-2 border  border-gray-300 text-center space-x-2">
                  <button title="View Resume">👁️</button>
                  <button title="Download Resume">⬇️</button>
                </td>
                <td className="p-2 border  border-gray-300">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAccept(app)}
                      className="border border-green-500 text-green-500 px-2 py-2 text-xs rounded  hover:bg-blue-100"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleReject(app)}
                      className="border border-red-500 text-red-500 px-2 py-2 text-xs rounded hover:bg-red-100"
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
    <button
  onClick={handleClearAllApplications}
  className="bg-red-500 text-white px-4 py-2 rounded mt-4"
>
  Clear All Applications
</button>
    </div>
  );
};

export default JobApplications;
