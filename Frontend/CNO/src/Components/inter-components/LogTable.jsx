import { AlertCircle, CheckCircle, Info, AlertTriangle, Tag, Server } from "lucide-react";

const LogTable = () => {
  //Dummy Data: Matches your C# LogEntry Model
  const logs = [
    { 
        id: "a1b2c3d4-e5f6-7890-1234-56789abcdef0", 
        time: "2025-12-10T10:42:05.124Z", 
        level: "Error", 
        service: "payment-service", 
        instanceId: "pod-pay-01", 
        message: "Connection timeout: database pool exhausted (500ms limit)",
        labels: "env:prod, region:us-east" 
    },
    { 
        id: "b2c3d4e5-f678-9012-3456-789abcdef012", 
        time: "2025-12-10T10:42:04.882Z", 
        level: "Warn",  
        service: "auth-gateway",    
        instanceId: "pod-auth-04", 
        message: "Rate limit approaching for IP 192.168.1.45",
        labels: "security:high"
    },
    { 
        id: "c3d4e5f6-7890-1234-5678-9abcdef01234", 
        time: "2025-12-10T10:42:03.400Z", 
        level: "Info",  
        service: "cart-service",    
        instanceId: "pod-cart-02", 
        message: "Item added to cart: sk_88219 (User: usr_99)",
        labels: null 
    },
    { 
        id: "d4e5f678-9012-3456-7890-abcdef012345", 
        time: "2025-12-10T10:41:58.550Z", 
        level: "Error", 
        service: "notification-svc",
        instanceId: "pod-noti-09", 
        message: "Failed to send SMS: Provider unreachable",
        labels: "retry:true"
    },
  ];

  const getLevelStyle = (level) => {
    const normalized = level.toLowerCase();
    switch (normalized) {
      case "error": return "bg-red-50 text-red-600 border-red-200";
      case "warn":  return "bg-amber-50 text-amber-600 border-amber-200";
      case "info":  return "bg-blue-50 text-blue-600 border-blue-200";
      default:      return "bg-gray-50 text-gray-500 border-gray-200";
    }
  };

  const getIcon = (level) => {
    const normalized = level.toLowerCase();
    switch (normalized) {
      case "error": return <AlertCircle size={14} />;
      case "warn":  return <AlertTriangle size={14} />;
      case "info":  return <Info size={14} />;
      default:      return <CheckCircle size={14} />;
    }
  };

  const formatTime = (isoString) => {
    return new Date(isoString).toLocaleTimeString('en-US', {
        hour12: false, 
        hour: "2-digit", 
        minute: "2-digit", 
        second: "2-digit",
        fractionalSecondDigits: 3
    });
  };

  return (
    <div className="bg-white h-80 rounded-l border mt-8 border-gray-200 shadow-sm overflow-hidden flex flex-col h-full font-inter">
      {/* Header */}
      <div className="px-5 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <h3 className="text-blue-500">System Logs</h3>
        <div>
            <p className="text-xs text-gray-500 mt-0.5">Live stream from production database</p>
        </div>
        <div className="flex gap-2">
            <button className="text-xs font-medium px-3 py-1.5 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors">
                Export CSV
            </button>
        </div>
      </div>

      {/* Table*/}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 text-xs font-medium text-gray-500 border-b border-gray-100 uppercase tracking-wider">
              <th className="px-4 py-3 w-32">Time (UTC)</th>
              <th className="px-4 py-3 w-24">Level</th>
              <th className="px-4 py-3 w-32">Service</th>
              <th className="px-4 py-3 w-32">Instance ID</th>
              <th className="px-4 py-3">Message</th>
              <th className="px-4 py-3 w-40">Labels</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {logs.map((log) => (
              <tr 
                key={log.id} 
                className="hover:bg-blue-50/30 transition-colors group cursor-default border-t border-b text-xs"
              >
                {/* 1. TIME */}
                <td className="px-4 py-2 font-mono text-gray-500 whitespace-nowrap">
                  {formatTime(log.time)}
                </td>

                {/* 2. LEVEL */}
                <td className="px-4 py-2">
                  <span className={`
                    inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold border uppercase
                    ${getLevelStyle(log.level)}
                  `}>
                    {getIcon(log.level)}
                    {log.level}
                  </span>
                </td>


                {/* 3. SERVICE */}
                <td className="px-4 py-2 text-gray-700 font-medium whitespace-nowrap">
                  {log.service}
                </td>


                {/* 4. INSTANCE ID */}
                <td className="px-4 py-2 text-gray-500 whitespace-nowrap">
                   <div className="flex items-center gap-1.5">
                        <Server size={12} className="text-gray-400"/>
                        <span className="font-mono text-[10px]">{log.instanceId}</span>
                   </div>
                </td>


                {/* 5. MESSAGE */}
                <td className="px-4 py-2 text-gray-800 font-mono truncate max-w-xs group-hover:whitespace-normal group-hover:break-all">
                  {log.message}
                </td>


                {/* 6. LABELS */}
                <td className="px-4 py-2">
                    {log.labels ? (
                        <div className="flex flex-wrap gap-1">
                            {log.labels.split(',').map((lbl, i) => (
                                <span key={i} className="inline-flex items-center px-1.5 py-0.5 rounded bg-gray-100 text-gray-600 text-[10px] border border-gray-200">
                                    {lbl.trim()}
                                </span>
                            ))}
                        </div>
                    ) : (
                        <span className="text-gray-300">-</span>
                    )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LogTable;