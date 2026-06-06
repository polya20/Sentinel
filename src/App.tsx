import React, { useState } from "react";
import { Activity, AlertTriangle, CheckCircle, Search, Settings2, ShieldAlert, Database } from "lucide-react";
import { mockQuestions } from "./data";
import { TabCategory, QuestionDef } from "./types";
import { QuestionCard } from "./components/question-card";
import { Chat } from "./components/chat";
import { cn } from "./lib/utils";

export default function App() {
  const [activeTab, setActiveTab] = useState<TabCategory>("Pre-Incident");
  const [searchQuery, setSearchQuery] = useState("");
  const [chatInput, setChatInput] = useState<string | undefined>(undefined);

  const tabs: { id: TabCategory; label: string; icon: React.ReactNode; desc: string }[] = [
    { id: "Pre-Incident", label: "Pre-Incident", icon: <CheckCircle className="w-4 h-4" />, desc: "Prevent issues before they occur" },
    { id: "Active Incident", label: "Active Incident", icon: <Activity className="w-4 h-4" />, desc: "Troubleshoot current fires" },
    { id: "Post-Incident", label: "Post-Incident", icon: <ShieldAlert className="w-4 h-4" />, desc: "Root cause & prevention" },
    { id: "Capabilities", label: "Capabilities", icon: <Database className="w-4 h-4" />, desc: "What KCC can and cannot fix" },
    { id: "Meta", label: "Meta Questions", icon: <Settings2 className="w-4 h-4" />, desc: "Strategic planning" },
  ];

  const filteredQuestions = mockQuestions
    .filter(q => q.category === activeTab)
    .filter(q => q.text.toLowerCase().includes(searchQuery.toLowerCase()) || q.subCategory.toLowerCase().includes(searchQuery.toLowerCase()));

  // Group questions by subcategory
  const groupedQuestions = filteredQuestions.reduce<Record<string, QuestionDef[]>>((acc, q) => {
    if (!acc[q.subCategory]) acc[q.subCategory] = [];
    acc[q.subCategory].push(q);
    return acc;
  }, {});

  const handleQuestionClick = (text: string) => {
    setChatInput(text);
  };

  return (
    <div className="flex flex-col h-screen w-full bg-[#0A0A0B] font-sans text-[#D1D1D1] overflow-hidden">
      
      {/* Header */}
      <header className="h-16 flex-shrink-0 border-b border-[#242427] flex items-center justify-between px-6 bg-[#111113]">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 bg-[#EF4444] rounded flex-shrink-0 flex items-center justify-center text-black font-bold text-xs tracking-wider">KCC</div>
          <div>
            <h1 className="text-sm font-semibold tracking-wide text-white uppercase">Sentinel: Kafka Cruise Control</h1>
            <p className="text-[10px] text-slate-400 uppercase tracking-widest">Prod-Cluster-04 // Region: US-East-1</p>
          </div>
        </div>
        <div className="flex flex-1 max-w-md mx-6">
           <div className="relative w-full">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
             <input 
               className="w-full pl-9 pr-4 py-1.5 bg-[#0D0D0F] border border-[#242427] rounded text-xs text-white focus:outline-none focus:border-[#2563EB] transition-colors"
               placeholder="Search queries..."
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
             />
           </div>
        </div>
        <div className="hidden md:flex items-center gap-6">
          <div className="flex items-center gap-2 px-3 py-1 bg-[#1A1A1C] border border-[#242427] rounded-full">
            <span className="w-2 h-2 rounded-full bg-[#EF4444] shadow-[0_0_8px_#EF4444]"></span>
            <span className="text-[11px] font-medium text-white">CRITICAL ANOMALY DETECTED</span>
          </div>
          <div className="flex gap-4 text-[11px] font-medium text-slate-300">
            <span>UPTIME: 142D 04H</span>
            <span>GOALS: 8/12 VIOLATED</span>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        
        {/* Sidebar Tabs */}
        <nav className="w-56 flex-shrink-0 border-r border-[#242427] flex flex-col bg-[#0D0D0F]">
          <div className="p-4">
            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-4">Incident Lifecycle</p>
            <div className="space-y-1">
              {tabs.map((tab, idx) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "w-full text-left flex items-center gap-2 px-3 py-2 rounded text-xs transition-colors border-l-2",
                      isActive 
                        ? "bg-[#1A1A1C] text-white border-[#10B981]" 
                        : "text-slate-300 hover:text-white hover:bg-[#161618] border-transparent"
                    )}
                  >
                    0{idx + 1}. {tab.label}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="mt-auto p-4 border-t border-[#242427]">
            <div className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-2">Resource Usage</div>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-[10px] mb-1 text-slate-300"><span>CPU Load</span><span className="text-white">84%</span></div>
                <div className="h-1 bg-[#1A1A1C] rounded-full overflow-hidden"><div className="h-full bg-[#F59E0B] w-[84%]"></div></div>
              </div>
              <div>
                <div className="flex justify-between text-[10px] mb-1 text-slate-300"><span>Replication BW</span><span className="text-white">242MB/s</span></div>
                <div className="h-1 bg-[#1A1A1C] rounded-full overflow-hidden"><div className="h-full bg-[#10B981] w-[30%]"></div></div>
              </div>
            </div>
          </div>
        </nav>

        {/* Content Area */}
        <main className="flex-1 p-6 overflow-y-auto bg-[#0A0A0B]">
          <div className="space-y-8 h-full">
            {Object.keys(groupedQuestions).length === 0 ? (
              <div className="text-center py-12 text-slate-400 text-sm">
                No questions found matching your search.
              </div>
            ) : (
              Object.entries(groupedQuestions).map(([subCategory, questions]) => (
                <section key={subCategory} className="space-y-4">
                  <h3 className="text-xs tracking-widest font-bold text-slate-300 uppercase">{subCategory}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {questions.map(q => (
                      <QuestionCard key={q.id} question={q} onClick={handleQuestionClick} />
                    ))}
                  </div>
                </section>
              ))
            )}
          </div>
        </main>
        
        {/* RIGHT: Chat Assistant */}
        <div className="w-80 flex-shrink-0 lg:w-[400px]">
          <Chat initialInput={chatInput} onClearInput={() => setChatInput(undefined)} />
        </div>
      </div>
      
      {/* Bottom Status Bar */}
      <footer className="h-8 flex-shrink-0 border-t border-[#242427] bg-[#0D0D0F] flex items-center px-4 justify-between">
        <div className="flex gap-4 text-[10px] text-slate-400 font-mono">
          <span>v2.12.0-stable</span>
          <span>LATENCY: 12ms</span>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-slate-300">
          <span>Cluster Health Index:</span>
          <span className="text-[#EF4444] font-bold">4.2 (CRITICAL)</span>
        </div>
      </footer>
    </div>
  );
}
