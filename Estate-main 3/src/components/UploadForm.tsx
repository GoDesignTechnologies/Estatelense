import React, { useState, useRef } from "react";
import { Video, Link2, HelpCircle, Sparkles, Building, MapPin, DollarSign, ListFilter, ClipboardCheck, ArrowUpRight } from "lucide-react";
import { PropertyMetadata, PropertyType, PropertyUnit, LanguageOption } from "../types";

interface UploadFormProps {
  onAnalyzeStart: (metadata: Omit<PropertyMetadata, "id" | "createdAt">, file?: File) => void;
  isAnalyzing: boolean;
  analyzingProgressMessage: string;
  analysisError?: string | null;
}

export default function UploadForm({ onAnalyzeStart, isAnalyzing, analyzingProgressMessage, analysisError }: UploadFormProps) {
  const [videoUrl, setVideoUrl] = useState("");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [propertyType, setPropertyType] = useState<PropertyType>("House");
  const [size, setSize] = useState("10");
  const [unit, setUnit] = useState<PropertyUnit>("marla");
  const [location, setLocation] = useState("DHA Phase 6, Lahore");
  const [basePrice, setBasePrice] = useState("4.5 Crore PKR");
  const [targetAudience, setTargetAudience] = useState("Overseas Pakistani Investors");
  const [tone, setTone] = useState<"Luxury/Calm" | "Fast/Energetic" | "Corporate/Professional">("Luxury/Calm");
  const [language, setLanguage] = useState<LanguageOption>("Bilingual");
  const [customNotes, setCustomNotes] = useState("");
  const [isDragOver, setIsDragOver] = useState(false);

  const [mode, setMode] = useState<"auto" | "classic">("auto");
  const [logIndex, setLogIndex] = useState(0);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith("video/")) {
        setVideoFile(file);
        setVideoUrl("");
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setVideoFile(e.target.files[0]);
      setVideoUrl("");
    }
  };

  // Progressive terminal logs simulation
  React.useEffect(() => {
    if (isAnalyzing) {
      setLogIndex(0);
      const interval = setInterval(() => {
        setLogIndex(prev => (prev < 5 ? prev + 1 : prev));
      }, 2500);
      return () => clearInterval(interval);
    }
  }, [isAnalyzing]);

  const terminalLogs = [
    "📡 Connecting to EstateLens analysis service... connected",
    `🎬 Sending video to Gemini: ${videoUrl || videoFile?.name || "walkthrough"}`,
    "👁️ Watching footage & reading on-screen text...",
    "🏠 Detecting rooms, layout and finishes...",
    "✍️ Writing bilingual scripts, captions & reel timeline...",
    "✨ Marketing pack ready! Loading dashboard..."
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "auto") {
      onAnalyzeStart(
        {
          videoUrl: videoUrl || "https://www.youtube.com/watch?v=kYorAsf6Rsc",
          propertyType: "House",
          size: "10",
          unit: "marla",
          location: "Identifying on Youtube...",
          basePrice: "Fetching price...",
          targetAudience: "Overseas Pakistani Buyers (Auto-extracted)",
          tone,
          language,
          customNotes: customNotes || undefined,
        },
        undefined
      );
    } else {
      onAnalyzeStart(
        {
          videoUrl: videoUrl || undefined,
          videoName: videoFile ? videoFile.name : undefined,
          propertyType,
          size,
          unit,
          location,
          basePrice,
          targetAudience,
          tone,
          language,
          customNotes: customNotes || undefined,
        },
        videoFile || undefined
      );
    }
  };

  // Populate realistic sample listing for classic manual mode
  const loadExample = (ex: number) => {
    if (ex === 1) {
      setPropertyType("House");
      setSize("10");
      setUnit("marla");
      setLocation("DHA Phase 5, Lahore");
      setBasePrice("4.8 Crore PKR");
      setTargetAudience("Families looking for luxury finishes");
      setTone("Luxury/Calm");
      setLanguage("Bilingual");
      setCustomNotes("Premium Spanish elevation House, double height drawing room ceiling, ash wood cabinetry.");
    } else {
      setPropertyType("Apartment");
      setSize("1805");
      setUnit("sqft");
      setLocation("Emaar Canyon Views, Islamabad");
      setBasePrice("5.5 Crore PKR");
      setTargetAudience("Young executives seeking secure high-rise life");
      setTone("Corporate/Professional");
      setLanguage("English");
      setCustomNotes("3bed luxury corner apartment overlooking the golf course, central cooling fully kitchen appliances included.");
    }
  };

  const loadYoutubePreset = (url: string) => {
    setVideoUrl(url);
    setVideoFile(null);
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-6 selection:bg-indigo-500 selection:text-white animate-fade-in text-slate-100">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-display font-extrabold tracking-tight text-white flex items-center gap-2.5">
            <Sparkles className="w-8 h-8 text-indigo-400 stroke-[2.2] animate-pulse" />
            Zero-Input Real Estate Appraiser
          </h1>
          <p className="text-sm text-slate-400 mt-1.5 font-sans">
            Convert walk-through clips into high-end listings instantly. Powered by Gemini 3.5 Flash & Veo Video Models.
          </p>
        </div>

        {/* Mode Selector Tabs */}
        <div className="p-1 rounded-xl bg-[#090C12] border border-slate-800 flex gap-1 self-start md:self-auto">
          <button
            type="button"
            onClick={() => setMode("auto")}
            disabled={isAnalyzing}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
              mode === "auto" ? "bg-indigo-600 text-white shadow" : "text-slate-400 hover:text-white"
            }`}
          >
            <Sparkles className="w-4 h-4" />
            Zero-Input AI Mode
          </button>
          <button
            type="button"
            onClick={() => setMode("classic")}
            disabled={isAnalyzing}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
              mode === "classic" ? "bg-indigo-600 text-white shadow" : "text-slate-400 hover:text-white"
            }`}
          >
            <Building className="w-4 h-4" />
            Classic Manual Mode
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {mode === "auto" ? (
          /* ================== ZERO INPUT AI MODE ================== */
          <div className="space-y-6">
            <div className="p-6 rounded-2xl border border-slate-800 bg-[#0E121E]/60 backdrop-blur-md shadow-2xl space-y-5 hover:border-slate-700/60 transition-all">
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-indigo-500/10 text-indigo-400 font-mono text-xs font-semibold flex items-center justify-center border border-indigo-500/20">
                  1
                </span>
                <h3 className="text-base font-bold text-white font-display flex items-center gap-2">
                  YouTube Input URL
                  <span className="px-2 py-0.5 rounded text-[10px] bg-red-500/15 border border-red-500/30 text-red-400 font-sans tracking-wide">AUTOMATION ACTIVE</span>
                </h3>
              </div>

              <div className="space-y-4">
                <div className="relative">
                  <Link2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
                  <input
                    type="url"
                    required
                    placeholder="Paste YouTube walkthrough video link (e.g. video of 1 Kanal Spanish Villa)..."
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    disabled={isAnalyzing}
                    className="w-full pl-12 pr-4.5 py-4 bg-[#07090E] border-2 border-slate-800 focus:border-indigo-500 rounded-xl focus:outline-none text-white placeholder-slate-600 text-sm transition-all"
                  />
                </div>

                {/* Highly authentic interactive Quick Presets */}
                <div className="space-y-2">
                  <label className="text-xs text-slate-400 font-semibold block">Select an elite sample listing link to test instant appraisal:</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <button
                      type="button"
                      disabled={isAnalyzing}
                      onClick={() => loadYoutubePreset("https://www.youtube.com/watch?v=kYorAsf6Rsc")}
                      className={`p-3.5 rounded-xl border text-left flex flex-col justify-between transition-all group ${
                        videoUrl === "https://www.youtube.com/watch?v=kYorAsf6Rsc"
                          ? "bg-indigo-950/20 border-indigo-500 text-indigo-400"
                          : "bg-[#07090E]/60 border-slate-800 hover:border-slate-700 hover:bg-[#121625]"
                      }`}
                    >
                      <div className="flex items-start justify-between w-full">
                        <span className="text-xs font-bold text-slate-200 group-hover:text-indigo-455 font-sans">Option A: 1 Kanal Spanish Villa (DHA Lahore)</span>
                        <Sparkles className="w-3.5 h-3.5 text-[#FBBF24] animate-pulse" />
                      </div>
                      <span className="text-[11px] text-slate-500 mt-1 line-clamp-1">Classic Mediterranean architecture, 5 double master-suites, ash closets</span>
                    </button>

                    <button
                      type="button"
                      disabled={isAnalyzing}
                      onClick={() => loadYoutubePreset("https://www.youtube.com/watch?v=F3Q_l7a8Sxo")}
                      className={`p-3.5 rounded-xl border text-left flex flex-col justify-between transition-all group ${
                        videoUrl === "https://www.youtube.com/watch?v=F3Q_l7a8Sxo"
                          ? "bg-indigo-950/20 border-indigo-500 text-indigo-450"
                          : "bg-[#07090E]/60 border-slate-800 hover:border-slate-700 hover:bg-[#121625]"
                      }`}
                    >
                      <div className="flex items-start justify-between w-full">
                        <span className="text-xs font-bold text-slate-200 group-hover:text-indigo-455 font-sans">Option B: 4 Kanal Scandinavian Farmhouse</span>
                        <Building className="w-3.5 h-3.5 text-indigo-400" />
                      </div>
                      <span className="text-[11px] text-slate-500 mt-1 line-clamp-1">Custom double-height sky light panels, swimming pool, landscape master</span>
                    </button>
                  </div>
                </div>

                <div className="bg-[#090C12] border border-slate-800 p-4.5 rounded-xl text-xs text-slate-400 leading-relaxed font-sans mt-3">
                  💡 <span className="text-slate-200 font-bold">How it works:</span> EstateLens acts as a virtual broker. We query YouTube's metadata directly, fetch description metrics, and invoke Gemini for <strong>Zero-Manual-Input appraising</strong>. The model extracts parameters and creates content-aware Google Veo vertical video prompts mirroring details perfectly!
                </div>
              </div>
            </div>

            {/* Step 2: Pitch Preferences */}
            <div className="p-6 rounded-2xl border border-slate-800 bg-[#0E121E]/60 backdrop-blur-md shadow-2xl space-y-5 hover:border-slate-700/60 transition-all">
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-indigo-500/10 text-indigo-400 font-mono text-xs font-semibold flex items-center justify-center border border-indigo-500/20">
                  2
                </span>
                <h3 className="text-base font-bold text-white font-display">Target Voice Preferences</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 mb-2.5">Marketing Tone</label>
                  <select
                    value={tone}
                    onChange={(e) => setTone(e.target.value as any)}
                    disabled={isAnalyzing}
                    className="w-full px-4 py-3 bg-[#07090E] border border-slate-800 rounded-xl focus:outline-none focus:border-indigo-400 text-slate-200 text-sm transition-colors"
                  >
                    <option value="Luxury/Calm">Luxury & Calm (Cinematic drone pace)</option>
                    <option value="Fast/Energetic">Fast & Energetic (Tiktok hook styles)</option>
                    <option value="Corporate/Professional">Corporate & Professional</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 mb-2.5">Language Target</label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value as LanguageOption)}
                    disabled={isAnalyzing}
                    className="w-full px-4 py-3 bg-[#07090E] border border-slate-800 rounded-xl focus:outline-none focus:border-indigo-400 text-slate-200 text-sm transition-colors"
                  >
                    <option value="Bilingual">Bilingual (English with Urdu phonetic blocks)</option>
                    <option value="English">Pure English Portfolio</option>
                    <option value="Urdu">Nastaliq Urdu translation text overlays</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-2">Include Custom Notes / Instructions (Optional)</label>
                <textarea
                  rows={2}
                  placeholder="e.g. emphasize the gated street park view, custom tile finishes, or payment install timelines..."
                  value={customNotes}
                  onChange={(e) => setCustomNotes(e.target.value)}
                  disabled={isAnalyzing}
                  className="w-full px-4 py-3 bg-[#07090E] border border-slate-800 rounded-xl focus:outline-none focus:border-indigo-400 text-slate-200 text-sm transition-colors resize-none font-sans"
                />
              </div>
            </div>
          </div>
        ) : (
          /* ================== CLASSIC MANUAL MODE ================== */
          <div className="space-y-6">
            <div className="p-6 rounded-2xl border border-slate-800 bg-[#0E121E]/60 backdrop-blur-md shadow-2xl space-y-5 hover:border-slate-700/60 transition-all">
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-indigo-500/10 text-indigo-400 font-mono text-xs font-semibold flex items-center justify-center border border-indigo-500/20">
                  1
                </span>
                <h3 className="text-base font-bold text-white font-display">Walkthrough Video Source</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Drag and Drop Zone */}
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
                    isDragOver ? "border-indigo-450 bg-indigo-500/5" : "border-slate-800 bg-[#07090E]/60 hover:border-slate-700"
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="video/*"
                    onChange={handleFileChange}
                    className="hidden"
                    disabled={isAnalyzing}
                  />
                  <Video className="w-10 h-10 text-slate-500 mb-3" />
                  {videoFile ? (
                    <div>
                      <p className="text-sm font-semibold text-indigo-400 truncate max-w-xs">{videoFile.name}</p>
                      <p className="text-xs text-slate-500 font-mono mt-1">{(videoFile.size / (1024 * 1024)).toFixed(1)} MB (Ready for local timeline)</p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-sm font-semibold text-slate-300">Drag & drop walkthrough video here</p>
                      <p className="text-xs text-slate-400 mt-1">Supports mp4, mov, avi up to 500MB</p>
                    </div>
                  )}
                </div>

                {/* URL Paste input */}
                <div className="flex flex-col justify-center p-6 bg-[#07090E]/40 border border-slate-800/80 rounded-xl space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 mb-1.5 font-mono uppercase tracking-wide">
                      <Link2 className="w-3.5 h-3.5 text-indigo-400" />
                      Or Paste Video Cloud URL
                    </label>
                    <input
                      type="url"
                      placeholder="Google Drive, Dropbox, YouTube, or direct link..."
                      value={videoUrl}
                      onChange={(e) => {
                        setVideoUrl(e.target.value);
                        setVideoFile(null);
                      }}
                      disabled={isAnalyzing}
                      className="w-full px-4.5 py-3 bg-[#07090E] border border-slate-800 rounded-xl focus:outline-none focus:border-indigo-500 text-white placeholder-slate-600 text-sm transition-colors"
                    />
                  </div>
                  <div className="text-[11px] text-slate-400 leading-relaxed space-y-1">
                    <p>💡 Shared Links from Google Drive are parsed; ensure "Anyone with Link" view permissions.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2: Property Metadata Parameters */}
            <div className="p-6 rounded-2xl border border-slate-800 bg-[#0E121E]/60 backdrop-blur-md shadow-2xl space-y-6 hover:border-slate-700/60 transition-all">
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-indigo-500/10 text-indigo-400 font-mono text-xs font-semibold flex items-center justify-center border border-indigo-500/20">
                  2
                </span>
                <h3 className="text-base font-bold text-white font-display">Details & Preferences</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 mb-2.5">Property Type</label>
                  <div className="relative">
                    <Building className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-505 w-4 h-4" />
                    <select
                      value={propertyType}
                      onChange={(e) => setPropertyType(e.target.value as PropertyType)}
                      disabled={isAnalyzing}
                      className="w-full pl-11 pr-4 py-3 bg-[#07090E] border border-slate-800 rounded-xl focus:outline-none focus:border-indigo-400 text-slate-200 text-sm appearance-none transition-colors"
                    >
                      <option value="House">Residential House</option>
                      <option value="Apartment">Luxury Apartment</option>
                      <option value="Commercial">Commercial Shop/Office</option>
                      <option value="Plot">Residential Plot</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 mb-2.5">Property Size</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      required
                      placeholder="10"
                      value={size}
                      onChange={(e) => setSize(e.target.value)}
                      disabled={isAnalyzing}
                      className="w-2/3 px-4 py-3 bg-[#07090E] border border-slate-800 rounded-xl focus:outline-none focus:border-indigo-400 text-white text-sm transition-colors"
                    />
                    <select
                      value={unit}
                      onChange={(e) => setUnit(e.target.value as PropertyUnit)}
                      disabled={isAnalyzing}
                      className="w-1/3 px-3 py-3 bg-[#07090E] border border-slate-800 rounded-xl focus:outline-none focus:border-indigo-400 text-slate-300 text-xs transition-colors"
                    >
                      <option value="marla">Marla</option>
                      <option value="kanal">Kanal</option>
                      <option value="sqft">Sq. Ft.</option>
                      <option value="sqyd">Sq. Yd.</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 mb-2.5">Physical Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-505 w-4 h-4" />
                    <input
                      type="text"
                      required
                      placeholder="Sector Y, DHA Phase 6, Lahore"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      disabled={isAnalyzing}
                      className="w-full pl-11 pr-4 py-3 bg-[#07090E] border border-slate-800 rounded-xl focus:outline-none focus:border-indigo-400 text-white text-sm transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 mb-2.5">Expected Selling Price</label>
                  <div className="relative">
                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-505 w-4 h-4" />
                    <input
                      type="text"
                      required
                      placeholder="3.8 Crore PKR"
                      value={basePrice}
                      onChange={(e) => setBasePrice(e.target.value)}
                      disabled={isAnalyzing}
                      className="w-full pl-11 pr-4 py-3 bg-[#07090E] border border-slate-800 rounded-xl focus:outline-none focus:border-indigo-400 text-white text-sm transition-colors"
                    />
                  </div>
                </div>

                {/* Tone Selector */}
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 mb-2.5">Copy & Video Tone</label>
                  <div className="relative">
                    <ListFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-505 w-4 h-4" />
                    <select
                      value={tone}
                      onChange={(e) => setTone(e.target.value as any)}
                      disabled={isAnalyzing}
                      className="w-full pl-11 pr-4 py-3 bg-[#07090E] border border-slate-800 rounded-xl focus:outline-none focus:border-indigo-400 text-slate-200 text-sm appearance-none transition-colors"
                    >
                      <option value="Luxury/Calm">Luxury & Calm (Cinematic)</option>
                      <option value="Fast/Energetic">Fast & Energetic (Trending)</option>
                      <option value="Corporate/Professional">Corporate & Professional</option>
                    </select>
                  </div>
                </div>

                {/* Language Output Selector */}
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 mb-2.5">Language Target</label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value as LanguageOption)}
                    disabled={isAnalyzing}
                    className="w-full px-4 py-3 bg-[#07090E] border border-slate-800 rounded-xl focus:outline-none focus:border-indigo-400 text-slate-200 text-sm transition-colors"
                  >
                    <option value="Bilingual">Bilingual (English + Urdu script)</option>
                    <option value="English">Pure English Copies</option>
                    <option value="Urdu">Pure Urdu Phonetic / Nastaliq</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-2">Target Audience Persona</label>
                <input
                  type="text"
                  placeholder="Overseas Pakistani families seeking ready-to-move spacious luxury, modern elite couples"
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                  disabled={isAnalyzing}
                  className="w-full px-4 py-3 bg-[#07090E] border border-slate-800 rounded-xl focus:outline-none focus:border-indigo-400 text-white text-sm transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-2">Visual Specifics or Extra Notes (Optional)</label>
                <textarea
                  rows={3}
                  placeholder="e.g. Spanish construction model, direct access from front double door, includes high-end Spanish tiles on floor, customized open floor plan..."
                  value={customNotes}
                  onChange={(e) => setCustomNotes(e.target.value)}
                  disabled={isAnalyzing}
                  className="w-full px-4 py-3 bg-[#07090E] border border-slate-800 rounded-xl focus:outline-none focus:border-indigo-400 text-slate-200 text-sm transition-colors resize-none font-sans"
                />
              </div>
            </div>
          </div>
        )}

        {/* CTA Launch section with terminal progress metrics */}
        <div className="flex flex-col items-center justify-center pt-4">
          {isAnalyzing ? (
            <div className="w-full max-w-xl p-6 bg-[#0E121E]/95 border-2 border-indigo-500/40 rounded-2xl flex flex-col text-left space-y-4 shadow-2xl animate-fade-in font-mono">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></span>
                  <span className="text-xs font-bold text-slate-300">ESTATELENS AI TELEMETRY FEED</span>
                </div>
                <span className="text-[10px] text-slate-500 font-sans uppercase">SESSION: v2.5_ACTIVE</span>
              </div>

              {/* Simulated Progressive Logging Term */}
              <div className="space-y-1.5 h-36 overflow-y-auto text-xs leading-normal">
                {terminalLogs.slice(0, logIndex + 1).map((log, index) => (
                  <div key={index} className={`flex items-start gap-1.5 ${index === logIndex ? "text-indigo-400" : "text-slate-400"}`}>
                    <span className="text-slate-600 select-none">❯</span>
                    <span>{log}</span>
                  </div>
                ))}
              </div>

              <div className="w-full h-1 bg-[#07090E] rounded-full overflow-hidden relative">
                <div 
                  className="h-full bg-indigo-500 rounded-full transition-all duration-1000"
                  style={{ width: `${((logIndex + 1) / 6) * 100}%` }}
                />
              </div>
              <div className="flex justify-between items-center text-[10px] text-slate-500 font-sans">
                <span>{analyzingProgressMessage || "Optimizing output matrices..."}</span>
                <span>{Math.round(((logIndex + 1) / 6) * 100)}% Complete</span>
              </div>
            </div>
          ) : (
            <div className="w-full flex flex-col items-center gap-4">
              {analysisError && (
                <div className="w-full max-w-xl p-4 bg-red-500/10 border border-red-500/40 rounded-xl text-sm text-red-300 flex items-start gap-3 animate-fade-in">
                  <span className="text-red-400 font-bold mt-0.5">!</span>
                  <span>{analysisError}</span>
                </div>
              )}
              <button
                id="analyze-run-btn"
                type="submit"
                className="px-8 py-4.5 bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold rounded-xl shadow-xl shadow-indigo-600/20 flex items-center justify-center gap-3 text-base font-display transition-all active:scale-95 cursor-pointer"
              >
                <ClipboardCheck className="w-5 h-5 text-white stroke-[2.5]" />
                Run EstateLens Analysis
                <ArrowUpRight className="w-5 h-5 line-clamp-3 bg-white/10 p-0.5 rounded-full" />
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
