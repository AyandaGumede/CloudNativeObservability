import { 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  RefreshCw,
  Search,
  LayoutDashboard,
  Zap 
} from "lucide-react";
import LogTable from "./inter-components/LogTable";
import { useState, useEffect } from "react";
import Lottie from "lottie-react";
import loadingAnimation from "../Components/Loading.json"; 

const Dashboard = () => {

    const [isLoading, setIsLoading] = useState(true); 

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);
    
    if (isLoading) {
        return (
            <div className="h-screen w-full flex flex-col items-center justify-center bg-white">
                <div className="w-64 h-64">
                    <Lottie animationData={loadingAnimation} loop={true} />
                </div>
                <p className="text-gray-500 font-medium mt-4 animate-pulse">Loading...</p>
            </div>
        );
    }

    return (
        <div className="bg-white p-8 h-[100vh] overflow-y-auto font-inter">

            {/* ---Taskbar--- */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-5 border-b pb-8">
                <div>
                    <h1 className="flex text-2xl font-bold bg-clip-text text-black bg-gradient-to-r from-blue-700 to-indigo-600">
                        <LayoutDashboard size={23} className="mt-1 mr-2"/> System Overview
                    </h1>
                    <p className="text-gray-500 text-sm mt-1">Real-time observability and metrics.</p>
                </div>

                <button 
                    onClick={() => { setIsLoading(true); setTimeout(() => setIsLoading(false), 2000); }} // Click to re-trigger load
                    className="flex items-center justify-center text-white p-2 w-32 hover:opacity-90 transition-opacity shadow-sm" 
                    style={{background: "#006BC2", borderRadius: "5px"}}
                > 
                    <RefreshCw size={16} className="text-white mr-2"/> 
                    Refresh
                </button>
            </div>

            {/* --- Search Bar --- */}
            <div className="relative w-full mb-8">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400">
                    <Search size={20} />
                </div>
                <input 
                    type="text" 
                    className="border border-gray-300 rounded-lg p-2 pl-10 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition-all" 
                    placeholder="Search resources, services, or logs..." 
                />
            </div>

            {/* --- Cards ---- */}
            <div className="mb-8 mt-6">
                <p className="text-sm font-semibold text-blue-600 mb-4 uppercase tracking-wide">Performances</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-gray-500">
                    
                    {/* Card 1: Response Time */}
                    <div className="shadow-md border border-gray-100 rounded-xl p-5 hover:shadow-lg transition-shadow">
                        <div className="flex justify-between items-start">
                            <div className="flex flex-col">
                                <p className="text-xs font-medium uppercase tracking-wider text-gray-500">Avg Response Time</p>
                                <h2 className="text-2xl mt-2 text-gray-800 font-bold">45.19s</h2>
                            </div>
                            <div className="p-2 bg-indigo-50 rounded-lg">
                                <Clock size={24} className="text-indigo-600"/>
                            </div>
                        </div>
                        <p className="text-xs mt-2 font-medium"><span className="text-red-500">↓ 12.3%</span> vs last hour</p>
                    </div>

                    {/* Card 2: Error Rate */}
                    <div className="shadow-md border border-gray-100 rounded-xl p-5 hover:shadow-lg transition-shadow">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-xs font-medium uppercase tracking-wider text-gray-500">Error Rate</p>
                                <h2 className="text-2xl mt-2 text-gray-800 font-bold">0.10%</h2>
                            </div>
                            <div className="p-2 bg-red-50 rounded-lg">
                                <AlertTriangle size={24} className="text-red-500"/>
                            </div>
                        </div>
                        <p className="text-xs mt-2 font-medium"><span className="text-green-500">↑ 12.3%</span> improvement</p>
                    </div>

                    {/* Card 3: Active Services */}
                    <div className="shadow-md border border-gray-100 rounded-xl p-5 hover:shadow-lg transition-shadow">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-xs font-medium uppercase tracking-wider text-gray-500">Active Services</p>
                                <h2 className="text-2xl mt-2 text-gray-800 font-bold">247</h2>
                            </div>
                            <div className="p-2 bg-green-50 rounded-lg">
                                <CheckCircle size={24} className="text-green-600"/>
                            </div>
                        </div>
                        <p className="text-xs mt-2 font-medium"><span className="text-green-500">↑ 12.3%</span> healthy</p>
                    </div>

                    {/* Card 4: Throughput */}
                    <div className="shadow-md border border-gray-100 rounded-xl p-5 hover:shadow-lg transition-shadow">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-xs font-medium uppercase tracking-wider text-gray-500">Throughput</p>
                                <h2 className="text-2xl mt-2 text-gray-800 font-bold">8.4K</h2>
                            </div>
                            <div className="p-2 bg-blue-50 rounded-lg">
                                <Zap size={24} className="text-blue-600"/>
                            </div>
                        </div>
                        <p className="text-xs mt-2 text-gray-400">Requests/Sec</p>
                    </div>
                </div>
            </div>

            {/* --- Infrastructure Map --- */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-8">
                <div className="mb-4">
                    <h3 className="font-semibold text-gray-900">Infrastructure Map</h3>
                </div>
                
                <div className="flex flex-wrap gap-2 content-start">
                    {Array.from({ length: 48 }).map((_, i) => {
                        const status = i === 12 || i === 28 ? "error" : i > 35 && i < 40 ? "warning" : "healthy";
                        const colors = {
                            healthy: "bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.4)]",
                            warning: "bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.4)]",
                            error: "bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.5)] animate-pulse"
                        };
                        return (
                            <div 
                                key={i}
                                className={`w-6 h-6 rounded-md transition-all hover:scale-125 hover:z-10 cursor-pointer ${colors[status]}`}
                                title={`Pod-${i}: ${status}`}
                            ></div>
                        )
                    })}
                </div>
                <div className="mt-6 flex items-center gap-4 text-xs text-gray-500 font-medium">
                    <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-emerald-400 shadow-sm"></div>Healthy</div>
                    <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-amber-400 shadow-sm"></div>Warning</div>
                    <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-rose-500 shadow-sm"></div>Critical</div>
                </div>
            </div>


            {/*- - - Table - - - */}
            <div className="pb-10">
                <p className="text-sm font-semibold text-blue-600 mb-4 uppercase tracking-wide">System Logs</p>
                <LogTable/>
            </div>
        </div>
    )
}

export default Dashboard;