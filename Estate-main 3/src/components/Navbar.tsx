import { Video, LogOut, Settings, Award, BookOpen, PlusCircle, Database } from "lucide-react";
import { UserState, AgentBranding } from "../types";

interface NavbarProps {
  user: UserState;
  branding: AgentBranding;
  activeTab: "analyze" | "library" | "branding" | "prompts";
  setActiveTab: (tab: "analyze" | "library" | "branding" | "prompts") => void;
  onLogout: () => void;
}

export default function Navbar({ user, branding, activeTab, setActiveTab, onLogout }: NavbarProps) {
  const getThemeColorClass = () => {
    switch (branding.themeColor) {
      case "gold": return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      case "cobalt": return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      case "charcoal": return "bg-slate-500/10 text-slate-300 border-slate-500/20";
      default: return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
    }
  };

  const getThemeTextClass = () => {
    switch (branding.themeColor) {
      case "gold": return "text-amber-400";
      case "cobalt": return "text-blue-400";
      case "charcoal": return "text-slate-350";
      default: return "text-emerald-400";
    }
  };

  return (
    <nav className="border-b border-slate-800/80 bg-[#0E121E]/85 backdrop-blur-md sticky top-0 z-40 transition-colors">
      <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between">
        {/* Left Brand Area */}
        <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => setActiveTab("analyze")}>
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Video className="w-4 h-4 text-white stroke-[2.5]" />
          </div>
          <div>
            <span className="font-display font-extrabold text-base tracking-tight text-white">
              Estate<span className="font-medium text-indigo-400">Lens</span>
            </span>
            <span className="block text-[8px] font-mono text-slate-400 uppercase tracking-widest leading-[1]">Agent Hub</span>
          </div>
        </div>

        {/* Middle Navigation tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-[#07090E]/60 border border-slate-800/60 rounded-xl">
          <button
            onClick={() => setActiveTab("analyze")}
            className={`px-4 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
              activeTab === "analyze"
                ? "bg-[#1F293D]/90 text-white border border-slate-700/65 shadow-md shadow-[#000000]/40"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/30"
            }`}
          >
            <PlusCircle className="w-4 h-4" />
            <span className="hidden sm:inline">New Analysis</span>
          </button>

          <button
            onClick={() => setActiveTab("library")}
            className={`px-4 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
              activeTab === "library"
                ? "bg-[#1F293D]/90 text-white border border-slate-700/65 shadow-md shadow-[#000000]/40"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/30"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span className="hidden sm:inline">Property Library</span>
          </button>

          <button
            onClick={() => setActiveTab("branding")}
            className={`px-4 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
              activeTab === "branding"
                ? "bg-[#1F293D]/90 text-white border border-slate-700/65 shadow-md shadow-[#000000]/40"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/30"
            }`}
          >
            <Settings className="w-4 h-4" />
            <span className="hidden sm:inline">Agency Branding</span>
          </button>

          <button
            onClick={() => setActiveTab("prompts")}
            className={`px-4 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
              activeTab === "prompts"
                ? "bg-[#1F293D]/90 text-white border border-slate-700/65 shadow-md shadow-[#000000]/40"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/30"
            }`}
          >
            <Database className="w-4 h-4 text-indigo-400" />
            <span className="hidden sm:inline">AI Prompt & DB Studio</span>
          </button>
        </div>

        {/* Right User & Logout actions */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex flex-col items-end text-right">
            <span className="text-xs font-semibold text-slate-200 truncate max-w-40">{branding.name || user.email}</span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <Award className={`w-3 h-3 ${getThemeTextClass()}`} />
              <span className={`text-[10px] font-mono font-bold tracking-wide border px-1.5 py-0.2 rounded uppercase leading-none ${getThemeColorClass()}`}>
                {user.tier} Account
              </span>
            </div>
          </div>

          <div className="h-8 w-[1px] bg-slate-800 hidden md:block"></div>

          <button
            onClick={onLogout}
            title="Log Out"
            className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all border border-slate-800/80 hover:border-red-500/20"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </nav>
  );
}
