import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./Components/Sidebar";
import Dashboard from "./Components/Dashboard";
import Alerts from "./Components/Alerts";
import Logs from "./Components/Logs";
import Metrics from "./Components/Metrics";
import Settings from "./Components/Settings";
import Profile from "./Components/Profile";
import ExplorerMetrics from "./Components/inter-components/explorerMetrics";



const App = () => {
  return (
    <BrowserRouter>

      <div className="flex">
        <Sidebar />
          <div className="flex-1 bg-gray-200 h-screen overflow-y-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/alerts" element={<Alerts />} />
              <Route path="/logs" element={<Logs />} />
              <Route path="/metrics" element={<Metrics />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/explorer" element={<ExplorerMetrics />} />
            </Routes>
          </div>
      </div>
    </BrowserRouter>
  );
};

export default App;