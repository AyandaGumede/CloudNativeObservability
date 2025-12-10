import { useState, useEffect} from "react";
import Lottie from "lottie-react";
import LoadingAnimation from "../Components/Loading.json";
import { Gauge, ChevronDown } from 'lucide-react';
import MetricsFlow from "./inter-components/MetricsFlow";
import { Link } from "react-router-dom";
 
 const Metrics = () => {

   const[isLoading, setIsLoading] = useState(true);


  useEffect(()=>{
    const timer = setTimeout(()=>{
      setIsLoading(false);
    }, 3000);

    return ()=>clearTimeout(timer)
  },[]);
  

  if(isLoading){
      return(
        <div className="h-screen w-full flex flex-col items-center justify-center bg-white">
          <div className="w-64 h-64">
              <Lottie animationData={LoadingAnimation} loop={true} />
          </div>
          <p className="text-gray-500 font-medium mt-4 animate-pulse">Loading...</p>
        </div>
      )
  }


   return (
    <div className="w-full bg-white border-b border-gray-200">
      <div className="flex items-center justify-between px-4 h-14">
        
        <div className="flex items-center">
          
          <div className="flex items-center mr-8">
            <Gauge size={20} className="text-gray-400 mr-2" />
            <h1 className="text-lg font-semibold text-slate-700">
              Metrics
            </h1>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex space-x-6 h-14">
            <Link 
              href="#" 
              className="flex items-center text-sm font-medium text-blue-600 border-b-2 border-blue-600 h-full"
            >
              Overview
            </Link>
            
            <Link 
              to="/explorer" 
              className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 h-full border-b-2 border-transparent hover:border-gray-300 transition-colors"
            >
              Explorer
            </Link>  
          </nav>
        </div>

        <div>
          <button className="flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors">
            Configure Metrics
            <ChevronDown size={16} className="ml-2 text-gray-500" />
          </button>
        </div>

      </div>

      <MetricsFlow />
    </div>
  );
 }
 
 export default Metrics