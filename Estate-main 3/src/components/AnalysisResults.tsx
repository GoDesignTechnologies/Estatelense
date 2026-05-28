import { useState } from "react";
import { Clipboard, Check, Calendar, MapPin, Building, Award, MessageSquare, Send, Instagram, FileText, ShieldAlert, Sparkles, Video } from "lucide-react";
import { PropertyMarketingPack } from "../types";
import ReelCreator from "./ReelCreator";
import PDFBrochure from "./PDFBrochure";
import ThumbnailStudio from "./ThumbnailStudio";

interface AnalysisResultsProps {
  pack: PropertyMarketingPack;
  onIncrementReelCount: () => void;
}

export default function AnalysisResults({ pack, onIncrementReelCount }: AnalysisResultsProps) {
  const [activeTab, setActiveTab] = useState<"listing" | "whatsapp" | "social" | "voiceover" | "redflags" | "pdf" | "reel" | "thumbnail">("thumbnail");
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const { metadata, analysis, branding } = pack;

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 3000);
  };

  const handleWhatsAppClick = () => {
    const textPitch = encodeURIComponent(analysis.whatsappPitch);
    window.open(`https://api.whatsapp.com/send?phone=${branding.whatsapp}&text=${textPitch}`, "_blank");
  };

  return (
    <div className="max-w-7xl mx-auto py-10 px-6 space-y-8 selection:bg-indigo-655 selection:text-white animate-fade-in no-print">
      {/* Header Info Banner */}
      <div className="p-6 rounded-2xl border border-slate-800 bg-[#0E121E]/65 backdrop-blur-md flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xl">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-full text-[10px] font-mono uppercase font-bold tracking-wider">
              Analysis Complete
            </span>
            <span className="px-2.5 py-0.5 bg-slate-900/80 text-slate-400 border border-slate-800 rounded-full text-[10px] font-mono">
              Claude 3.5 Sonnet Vision
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold tracking-tight text-white">{analysis.title}</h1>
          <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-slate-400 font-sans font-medium">
            <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-slate-500" /> {metadata.location}</span>
            <span className="flex items-center gap-1.5"><Building className="w-4 h-4 text-slate-500" /> {metadata.size} {metadata.unit} {metadata.propertyType}</span>
            <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-slate-500" /> {new Date(metadata.createdAt).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Highlight Price */}
        <div className="p-4 rounded-xl border border-slate-850 bg-[#07090E] flex flex-col text-left justify-center md:min-w-44">
          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider font-semibold">Estimated Asking Price</span>
          <span className="text-xl font-extrabold text-[#ECEFF4] mt-1 font-display">{metadata.basePrice}</span>
          <span className="text-[9px] text-slate-505 mt-0.5 font-mono">Range: {analysis.specs.estimatedPriceRange}</span>
        </div>
      </div>

      {/* What the AI actually saw in the video */}
      {(analysis.analysisMode === "video" || (analysis.onScreenText && analysis.onScreenText.length > 0) || (analysis.detectedFeatures && analysis.detectedFeatures.length > 0)) && (
        <div className="p-6 rounded-2xl border border-emerald-500/25 bg-emerald-500/[0.04] backdrop-blur-md shadow-2xl space-y-5">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <h2 className="text-sm font-display font-bold text-emerald-300 uppercase tracking-wide">Extracted from your video</h2>
            {analysis.analysisMode === "context" && (
              <span className="text-[10px] text-amber-400/80 font-mono">(no video supplied — generated from details)</span>
            )}
          </div>

          {analysis.detectedFeatures && analysis.detectedFeatures.length > 0 && (
            <div>
              <p className="text-[11px] font-mono text-slate-500 uppercase tracking-wider mb-2">Features detected in footage</p>
              <div className="flex flex-wrap gap-2">
                {analysis.detectedFeatures.map((f, i) => (
                  <span key={i} className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-200 text-xs font-medium">
                    {f}
                  </span>
                ))}
              </div>
            </div>
          )}

          {analysis.onScreenText && analysis.onScreenText.length > 0 && (
            <div>
              <p className="text-[11px] font-mono text-slate-500 uppercase tracking-wider mb-2">On-screen text read from the video</p>
              <div className="space-y-1.5 max-h-56 overflow-y-auto">
                {analysis.onScreenText.map((o, i) => (
                  <div key={i} className="flex items-start gap-3 p-2 rounded-lg bg-[#07090E] border border-slate-800/80">
                    <span className="text-[10px] font-mono text-emerald-400/80 mt-0.5 shrink-0">{o.timestamp}</span>
                    <span className="text-xs text-slate-300 whitespace-pre-wrap">{o.text}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Primary Navigation Tabs */}
      <div className="border-b border-slate-800/80 overflow-x-auto scroller-hidden">
        <div className="flex gap-2 min-w-[700px] pb-3">
          {/* AI Thumbnail Studio - Prominent Sparkles */}
          <button
            onClick={() => setActiveTab("thumbnail")}
            className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-xl flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === "thumbnail"
                ? "bg-indigo-600/90 text-white border border-indigo-500/50 shadow-lg shadow-indigo-650/30"
                : "text-indigo-450 hover:bg-slate-900/30"
            }`}
          >
            <Sparkles className="w-4 h-4 animate-pulse text-indigo-400" />
            <span>AI Thumbnail Studio</span>
          </button>

          {/* Create Reel - Prominent */}
          <button
            onClick={() => setActiveTab("reel")}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === "reel"
                ? "bg-[#1F293D]/90 text-white border border-slate-700/60 shadow-lg shadow-[#000000]/30"
                : "text-indigo-400 hover:bg-slate-900/30"
            }`}
          >
            <Video className="w-4 h-4 animate-pulse" />
            <span>Create Professional Reel</span>
          </button>

          <button
            onClick={() => setActiveTab("listing")}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === "listing"
                ? "bg-[#1F293D]/90 text-white border border-slate-700/60 shadow-lg shadow-[#000000]/30"
                : "text-slate-400 hover:text-slate-205 hover:bg-slate-900/30"
            }`}
          >
            <Building className="w-4 h-4" />
            <span>Portal Listing (Zameen/OLX)</span>
          </button>

          <button
            onClick={() => setActiveTab("whatsapp")}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === "whatsapp"
                ? "bg-[#1F293D]/90 text-white border border-slate-700/60 shadow-lg shadow-[#000000]/30"
                : "text-slate-400 hover:text-slate-205 hover:bg-slate-900/30"
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>WhatsApp Pitch</span>
          </button>

          <button
            onClick={() => setActiveTab("social")}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === "social"
                ? "bg-[#1F293D]/90 text-white border border-slate-700/60 shadow-lg shadow-[#000000]/30"
                : "text-slate-400 hover:text-slate-202 hover:bg-slate-900/30"
            }`}
          >
            <Instagram className="w-4 h-4" />
            <span>Social Captions</span>
          </button>

          <button
            onClick={() => setActiveTab("voiceover")}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === "voiceover"
                ? "bg-[#1F293D]/90 text-white border border-slate-700/60 shadow-lg shadow-[#000000]/30"
                : "text-slate-405 hover:text-slate-200"
            }`}
          >
            <Video className="w-4 h-4" />
            <span>Voiceover Scripts</span>
          </button>

          <button
            onClick={() => setActiveTab("pdf")}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === "pdf"
                ? "bg-[#1F293D]/90 text-white border border-slate-700/60 shadow-lg shadow-[#000000]/30"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/30"
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>PDF Brochure</span>
          </button>

          <button
            onClick={() => setActiveTab("redflags")}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === "redflags"
                ? "bg-[#1F293D]/90 text-white border border-slate-700/60 shadow-lg shadow-[#000000]/30"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/30"
            }`}
          >
            <ShieldAlert className="w-4 h-4" />
            <span>Red Flags</span>
          </button>
        </div>
      </div>

      {/* Render Contents of Active Tab */}
      <div className="space-y-6">
        {activeTab === "thumbnail" && (
          <ThumbnailStudio
            metadata={metadata}
            analysis={analysis}
            branding={branding}
          />
        )}

        {activeTab === "reel" && (
          <ReelCreator
            metadata={metadata}
            analysis={analysis}
            branding={branding}
            onIncrementReelCount={onIncrementReelCount}
          />
        )}

        {activeTab === "listing" && (
          <div className="p-6 rounded-2xl border border-slate-800 bg-[#0E121E]/60 backdrop-blur-md shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-display font-extrabold text-white">Portal Listing Template</h3>
                <p className="text-xs text-slate-400 mt-1 font-sans">Ready copy-paste with structured specs for Zameen, Graana, and OLX Pakistan.</p>
              </div>
              <button
                onClick={() => copyToClipboard(analysis.portalListing, "portal")}
                className="px-4 py-2 bg-[#07090E] border border-slate-800 hover:border-slate-700 text-slate-300 font-bold rounded-lg text-xs flex items-center gap-2 transition-colors cursor-pointer"
              >
                {copiedText === "portal" ? <Check className="w-4.5 h-4.5 text-indigo-400" /> : <Clipboard className="w-4.5 h-4.5" />}
                <span>{copiedText === "portal" ? "Copied!" : "Copy Listing"}</span>
              </button>
            </div>
            <div className="p-5 rounded-xl bg-[#07090E] text-slate-300 text-xs leading-relaxed whitespace-pre-wrap font-mono max-h-[500px] overflow-y-auto border border-slate-800">
              {analysis.portalListing}
            </div>
          </div>
        )}

        {activeTab === "whatsapp" && (
          <div className="p-6 rounded-2xl border border-slate-800 bg-[#0E121E]/60 backdrop-blur-md shadow-2xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-display font-extrabold text-white">WhatsApp Dispatch Pitch</h3>
                <p className="text-xs text-slate-400 mt-1 font-sans">Structured message with custom emoji breaks, perfect to dispatch to database buyer broadcasts.</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleWhatsAppClick}
                  className="px-4 py-2 bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 border border-[#25D366]/20 font-bold rounded-lg text-xs flex items-center gap-2 cursor-pointer transition-colors"
                >
                  <Send className="w-4 h-4 fill-current" />
                  <span>Send to WhatsApp</span>
                </button>
                <button
                  onClick={() => copyToClipboard(analysis.whatsappPitch, "whatsapp")}
                  className="px-4 py-2 bg-[#07090E] border border-slate-800 hover:border-slate-700 text-slate-300 font-semibold rounded-lg text-xs flex items-center gap-2 transition-colors cursor-pointer"
                >
                  {copiedText === "whatsapp" ? <Check className="w-4.5 h-4.5 text-indigo-400" /> : <Clipboard className="w-4.5 h-4.5" />}
                  <span>{copiedText === "whatsapp" ? "Copied" : "Copy Text"}</span>
                </button>
              </div>
            </div>
            <div className="p-5 rounded-xl bg-[#07090E] text-slate-300 text-xs leading-relaxed whitespace-pre-wrap font-mono border border-slate-800">
              {analysis.whatsappPitch}
            </div>
          </div>
        )}

        {activeTab === "social" && (
          <div className="p-6 rounded-2xl border border-slate-800 bg-[#0E121E]/60 backdrop-blur-md shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-display font-extrabold text-white">Viral Caption & Tag Lists</h3>
                <p className="text-xs text-slate-400 mt-1 font-sans">Designed for high Instagram, TikTok, and Youtube Shorts engagement.</p>
              </div>
              <button
                onClick={() => copyToClipboard(analysis.socialCaption, "social")}
                className="px-4 py-2 bg-[#07090E] border border-slate-800 hover:border-slate-700 text-slate-300 font-bold rounded-lg text-xs flex items-center gap-2 transition-colors cursor-pointer"
              >
                {copiedText === "social" ? <Check className="w-4.5 h-4.5 text-indigo-400" /> : <Clipboard className="w-4.5 h-4.5" />}
                <span>{copiedText === "social" ? "Copied" : "Copy Caption"}</span>
              </button>
            </div>
            <div className="p-5 rounded-xl bg-[#07090E] text-slate-300 text-xs leading-relaxed whitespace-pre-wrap font-mono border border-slate-800">
              {analysis.socialCaption}
            </div>
          </div>
        )}

        {activeTab === "voiceover" && (
          <div className="p-6 rounded-2xl border border-slate-800 bg-[#0E121E]/60 backdrop-blur-md shadow-2xl space-y-6">
            <div>
              <h3 className="text-base font-display font-extrabold text-white">Bilingual Voiceover (VO) Scripts</h3>
              <p className="text-xs text-slate-400 mt-1 font-sans">Visual and narration flow segmented according to duration restrictions.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* 15s */}
              <div className="bg-[#07090E] p-5 rounded-xl border border-slate-800/80 flex flex-col justify-between hover:border-indigo-500/20 transition-all duration-300">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-mono text-indigo-400 font-bold">15-Second Clip</span>
                    <span className="text-[10px] bg-slate-900 px-1.5 py-0.5 rounded text-slate-500 font-mono">Bite-sized</span>
                  </div>
                  <h4 className="text-sm font-semibold text-slate-200 mb-3 font-display">Fast & Trendy Pitch</h4>
                  <p className="text-xs text-slate-350 leading-relaxed whitespace-pre-wrap font-sans max-h-48 overflow-y-auto">
                    {analysis.voiceover15s}
                  </p>
                </div>
                <button
                  onClick={() => copyToClipboard(analysis.voiceover15s, "vo15")}
                  className="mt-4 w-full py-2 bg-[#0E121E] text-slate-405 hover:text-white text-[11px] rounded-lg border border-slate-805 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  {copiedText === "vo15" ? <Check className="w-4 h-4 text-indigo-455" /> : <Clipboard className="w-4 h-4" />}
                  <span>{copiedText === "vo15" ? "Copied" : "Copy 15s script"}</span>
                </button>
              </div>

              {/* 30s */}
              <div className="bg-[#07090E] p-5 rounded-xl border border-slate-805/80 flex flex-col justify-between hover:border-indigo-500/20 transition-all duration-300">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-mono text-indigo-400 font-bold">30-Second Clip</span>
                    <span className="text-[10px] bg-slate-900 px-1.5 py-0.5 rounded text-slate-500 font-mono">Standard</span>
                  </div>
                  <h4 className="text-sm font-semibold text-slate-202 mb-3 font-display">Highlights Focused</h4>
                  <p className="text-xs text-slate-350 leading-relaxed whitespace-pre-wrap font-sans max-h-48 overflow-y-auto">
                    {analysis.voiceover30s}
                  </p>
                </div>
                <button
                  onClick={() => copyToClipboard(analysis.voiceover30s, "vo30")}
                  className="mt-4 w-full py-2 bg-[#0E121E] text-slate-400 hover:text-white text-[11px] rounded-lg border border-slate-805 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  {copiedText === "vo30" ? <Check className="w-4 h-4 text-indigo-400" /> : <Clipboard className="w-4 h-4" />}
                  <span>{copiedText === "vo30" ? "Copied" : "Copy 30s script"}</span>
                </button>
              </div>

              {/* 45s */}
              <div className="bg-[#07090E] p-5 rounded-xl border border-slate-800/80 flex flex-col justify-between hover:border-indigo-500/20 transition-all duration-300">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-mono text-purple-400 font-bold">45-Second Clip</span>
                    <span className="text-[10px] bg-slate-900 px-1.5 py-0.5 rounded text-slate-500 font-mono">Detailed</span>
                  </div>
                  <h4 className="text-sm font-semibold text-slate-205 mb-3 font-display">Luxury Cinematic Tour</h4>
                  <p className="text-xs text-slate-355 leading-relaxed whitespace-pre-wrap font-sans max-h-48 overflow-y-auto">
                    {analysis.voiceover45s}
                  </p>
                </div>
                <button
                  onClick={() => copyToClipboard(analysis.voiceover45s, "vo45")}
                  className="mt-4 w-full py-2 bg-[#0E121E] text-slate-400 hover:text-white text-[11px] rounded-lg border border-slate-850 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  {copiedText === "vo45" ? <Check className="w-4 h-4 text-indigo-400" /> : <Clipboard className="w-4 h-4" />}
                  <span>{copiedText === "vo45" ? "Copied" : "Copy 45s script"}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "pdf" && (
          <PDFBrochure pack={pack} />
        )}

        {activeTab === "redflags" && (
          <div className="p-6 rounded-2xl border border-slate-800 bg-[#0E121E]/60 backdrop-blur-md shadow-2xl space-y-4">
            <div>
              <h3 className="text-base font-display font-extrabold text-white flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-tomato-400 text-red-400 animate-bounce" /> Regional Red Flags & Verification Checklist
              </h3>
              <p className="text-xs text-slate-400 mt-1 font-sans">Smart architectural verification checks curated based on the property's size and geographic setting to assist physical tours.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {analysis.redFlags.map((flag, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-[#07090E] border border-slate-800/80 flex items-start gap-3 hover:border-slate-700 transition-colors duration-200">
                  <span className="text-xs font-mono text-indigo-400 mt-0.5 font-bold">[{idx + 1}]</span>
                  <div className="space-y-1 text-left">
                    <p className="text-sm text-slate-205 leading-normal font-sans font-medium">{flag}</p>
                    <span className="inline-block text-[9px] font-mono uppercase bg-[#0E121E] border border-slate-800/80 px-1.5 py-0.2 rounded text-slate-500">Inspect In Person</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
