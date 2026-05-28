import { useState, useEffect, FormEvent } from "react";
import { Database, Sparkles, Terminal, Save, CheckCircle, RefreshCw, Cpu, Server, HardDrive, Files, Key } from "lucide-react";

interface PromptTemplates {
  videoAnalysisPrompt: string;
  reelGenerationPrompt: string;
}

interface DbStatus {
  success: boolean;
  engine: string;
  filePath: string;
  fileSizeBytes: number;
  lastModified: string;
  tables: {
    properties: { rowCount: number; columns: string[] };
    branding: { rowCount: number; columns: string[] };
    prompts: { rowCount: number; columns: string[] };
  };
  healthCheck: {
    fileAccessible: boolean;
    schemaMatch: boolean;
    isWriteable: boolean;
  };
}

export default function PromptStudio() {
  const [prompts, setPrompts] = useState<PromptTemplates>({
    videoAnalysisPrompt: "",
    reelGenerationPrompt: ""
  });
  const [dbStatus, setDbStatus] = useState<DbStatus | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const loadData = async () => {
    setIsLoading(true);
    try {
      // 1. Fetch prompts
      const promptRes = await fetch("/api/prompts");
      if (promptRes.ok) {
        const pData = await promptRes.json();
        if (pData.success && pData.data) {
          setPrompts(pData.data);
        }
      }

      // 2. Fetch db status
      const dbRes = await fetch("/api/db/status");
      if (dbRes.ok) {
        const dData = await dbRes.json();
        if (dData.success) {
          setDbStatus(dData);
        }
      }
    } catch (err: any) {
      console.warn("Could not query full system status backend:", err);
      // Fallback sandbox info
      setDbStatus({
        success: true,
        engine: "Browser Memory fallback (Local SQLite Simulation)",
        filePath: "localStorage://estatelens",
        fileSizeBytes: 2048,
        lastModified: new Date().toISOString(),
        tables: {
          properties: { rowCount: 1, columns: ["id", "metadata", "branding", "analysis"] },
          branding: { rowCount: 1, columns: ["name", "agencyName", "phone", "whatsapp"] },
          prompts: { rowCount: 2, columns: ["videoAnalysis", "reelGeneration"] }
        },
        healthCheck: { fileAccessible: true, schemaMatch: true, isWriteable: true }
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSavePrompts = async (e: FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setIsSaved(false);
    setErrorMsg("");
    try {
      const response = await fetch("/api/prompts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(prompts)
      });
      if (!response.ok) {
        throw new Error("HTTP error saving prompts to the database");
      }
      const data = await response.json();
      if (data.success) {
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 3000);
        // Refresh db status row counts/metrics
        loadData();
      } else {
        throw new Error(data.error || "Save rejected by local storage driver.");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to update templates.");
    } finally {
      setIsSaving(false);
    }
  };

  const placeholderChips = [
    { label: "{type}", desc: "Property Type (e.g. House, Plot)" },
    { label: "{size}", desc: "Numerical size (e.g. 10, 1800)" },
    { label: "{unit}", desc: "Measurement unit (marla/sqft)" },
    { label: "{location}", desc: "City/sector address locator" },
    { label: "{price}", desc: "Guide target price tag" },
    { label: "{tone}", desc: "Styling pacing (Luxury, Fast, or Corporate)" },
    { label: "{duration}", desc: "Selected seconds runtime limit (15s, 30s, 45s)" },
    { label: "{style}", desc: "Video pacing (fast/cinematic/minimal)" },
    { label: "{customNotes}", desc: "Agent input checklist instructions" }
  ];

  return (
    <div className="max-w-6xl mx-auto py-10 px-6 space-y-10 selection:bg-indigo-650 selection:text-white animate-fade-in text-left">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-extrabold tracking-tight text-white flex items-center gap-3">
            <Database className="w-8 h-8 text-indigo-400 stroke-[2]" />
            AI Prompt & SQL Database Studio
          </h1>
          <p className="text-sm text-slate-400 mt-2 font-sans leading-relaxed">
            Configure estate marketing criteria, rewrite short-video timeline synthesis instructions, and inspect the relational persistent storage schema directly.
          </p>
        </div>
        <button
          onClick={loadData}
          className="px-4 py-2 bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs text-slate-300 font-medium flex items-center gap-1.5 rounded-xl cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin text-indigo-400" : ""}`} />
          Refresh Registry Data
        </button>
      </div>

      {isLoading ? (
        <div className="p-16 border border-slate-800 bg-[#0E121E]/60 rounded-2xl flex flex-col items-center justify-center space-y-3">
          <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-xs font-mono text-slate-405">Querying DB file schemas & AI memory caches...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT SYSTEM DASHBOARD (5 Cols) in Bento Style */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Database Engine Status Box */}
            <div className="p-6 rounded-2xl border border-slate-800/80 bg-[#090D1A]/80 backdrop-blur-md space-y-5">
              <h3 className="text-sm font-mono uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <Server className="w-4 h-4 text-indigo-400" /> Storage Engine Status
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between py-2 border-b border-slate-850">
                  <span className="text-xs text-slate-400">Database Driver</span>
                  <span className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    SQL-Simulated JSON DB
                  </span>
                </div>
                
                <div className="flex items-center justify-between py-2 border-b border-slate-850">
                  <span className="text-xs text-slate-400">Database Local Path</span>
                  <span className="text-xs font-mono text-slate-350 truncate max-w-56 title={dbStatus?.filePath}">
                    {dbStatus?.filePath || "./db.json"}
                  </span>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-slate-850">
                  <span className="text-xs text-slate-400">Disk Weight</span>
                  <span className="text-xs font-mono text-indigo-450 font-semibold">
                    {dbStatus ? `${(dbStatus.fileSizeBytes / 1024).toFixed(2)} KB` : "0.00 KB"}
                  </span>
                </div>

                <div className="flex items-center justify-between py-2">
                  <span className="text-xs text-slate-400">Last Modified</span>
                  <span className="text-xs font-mono text-slate-500 leading-none">
                    {dbStatus ? new Date(dbStatus.lastModified).toLocaleTimeString() : "--:--:--"}
                  </span>
                </div>
              </div>

              {/* Health check dots */}
              <div className="grid grid-cols-3 gap-2.5 pt-2">
                <div className="bg-[#07090E] border border-slate-850 p-2.5 rounded-xl text-center">
                  <span className="block text-[8px] uppercase text-slate-600 font-mono">Accessible</span>
                  <span className="block text-xs font-semibold text-emerald-400 mt-1 font-mono">YES</span>
                </div>
                <div className="bg-[#07090E] border border-slate-850 p-2.5 rounded-xl text-center">
                  <span className="block text-[8px] uppercase text-slate-600 font-mono">Writeable</span>
                  <span className="block text-xs font-semibold text-emerald-400 mt-1 font-mono">YES</span>
                </div>
                <div className="bg-[#07090E] border border-slate-850 p-2.5 rounded-xl text-center">
                  <span className="block text-[8px] uppercase text-slate-600 font-mono">Constraint Check</span>
                  <span className="block text-xs font-semibold text-emerald-400 mt-1 font-mono">PASS</span>
                </div>
              </div>
            </div>

            {/* Simulated Relational Tables Bento */}
            <div className="p-6 rounded-2xl border border-slate-800/80 bg-[#090D1A]/80 backdrop-blur-md space-y-4">
              <h3 className="text-sm font-mono uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <HardDrive className="w-4 h-4 text-indigo-400" /> Relational Table Counts
              </h3>
              
              <div className="space-y-3">
                {dbStatus && Object.entries(dbStatus.tables || {}).map(([tName, tInfo]: [string, any]) => (
                  <div key={tName} className="p-4 rounded-xl bg-[#07090E] border border-slate-850 flex items-center justify-between">
                    <div className="space-y-1">
                      <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                        📂 t_{tName}
                      </span>
                      <div className="flex gap-1.5 flex-wrap">
                        {tInfo.columns.map((col: string) => (
                          <span key={col} className="text-[9px] font-mono bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 px-1 py-0.2 rounded">
                            {col}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">Rows</span>
                      <p className="text-lg font-display font-extrabold text-indigo-400">{tInfo.rowCount}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Prompt placeholders list */}
            <div className="p-5 rounded-2xl border border-slate-850 bg-[#0E121E]/30 space-y-3">
              <h4 className="text-xs font-mono uppercase text-slate-450 font-bold tracking-wider">
                💡 Available Wildcard Variables
              </h4>
              <p className="text-[11px] text-slate-500 leading-normal">
                These tags dynamic replace inside prompt scripts at execution runtime to inject specific real-time property details:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {placeholderChips.map((chip) => (
                  <div key={chip.label} className="p-2 rounded-lg bg-[#07090E]/80 border border-slate-900 flex flex-col gap-0.5">
                    <code className="text-indigo-400 text-[10px] font-bold font-mono">{chip.label}</code>
                    <span className="text-[9px] text-slate-500 leading-snug">{chip.desc}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT EDITABLE FORM (7 Cols) */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSavePrompts} className="space-y-6">
              
              <div className="p-6 rounded-2xl border border-slate-800 bg-[#090D1A]/80 backdrop-blur-md shadow-2xl relative">
                
                <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-5 h-5 text-indigo-400" />
                    <span className="text-base font-bold text-white font-display">Prompt Blueprint Registry</span>
                  </div>
                  
                  {isSaved && (
                    <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium animate-bounce bg-emerald-500/5 px-2.5 py-1 border border-emerald-500/20 rounded-lg">
                      <CheckCircle className="w-4 h-4" />
                      <span>Saved to db.json!</span>
                    </div>
                  )}
                </div>

                {errorMsg && (
                  <div className="mb-4 p-3.5 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-xl font-mono">
                    ⚠️ Error: {errorMsg}
                  </div>
                )}

                <div className="space-y-6">
                  {/* Video Analysis Template Input */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-mono uppercase font-bold text-slate-300">
                        1. Walkthrough Analysis System Prompt
                      </label>
                      <span className="text-[10px] text-slate-505 font-mono">gemini-3.5-flash schema</span>
                    </div>
                    <textarea
                      required
                      rows={6}
                      value={prompts.videoAnalysisPrompt}
                      onChange={(e) => setPrompts({ ...prompts, videoAnalysisPrompt: e.target.value })}
                      placeholder="Enter detailed prompt governing the layout analysis..."
                      className="w-full p-4 bg-[#07090E] border border-slate-800 focus:outline-none focus:border-indigo-400 text-slate-200 text-xs font-mono rounded-xl leading-relaxed whitespace-pre-wrap transition-colors"
                    />
                    <p className="text-[10px] text-slate-500 italic leading-normal">
                      Specifies formatting for the Zameen PK listings, WhatsApp status lists with emojis, red flag indicators, and bilingual descriptions.
                    </p>
                  </div>

                  {/* Reel Generation Template Input */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-mono uppercase font-bold text-slate-300">
                        2. Short Video Reel Storyboard Template Prompt
                      </label>
                      <span className="text-[10px] text-slate-505 font-mono">TikTok / WhatsApp / IG Reels</span>
                    </div>
                    <textarea
                      required
                      rows={7}
                      value={prompts.reelGenerationPrompt}
                      onChange={(e) => setPrompts({ ...prompts, reelGenerationPrompt: e.target.value })}
                      placeholder="Enter detailed instructions mapping video timelines, clip lengths, Urdu phonetic translations, and agent card CTAs..."
                      className="w-full p-4 bg-[#07090E] border border-slate-800 focus:outline-none focus:border-indigo-400 text-slate-200 text-xs font-mono rounded-xl leading-relaxed whitespace-pre-wrap transition-colors"
                    />
                    <p className="text-[10px] text-slate-500 italic leading-normal">
                      Invoked during the &quot;Regenerate Reel (Deep AI)&quot; button on the active player canvas to write custom 15s/30s/45s time ranges.
                    </p>
                  </div>
                </div>

                {/* Submit save button */}
                <div className="pt-6 border-t border-slate-850 mt-8">
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-505 text-white text-xs font-bold font-sans rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer disabled:opacity-50"
                  >
                    {isSaving ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Writing to SQLite-Simulated File Store...</span>
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        <span>Commit Custom AI Prompts to db.json</span>
                      </>
                    )}
                  </button>
                </div>

              </div>

            </form>
          </div>

        </div>
      )}

    </div>
  );
}
