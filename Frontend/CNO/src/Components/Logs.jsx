import { useState, useEffect } from "react";
import Lottie from "lottie-react";
import LoadingAnimation from "../Components/Loading.json"; 
import { 
  Server, 
  Container, 
  Cloud, 
  Monitor, 
  Settings, 
  FileSearch, 
  ExternalLink 
} from "lucide-react";

const Logs = () => {
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
    <div className="min-h-screen bg-white p-8 font-sans text-slate-600">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12">
        
        {/* LEFT COLUMN*/}
        <div className="w-full lg:w-1/3">
          <h2 className="text-sm font-semibold text-slate-700 mb-4">
            Where are your logs coming from?
          </h2>
          
          <div className="space-y-3">
            <SourceOption 
              icon={<Server size={24} />} 
              title="Server" 
              desc="With the CNOs" 
            />
            <SourceOption 
              icon={<Container size={24} />} 
              title="Container" 
              desc="Docker, Kubernetes..." 
            />
            <SourceOption 
              icon={<Cloud size={24} />} 
              title="Cloud" 
              desc="AWS, GCP, Azure..." 
            />
            <SourceOption 
              icon={<Monitor size={24} />} 
              title="Client" 
              desc="JavaScript, Mobile..." 
            />
            <SourceOption 
              icon={<Settings size={24} />} 
              title="Other" 
              desc="Rsyslog, FluentD..." 
            />
          </div>
        </div>

        {/* RIGHT COLUMN*/}
        <div className="flex-1 flex flex-col items-center justify-center text-center pt-10 lg:pt-0">
          
          <div className="mb-6 text-blue-600 bg-purple-50 p-6 rounded-full">
            <FileSearch size={48} />
          </div>

          <h1 className="text-xl font-normal text-slate-600 mb-6">
            Get started with logs
          </h1>

          <div className="max-w-lg space-y-4 text-sm text-slate-500 mb-8">
            <p>
              Follow the instructions for your log source. When you're done, you'll be able to use logs to drill into and troubleshoot any part of your infrastructure.
            </p>
            <p>
              Learn more about how to optimize your Log Observability with
              <br />
              <span className="font-bold text-slate-700">Logging Without Limits™</span>
            </p>
          </div>

          {/* Footer Links */}
          <div className="flex space-x-4 text-xs text-blue-500">
            <a href="#" className="flex items-center hover:underline">
              Full documentation <ExternalLink size={10} className="ml-1" />
            </a>
          </div>

        </div>
      </div>
    </div>
  );
};

const SourceOption = ({ icon, title, desc }) => (
  <div className="group flex items-center p-4 border border-gray-200 rounded-sm hover:border-purple-400 hover:shadow-sm cursor-pointer transition-all bg-white">
    <div className="mr-4 text-blue-600 group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <div className="flex flex-col items-start">
      <span className="text-sm font-medium text-slate-700 group-hover:text-purple-700">
        {title}
      </span>
      <span className="text-xs text-slate-400">
        {desc}
      </span>
    </div>
  </div>
);

export default Logs;