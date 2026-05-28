import React, { useState } from "react";
import { AgentBranding, UserState } from "../types";
import { Check, ShieldAlert, Award, Phone, Send, Sparkles, Building, Palette } from "lucide-react";

interface BrandingSettingsProps {
  user: UserState;
  branding: AgentBranding;
  onSaveBranding: (branding: AgentBranding) => void;
  onUpgradeTier: (tier: "free" | "pro" | "agency") => void;
}

export default function BrandingSettings({ user, branding, onSaveBranding, onUpgradeTier }: BrandingSettingsProps) {
  const [name, setName] = useState(branding.name);
  const [agencyName, setAgencyName] = useState(branding.agencyName);
  const [phone, setPhone] = useState(branding.phone);
  const [whatsapp, setWhatsapp] = useState(branding.whatsapp);
  const [logoUrl, setLogoUrl] = useState(branding.logoUrl || "");
  const [themeColor, setThemeColor] = useState<"emerald" | "gold" | "cobalt" | "charcoal">(branding.themeColor);
  const [isSaved, setIsSaved] = useState(false);

  const colors = [
    { id: "emerald", label: "Emerald Mint", color: "bg-emerald-500", text: "text-emerald-400" },
    { id: "gold", label: "Royal Gold", color: "bg-amber-500", text: "text-amber-400" },
    { id: "cobalt", label: "Cobalt Sapphire", color: "bg-blue-500", text: "text-blue-400" },
    { id: "charcoal", label: "Midnight Velvet", color: "bg-slate-500", text: "text-slate-400" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveBranding({
      name,
      agencyName,
      phone,
      whatsapp,
      logoUrl: logoUrl || undefined,
      themeColor,
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const getThemeBadgeClass = () => {
    switch (themeColor) {
      case "gold": return "border-amber-500/20 text-amber-400 bg-amber-500/5";
      case "cobalt": return "border-blue-500/20 text-blue-400 bg-blue-500/5";
      case "charcoal": return "border-slate-500/20 text-slate-350 bg-slate-500/5";
      default: return "border-emerald-500/20 text-emerald-400 bg-emerald-500/5";
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-6 space-y-10 selection:bg-indigo-650 selection:text-white animate-fade-in">
      {/* Top Title Bar */}
      <div>
        <h1 className="text-3xl font-display font-extrabold tracking-tight text-white flex items-center gap-3">
          <Palette className={`w-8 h-8 ${themeColor === "gold" ? "text-amber-400" : themeColor === "cobalt" ? "text-blue-400" : themeColor === "charcoal" ? "text-slate-400" : "text-emerald-400"}`} />
          Agency Branding & Settings
        </h1>
        <p className="text-sm text-slate-400 mt-2 font-sans leading-relaxed">
          Configure agency credentials, primary brand colors, and contact info. These parameters inject directly into your print-friendly PDF booklets and automatic social video Reel watermarks.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left main form (2 Cols) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 rounded-2xl border border-slate-800 bg-[#0E121E]/60 backdrop-blur-md shadow-2xl hover:border-slate-700/60 transition-all">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 mb-2">Agent/Broker Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 bg-[#07090E] border border-slate-800 rounded-xl focus:outline-none focus:border-indigo-500 text-white transition-colors text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 mb-2">Agency Name</label>
                  <div className="relative">
                    <Building className="absolute left-4.5 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
                    <input
                      type="text"
                      required
                      value={agencyName}
                      onChange={(e) => setAgencyName(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 bg-[#07090E] border border-slate-800 rounded-xl focus:outline-none focus:border-indigo-500 text-white transition-colors text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 mb-2">Direct Phone Link</label>
                  <div className="relative">
                    <Phone className="absolute left-4.5 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
                    <input
                      type="text"
                      required
                      placeholder="+92 300 1234567"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 bg-[#07090E] border border-slate-800 rounded-xl focus:outline-none focus:border-indigo-500 text-white transition-colors text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 mb-2">WhatsApp Contact link</label>
                  <div className="relative">
                    <Send className="absolute left-4.5 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
                    <input
                      type="text"
                      required
                      placeholder="+923001234567"
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 bg-[#07090E] border border-slate-800 rounded-xl focus:outline-none focus:border-indigo-500 text-white transition-colors text-sm font-mono"
                    />
                  </div>
                  <span className="block text-[10px] text-slate-500 mt-1.5 leading-relaxed">Numerical format (no spaces or '+' sign, e.g. 923001234567) to enable automatic links.</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-2">Agency Logo / Avatar URL</label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=100"
                  value={logoUrl}
                  onChange={(e) => setLogoUrl(e.target.value)}
                  className="w-full px-4 py-3 bg-[#07090E] border border-slate-800 rounded-xl focus:outline-none focus:border-indigo-500 text-white transition-colors text-sm font-mono"
                />
                <span className="block text-[10px] text-slate-500 mt-1.5 leading-relaxed">Leave blank to use a modern, automatic placeholder avatar matching your agency names.</span>
              </div>

              {/* Theme Color Selector */}
              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-3">Brand Accents Theme</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {colors.map((c) => (
                    <button
                      type="button"
                      key={c.id}
                      onClick={() => setThemeColor(c.id as any)}
                      className={`p-3.5 rounded-xl border text-left text-xs font-sans transition-all flex flex-col justify-between h-20 ${
                        themeColor === c.id
                          ? "border-indigo-500/50 bg-[#1F293D]/30 shadow-md"
                          : "border-slate-800 bg-[#07090E]/85 hover:border-slate-700"
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className={`w-4 h-4 rounded-full ${c.color}`} />
                        {themeColor === c.id && <Check className="w-4 h-4 text-indigo-400" />}
                      </div>
                      <span className="font-semibold text-slate-200">{c.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-800/80">
                {isSaved ? (
                  <span className="text-xs font-mono text-indigo-400 flex items-center gap-1.5 animate-pulse">
                    <Check className="w-4 h-4" /> Preferences applied to PDFs and Watermarks
                  </span>
                ) : (
                  <span className="text-xs text-slate-500">Unsaved parameters will fall back to system defaults.</span>
                )}
                <button
                  type="submit"
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-sm transition-all shadow-lg shadow-indigo-600/15 cursor-pointer"
                >
                  Save Brand Setup
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right side pricing/tier upgrade cards (1 Col) */}
        <div className="space-y-6">
          {/* Active Level Card */}
          <div className="p-6 rounded-2xl border border-slate-800 bg-[#0E121E]/30 backdrop-blur-md text-left">
            <h4 className="font-mono text-xs text-slate-400 uppercase tracking-widest font-semibold flex items-center gap-1.5">
              <Award className="w-4 h-4 text-indigo-400" /> Subscription Tier
            </h4>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-3xl font-display font-extrabold text-[#ECEFF4] capitalize">{user.tier}</span>
              <span className="text-slate-505 text-xs font-mono">active channel</span>
            </div>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              {user.tier === "free"
                ? "You are currently running the Free trial. High-definition Reels generated contain a subtle 'EstateLens' watermark."
                : "You enjoy unlimited high-processing property analyses, premium PDF exports, and watermark-free custom branding."}
            </p>

            {user.tier === "free" && (
              <div className="mt-6 p-4 rounded-xl border border-indigo-500/20 bg-indigo-500/5 space-y-3">
                <span className="block text-xs font-bold text-indigo-400 flex items-center gap-1.5 font-display">
                  <Sparkles className="w-4 h-4 animate-spin-slow" /> Upgrade for $15/month
                </span>
                <p className="text-[10px] text-slate-350 leading-relaxed">
                  Unlock unlimited, priority video processing, export beautifully branded booklets, and output watermark-free vertical campaigns.
                </p>
                <button
                  onClick={() => onUpgradeTier("pro")}
                  className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-lg transition-all active:scale-95 cursor-pointer shadow-md shadow-indigo-600/10"
                >
                  Simulate Pro Upgrade
                </button>
              </div>
            )}

            {user.tier === "pro" && (
              <div className="mt-6 space-y-2">
                <button
                  onClick={() => onUpgradeTier("agency")}
                  className="w-full py-2 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-205 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                >
                  Simulate Agency ($50/mo)
                </button>
                <button
                  onClick={() => onUpgradeTier("free")}
                  className="w-full text-center text-[10px] text-slate-500 hover:text-slate-400 transition-colors py-1 cursor-pointer"
                >
                  Cancel to Free level
                </button>
              </div>
            )}

            {user.tier === "agency" && (
              <div className="mt-6 p-4 rounded-xl border border-blue-500/20 bg-blue-500/5">
                <span className="block text-xs font-bold text-blue-400">Agency Premium Active</span>
                <p className="text-[10px] text-slate-400 mt-1">Multi-agent configurations and high-speed processing are enabled.</p>
                <button
                  onClick={() => onUpgradeTier("pro")}
                  className="mt-4 w-full py-2 bg-slate-900 text-slate-400 text-xs rounded-lg hover:text-slate-205 border border-slate-800 cursor-pointer"
                >
                  Downgrade to Individual Pro ($15)
                </button>
              </div>
            )}
          </div>

          {/* Quick Stats Block */}
          <div className="p-6 rounded-2xl border border-slate-800 bg-[#0E121E]/30 shadow-md">
            <h4 className="font-mono text-xs uppercase text-slate-450 tracking-wider">Usage & Quotas</h4>
            <div className="mt-4 space-y-3">
              <div>
                <div className="flex items-center justify-between text-xs text-slate-300 mb-1">
                  <span>Reel Clips Processed</span>
                  <span className="font-mono text-slate-400">
                    {user.tier === "free" ? `${user.reelsCreatedThisMonth}/2` : "Unlimited"}
                  </span>
                </div>
                <div className="w-full h-1.5 bg-[#07090E] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-500 transition-all rounded-full"
                    style={{ width: user.tier === "free" ? `${(user.reelsCreatedThisMonth / 2) * 100}%` : "100%" }}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs text-slate-300 mb-1">
                  <span>Analyses Remaining</span>
                  <span className="font-mono text-slate-400">
                    {user.tier === "free" ? `${Math.max(0, 3 - user.reelsCreatedThisMonth)}/3` : "Unlimited"}
                  </span>
                </div>
                <div className="w-full h-1.5 bg-[#07090E] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-300 transition-all rounded-full"
                    style={{ width: user.tier === "free" ? `${((3 - user.reelsCreatedThisMonth) / 3) * 100}%` : "100%" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
