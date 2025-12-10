import { useState, useEffect } from "react";
import Lottie from "lottie-react";
import Loading from "../Components/Loading.json"; 
import { Bell, Activity } from "lucide-react";

const Alerts = () => {
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
          <Lottie animationData={Loading} loop={true} />
        </div>
        <p className="text-blue-500 font-medium mt-1 animate-pulse">
          Loading...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      
      <div className="max-w-2xl w-full flex flex-col items-center text-center">
        
        {/* Headings */}
        <h1 className="text-3xl text-slate-800 mb-3">
          Get notified about any issue across your stack
        </h1>
        <p className="text-slate-500 text-sm mb-16 max-w-xl mx-auto leading-relaxed">
          Bring together every team's data so engineers can collaborate and troubleshoot without friction
        </p>

        <div className="relative w-64 h-48 mx-auto">
          
          <div className="absolute top-12 left-0 w-full h-32 bg-indigo-600 rounded-2xl transform skew-x-12 rotate-[-5deg] opacity-90 shadow-2xl translate-x-2 translate-y-2"></div>

          <div className="absolute top-8 left-0 w-full h-32 bg-indigo-50 border-2 border-dashed border-indigo-300 rounded-2xl transform skew-x-12 rotate-[-5deg] flex items-center justify-center">
             <div className="text-indigo-200">
               <span className="text-4xl font-light">+</span>
             </div>
          </div>

          <div className="absolute top-0 left-4 w-full h-32 bg-white border border-indigo-100 rounded-2xl shadow-lg transform skew-x-12 rotate-[-5deg] flex items-center justify-center overflow-hidden">
            
            <div className="w-full h-full p-4 flex items-center">
                <svg viewBox="0 0 100 40" className="w-full h-full stroke-purple-500 stroke-[3] fill-none drop-shadow-md">
                   <path d="M0,30 Q10,25 20,30 T40,20 T60,25 T80,10 T100,5" />
                </svg>
            </div>
          </div>

          <div className="absolute -top-4 right-8 bg-pink-500 w-12 h-12 rounded-xl transform rotate-12 shadow-lg flex items-center justify-center z-10 border-2 border-white">
             <Bell className="text-white fill-white" size={20} />
             {/* Alert Badge */}
             <div className="absolute top-2 right-3 w-2 h-2 bg-yellow-300 rounded-full animate-ping"></div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Alerts;