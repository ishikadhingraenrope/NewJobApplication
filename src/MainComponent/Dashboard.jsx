import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Logout from "./LogOut";
import Login from "./Login";

// icons
import {
  MdLogout,
  MdWork,
} from "react-icons/md";

import NewJobApplication from "../JobApplication/NewJobApplication";
import AcceptApplication from "../JobApplication/AcceptApplication";
import RejectApplication from "../JobApplication/RejectApplication";
import Interviewed from "../JobApplication/Interviewed";
import Shortlisted from "../JobApplication/Shortlist";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("Home");
  const [opensidebar, setopensidebar] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setopensidebar(false);
    } else {
      setopensidebar(true);
    }
  }, []);

  const tabs = [
    {
      label: "New Job Application",
      icon: <MdWork size={25} />,
      children: [
        { label: "Accepted Application" },
        { label: "Interviewed Application" },
        { label: "Shortlisted Application" },
        { label: "Rejected Application" },
      ],
    },
    { label: "Logout", icon: <MdLogout size={25} /> },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "New Job Application":
        return <NewJobApplication />;
      case "Accepted Application":
        return <AcceptApplication />;
      case "Rejected Application":
        return <RejectApplication />;
      case "Interviewed Application":
        return <Interviewed />;
      case "Shortlisted Application":
        return <Shortlisted />;
      case "Logout":
        return <Logout />;
      default:
        return <div>Select a tab</div>;
    }
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar
        tabs={tabs}
        activeTab={activeTab}
        onTabClick={(tab) => {
          setActiveTab(tab);
          if (window.innerWidth < 768) {
            setopensidebar(false);
          }
        }}
        opensidebar={opensidebar}
        setopensidebar={setopensidebar}
      />
      <div className="flex-1 flex flex-col max-h-screen overflow-hidden">
        <main
          className={`flex-1 p-8 overflow-y-auto max-h-screen transition-all duration-300
          ${opensidebar ? "ml-0" : "ml-10 md:ml-0"}`}
        >
          <div className="bg-white shadow p-6 rounded min-h-full">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
