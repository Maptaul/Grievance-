import {
  FaBuilding,
  FaGlobe,
  FaPlug,
  FaRecycle,
  FaSolarPanel,
  FaTools,
  FaTrafficLight,
  FaTree,
} from "react-icons/fa";
import ongoingProjects from "/public/ongoingProjects.json"; // Adjust if needed

// Mapping icon name strings to actual components
const iconMap = {
  FaTrafficLight: <FaTrafficLight className="text-[#640D5F] text-[50px]" />,
  FaTree: <FaTree className="text-[#640D5F] text-[50px]" />,
  FaSolarPanel: <FaSolarPanel className="text-[#640D5F] text-[50px]" />,
  FaGlobe: <FaGlobe className="text-[#640D5F] text-[50px]" />,
  FaBuilding: <FaBuilding className="text-[#640D5F] text-[50px]" />,
  FaRecycle: <FaRecycle className="text-[#640D5F] text-[50px]" />,
  FaPlug: <FaPlug className="text-[#640D5F] text-[50px]" />,
  FaTools: <FaTools className="text-[#640D5F] text-[50px]" />,
};

const OngoingProjects = () => {
  return (
    <section className=" bg-[#f4f4f4]">
      <div className="max-w-7xl py-[100px] md:py-[50px] container mx-auto px-4">
        <div className="text-center pb-[50px] md:pb-[30px]">
          <h2 className="text-3xl font-bold">Ongoing Projects</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {ongoingProjects.map((project, index) => (
            <div
              key={index}
              className="flex  p-5 bg-white border border-[#ddd] shadow-[0px_10px_21.25px_3.75px_rgba(0,0,0,0.06)] "
            >
              <div className="icon">{iconMap[project.icon]}</div>
              <div className="content">
                <h3 className="text-[20px] font-extrabold mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-600">{project.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OngoingProjects;
