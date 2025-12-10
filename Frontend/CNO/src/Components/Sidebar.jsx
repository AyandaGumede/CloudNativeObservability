import logo from "../../public/CNO.png";
import { useState } from "react";
import { NavLink } from "react-router-dom"; 
import { 
  PanelLeftClose, 
  PanelLeftOpen, 
  LayoutDashboard, 
  Bell,            
  FileText,        
  BarChart2,       
  Settings,        
  User,
  LogOut             
} from "lucide-react";

const Sidebar = () => {
    const [isExpanded, setIsExpanded] = useState(true);

    const Components = [
        { Name: "Dashboard", Icon: LayoutDashboard, path: "/" },
        { Name: "Alerts",    Icon: Bell,            path: "/alerts" },
        { Name: "Logs",      Icon: FileText,        path: "/logs" },
        { Name: "Metrics",   Icon: BarChart2,       path: "/metrics" },
        { Name: "Settings",  Icon: Settings,        path: "/settings" },
    ];

    return (
        <div 
            className={`
                bg-white border-r border-gray-200 text-gray-600 font-inter min-h-screen 
                flex flex-col transition-all duration-300 ease-in-out
                ${isExpanded ? "w-48" : "w-[70px]"} 
            `}
        >
            
            <div className="flex items-center justify-between p-4 h-16 border-b border-gray-100">
               
                <div className={`items-center gap-3 overflow-hidden transition-all duration-300 ${isExpanded ? "opacity-100" : "opacity-0 w-0"}`}>
                    <img src={logo} alt="CNO Logo" className="w-9 h-10 object-contain" />
                    <span className="font-bold text-gray-800 text-lg whitespace-nowrap">CNO Platform</span>
                </div>

                <button 
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors"
                >
                    {isExpanded ? <PanelLeftClose size={20} /> : <PanelLeftOpen size={20} />}
                </button>
            </div>

            {/* --- NAVIGATION --- */}
            <div className="flex-1 py-6 px-3">
                {isExpanded && <p className="px-3 mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">Menu</p>}

                <ul className="flex flex-col gap-1">
                    {Components.map((component, index) => (
                        <NavLink 
                            key={index}
                            to={component.path}
                            className={({ isActive }) => `
                                flex items-center p-3 rounded-lg transition-all duration-200 group
                                ${isExpanded ? "justify-start gap-3" : "justify-center"}
                                ${isActive 
                                    ? "bg-blue-50 text-blue-600 font-medium" 
                                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900" 
                                }
                            `}
                        >
                            {/* Icon */}
                            <component.Icon 
                                size={18} 
                                className={`transition-colors ${isExpanded ? "" : "mx-auto"}`} 
                            />
                            
                            {/* Text */}
                            {isExpanded && (
                                <span className="whitespace-nowrap text-black overflow-hidden text-sm">
                                    {component.Name}
                                </span>
                            )}

                            
                            {!isExpanded && (
                                <div className="absolute left-16 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 whitespace-nowrap">
                                    {component.Name}
                                </div>
                            )}
                        </NavLink>
                    ))}
                </ul>
            </div>

            {/* --Footer-- */}
            <div className="p-4 border-t border-gray-200">
                <div className={`flex h-10 items-center bg-red-600 gap-3 ${isExpanded ? "" : "justify-center"}`} style={{borderRadius: "5px"}}>
                    <LogOut size={24} className="text-white ml-2 "></LogOut>
                   {isExpanded && (
                       <div className="flex flex-col overflow-hidden">
                           <button className=" inline-flex bg-transparent text-white p-2 text-sm">Log out</button>
                       </div>
                   )}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;