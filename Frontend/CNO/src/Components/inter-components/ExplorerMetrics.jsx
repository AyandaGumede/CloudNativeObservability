import { 
  Gauge, 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Search, 
  Plus, 
  Code, 
  Palette, 
  MoreHorizontal, 
  Maximize2, 
  Share, 
  SplitSquareHorizontal,
  FileSpreadsheet,
  Sigma
} from 'lucide-react';

const ExplorerMetrics = () => {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-700 flex flex-col">
      
      {/* --- TOP NAVIGATION HEADER --- */}
      <header className="border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between h-12 px-4">
          
      
          <div className="flex items-center h-full">
            <div className="flex items-center mr-6">
              <Gauge size={18} className="text-slate-500 mr-2" />
              <span className="font-semibold text-slate-700 text-lg">Metrics</span>
            </div>

            <nav className="flex space-x-6 h-full">
              <NavItem label="Overview" />
              <NavItem label="Explorer" active />
            </nav>
          </div>

          <div className="flex items-center space-x-2">
        
            <button className="flex items-center px-3 py-1 text-xs font-medium border border-gray-300 rounded hover:bg-gray-50 text-slate-600">
              Configure Metrics
              <ChevronDown size={14} className="ml-1" />
            </button>

          
            <div className="flex items-center border border-gray-300 rounded overflow-hidden">
              <button className="px-2 py-1 bg-gray-50 text-xs font-medium border-r border-gray-300 text-slate-600">
                1h
              </button>
              <button className="flex items-center px-3 py-1 bg-white text-xs text-slate-600 min-w-[200px] justify-between">
                Dec 10, 6:24 pm – Dec 10, 7:24 pm
                <ChevronDown size={12} className="opacity-50" />
              </button>
            </div>

      
            <div className="flex items-center border border-gray-300 rounded">
              <button className="p-1 hover:bg-gray-50 border-r border-gray-300"><ChevronLeft size={14} /></button>
              <button className="p-1 hover:bg-gray-50 border-r border-gray-300"><Play size={14} fill="currentColor" /></button>
              <button className="p-1 hover:bg-gray-50"><ChevronRight size={14} /></button>
            </div>
            
            <button className="p-1 text-slate-400 hover:text-slate-600">
              <Search size={16} />
            </button>
          </div>
        </div>
      </header>

      <div className="p-4 border-b border-gray-200">
        
        <div className="flex items-center mb-3">
          <div className="flex items-center justify-center w-6 h-8 bg-blue-600 text-white text-xs font-bold rounded-l-sm">
            a
          </div>

          <div className="flex items-center border border-gray-300 h-8 text-sm w-full rounded-r-sm shadow-sm">
            
            <div className="px-3 border-r border-gray-300 bg-gray-50 h-full flex items-center cursor-pointer hover:bg-gray-100">
              <span className="mr-1">Metrics</span>
              <ChevronDown size={12} className="opacity-50" />
            </div>

            <div className="flex-1 bg-yellow-100 h-full flex items-center px-3 text-slate-800 font-medium">
              system.cpu.user
            </div>

            <div className="px-3 h-full flex items-center border-l border-gray-300 text-slate-500 bg-white">
              <span className="mr-2 text-slate-400">from</span>
              <span>(everywhere)</span>
            </div>

             <div className="px-3 h-full flex items-center border-l border-gray-300 text-slate-500 bg-white">
              <span className="mr-2 text-slate-400">avg by</span>
              <span>(everything)</span>
            </div>

            <div className="px-2 h-full flex items-center border-l border-gray-300 cursor-pointer hover:bg-gray-50">
              <Sigma size={14} className="mr-1 text-slate-500" />
              <span>Modify</span>
            </div>
          </div>

          <div className="flex items-center ml-4 space-x-3 text-slate-400">
             <Code size={16} className="cursor-pointer hover:text-slate-600" />
             <Palette size={16} className="cursor-pointer hover:text-slate-600" />
             <span className="text-xs cursor-pointer hover:text-slate-600">as...</span>
          </div>
        </div>

        <div className="flex space-x-2">
          <button className="flex items-center px-3 py-1 border border-gray-300 rounded-sm text-xs font-medium text-slate-600 hover:bg-gray-50">
            <Plus size={12} className="mr-1" /> Add Query
          </button>
          <button className="flex items-center px-3 py-1 border border-gray-300 rounded-sm text-xs font-medium text-slate-600 hover:bg-gray-50">
            <Plus size={12} className="mr-1" /> Add Formula
          </button>
        </div>

        <div className="flex items-center mt-4 text-xs text-slate-600 space-x-4">
           <div className="flex items-center space-x-1">
             <span className="text-slate-400">Display:</span>
             <span className="font-medium">Lines</span>
             <ChevronDown size={10} />
           </div>
           <div className="flex items-center space-x-1">
             <span className="text-slate-400">Style:</span>
             <span className="font-medium">Solid</span>
             <ChevronDown size={10} />
           </div>
           <div className="flex items-center space-x-1">
             <span className="text-slate-400">Stroke:</span>
             <span className="font-medium">Normal</span>
             <ChevronDown size={10} />
           </div>
           <div className="flex items-center space-x-1">
             <span className="text-slate-400">Color:</span>
             <div className="w-3 h-3 bg-blue-400 rounded-full mr-1"></div>
             <span className="font-medium">Classic</span>
             <ChevronDown size={10} />
           </div>
           <div className="flex items-center space-x-1 ml-4 border-l pl-4 border-gray-300">
             <span className="text-slate-400">Order by:</span>
             <span className="font-medium">Tags</span>
             <ChevronDown size={10} />
           </div>
           <div className="flex items-center space-x-2">
              <div className="w-8 h-4 bg-gray-200 rounded-full relative cursor-pointer">
                <div className="w-3 h-3 bg-white rounded-full absolute left-0.5 top-0.5 shadow-sm"></div>
              </div>
              <span>Reverse</span>
           </div>
        </div>
      </div>

      <div className="flex-1 bg-gray-50 p-4">
        <div className="bg-white border border-gray-200 rounded-sm shadow-sm h-full flex flex-col">
            
            <div className="flex items-center justify-between p-2 border-b border-gray-100">
               <div className="flex space-x-2">
                 <button className="flex items-center px-2 py-1 border border-gray-300 rounded text-xs text-slate-600 hover:bg-gray-50">
                    <SplitSquareHorizontal size={14} className="mr-1.5" /> Split Graph
                 </button>
                 <button className="flex items-center px-2 py-1 border border-gray-300 rounded text-xs text-slate-600 hover:bg-gray-50">
                    <FileSpreadsheet size={14} className="mr-1.5" /> Open in Sheets <span className="text-[9px] bg-purple-100 text-purple-700 px-1 ml-1 rounded">NEW</span>
                 </button>
                 <button className="flex items-center px-2 py-1 border border-gray-300 rounded text-xs text-slate-600 hover:bg-gray-50">
                    More...
                 </button>
                 
                 <div className="flex items-center ml-4 space-x-2">
                    <div className="w-8 h-4 bg-gray-200 rounded-full relative cursor-pointer">
                        <div className="w-3 h-3 bg-white rounded-full absolute left-0.5 top-0.5 shadow-sm"></div>
                    </div>
                    <span className="text-xs text-slate-600">One graph per query</span>
                 </div>
               </div>
            </div>

            {/* Chart Content */}
            <div className="flex-1 p-4 relative min-h-[300px]">
                {/* Title */}
                <div className="text-xs font-mono text-slate-500 mb-2">
                    avg:system.cpu.user{`{*}`}
                </div>

                {/* Top Right Icons */}
                <div className="absolute top-4 right-4 flex space-x-2 text-slate-400">
                    <Share size={16} className="cursor-pointer hover:text-slate-600"/>
                    <Maximize2 size={16} className="cursor-pointer hover:text-slate-600"/>
                </div>

                {/* Chart Grid Placeholder */}
                <div className="relative h-[250px] w-full border-l border-b border-gray-200 mt-4">
                    
                    {/* Y-Axis Labels */}
                    <div className="absolute -left-8 top-0 text-[10px] text-slate-400">150</div>
                    <div className="absolute -left-8 top-1/3 text-[10px] text-slate-400">100</div>
                    <div className="absolute -left-8 top-2/3 text-[10px] text-slate-400">50</div>
                    <div className="absolute -left-8 bottom-0 text-[10px] text-slate-400">0</div>

                    {/* Horizontal Grid Lines */}
                    <div className="absolute top-0 w-full h-px bg-gray-100"></div>
                    <div className="absolute top-1/3 w-full h-px bg-gray-100"></div>
                    <div className="absolute top-2/3 w-full h-px bg-gray-100"></div>

                    {/* X-Axis Labels */}
                    <div className="flex justify-between w-full absolute -bottom-5 px-2">
                         <span className="text-[10px] text-slate-400">18:25</span>
                         <span className="text-[10px] text-slate-400">18:30</span>
                         <span className="text-[10px] text-slate-400">18:35</span>
                         <span className="text-[10px] text-slate-400">18:40</span>
                         <span className="text-[10px] text-slate-400">18:45</span>
                         <span className="text-[10px] text-slate-400">18:50</span>
                         <span className="text-[10px] text-slate-400">18:55</span>
                         <span className="text-[10px] text-slate-400">19:00</span>
                         <span className="text-[10px] text-slate-400">19:05</span>
                         <span className="text-[10px] text-slate-400">19:10</span>
                         <span className="text-[10px] text-slate-400">19:15</span>
                         <span className="text-[10px] text-slate-400">19:20</span>
                    </div>

                    <div className="absolute bottom-0 w-full h-[2px] bg-gray-400 opacity-50"></div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

const NavItem = ({ label, active }) => (
  <a 
    href="#" 
    className={`flex items-center text-sm font-medium h-full border-b-2 transition-colors px-1
      ${active 
        ? 'text-blue-600 border-blue-600' 
        : 'text-slate-500 border-transparent hover:text-slate-700 hover:border-gray-300'
      }`}
  >
    {label}
  </a>
);

export default ExplorerMetrics;