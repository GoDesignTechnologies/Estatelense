import React, { useState } from "react";
import { Play, Sparkles, Video, Share2, FileText, CheckCircle2, ChevronRight, MessageSquare, Instagram, Zap, Eye } from "lucide-react";
import { motion } from "motion/react";

interface LandingPageProps {
  onStartDemo: () => void;
  onLogin: (email: string, isSignUp: boolean) => void;
}

export default function LandingPage({ onStartDemo, onLogin }: LandingPageProps) {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput) {
      setErrorMsg("Please enter a valid email address");
      return;
    }
    setErrorMsg("");
    onLogin(emailInput, isSignUp);
    setIsAuthModalOpen(false);
  };

  const setMockUser = (email: string) => {
    setEmailInput(email);
    setPasswordInput("agent123");
    setErrorMsg("");
    onLogin(email, false);
    setIsAuthModalOpen(false);
  };

  return (
    <div id="landing-page" className="min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden selection:bg-emerald-500 selection:text-slate-950">
      {/* Background ambient glows */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[800px] right-1/4 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Header */}
      <header className="border-b border-slate-900 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <Video className="w-5 h-5 text-slate-950 stroke-[2.5]" />
            </div>
            <div>
              <span className="font-sans font-bold tracking-tight text-xl text-slate-100">
                Estate<span className="text-emerald-400 font-medium">Lens</span>
              </span>
              <span className="block text-[10px] text-emerald-400/80 tracking-wider font-mono uppercase">AI Video Marketing</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                setIsSignUp(false);
                setIsAuthModalOpen(true);
              }}
              className="text-sm font-medium hover:text-emerald-400 transition-colors"
            >
              Sign In
            </button>
            <button
              onClick={() => {
                setIsSignUp(true);
                setIsAuthModalOpen(true);
              }}
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-medium rounded-xl text-sm transition-all duration-200 active:scale-95 shadow-lg shadow-emerald-500/10"
            >
              Get Started Free
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-24 md:pb-32 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-505/10 border border-emerald-500/20 bg-slate-900 mb-8"
          >
            <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span className="text-xs font-medium text-emerald-300 font-mono tracking-wide uppercase">AI Video-to-Marketing Engine</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-6xl font-sans font-extrabold tracking-tight text-slate-100 leading-[1.1] max-w-4xl mx-auto"
          >
            Turn Raw Property Videos into <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-300">Viral Marketing Assets</span> In Minutes
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 text-lg md:text-xl text-slate-400 max-w-2xl mx-auto font-sans leading-relaxed"
          >
            Upload your property walkthrough videos. Our AI analyzes the visual space to generate premium portal listings, WhatsApp pitches, brochures, and <strong className="text-emerald-400 font-medium">Bilingual TikTok / Instagram Reels</strong> with synced subtitles and background beats.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              onClick={onStartDemo}
              className="w-full sm:w-auto px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl shadow-xl shadow-emerald-500/20 transition-all duration-200 active:scale-95 flex items-center justify-center gap-2.5 text-base"
            >
              <Zap className="w-5 h-5 fill-current" />
              Try App Free
            </button>
            <button
              onClick={() => {
                setIsSignUp(true);
                setIsAuthModalOpen(true);
              }}
              className="w-full sm:w-auto px-8 py-4 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-100 font-medium rounded-xl transition-all duration-200 hover:bg-slate-800/50 flex items-center justify-center gap-2 text-base"
            >
              <span>Create Account</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </motion.div>

          {/* Core Feature Dashboard Image Preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="mt-16 md:mt-24 max-w-5xl mx-auto rounded-2xl border border-slate-800 bg-slate-900/50 p-3 shadow-2xl relative"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/5 to-transparent rounded-2xl pointer-events-none" />
            <div className="rounded-xl overflow-hidden bg-slate-950 border border-slate-800/80 p-6 flex flex-col md:flex-row gap-8 items-center text-left">
              <div className="flex-1 space-y-4">
                <span className="font-mono text-emerald-400 text-xs font-semibold uppercase tracking-wider">Interactive Mock Player Preview</span>
                <h3 className="text-2xl font-bold font-sans text-slate-100">AI Reels with Auto Subtitles</h3>
                <p className="text-slate-400 leading-relaxed text-sm">
                  Our system deciphers your property video highlights to automatically splice key rooms and overlay elegant calligraphy, real-time prices, and agent contacts.
                </p>
                <div className="space-y-2 pt-2">
                  <div className="flex items-center gap-2.5 text-sm text-slate-300">
                    <CheckCircle2 className="w-4.5 h-4.5 text-emerald-400 flex-shrink-0" />
                    <span>Automatic bilingual captions (English + Phonetic Urdu)</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-sm text-slate-300">
                    <CheckCircle2 className="w-4.5 h-4.5 text-emerald-400 flex-shrink-0" />
                    <span>Royalty-free upbeat background music loops</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-sm text-slate-300">
                    <CheckCircle2 className="w-4.5 h-4.5 text-emerald-400 flex-shrink-0" />
                    <span>Injected agent profile watermark & strong Call to Action</span>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-80 flex-shrink-0 flex items-center justify-center">
                {/* Simulated vertical reel screen */}
                <div className="relative w-56 h-[340px] rounded-2.5xl bg-slate-900 border-4 border-slate-800 shadow-2xl flex flex-col overflow-hidden group">
                  {/* Mock video bg */}
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-800 via-slate-950 to-slate-950 flex flex-col items-center justify-center p-4">
                    <div className="w-16 h-16 rounded-full bg-slate-900/80 border border-slate-800 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                      <Play className="w-7 h-7 fill-emerald-500 text-emerald-500 translate-x-0.5" />
                    </div>
                  </div>
                  
                  {/* Floating labels */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="px-2 py-0.5 bg-slate-950/80 backdrop-blur-sm rounded-md text-[10px] font-mono text-emerald-400 border border-emerald-500/20">9:16 vertical</span>
                    <span className="text-[10px] font-sans text-slate-400 bg-slate-950/50 px-2 py-0.5 rounded">30s script</span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 space-y-2">
                    <div className="bg-slate-950/90 p-2 rounded-xl border border-slate-800 space-y-1">
                      <p className="text-[10px] font-mono font-semibold text-emerald-400">🔥 modern 10 marla luxury villa</p>
                      <p className="text-[11px] font-sans leading-tight text-slate-200">کونے کا خوبصورت ترین ڈیزائن والا لگژری مکان</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-slate-950 text-[10px] font-bold">AL</div>
                      <div className="flex-1">
                        <p className="text-[8px] font-bold">Awan Lodhi</p>
                        <p className="text-[6px] text-slate-400">+92 300 1234567</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-24 border-t border-slate-900 bg-slate-900/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-sans font-bold text-slate-100">All-In-One Real Estate Marketing Suite</h2>
            <p className="mt-4 text-slate-400 text-base leading-relaxed">
              Why pay copywriters, agencies, and editors? Build your absolute marketing arsenal in moments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="p-8 rounded-2xl border border-slate-900 bg-slate-950/60 hover:border-slate-800 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6">
                <FileText className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold font-sans text-slate-100">SEO Portal Listings</h3>
              <p className="mt-3 text-slate-400 text-sm leading-relaxed">
                Specifically tuned for regional portals (Zameen.com, OLX, Graana.com, PropertyFinder). Includes specifications, room metrics, floor plans, and localized copy.
              </p>
            </div>

            <div className="p-8 rounded-2xl border border-slate-900 bg-slate-950/60 hover:border-slate-800 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center mb-6">
                <MessageSquare className="w-6 h-6 text-teal-400" />
              </div>
              <h3 className="text-xl font-bold font-sans text-slate-100">WhatsApp Pitches</h3>
              <p className="mt-3 text-slate-400 text-sm leading-relaxed">
                Elegant pitches ready to be broadcasted to your WhatsApp lists. Formatted beautifully with custom formatting so you stand out on your clients' phones.
              </p>
            </div>

            <div className="p-8 rounded-2xl border border-slate-900 bg-slate-950/60 hover:border-slate-800 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-6">
                <Instagram className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold font-sans text-slate-100">One-Click Short Videos</h3>
              <p className="mt-3 text-slate-400 text-sm leading-relaxed">
                Make vertical 9:16 videos with auto bilingual subtitles, transitions, music beats, and professional call-to-actions, ready for TikTok, Facebook Reels, and Shorts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Tiers Section */}
      <section className="py-24 border-t border-slate-900 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto">
            <span className="font-mono text-xs uppercase text-emerald-400 tracking-widest font-semibold">Flexible Subscriptions</span>
            <h2 className="text-3xl md:text-4xl font-sans font-bold text-slate-100 mt-3">Simple Pricing For Active Agents</h2>
            <p className="mt-4 text-slate-400">Save 5-10 hours per week and sell properties faster. Try free, upgrade anytime.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-5xl mx-auto">
            {/* Free */}
            <div className="p-8 rounded-2xl border border-slate-800 bg-slate-900/20 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold font-sans text-slate-200">Starter Pack</h3>
                <span className="block text-slate-400 text-xs mt-1">Excellent to test out features</span>
                <div className="my-6">
                  <span className="text-3xl font-extrabold text-slate-100">$0</span>
                  <span className="text-slate-400 text-sm ml-1">/ lifetime free</span>
                </div>
                <div className="space-y-3 font-sans text-sm text-slate-300">
                  <div className="flex gap-2">
                    <CheckCircle2 className="w-4.5 h-4.5 text-slate-400 flex-shrink-0 mt-0.5" />
                    <span>2 Property Analyses per month</span>
                  </div>
                  <div className="flex gap-2">
                    <CheckCircle2 className="w-4.5 h-4.5 text-slate-400 flex-shrink-0 mt-0.5" />
                    <span>2 Reels & Video creations / month</span>
                  </div>
                  <div className="flex gap-2">
                    <CheckCircle2 className="w-4.5 h-4.5 text-slate-400 flex-shrink-0 mt-0.5" />
                    <span>Basic Portal and social text outputs</span>
                  </div>
                  <div className="flex gap-2 text-slate-500">
                    <CheckCircle2 className="w-4.5 h-4.5 flex-shrink-0 mt-0.5" />
                    <span>No personal custom logo watermark</span>
                  </div>
                </div>
              </div>
              <button
                onClick={onStartDemo}
                className="mt-8 w-full py-3 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-100 font-semibold rounded-xl text-sm transition-colors"
              >
                Use Free Version
              </button>
            </div>

            {/* Pro - Recommended */}
            <div className="p-8 rounded-2xl border-2 border-emerald-500/80 bg-slate-900/60 flex flex-col justify-between shadow-xl shadow-emerald-500/5 relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-emerald-500 text-slate-950 font-mono text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest leading-none">
                Popular Model
              </div>
              <div>
                <h3 className="text-xl font-bold font-sans text-emerald-400">Professional Agent</h3>
                <span className="block text-slate-300 text-xs mt-1">Perfect for brokers and active agencies</span>
                <div className="my-6">
                  <span className="text-4xl font-extrabold text-slate-100">$15</span>
                  <span className="text-slate-400 text-sm ml-1">/ month</span>
                </div>
                <div className="space-y-3 font-sans text-sm text-slate-200">
                  <div className="flex gap-2">
                    <CheckCircle2 className="w-4.5 h-4.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span className="font-medium text-slate-100">Unlimited property analyses</span>
                  </div>
                  <div className="flex gap-2">
                    <CheckCircle2 className="w-4.5 h-4.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span className="font-medium text-slate-100">Unlimited Reel video generation</span>
                  </div>
                  <div className="flex gap-2">
                    <CheckCircle2 className="w-4.5 h-4.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>Upload custom branding, logo, colors</span>
                  </div>
                  <div className="flex gap-2">
                    <CheckCircle2 className="w-4.5 h-4.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>Export printed branded PDF brochures</span>
                  </div>
                  <div className="flex gap-2">
                    <CheckCircle2 className="w-4.5 h-4.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>Direct WhatsApp publishing suite</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  setIsSignUp(true);
                  setIsAuthModalOpen(true);
                }}
                className="mt-8 w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-sm transition-all shadow-lg shadow-emerald-500/15"
              >
                Sign Up Professional
              </button>
            </div>

            {/* Agency */}
            <div className="p-8 rounded-2xl border border-slate-800 bg-slate-900/20 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold font-sans text-slate-200">Agency Team</h3>
                <span className="block text-slate-400 text-xs mt-1">For multi-agent broker companies</span>
                <div className="my-6">
                  <span className="text-3xl font-extrabold text-slate-100">$50</span>
                  <span className="text-slate-400 text-sm ml-1">/ month</span>
                </div>
                <div className="space-y-3 font-sans text-sm text-slate-200">
                  <div className="flex gap-2">
                    <CheckCircle2 className="w-4.5 h-4.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>Up to 10 Agent Profiles</span>
                  </div>
                  <div className="flex gap-2">
                    <CheckCircle2 className="w-4.5 h-4.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>Central shared Property Library</span>
                  </div>
                  <div className="flex gap-2">
                    <CheckCircle2 className="w-4.5 h-4.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>Premium Urdu TTS audio narrations</span>
                  </div>
                  <div className="flex gap-2">
                    <CheckCircle2 className="w-4.5 h-4.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>Dedicated priority processing servers</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  setIsSignUp(true);
                  setIsAuthModalOpen(true);
                }}
                className="mt-8 w-full py-3 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-100 font-semibold rounded-xl text-sm transition-colors"
              >
                Sign Up Agency
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 border-t border-slate-900 bg-slate-900/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-sans font-bold text-slate-100">Loved by Real Estate Authorities</h2>
            <p className="mt-3 text-slate-400">Discover how premium developers and agents close listings in record times.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-950 p-6 space-y-4">
              <p className="text-slate-300 italic text-sm">
                "Establishing listings on Pakistani portals took hours of tedious translation and emoji structuring. EstateLens analyzes my video walk and crafts premium Urdu descriptions in under 30 seconds!"
              </p>
              <div>
                <p className="text-slate-105 text-sm font-semibold">Mohammad Usman Lodhi</p>
                <p className="text-slate-500 text-xs">Director, Elite Pillars, DHA Lahore</p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-950 p-6 space-y-4">
              <p className="text-slate-300 italic text-sm">
                "The 'Create Professional Reel' feature is an absolute goldmine. Our design overlays and synced bilingual subtitle text immediately doubled our WhatsApp status views."
              </p>
              <div>
                <p className="text-slate-105 text-sm font-semibold">Sarah Al-Mansoori</p>
                <p className="text-slate-500 text-xs">Senior Associate, Premier Heights, Dubai Marina</p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-950 p-6 space-y-4">
              <p className="text-slate-300 italic text-sm">
                "We print the PDF brochure with our branded gold header and hand it straight to clients at physical walk-throughs. It gives us a level of authority that stands above traditional teams."
              </p>
              <div>
                <p className="text-slate-105 text-sm font-semibold">Advocate Rajesh Kumar</p>
                <p className="text-slate-500 text-xs">Property Consultant, Gurgaon Sector 50</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-12 px-6 bg-slate-950">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center">
              <Video className="w-4 h-4 text-slate-950" />
            </div>
            <span className="font-sans font-extrabold text-slate-300">EstateLens</span>
          </div>
          <p className="text-slate-500 text-xs text-center">
            &copy; 2026 EstateLens. All rights reserved. Built with Gemini AI.
          </p>
        </div>
      </footer>

      {/* Authentication Modal */}
      {isAuthModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-8 relative shadow-2xl">
            <button
              onClick={() => setIsAuthModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-100 transition-colors text-lg"
            >
              &times;
            </button>
            <h3 className="text-2xl font-sans font-bold text-slate-100 mb-2">
              {isSignUp ? "Create EstateLens Account" : "Welcome Back"}
            </h3>
            <p className="text-sm text-slate-400 mb-6">
              {isSignUp ? "Start transforming property videos into premium campaigns." : "Log in to manage and review active property listings."}
            </p>

            <form onSubmit={handleAuthSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="agent@agency.com"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl focus:outline-none focus:border-emerald-500 text-slate-100 placeholder-slate-650 transition-colors text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">Password</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl focus:outline-none focus:border-emerald-500 text-slate-100 placeholder-slate-650 transition-colors text-sm"
                />
              </div>

              {isSignUp && (
                <div className="flex items-start gap-2.5 pt-1">
                  <input id="terms" type="checkbox" required className="mt-1 rounded text-emerald-500 bg-slate-950 border-slate-800" />
                  <label htmlFor="terms" className="text-xs text-slate-400 leading-normal">
                    I agree to the Terms of Service & Privacy Policy, and understand watermarked videos require Pro subscriptions.
                  </label>
                </div>
              )}

              {errorMsg && <p className="text-xs text-red-400 font-mono">{errorMsg}</p>}

              <button
                type="submit"
                className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl transition-all shadow-lg shadow-emerald-500/10 text-sm mt-2"
              >
                {isSignUp ? "Join as Premium Agent" : "Access Accounts"}
              </button>
            </form>

            <div className="relative flex py-5 items-center justify-center">
              <div className="flex-grow border-t border-slate-800"></div>
              <span className="flex-shrink mx-4 text-[10px] font-mono uppercase text-slate-500">Quick Test Credentials</span>
              <div className="flex-grow border-t border-slate-800"></div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setMockUser("awan.lodhi@dhapakistan.com")}
                className="py-2.5 px-3 bg-slate-950 border border-slate-800 rounded-xl hover:border-slate-700 text-xs font-sans text-slate-300 text-left hover:bg-slate-900/80 transition-colors"
                type="button"
              >
                <p className="font-semibold text-slate-205">Awan Lodhi</p>
                <p className="text-[10px] text-slate-550 italic">DHA Specialist</p>
              </button>
              <button
                onClick={() => setMockUser("sarah.mansoor@dubaimarketing.ae")}
                className="py-2.5 px-3 bg-slate-950 border border-slate-800 rounded-xl hover:border-slate-700 text-xs font-sans text-slate-300 text-left hover:bg-slate-900/80 transition-colors"
                type="button"
              >
                <p className="font-semibold text-slate-205">Sarah Mansoor</p>
                <p className="text-[10px] text-slate-550 italic">Dubai Marina broker</p>
              </button>
            </div>

            <div className="mt-6 text-center">
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-xs text-slate-400 hover:text-emerald-400 transition-colors underline"
              >
                {isSignUp ? "Already have an account? Sign In" : "Need an agent channel? Sign Up now"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
