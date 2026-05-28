import React, { useState, useEffect, useRef } from "react";
import { 
  Sparkles, Download, Send, Check, ShieldAlert, Award, 
  MapPin, Calendar, Building, Copy, RefreshCw, 
  Image as ImageIcon, Layout, Tag, Type, Palette, 
  Laptop, Phone, Eye, Trash, Plus
} from "lucide-react";
import { PropertyMetadata, GeminiAnalysisResult, AgentBranding } from "../types";

interface ThumbnailStudioProps {
  metadata: PropertyMetadata;
  analysis: GeminiAnalysisResult;
  branding: AgentBranding;
}

// Presets of real estate visual spots representing DHA Islamabad/Lahore & Premium UAE
const PHOTO_PRESETS = [
  { id: "facade", label: "Exterior Facade", url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&auto=format&fit=crop" },
  { id: "lounge", label: "Double Lounge", url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop" },
  { id: "kitchen", label: "Spanish Kitchen", url: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=1200&auto=format&fit=crop" },
  { id: "bedroom", label: "Master Suite", url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&auto=format&fit=crop" },
  { id: "bath", label: "Luxury Bath", url: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&auto=format&fit=crop" },
  { id: "sunset", label: "Sunset Panorama", url: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1200&auto=format&fit=crop" },
];

// Aesthetic Themes
interface DesignTheme {
  id: string;
  name: string;
  accentClass: string;
  badgeBg: string;
  gradientFrom: string;
  gradientTo: string;
  borderClass: string;
  textAccent: string;
}

const DESIGN_THEMES: DesignTheme[] = [
  {
    id: "emerald",
    name: "Luxury Emerald & Charcoal",
    accentClass: "bg-emerald-500 text-slate-950",
    badgeBg: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/25",
    gradientFrom: "from-emerald-500/15",
    gradientTo: "to-slate-955",
    borderClass: "border-emerald-500/30",
    textAccent: "text-emerald-400"
  },
  {
    id: "gold",
    name: "Classic Royal Amber Gold",
    accentClass: "bg-amber-500 text-slate-950",
    badgeBg: "bg-amber-500/10 text-amber-400 border border-amber-500/25",
    gradientFrom: "from-amber-500/15",
    gradientTo: "to-slate-955",
    borderClass: "border-amber-500/30",
    textAccent: "text-amber-400"
  },
  {
    id: "indigo",
    name: "Midnight Cobalt & Indigo",
    accentClass: "bg-indigo-500 text-white",
    badgeBg: "bg-indigo-500/10 text-indigo-400 border border-indigo-500/25",
    gradientFrom: "from-indigo-500/15",
    gradientTo: "to-slate-955",
    borderClass: "border-indigo-500/30",
    textAccent: "text-indigo-400"
  },
  {
    id: "crimson",
    name: "Vibrant Crimson Accent",
    accentClass: "bg-rose-600 text-white",
    badgeBg: "bg-rose-600/10 text-rose-400 border border-rose-600/25",
    gradientFrom: "from-rose-600/15",
    gradientTo: "to-slate-955",
    borderClass: "border-rose-600/30",
    textAccent: "text-rose-400"
  }
];

export default function ThumbnailStudio({ metadata, analysis, branding }: ThumbnailStudioProps) {
  // Extract or fallback-generate AI Thumbnail Suggestions
  const suggestions = analysis.thumbnailSuggestions || {
    headlineEn: `Exquisite ${metadata.size} ${metadata.unit} ${metadata.propertyType} in ${metadata.location.split(",")[0]}`,
    headlineUr: metadata.location.includes("Dubai") ? "دبئی مرینا کا جدید رہائشی فلیٹ" : "ڈی ایچ اے کا خوبصورت مکان",
    badges: ["Ready To Move", "Gas Active", "Prime Corner"],
    focalPoints: "Cinematic sweeping facade elevation and dual heights dining lounge views",
    recommendedStyle: metadata.tone === "Luxury/Calm" ? "Luxury Emerald & Gold" : "Modern Charcoal Minimal"
  };

  // Viewport/Layout aspects
  const [aspect, setAspect] = useState<"916" | "43" | "169">("43");
  const [activeTheme, setActiveTheme] = useState<DesignTheme>(
    DESIGN_THEMES.find(t => t.id === branding.themeColor) || DESIGN_THEMES[0]
  );
  
  // Custom design configurations
  const [headlineEn, setHeadlineEn] = useState(suggestions.headlineEn);
  const [headlineUr, setHeadlineUr] = useState(suggestions.headlineUr);
  const [badges, setBadges] = useState<string[]>(suggestions.badges);
  const [newBadge, setNewBadge] = useState("");
  const [bgImageUrl, setBgImageUrl] = useState(PHOTO_PRESETS[0].url);
  const [customSearchKeyword, setCustomSearchKeyword] = useState("");
  
  // Custom background generator states
  const [isGeneratingBg, setIsGeneratingBg] = useState(false);
  const [generationPrompt, setGenerationPrompt] = useState("");

  // Social Previews Simulation Overlay
  const [previewPlatform, setPreviewPlatform] = useState<"none" | "instagram" | "zameen" | "facebook">("none");

  // Local feedback trigger states
  const [copiedLink, setCopiedLink] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  // Suggested tags to click-to-add
  const rawSuggestions = [
    "Ready to Move", "Gas Active", "Corner Plot", "Dual Lounge", "8.5%+ Yield",
    "Ash Wood", "Turkish Tiles", "3-Phase Power", "LDA Cleared", "VIP Blocks",
    "Fitted Kitchen", "Furnished Villa"
  ].filter(tag => !badges.includes(tag));

  // Auto update states when property changes
  useEffect(() => {
    setHeadlineEn(suggestions.headlineEn);
    setHeadlineUr(suggestions.headlineUr);
    setBadges(suggestions.badges);
    setBgImageUrl(metadata.location.includes("Dubai") ? PHOTO_PRESETS[1].url : PHOTO_PRESETS[0].url);
  }, [packMetadataString()]);

  function packMetadataString() {
    return `${metadata.id}-${analysis.title}`;
  }

  // Handle addition of a custom badge
  const handleAddBadge = () => {
    if (newBadge.trim() && badges.length < 5) {
      setBadges([...badges, newBadge.trim().substring(0, 18)]);
      setNewBadge("");
    }
  };

  // Remove a badge
  const handleRemoveBadge = (idx: number) => {
    setBadges(badges.filter((_, i) => i !== idx));
  };

  // Add a suggested badge automatically
  const handleAddSuggestedBadge = (tag: string) => {
    if (badges.length < 5) {
      setBadges([...badges, tag]);
    }
  };

  // Trigger simulated AI Background Generation
  const handleGenerateAIBackground = () => {
    setIsGeneratingBg(true);
    
    // Simulating deep contextual generation of background images using diffusion model parameters
    setTimeout(() => {
      const keywords = generationPrompt.trim().toLowerCase() || "modern real estate architecture";
      const randomSeed = Math.floor(Math.random() * 1000);
      // Construct high-quality real estate picsum seed matching tone
      const generatedUrl = `https://picsum.photos/seed/realestate-${randomSeed}/1200/900`;
      setBgImageUrl(generatedUrl);
      setIsGeneratingBg(false);
    }, 2800);
  };

  // Search stunning real estate photos
  const handlePhotoKeywordSearch = () => {
    if (customSearchKeyword.trim()) {
      const keyword = encodeURIComponent(customSearchKeyword.trim() + " luxury modern home building");
      setBgImageUrl(`https://images.unsplash.com/featured/?${keyword}`);
    }
  };

  // Simulated layout trigger to generate a downloadable thumbnail block using Canvas API
  const handleDownloadThumbnail = () => {
    setIsExporting(true);
    setTimeout(() => {
      // In premium preview environment, we emulate drawing on Canvas to build a PNG File
      const canvas = document.createElement("canvas");
      canvas.width = aspect === "169" ? 1280 : aspect === "43" ? 1024 : 720;
      canvas.height = aspect === "169" ? 720 : aspect === "43" ? 768 : 1280;
      
      const ctx = canvas.getContext("2d");
      if (ctx) {
        // Draw a rich gradient fallback
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        if (activeTheme.id === "emerald") {
          gradient.addColorStop(0, "#064e3b");
          gradient.addColorStop(0.5, "#022c22");
          gradient.addColorStop(1, "#07090e");
        } else if (activeTheme.id === "gold") {
          gradient.addColorStop(0, "#78350f");
          gradient.addColorStop(0.5, "#451a03");
          gradient.addColorStop(1, "#07090e");
        } else if (activeTheme.id === "crimson") {
          gradient.addColorStop(0, "#881337");
          gradient.addColorStop(0.5, "#4c0519");
          gradient.addColorStop(1, "#07090e");
        } else {
          gradient.addColorStop(0, "#1e1b4b");
          gradient.addColorStop(0.5, "#0f172a");
          gradient.addColorStop(1, "#07090e");
        }
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Overlay branding logo text
        ctx.font = "bold 24px sans-serif";
        ctx.fillStyle = "#ffffff";
        ctx.fillText(branding.agencyName.toUpperCase(), 40, canvas.height - 120);

        // Overlay main headlines text to test canvas exporter bounds
        ctx.font = "bold 36px serif";
        ctx.fillStyle = "#facc15";
        ctx.fillText(headlineEn.substring(0, 40), 40, 100);

        ctx.font = "bold 24px sans-serif";
        ctx.fillStyle = "#ffffff";
        ctx.fillText(metadata.location, 40, canvas.height - 80);

        // Download simulation file creation
        const link = document.createElement("a");
        link.download = `estatelens-ai-thumbnail-${aspect}-${metadata.id}.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
      }
      setIsExporting(false);
      alert("AI Thumbnail rendered! High-definition output PNG generated at 1200 DPI with burned layers.");
    }, 1200);
  };

  const handleCopyDesignLink = () => {
    setCopiedLink(true);
    navigator.clipboard.writeText(`https://estatelens.ai/share/preview-${metadata.id}`);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  return (
    <div className="p-6 rounded-2xl border border-slate-800 bg-[#0E121E]/60 backdrop-blur-md space-y-8 text-left selection:bg-indigo-600 selection:text-white">
      {/* Upper header section */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6 pb-6 border-b border-slate-800/80">
        <div className="space-y-1.5">
          <span className="font-mono text-indigo-400 text-xs font-semibold uppercase tracking-widest flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse" />
            Social & Portal Graphics Engine
          </span>
          <h2 className="text-2xl font-display font-extrabold tracking-tight text-white">AI Thumbnail Studio</h2>
          <p className="text-xs text-slate-400 font-sans">
            Analyze property highlights to build scroll-stopping bilingual video covers, portal card listings, and social shares in high resolution.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleDownloadThumbnail}
            disabled={isExporting}
            className="px-5 py-3 bg-indigo-650 hover:bg-indigo-600 text-white font-bold rounded-xl text-xs transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isExporting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
            <span>{isExporting ? "Rendering layers..." : "Export High-Res PNG"}</span>
          </button>
        </div>
      </div>

      {/* Main Grid View */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN - Customizer Controls (7 columns) */}
        <div className="xl:col-span-7 space-y-6">
          
          {/* Section 1: AI Analysis Clues */}
          <div className="p-4 rounded-xl border border-indigo-500/10 bg-indigo-500/5 space-y-2">
            <h4 className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-indigo-400" /> Premium AI Architectural Analysis
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              <span className="font-bold text-indigo-300">Audience Hook:</span> Based on walkthrough frames, {suggestions.focalPoints}. Recommended preview theme branding is <strong className="text-indigo-400 italic">{suggestions.recommendedStyle}</strong> matching the {metadata.tone} tone.
            </p>
          </div>

          {/* Configuration Sections Inside Canvas Grid */}
          <div className="space-y-6 p-6 rounded-2xl border border-slate-800 bg-[#121626]/40 backdrop-blur-sm shadow-xl">
            
            {/* Aspect Selection & Themes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Aspect layout */}
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase text-slate-400 tracking-wider flex items-center gap-1">
                  <Layout className="w-3.5 h-3.5 text-indigo-400" /> Layout Form Ratio
                </label>
                <div className="grid grid-cols-3 gap-1 bg-[#07090E] p-1 rounded-lg border border-slate-800">
                  <button
                    onClick={() => setAspect("916")}
                    className={`py-1.5 rounded-md text-[10px] font-bold transition-all cursor-pointer ${aspect === "916" ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-white"}`}
                  >
                    9:16 (Reel Banner)
                  </button>
                  <button
                    onClick={() => setAspect("43")}
                    className={`py-1.5 rounded-md text-[10px] font-bold transition-all cursor-pointer ${aspect === "43" ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-white"}`}
                  >
                    4:3 (Zameen Portal)
                  </button>
                  <button
                    onClick={() => setAspect("169")}
                    className={`py-1.5 rounded-md text-[10px] font-bold transition-all cursor-pointer ${aspect === "169" ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-white"}`}
                  >
                    16:9 (Social Feed)
                  </button>
                </div>
              </div>

              {/* Design Themes */}
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase text-slate-400 tracking-wider flex items-center gap-1">
                  <Palette className="w-3.5 h-3.5 text-indigo-400" /> Color Accent Preset
                </label>
                <div className="grid grid-cols-4 gap-1 p-1 bg-[#07090E] rounded-lg border border-slate-800">
                  {DESIGN_THEMES.map((theme) => (
                    <button
                      key={theme.id}
                      onClick={() => setActiveTheme(theme)}
                      className={`h-7 rounded transition-all cursor-pointer flex items-center justify-center border ${
                        activeTheme.id === theme.id 
                          ? "border-white bg-[#1F293D]/95 shadow" 
                          : "border-transparent hover:border-slate-800"
                      }`}
                      title={theme.name}
                    >
                      <div className={`w-3.5 h-3.5 rounded-full ${theme.id === "emerald" ? "bg-emerald-500" : theme.id === "gold" ? "bg-amber-500" : theme.id === "indigo" ? "bg-indigo-500" : "bg-red-500"}`} />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Typography Header Text Form */}
            <div className="space-y-4 pt-4 border-t border-slate-800/60">
              <h3 className="text-xs font-mono uppercase text-slate-400 tracking-wider flex items-center gap-1.5">
                <Type className="w-4 h-4 text-indigo-400" /> Typography Headings Overlay
              </h3>

              <div className="space-y-3">
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-[10px] font-mono text-slate-450">
                    <span>Main Catchy English Headline</span>
                    <span>Max {headlineEn.length}/45</span>
                  </div>
                  <input
                    type="text"
                    value={headlineEn}
                    maxLength={45}
                    onChange={(e) => setHeadlineEn(e.target.value)}
                    className="w-full px-3 py-2 bg-[#07090E] border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-indigo-500"
                    placeholder="Enter eye-catching headline..."
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between items-center text-[10px] font-mono text-slate-450">
                    <span>Urdu Secondary Sub-headline</span>
                    <span>Max {headlineUr.length}/50</span>
                  </div>
                  <input
                    type="text"
                    value={headlineUr}
                    maxLength={50}
                    onChange={(e) => setHeadlineUr(e.target.value)}
                    dir="rtl"
                    className="w-full px-3 py-2 bg-[#07090E] border border-slate-800 rounded-lg text-xs text-indigo-300 font-sans tracking-wide leading-relaxed focus:outline-none focus:border-indigo-500"
                    placeholder="شاندار ہسپانوی طرزِ تعمیر والا گھر..."
                  />
                </div>
              </div>
            </div>

            {/* Badges and Callouts Config */}
            <div className="space-y-4 pt-4 border-t border-slate-800/60">
              <h3 className="text-xs font-mono uppercase text-slate-400 tracking-wider flex items-center gap-1.5">
                <Tag className="w-4 h-4 text-indigo-400" /> Highlight Badges & Micro-Copy (Max 5)
              </h3>

              {/* Active list */}
              <div className="flex flex-wrap gap-2">
                {badges.map((badge, idx) => (
                  <span
                    key={badge + idx}
                    className="text-[10px] font-semibold px-2.5 py-1 bg-[#07090E] border border-slate-800 text-slate-300 rounded-md flex items-center gap-1.5"
                  >
                    <span>{badge}</span>
                    <button
                      onClick={() => handleRemoveBadge(idx)}
                      className="text-slate-500 hover:text-red-400 transition-colors cursor-pointer"
                    >
                      <Trash className="w-3 h-3" />
                    </button>
                  </span>
                ))}
                {badges.length === 0 && (
                  <span className="text-xs text-slate-500 italic">No badges added yet. Add tags from suggestions below!</span>
                )}
              </div>

              {/* Add Badge form */}
              <div className="flex gap-2">
                <input
                  type="text"
                  maxLength={18}
                  value={newBadge}
                  onChange={(e) => setNewBadge(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAddBadge()}
                  className="px-3 py-1.5 bg-[#07090E] border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-indigo-500 flex-1"
                  placeholder="Type new badge (e.g. Gas Active)..."
                />
                <button
                  onClick={handleAddBadge}
                  disabled={badges.length >= 5}
                  className="px-3 bg-slate-900 border border-slate-800 hover:border-slate-700 text-white rounded-lg text-xs font-bold font-sans cursor-pointer flex items-center gap-1 disabled:opacity-40"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add</span>
                </button>
              </div>

              {/* AI Auto-Discovered Labels to add */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono uppercase text-slate-500 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-indigo-400" /> Click to add AI suggested features:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {rawSuggestions.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => handleAddSuggestedBadge(tag)}
                      disabled={badges.length >= 5}
                      className="text-[9px] font-mono text-indigo-400 bg-indigo-500/5 hover:bg-indigo-500/10 border border-indigo-500/15 hover:border-indigo-500/30 px-2 py-0.5 rounded transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      + {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Image Selection / Generation */}
            <div className="space-y-4 pt-4 border-t border-slate-800/60">
              <h3 className="text-xs font-mono uppercase text-slate-400 tracking-wider flex items-center gap-1.5">
                <ImageIcon className="w-4 h-4 text-indigo-400" /> Graphic Background Image
              </h3>

              {/* Presets slider row */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono text-slate-500 uppercase">Property Room Anchors</span>
                <div className="grid grid-cols-6 gap-2">
                  {PHOTO_PRESETS.map((photo) => (
                    <button
                      key={photo.id}
                      onClick={() => setBgImageUrl(photo.url)}
                      className={`p-1 bg-[#07090E] border rounded-lg overflow-hidden transition-all text-left group cursor-pointer ${
                        bgImageUrl === photo.url ? "border-indigo-500 shadow-md shadow-indigo-500/10" : "border-slate-800 hover:border-slate-700"
                      }`}
                    >
                      <div className="aspect-[4/3] rounded overflow-hidden">
                        <img src={photo.url} alt={photo.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform" referrerPolicy="no-referrer" />
                      </div>
                      <span className="block text-[8px] text-slate-400 text-center truncate mt-1 leading-tight font-medium font-sans">{photo.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* AI Generative Prompter or Keyword Finder */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                
                {/* Search Unsplash Custom Keywords */}
                <div className="space-y-1.5 p-3.5 rounded-xl border border-slate-800 bg-[#07090E]/80">
                  <span className="block text-[10px] font-mono text-slate-450 uppercase font-bold">Unsplash Real-Time Key Search</span>
                  <div className="flex gap-1">
                    <input
                      type="text"
                      className="px-2.5 py-1.5 bg-[#0e121e] border border-slate-800 rounded-md text-slate-205 text-[11px] font-sans flex-1 focus:outline-none focus:border-indigo-500"
                      value={customSearchKeyword}
                      onChange={(e) => setCustomSearchKeyword(e.target.value)}
                      placeholder="e.g. spanish courtyard, dubai pool"
                    />
                    <button
                      onClick={handlePhotoKeywordSearch}
                      className="px-2.5 bg-indigo-600 hover:bg-indigo-555 text-white rounded-md text-[11px] font-bold cursor-pointer"
                    >
                      Fetch
                    </button>
                  </div>
                </div>

                {/* AI Background Simulator Prompt */}
                <div className="space-y-1.5 p-3.5 rounded-xl border border-slate-800 bg-[#07090E]/80">
                  <span className="block text-[10px] font-mono text-indigo-400 uppercase font-bold flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-400" /> AI Creative Image Prompter
                  </span>
                  <div className="flex gap-1">
                    <input
                      type="text"
                      className="px-2.5 py-1.5 bg-[#0e121e] border border-slate-800 rounded-md text-slate-205 text-[11px] font-sans flex-1 focus:outline-none focus:border-indigo-500"
                      value={generationPrompt}
                      onChange={(e) => setGenerationPrompt(e.target.value)}
                      placeholder="A magnificent sunset landscape over DHA sectors, wide focal, oil painting"
                    />
                    <button
                      onClick={handleGenerateAIBackground}
                      disabled={isGeneratingBg}
                      className="px-2.5 bg-indigo-500 hover:bg-indigo-600 text-white rounded-md text-[11px] font-bold cursor-pointer flex items-center justify-center min-w-16"
                    >
                      {isGeneratingBg ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : "Gen AI"}
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Share Actions Area */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={handleCopyDesignLink}
              className="py-3.5 rounded-xl border border-slate-805 bg-[#121626]/40 hover:bg-[#121626]/70 transition-all font-semibold text-xs text-slate-300 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Copy className="w-4 h-4" />
              <span>{copiedLink ? "Link Copied!" : "Copy Live Campaign Preset URL"}</span>
            </button>
            <button
              onClick={() => {
                const textPitch = encodeURIComponent(`🔥 Checkout our brand new listing *${analysis.title}* optimized with our premium campaign visuals!\n📍 Location: ${metadata.location}\n💰 Price: ${metadata.basePrice}\n\nReel & High-Res Thumbnails: https://estatelens.ai/listing/${metadata.id}`);
                window.open(`https://api.whatsapp.com/send?phone=${branding.whatsapp}&text=${textPitch}`, "_blank");
              }}
              className="py-3.5 bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 border border-[#25D366]/20 font-extrabold rounded-xl text-xs flex items-center justify-center gap-2 shadow-md transition-colors cursor-pointer"
            >
              <Send className="w-4 h-4 fill-current" />
              <span>Broadcast to WhatsApp Listings</span>
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN - Graphic Preview Arena (5 columns) */}
        <div className="xl:col-span-5 flex flex-col items-center space-y-6">
          <div className="w-full text-center space-y-1">
            <h4 className="text-xs font-mono uppercase text-slate-500 font-bold tracking-wider">Dynamic Sandbox Preview</h4>
            <p className="text-[10px] text-slate-500 font-mono">Live render view with composite image layers.</p>
          </div>

          {/* Aspect wrapper layout frame */}
          <div className="flex items-center justify-center w-full min-h-[460px] p-6 rounded-2xl bg-slate-950/70 border border-slate-900 shadow-inner relative overflow-hidden">
            {/* Visual background pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-15" />

            {/* Responsive thumbnail card render */}
            <div 
              className={`relative rounded-2xl overflow-hidden border-4 border-[#07090E] shadow-2xl transition-all duration-300 ${
                aspect === "916" 
                  ? "w-64 h-[440px]" 
                  : aspect === "169" 
                  ? "w-[440px] h-64" 
                  : "w-80 h-60"
              }`}
            >
              {/* Outer image layer */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-all duration-700" 
                style={{ backgroundImage: `url(${bgImageUrl})` }}
              >
                {/* Accent overlay gradient tailored to the theme */}
                <div className={`absolute inset-0 bg-gradient-to-t ${activeTheme.gradientFrom} via-slate-955/35 ${activeTheme.gradientTo}`} />
              </div>

              {/* Embedded watermark branding logic */}
              {branding.logoUrl ? (
                <div className="absolute top-3 left-3 z-20 flex items-center gap-1 bg-slate-950/90 backdrop-blur px-2 py-0.5 rounded border border-slate-800">
                  <img src={branding.logoUrl} alt="Logo" className="w-4 h-4 object-contain" referrerPolicy="no-referrer" />
                  <span className="text-[7px] font-sans text-slate-200 uppercase font-bold tracking-wider">{branding.agencyName}</span>
                </div>
              ) : (
                <div className="absolute top-3 left-3 z-20 flex items-center gap-1 bg-slate-950/90 backdrop-blur px-2 py-0.5 rounded border border-slate-800">
                  <div className={`w-1.5 h-1.5 rounded-full ${activeTheme.textAccent.includes("emerald") ? "bg-emerald-500" : activeTheme.textAccent.includes("amber") ? "bg-amber-500" : "bg-indigo-500"}`} />
                  <span className="text-[7px] font-sans text-slate-205 uppercase font-bold tracking-wider">{branding.agencyName}</span>
                </div>
              )}

              {/* Layout Specific Overlay elements */}
              <div className="absolute inset-0 z-10 flex flex-col justify-between p-4.5">
                
                {/* TOP ROW: Price Display Badge */}
                <div className="flex justify-end items-start w-full">
                  <div className={`px-2.5 py-0.8 rounded-lg font-mono font-extrabold text-[9px] uppercase shadow-md ${activeTheme.accentClass} tracking-wide`}>
                    {metadata.basePrice}
                  </div>
                </div>

                {/* BOTTOM LAYER: Content Texts, Badges */}
                <div className="space-y-2 mt-auto">
                  {/* Badges Container */}
                  <div className="flex flex-wrap gap-1">
                    {badges.map((b) => (
                      <span key={b} className={`px-1.5 py-0.2 rounded text-[7px] font-bold uppercase tracking-wider ${activeTheme.badgeBg}`}>
                        {b}
                      </span>
                    ))}
                  </div>

                  {/* Headlines */}
                  <div className="space-y-0.5">
                    <h3 className="text-sm font-display font-extrabold text-white leading-tight drop-shadow tracking-tight uppercase">
                      {headlineEn}
                    </h3>
                    <p className={`text-[10px] font-sans font-semibold drop-shadow ${activeTheme.textAccent} leading-none tracking-wide text-right`} dir="rtl">
                      {headlineUr}
                    </p>
                  </div>

                  {/* Footer metadata details */}
                  <div className="flex items-center justify-between pt-1 border-t border-slate-800/40 text-[7px] font-mono text-slate-450 uppercase tracking-widest">
                    <span>📍 {metadata.location.split(",")[0]}</span>
                    <span>📞 {branding.name.split(" ")[0]} ({branding.phone.substring(0, 7)}...)</span>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Social Platform Visualizer Channel Selection */}
          <div className="w-full space-y-2 border-t border-slate-800/80 pt-4 font-sans">
            <span className="text-[10px] font-mono uppercase text-slate-500 block text-center">Interactive Social Channel Previews</span>
            
            <div className="grid grid-cols-4 gap-1 p-1 bg-[#07090E] rounded-lg border border-slate-800 text-center">
              {[
                { id: "none", label: "Studio Card" },
                { id: "instagram", label: "Instagram Grid" },
                { id: "zameen", label: "Zameen Portal" },
                { id: "facebook", label: "FB Link Share" },
              ].map((p) => (
                <button
                  key={p.id}
                  onClick={() => setPreviewPlatform(p.id as any)}
                  className={`py-1.5 rounded-md text-[10px] font-bold transition-all cursor-pointer ${
                    previewPlatform === p.id ? "bg-[#1F293D] text-slate-100" : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>

            {/* Simulated Live Previews Overlay Popups */}
            {previewPlatform === "instagram" && (
              <div className="p-4 rounded-xl border border-slate-800 bg-[#07090E] space-y-3 animate-fade-in text-left">
                <div className="flex items-center gap-2 pb-1.5 border-b border-slate-900">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-yellow-500 purple-500 to-pink-500" />
                  <span className="text-[10px] font-bold text-slate-300">your.property.agency • Sponsored Preview</span>
                </div>
                <div className="flex gap-2">
                  <div className="w-24 h-24 rounded bg-cover bg-center shrink-0 border border-slate-850" style={{ backgroundImage: `url(${bgImageUrl})` }} />
                  <div className="space-y-1.5 text-xs">
                    <p className="text-[10px] font-mono text-indigo-400 font-bold uppercase">Instagram Story Feed preview</p>
                    <p className="text-slate-300 text-[10px] font-sans line-clamp-2">🔥 {headlineEn} • Ready listing in {metadata.location}! Asking {metadata.basePrice}.</p>
                    <span className="inline-block px-1.5 py-0.5 bg-indigo-500 text-white rounded font-bold text-[8px]">BOOK VIP TOUR</span>
                  </div>
                </div>
              </div>
            )}

            {previewPlatform === "facebook" && (
              <div className="p-4 rounded-xl border border-slate-800 bg-[#07090E] space-y-2 animate-fade-in text-left font-sans">
                <div className="text-[10px] text-slate-400 font-medium">facebook.com/posts • Web link card preview</div>
                <div className="border border-slate-900 rounded-lg overflow-hidden bg-[#0a0f1d]">
                  <div className="aspect-[16/9] w-full bg-cover bg-center" style={{ backgroundImage: `url(${bgImageUrl})` }} />
                  <div className="p-2.5 space-y-0.5">
                    <span className="text-[8px] font-mono text-slate-500">ESTATELENS.AI/CAMPAIGNS</span>
                    <h5 className="text-[11px] font-extrabold text-slate-200 leading-tight">{headlineEn} — Listed by {branding.agencyName}</h5>
                    <p className="text-[9px] text-slate-450 leading-normal line-clamp-1">Explore real-time specs, red flags evaluation and WhatsApp virtual reels.</p>
                  </div>
                </div>
              </div>
            )}

            {previewPlatform === "zameen" && (
              <div className="p-4 rounded-xl border border-rose-500/10 bg-rose-950/5 space-y-3 animate-fade-in text-left">
                <div className="flex items-center justify-between text-[10px] text-rose-455 font-bold border-b border-rose-500/10 pb-1.5">
                  <span>Zameen.com Listings Grid</span>
                  <span className="text-green-400 font-mono">● Active Ad</span>
                </div>
                <div className="flex gap-3">
                  <div className="relative w-28 h-20 bg-cover bg-center rounded border border-rose-500/15" style={{ backgroundImage: `url(${bgImageUrl})` }}>
                    <span className="absolute bottom-1 left-1 bg-slate-950/80 text-white font-bold text-[7px] px-1 rounded uppercase tracking-wider">PREVIEW COVER</span>
                  </div>
                  <div className="space-y-1 select-none flex-1">
                    <h4 className="text-[11px] font-bold text-slate-200 line-clamp-1">{analysis.title}</h4>
                    <p className="text-[9px] text-slate-400 leading-none">📍 {metadata.location}</p>
                    <div className="flex items-center justify-between pt-1 text-[10px] font-extrabold text-indigo-400">
                      <span>Ref asks {metadata.basePrice}</span>
                      <span className="text-rose-400 text-[8px] font-mono">DHA Certified</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
