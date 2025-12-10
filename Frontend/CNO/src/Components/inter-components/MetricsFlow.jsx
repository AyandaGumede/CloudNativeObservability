import React from 'react';
import { 
  Server, 
  Cloud, 
  Code, 
  FileText, 
  Settings, 
  Database, 
  Activity,
  Edit2,
  ArrowRight
} from 'lucide-react';

const MetricsFlow = () => {
  return (
    <div className="min-h-screen bg-white p-8 font-sans text-slate-800">
      {/* Header */}
      <div className="mb-8 border-b pb-4">
        <h1 className="text-2xl font-bold text-slate-900">How your metrics flow</h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 items-stretch justify-center">
        
        <div className="flex-1 bg-white rounded-xl p-4 border shadow-lg border-slate-200">
          <h2 className="text-lg font-semibold mb-4 text-slate-700">Metric Sources</h2>
          <div className="space-y-3">
            <SourceCard 
              icon={<Server size={18} />} 
              title="Agents" 
              subtitle="0 active agents"
              details={[{ label: 'Standard Metrics', val: 0 }, { label: 'Custom Metrics', val: 0 }]}
            />
            <SourceCard 
              icon={<Cloud size={18} />} 
              title="Cloud Integrations" 
              subtitle="No active integrations"
              details={[{ label: 'Standard Metrics', val: 0 }]}
            />
            <SourceCard 
              icon={<Code size={18} />} 
              title="API" 
              subtitle="Direct ingestion"
              details={[{ label: 'Custom Metrics', val: 0 }]}
            />
            <SourceCard 
              icon={<FileText size={18} />} 
              title="Logs & APM" 
              subtitle="Events and traces"
              details={[]} 
            />
          </div>
        </div>

        <div className="hidden lg:flex flex-col items-center justify-center shrink-0 relative z-10">
           <div className="absolute inset-0 flex items-center justify-center -z-10">
             <div className="w-full h-1 bg-slate-200"></div>
           </div>
           
           <div className="w-24 h-full min-h-[400px] bg-gradient-to-b from-purple-700 to-indigo-900 rounded-2xl shadow-lg flex flex-col items-center justify-center text-white p-4">
             <Database size={32} className="mb-2 opacity-80" />
             <span className="font-bold text-sm tracking-widest text-center">CNO</span>
           </div>
        </div>

        <div className="flex-1 bg-white rounded-xl shadow-lg p-4 border border-slate-200">
          <h2 className="text-lg font-semibold mb-4 text-slate-700">Configurable Processing</h2>
          <div className="space-y-3">
            <ProcessingCard title="Selected Metrics" desc="Configure tags to manage volume" />
            <ProcessingCard title="Distribution Metrics" desc="Enable pre-computed percentiles" />
            <ProcessingCard title="Logs & APM Metrics" desc="Generate metrics from events" />
            <ProcessingCard title="Historical Metrics" desc="Ingest metrics from past periods" />
            
            <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm flex justify-between items-center opacity-75">
              <span className="text-sm font-medium text-slate-600">All Other Metrics</span>
              <span className="text-xs font-mono bg-slate-100 px-2 py-1 rounded">0</span>
            </div>
          </div>
        </div>

        <div className="hidden lg:flex flex-col justify-center text-slate-300">
          <ArrowRight size={32} className='text-black'/>
        </div>

        <div className="flex-1 bg-white shadow-lg rounded-xl p-4 border border-slate-200">
          <h2 className="text-lg font-semibold mb-4 text-slate-700">Available Metrics</h2>
          <div className="space-y-3 h-full">
            <MetricStatCard label="Total Metrics" value="3" />
            <MetricStatCard label="Standard Metrics" value="3" color="bg-blue-500" />
            <MetricStatCard label="Custom Metrics" value="0" color="bg-purple-500" />
          </div>
        </div>

      </div>
    </div>
  );
};


const SourceCard = ({ icon, title, subtitle, details }) => (
  <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-center mb-2 text-slate-700">
      <div className="mr-2 opacity-75">{icon}</div>
      <span className="font-semibold text-sm">{title}</span>
    </div>
    <p className="text-xs text-slate-500 mb-3">{subtitle}</p>
    
    {details.length > 0 && (
      <div className="space-y-1">
        {details.map((d, i) => (
          <div key={i} className="flex justify-between items-center text-xs bg-slate-50 px-2 py-1 rounded border border-slate-100">
            <span className="font-medium text-slate-600 text-[10px] uppercase">{d.label}</span>
            <span className="font-mono text-slate-800">{d.val}</span>
          </div>
        ))}
      </div>
    )}
  </div>
);

const ProcessingCard = ({ title, desc }) => (
  <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm relative group cursor-pointer hover:border-blue-300 transition-colors">
    <div className="flex justify-between items-start mb-1">
      <span className="font-semibold text-sm text-slate-800">{title}</span>
      <Edit2 size={14} className="text-slate-400 group-hover:text-blue-500" />
    </div>
    <p className="text-xs text-slate-500 mb-3">{desc}</p>
    
    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden flex">
      <div className="w-0 bg-blue-500 h-full"></div>
    </div>
    <div className="flex justify-between mt-1 text-[10px] text-slate-400 font-mono">
      <span>0</span>
      <span>0</span>
    </div>
  </div>
);

const MetricStatCard = ({ label, value, color }) => (
  <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm flex flex-col justify-between h-32 relative overflow-hidden">
    <div className="flex justify-between items-start z-10">
      <div>
        <div className="text-3xl font-light text-slate-800">{value}</div>
        <div className="text-xs font-bold text-slate-400 uppercase mt-1">{label}</div>
      </div>
      <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">1mo</span>
    </div>
    
    {color && (
      <div className={`absolute right-0 top-8 bottom-8 w-1.5 rounded-l-md ${color} opacity-80`}></div>
    )}
    
    <div className="w-full h-px bg-slate-200 mt-auto"></div>
  </div>
);

export default MetricsFlow;