import { useState, useEffect } from "react";
import Lottie from "lottie-react";
import LoadingAnimation from "../Components/Loading.json"; 
import { Pencil, Shield, User } from "lucide-react";

const Settings = () => {
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
          <Lottie animationData={LoadingAnimation} loop={true} />
        </div>
        <p className="text-gray-500 font-medium mt-4 animate-pulse">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-slate-800 pb-10">
      
      {/* --- Blue Header Background --- */}
      <div className="h-32 w-full bg-gradient-to-r from-blue-600 to-blue-400 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(45deg,transparent_25%,#fff_25%,#fff_50%,transparent_50%,transparent_75%,#fff_75%,#fff_100%)] bg-[length:24px_24px]"></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative">
        
        {/* --- Profile Avatar (Overlapping) --- */}
        <div className="absolute -top-12 left-6">
          <div className="w-24 h-24 bg-yellow-400 rounded-full border-4 border-white shadow-md flex items-center justify-center">
             <div className="text-yellow-800 font-bold text-3xl">
                <User size={40} />
             </div>
          </div>
        </div>

        {/* --- Profile Info & Edit Button --- */}
        <div className="pt-16 pb-8 flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">empowering smme</h1>
            <p className="text-sm text-slate-500 mt-1">7:49 pm local time</p>
          </div>
          
          <button className="mt-4 md:mt-0 flex items-center px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded shadow-sm transition-colors">
            <Pencil size={14} className="mr-2" />
            Edit
          </button>
        </div>

        {/* --- Content Cards --- */}
        <div className="space-y-6">
          
          {/* Card: Teams */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">Teams</h2>
            <div className="text-slate-400 text-sm italic">
              No teams assigned.
            </div>
          </div>

          {/* Card: Roles */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">Roles</h2>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-gray-100 text-slate-600 border border-gray-200">
                Datadog Admin Role
              </span>
            </div>
          </div>

          {/* Card: Activity and Login */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-slate-800 mb-6">Activity and Login</h2>
            
            <div className="flex items-center mb-8">
              <span className="text-sm font-medium text-slate-700 mr-2">Datadog Status</span>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-green-100 text-green-700 uppercase tracking-wide">
                Active
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
              <InfoItem label="Created" value="Dec 10, 2025" />
              <InfoItem label="Login Methods" value="Default" />
              
              <InfoItem label="Last Modified" value="Dec 10, 2025" />
              <InfoItem label="Multi-Factor Authentication" value="Unconfigured" />

              <div className="md:col-span-2">
                 <InfoItem label="Email Verified" value="Verified" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

const InfoItem = ({ label, value }) => (
  <div>
    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">
      {label}
    </h3>
    <p className="text-sm font-medium text-slate-800">
      {value}
    </p>
  </div>
);

export default Settings;