import DeveloperSummary from "../Components/Dashboard/DeveloperSummary";
import ProjectSummary from "../Components/Dashboard/ProjectSummary";
import { useState } from "react";
import TicketSummary from "../Components/Dashboard/TicketSummary";
import DeveloperWise from "../Components/Dashboard/DeveloperWise";
import { data, ticketData, developerData } from "../Data/DashBoardData";

const Dashboard = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  return (
    <>
      <div className="mt-10 ">
        <section className=" flex flex-col gap-10">
          <div className="grid lg:grid-cols-2 gap-x-10 gap-y-5 grid-cols-1">
            <ProjectSummary projects={data.projects} />
            <DeveloperSummary developers={data.developers} />
          </div>
          <div className=" bg-[#F5F5F5] rounded-tl-[60px] rounded-br-[60px] mb-2">
            <h1 className="text-2xl font-[400] mb-2 py-5 mt-4 px-6">
              OSEL Signage
            </h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-4 mb-12 gap-y-10 md:px-4">
              <TicketSummary
                ticketData={ticketData}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
              />
              <DeveloperWise
                developerData={developerData}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
              />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Dashboard;
