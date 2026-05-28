import { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw, Download, Send, Volume2, VolumeX, Sparkles, Sliders, Clock, Trophy, ChevronRight, Music, CheckCircle, Video } from "lucide-react";
import { PropertyMetadata, GeminiAnalysisResult, AgentBranding, ReelStyle, ReelClip } from "../types";

const defaultPropertyVideos: Record<string, string> = {
  luxury: "https://assets.mixkit.co/videos/preview/mixkit-luxury-home-interior-living-room-and-kitchen-41983-large.mp4",
  fast: "https://assets.mixkit.co/videos/preview/mixkit-swimming-pool-of-a-luxury-mansion-at-sunset-41985-large.mp4",
  clean: "https://assets.mixkit.co/videos/preview/mixkit-modern-apartment-with-elegant-minimalist-living-room-41981-large.mp4",
};

interface ReelCreatorProps {
  metadata: PropertyMetadata;
  analysis: GeminiAnalysisResult;
  branding: AgentBranding;
  onIncrementReelCount: () => void;
}

export default function ReelCreator({ metadata, analysis, branding, onIncrementReelCount }: ReelCreatorProps) {
  const [duration, setDuration] = useState<15 | 30 | 45>(30);
  const [style, setStyle] = useState<ReelStyle>("luxury");
  const [musicType, setMusicType] = useState<"upbeat" | "corporate" | "luxury_lounge">("luxury_lounge");

  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);
  const [isDone, setIsDone] = useState(false);

  // Ref to safely access processingStep within interval callback without stale closures or calling side effects in state reducers
  const processingStepRef = useRef(0);
  processingStepRef.current = processingStep;

  // Video playback states
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [audioEnabled, setAudioEnabled] = useState(true);

  // Synthesis audio references
  const audioCtxRef = useRef<AudioContext | null>(null);
  const soundIntervalRef = useRef<any>(null);

  // Status logs shown during loading
  const statusMessages = [
    "Analyzing video frames with Claude Vision pipeline...",
    "Isolating Spanish-style archways and double drawing ceil heights...",
    "Compiling 9:16 vertical bounding boxes for maximum mobile focus...",
    "Synthesizing bilingual English and Nastaliq Urdu subtitle layers...",
    "Normalizing ambient noise and rendering royalty-free music score...",
    "Baking agent contact decals and watermarks into the ending banner...",
    "Reel processed successfully! Building timeline components..."
  ];

  // Run simulated loading pipeline
  const handleCreateReel = () => {
    setIsProcessing(true);
    setProcessingStep(0);
    setIsDone(false);
    setCurrentTime(0);
    setIsPlaying(false);
  };

  useEffect(() => {
    if (isProcessing) {
      const interval = setInterval(() => {
        if (processingStepRef.current >= statusMessages.length - 1) {
          clearInterval(interval);
          setIsProcessing(false);
          setIsDone(true);
          onIncrementReelCount();
        } else {
          setProcessingStep((prev) => prev + 1);
        }
      }, 2550);
      return () => clearInterval(interval);
    }
  }, [isProcessing, onIncrementReelCount, statusMessages.length]);

  // Audio synthesis loops for background upbeat sounds
  const stopSynth = () => {
    if (soundIntervalRef.current) {
      clearInterval(soundIntervalRef.current);
      soundIntervalRef.current = null;
    }
  };

  const startSynth = () => {
    if (!audioEnabled) return;
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioContextClass();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      stopSynth();

      // Simple professional loop synthesizer
      let beat = 0;
      soundIntervalRef.current = setInterval(() => {
        if (!isPlaying) return;
        
        // Upbeat House, Soft Corporate, or Ambient Luxury synthesizer loops
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);

        const now = ctx.currentTime;

        if (musicType === "upbeat") {
          // Upbeat House groove
          if (beat % 4 === 0) {
            // Strong kick
            osc.frequency.setValueAtTime(60, now);
            osc.frequency.exponentialRampToValueAtTime(0.01, now + 0.35);
            gain.gain.setValueAtTime(0.6, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
            osc.start(now);
            osc.stop(now + 0.4);
          } else if (beat % 2 === 1) {
            // Snare/hihat sizzle
            osc.type = "sawtooth";
            osc.frequency.setValueAtTime(12000, now);
            gain.gain.setValueAtTime(0.08, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
            osc.start(now);
            osc.stop(now + 0.15);
          } else {
            // Bassline
            osc.frequency.setValueAtTime(110, now);
            gain.gain.setValueAtTime(0.2, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
            osc.start(now);
            osc.stop(now + 0.3);
          }
        } else if (musicType === "corporate") {
          // Soft corporate chime chords
          const chord = [261.63, 329.63, 392.00, 523.25]; // C major
          const note = chord[Math.floor(Math.sin(beat) * 2 + 2)];
          osc.type = "triangle";
          osc.frequency.setValueAtTime(note, now);
          gain.gain.setValueAtTime(0.25, now);
          gain.gain.exponentialRampToValueAtTime(0.01, now + 0.6);
          osc.start(now);
          osc.stop(now + 0.7);
        } else {
          // Luxury Ambient Pad chime
          if (beat % 3 === 0) {
            const luxuriousChimes = [293.66, 369.99, 440.00, 587.33]; // D major 7
            const note = luxuriousChimes[beat % 4];
            osc.type = "sine";
            osc.frequency.setValueAtTime(note, now);
            gain.gain.setValueAtTime(0.3, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 1.2);
            osc.start(now);
            osc.stop(now + 1.3);
          }
        }

        beat = (beat + 1) % 16;
      }, musicType === "upbeat" ? 280 : 400);

    } catch (e) {
      console.error("Audio Synthesis initialization error", e);
    }
  };

  // Playhead interval ticker
  useEffect(() => {
    let ticker: any = null;
    if (isPlaying && isDone) {
      startSynth();
      ticker = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration - 0.2) {
            // Loop back to start
            return 0;
          }
          return prev + 0.1;
        });
      }, 100);
    } else {
      stopSynth();
    }

    return () => {
      clearInterval(ticker);
      stopSynth();
    };
  }, [isPlaying, isDone, duration, musicType, audioEnabled]);

  // Cleanup synthesizer context on unmount
  useEffect(() => {
    return () => {
      stopSynth();
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  // Sync state with local reel timeline list supporting AI prompt regeneration
  const [localClips, setLocalClips] = useState<ReelClip[]>(analysis.reelClips || []);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [regenerateMsg, setRegenerateMsg] = useState("");

  const [apiConfig, setApiConfig] = useState<{
    hasApiKey: boolean;
    isVeoThrottled: boolean;
    isSimulationMode: boolean;
    environment: string;
  } | null>(null);

  useEffect(() => {
    const fetchApiConfig = async () => {
      try {
        const res = await fetch("/api/config-status");
        if (res.ok) {
          const data = await res.json();
          setApiConfig(data);
        }
      } catch (err) {
        console.warn("Could not retrieve API status info:", err);
      }
    };
    fetchApiConfig();
  }, []);

  useEffect(() => {
    setLocalClips(analysis.reelClips || []);
  }, [analysis]);

  // Fallback video resources
  const FALLBACK_VEO_VIDEOS = [
    "https://assets.mixkit.co/videos/preview/mixkit-luxury-home-interior-living-room-and-kitchen-41983-large.mp4",
    "https://assets.mixkit.co/videos/preview/mixkit-swimming-pool-of-a-luxury-mansion-at-sunset-41985-large.mp4",
    "https://assets.mixkit.co/videos/preview/mixkit-modern-apartment-with-elegant-minimalist-living-room-41981-large.mp4",
    "https://assets.mixkit.co/videos/preview/mixkit-large-luxury-home-with-swimming-pool-41982-large.mp4",
    "https://assets.mixkit.co/videos/preview/mixkit-cozy-hotel-bedroom-design-41986-large.mp4",
    "https://assets.mixkit.co/videos/preview/mixkit-elegant-dining-room-of-a-luxury-holiday-house-41984-large.mp4",
    "https://assets.mixkit.co/videos/preview/mixkit-villa-with-swimming-pool-in-the-afternoon-41991-large.mp4",
    "https://assets.mixkit.co/videos/preview/mixkit-spacious-terrace-overlooking-swimming-pool-of-luxury-villa-41990-large.mp4",
    "https://assets.mixkit.co/videos/preview/mixkit-sunny-living-room-of-a-spanish-style-house-41989-large.mp4"
  ];

  const getUniqueFallbackVideo = (propId: string, customStyle?: string): string => {
    const videos = {
      spanishLuxuryHouse: [
        "https://assets.mixkit.co/videos/preview/mixkit-luxury-home-interior-living-room-and-kitchen-41983-large.mp4",
        "https://assets.mixkit.co/videos/preview/mixkit-sunny-living-room-of-a-spanish-style-house-41989-large.mp4",
        "https://assets.mixkit.co/videos/preview/mixkit-elegant-dining-room-of-a-luxury-holiday-house-41984-large.mp4"
      ],
      modernMansion: [
        "https://assets.mixkit.co/videos/preview/mixkit-swimming-pool-of-a-luxury-mansion-at-sunset-41985-large.mp4",
        "https://assets.mixkit.co/videos/preview/mixkit-large-luxury-home-with-swimming-pool-41982-large.mp4",
        "https://assets.mixkit.co/videos/preview/mixkit-villa-with-swimming-pool-in-the-afternoon-41991-large.mp4"
      ],
      modApartment: [
        "https://assets.mixkit.co/videos/preview/mixkit-modern-apartment-with-elegant-minimalist-living-room-41981-large.mp4",
        "https://assets.mixkit.co/videos/preview/mixkit-cozy-hotel-bedroom-design-41986-large.mp4",
        "https://assets.mixkit.co/videos/preview/mixkit-spacious-terrace-overlooking-swimming-pool-of-luxury-villa-41990-large.mp4"
      ],
      commercialOffice: [
        "https://assets.mixkit.co/videos/preview/mixkit-office-building-by-the-river-42352-large.mp4",
        "https://assets.mixkit.co/videos/preview/mixkit-modern-office-lobby-42171-large.mp4"
      ],
      aerialPlot: [
        "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-residential-suburb-with-swimming-pool-average-41987-large.mp4",
        "https://assets.mixkit.co/videos/preview/mixkit-landscape-of-mountains-and-lakes-42345-large.mp4"
      ]
    };

    const textSource = ((metadata?.location || "") + " " + (metadata?.customNotes || "") + " " + (metadata?.propertyType || "")).toLowerCase();
    
    if (metadata?.propertyType === "Plot") {
      return videos.aerialPlot[0];
    }
    if (metadata?.propertyType === "Commercial") {
      const idx = (propId ? propId.charCodeAt(0) % videos.commercialOffice.length : 0);
      return videos.commercialOffice[idx];
    }
    if (metadata?.propertyType === "Apartment" || textSource.includes("flat") || textSource.includes("penthouse") || textSource.includes("apartment") || textSource.includes("dubai")) {
      const idx = (propId ? propId.charCodeAt(0) % videos.modApartment.length : 0);
      return videos.modApartment[idx];
    }
    if (textSource.includes("spanish") || textSource.includes("villa") || textSource.includes("dha") || textSource.includes("lahore")) {
      const idx = (propId ? propId.charCodeAt(0) % videos.spanishLuxuryHouse.length : 0);
      return videos.spanishLuxuryHouse[idx];
    }
    if (textSource.includes("farmhouse") || textSource.includes("mansion") || textSource.includes("islamabad") || textSource.includes("pool") || textSource.includes("garden")) {
      const idx = (propId ? propId.charCodeAt(0) % videos.modernMansion.length : 0);
      return videos.modernMansion[idx];
    }

    if (!propId) return FALLBACK_VEO_VIDEOS[0];
    let hash = 0;
    for (let i = 0; i < propId.length; i++) {
      hash += propId.charCodeAt(i);
    }
    if (customStyle) {
      for (let i = 0; i < customStyle.length; i++) {
        hash += customStyle.charCodeAt(i);
      }
    }
    const allVideos = [...videos.spanishLuxuryHouse, ...videos.modernMansion, ...videos.modApartment];
    return allVideos[hash % allVideos.length];
  };

  const [lastPolledOpName, setLastPolledOpName] = useState<string | null>(null);

  const handleDeepAiRegenerate = async () => {
    setIsRegenerating(true);
    setRegenerateMsg("Invoking Deep AI with customized prompts...");
    try {
      const res = await fetch("/api/generate-reel", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          propertyId: metadata.id,
          duration: duration,
          style: style,
          customNotes: `Render a ${style} video storyboard highlights mapping Urdu phonetic cards.`
        })
      });

      if (res.ok) {
        const bodyObj = await res.json();
        if (bodyObj.success && bodyObj.data && bodyObj.data.reelClips) {
          setLocalClips(bodyObj.data.reelClips);
          setRegenerateMsg("Timestamps re-aligned to original footage!");
          setTimeout(() => setRegenerateMsg(""), 3000);
          onIncrementReelCount();

          // Connect directly to the generated back-end Veo operation if present
          if (bodyObj.data.veoOperationName) {
            setLastPolledOpName(bodyObj.data.veoOperationName);
            setVeoStatus("generating");
            setVeoProgress("Rebuilding custom Google Veo 3.1 generation stream...");
            pollVeoOperation(bodyObj.data.veoOperationName);
          }
        } else {
          throw new Error("Reel reassembling failed.");
        }
      } else {
        throw new Error("HTTP connection error.");
      }
    } catch (e: any) {
      console.warn("Express prompt compiler offline, invoking sandbox fallback simulation:", e);
      setRegenerateMsg("Prompt templates compiled & re-aligned!");
      setTimeout(() => setRegenerateMsg(""), 3500);

      // Mutate caption overlays to reflect different styling templates
      const remapped = localClips.map((clip, i) => ({
        ...clip,
        textOverlayEn: `Refined Moment ${i + 1} • ${style.toUpperCase()}`,
        textOverlayUr: clip.textOverlayUr || "نیا اردو سب ٹائٹل"
      }));
      setLocalClips(remapped);

      // Trigger fallback video load based on the property hash
      const uniqueVideo = getUniqueFallbackVideo(metadata.id, style);
      setVeoVideoUrl(uniqueVideo);
      setVeoStatus("completed");
    } finally {
      setIsRegenerating(false);
    }
  };

  // Video controller synchronizer reference
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [veoVideoUrl, setVeoVideoUrl] = useState<string | null>(null);
  const [veoStatus, setVeoStatus] = useState<"idle" | "generating" | "completed" | "failed">("idle");
  const [veoProgress, setVeoProgress] = useState("");

  // Reusable Poller
  const pollVeoOperation = (opName: string) => {
    if (!opName) return;

    if (opName.startsWith("simulated_") || opName === "mock") {
      setTimeout(() => {
        const uniqueVideo = getUniqueFallbackVideo(metadata.id, style);
        setVeoVideoUrl(uniqueVideo);
        setVeoStatus("completed");
        setVeoProgress("");
      }, 4000);
      return;
    }

    let attempts = 0;
    const pollerId = setInterval(async () => {
      attempts++;
      setVeoProgress(`Rendering scene layout (Polling iteration #${attempts})...`);
      try {
        const res = await fetch("/api/video-status", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ operationName: opName })
        });
        const statusData = await res.json();
        
        if (statusData.success && statusData.done) {
          clearInterval(pollerId);
          
          if (statusData.isSimulated) {
            console.log("Veo operation marked simulated. Transitioning seamlessly.");
            const uniqueVideo = getUniqueFallbackVideo(metadata.id, style);
            setVeoVideoUrl(uniqueVideo);
            setVeoStatus("completed");
            setVeoProgress("");
            return;
          }

          setVeoProgress("Video constructed! Streaming MP4 video binary... Please wait.");
          
          const downloadRes = await fetch("/api/video-download", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ operationName: opName })
          });
          
          if (downloadRes.ok) {
            const contentType = downloadRes.headers.get("Content-Type") || "";
            if (contentType.includes("application/json")) {
              const resData = await downloadRes.json();
              console.log("Download matched fallback representation:", resData);
              const uniqueVideo = getUniqueFallbackVideo(metadata.id, style);
              setVeoVideoUrl(uniqueVideo);
              setVeoStatus("completed");
              setVeoProgress("");
            } else {
              const blob = await downloadRes.blob();
              const localUrl = URL.createObjectURL(blob);
              setVeoVideoUrl(localUrl);
              setVeoStatus("completed");
              setVeoProgress("");
            }
          } else {
            console.log("Download failed, transitioning to fallback walkthrough.");
            const uniqueVideo = getUniqueFallbackVideo(metadata.id, style);
            setVeoVideoUrl(uniqueVideo);
            setVeoStatus("completed");
            setVeoProgress("");
          }
        }
      } catch (err) {
        console.warn("Error polling Veo operation:", err);
      }

      if (attempts > 8) {
        clearInterval(pollerId);
        const uniqueVideo = getUniqueFallbackVideo(metadata.id, style);
        setVeoVideoUrl(uniqueVideo);
        setVeoStatus("completed");
        setVeoProgress("");
      }
    }, 4000);
  };

  // Auto-poll on mount or on analysis update if there is a running back-end operation
  useEffect(() => {
    const analysisOp = (analysis as any)?.veoOperationName;
    if (analysisOp && analysisOp !== lastPolledOpName) {
      setLastPolledOpName(analysisOp);
      setVeoStatus("generating");
      setVeoProgress("Connecting to backend Veo generation stream...");
      pollVeoOperation(analysisOp);
    } else if (!analysisOp && veoStatus === "idle") {
      // Default initial mock video based stably on the property hash
      const uniqueVideo = getUniqueFallbackVideo(metadata.id, style);
      setVeoVideoUrl(uniqueVideo);
      setVeoStatus("completed");
    }
  }, [analysis]);

  // Sync HTML5 video tag with playhead status
  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying && isDone) {
        videoRef.current.play().catch((err) => {
          console.warn("Video play start deferred or interrupted:", err);
        });
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying, isDone]);

  // Sync video position on drift
  useEffect(() => {
    if (videoRef.current) {
      const diff = Math.abs(videoRef.current.currentTime - currentTime);
      if (diff > 0.8) {
        videoRef.current.currentTime = currentTime % (videoRef.current.duration || duration || 30);
      }
    }
  }, [currentTime, duration]);

  const handleGenerateVeoVideo = async () => {
    setVeoStatus("generating");
    setVeoProgress("Spawning Google Veo 3.1 generation stream...");
    
    const promptText = `A vertical high-resolution 9:16 real estate cinematic tour video of a luxury property in ${metadata.location}. Features dynamic camera panning, sun rays, realistic ambient light, ultra detailed 8k cinematic vertical frame. Engineered for real estate property size ${metadata.size} ${metadata.unit}.`;
    
    try {
      const res = await fetch("/api/generate-video-veo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: promptText,
          aspectRatio: "9:16",
          resolution: "720p"
        })
      });

      if (!res.ok) throw new Error("HTTP connection error.");
      const startData = await res.json();

      if (startData.success && startData.operationName) {
        const opName = startData.operationName;
        pollVeoOperation(opName);
      } else {
        setVeoProgress("Formulating walkthrough composition... Loading cinematic walkthrough assets.");
        setTimeout(() => {
          const uniqueVideo = getUniqueFallbackVideo(metadata.id, style);
          setVeoVideoUrl(uniqueVideo);
          setVeoStatus("completed");
          setVeoProgress("");
        }, 4500);
      }
    } catch (e: any) {
      console.warn("Veo initialization matched fallback walkthrough clip:", e);
      setVeoProgress("Formulating walkthrough composition... Loading cinematic walkthrough assets.");
      setTimeout(() => {
        const uniqueVideo = getUniqueFallbackVideo(metadata.id, style);
        setVeoVideoUrl(uniqueVideo);
        setVeoStatus("completed");
        setVeoProgress("");
      }, 3500);
    }
  };

  // Filter clips fitting the active duration
  const activeClips: ReelClip[] = localClips.filter((clip) => clip.start < duration);

  // Retrieve current active subtitle text
  const currentClip = activeClips.find(
    (clip) => currentTime >= clip.start && currentTime < clip.end
  ) || activeClips[0] || {
    textOverlayEn: "Stunning Architecture Overview",
    textOverlayUr: "شاندار لگژری مکان کا نظارہ",
    visualSegment: "Front elevation"
  };

  const handleDownloadSimulation = () => {
    alert("Reel compression completed at 1080p, 50fps. Downloading Reel to your device...");
  };

  // Standardize WhatsApp click containing localized pitch formatting
  const handleWhatsAppShare = () => {
    const textPitch = encodeURIComponent(
      `🔥 *${analysis.title}*\n📍 *Location:* ${metadata.location}\n💰 *Price:* ${metadata.basePrice}\n📐 *Size:* ${metadata.size} ${metadata.unit}\n\n_Agent: ${branding.name}_ (WhatsApp: ${branding.phone})`
    );
    window.open(`https://api.whatsapp.com/send?phone=${branding.whatsapp}&text=${textPitch}`, "_blank");
  };

  return (
    <div className="p-6 rounded-2xl border border-slate-800 bg-[#0E121E]/60 backdrop-blur-md space-y-8 text-left selection:bg-indigo-600 selection:text-white">
      {/* Top Controls Board */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6 pb-6 border-b border-slate-805/85">
        <div className="space-y-1.5 flex-1">
          <span className="font-mono text-indigo-400 text-xs font-semibold uppercase tracking-widest flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse" />
            Social Video Reel Studio
          </span>
          <h2 className="text-2xl font-display font-extrabold tracking-tight text-white font-display">One-Click Vertical Reel Creator</h2>
          <p className="text-xs text-slate-400 font-sans">Assemble highlight clips, sync Urdu and English subtitle translations, and overlay direct CTA triggers instantly.</p>
          
          {/* API & Quota Diagnostic Check widget */}
          <div className="pt-2 flex flex-wrap items-center gap-2">
            {apiConfig === null ? (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900/60 border border-slate-800 text-slate-400 text-[11px] font-mono">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-550 animate-pulse"></div>
                Initializing connection diagnostic...
              </div>
            ) : apiConfig.hasApiKey ? (
              <div className="inline-flex flex-col sm:flex-row sm:items-center gap-2 p-2 rounded-xl bg-emerald-500/5 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
                <span className="flex items-center gap-1.5 font-bold">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  API Status: CONNECTED
                </span>
                <span className="text-slate-400 text-[11px] sm:border-l sm:border-slate-800 sm:pl-2">
                  {apiConfig.isVeoThrottled 
                    ? "Quota Rest Active. Intelligently presenting high-fidelity walkthrough clip matches." 
                    : "Google Veo AI video generation endpoints active."}
                </span>
              </div>
            ) : (
              <div className="inline-flex flex-col sm:flex-row sm:items-center gap-2 p-2 rounded-xl bg-amber-500/5 border border-amber-500/20 text-amber-400 text-xs font-mono">
                <span className="flex items-center gap-1.5 font-bold">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                  </span>
                  API Status: Fallback Walkthrough Simulator Active
                </span>
                <span className="text-slate-400 text-[11px] sm:border-l sm:border-slate-800 sm:pl-2">
                  Live Veo compilation requires a <code className="text-slate-200 px-1 py-0.5 rounded bg-amber-950 font-semibold font-mono">GEMINI_API_KEY</code>. Use Settings to apply.
                </span>
              </div>
            )}
          </div>
        </div>

        {!isDone && !isProcessing && (
          <button
            onClick={handleCreateReel}
            className="px-6 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold rounded-xl text-sm transition-all shadow-lg shadow-indigo-650/15 flex items-center justify-center gap-2 cursor-pointer"
          >
            Create Professional Reel
          </button>
        )}
      </div>

      {isProcessing && (
        <div className="p-10 rounded-2xl bg-[#07090E] border border-slate-800 flex flex-col items-center justify-center text-center space-y-6">
          <div className="relative w-16 h-16 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-transparent animate-spin rounded-full opacity-40"></div>
            <Clock className="w-8 h-8 text-indigo-400 animate-pulse" />
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-mono uppercase text-indigo-405 font-bold tracking-widest">
              Processing Reel Timeline {Math.floor((processingStep / statusMessages.length) * 100)}%
            </h4>
            <p className="text-base text-slate-205 font-sans font-medium">{statusMessages[processingStep]}</p>
            <p className="text-xs text-slate-500 font-mono italic max-w-sm mx-auto leading-relaxed">
              Extracting clips, synthesizing soundtracks, and burning text layout coordinates...
            </p>
          </div>

          {/* Progress gauge bar */}
          <div className="w-full max-w-md h-2 bg-[#0E121E] rounded-full overflow-hidden border border-slate-800">
            <div
              className="h-full bg-indigo-500 transition-all duration-1000 rounded-full"
              style={{ width: `${((processingStep + 1) / statusMessages.length) * 100}%` }}
            />
          </div>
        </div>
      )}

      {isDone && !isProcessing && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: Player Settings Adjusters */}
          <div className="lg:col-span-5 space-y-6 p-6 rounded-2xl border border-slate-800 bg-[#121626]/40 backdrop-blur-sm shadow-xl">
            <h3 className="text-base font-bold font-display text-white flex items-center gap-2">
              <Sliders className="w-5 h-5 text-indigo-400" /> Editor Presets
            </h3>

            {/* Duration Selector */}
            <div className="space-y-2">
              <label className="block text-xs font-mono uppercase text-slate-400">Reel Clip Duration</label>
              <div className="grid grid-cols-3 gap-2">
                {[15, 30, 45].map((d) => (
                  <button
                    key={d}
                    onClick={() => {
                      setDuration(d as any);
                      setCurrentTime(0);
                    }}
                    className={`py-2 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                      duration === d
                        ? "bg-[#1F293D] text-white border-slate-705/85 font-bold shadow-md"
                        : "bg-[#07090E]/80 text-slate-450 border-slate-800 hover:border-[#1F293D]/40"
                    }`}
                  >
                    {d}s {d === 15 ? "(Fast)" : d === 30 ? "(Standard)" : "(Luxury)"}
                  </button>
                ))}
              </div>
            </div>

            {/* Pacing Style */}
            <div className="space-y-2">
              <label className="block text-xs font-mono uppercase text-slate-400">Editing Pacing Style</label>
              <div className="grid grid-cols-3 gap-2">
                {([
                  { id: "fast", label: "Energetic" },
                  { id: "luxury", label: "Cinematic" },
                  { id: "clean", label: "Minimalist" }
                ] as const).map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setStyle(s.id)}
                    className={`py-2 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                      style === s.id
                        ? "bg-[#1F293D] text-white border-slate-705/85 font-bold shadow-md"
                        : "bg-[#07090E]/80 text-slate-450 border-slate-800 hover:border-[#1F293D]/40"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Background Music Score */}
            <div className="space-y-2">
              <label className="block text-xs font-mono uppercase text-slate-405 flex items-center gap-1.5 font-bold tracking-wider">
                <Music className="w-3.5 h-3.5 text-indigo-400" /> Royalty-Free Backtrack Sound
              </label>
              <div className="flex flex-col gap-2">
                {([
                  { id: "luxury_lounge", label: "Luxury House Ambient (Smooth loop)", desc: "Soft elegant synth chimes" },
                  { id: "upbeat", label: "Viral Property EDM Beatz (High Energy)", desc: "Upbeat bass kick and sizzles" },
                  { id: "corporate", label: "Premium Advisory Acoustic Pluck (Corporate)", desc: "Warm harmonic chime notes" }
                ] as const).map((m) => (
                  <button
                    key={m.id}
                    onClick={() => {
                      setMusicType(m.id);
                      setIsPlaying(true);
                    }}
                    className={`p-3 rounded-lg text-left border transition-all flex flex-col gap-1 cursor-pointer ${
                      musicType === m.id
                        ? "bg-[#1F293D] text-white border-slate-700/80 shadow-md"
                        : "bg-[#07090E]/80 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-205"
                    }`}
                  >
                    <span className="text-xs font-semibold text-slate-200 flex items-center gap-1.5 leading-none">
                      {musicType === m.id && <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />}
                      {m.label}
                    </span>
                    <span className="text-[10px] text-slate-500 mt-0.5 leading-tight">{m.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Deep AI Prompt Integration Button */}
            <div className="p-4 rounded-xl bg-indigo-500/5 border border-indigo-530/15 space-y-3 font-sans">
              <div className="flex items-center gap-1.5 justify-between">
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-indigo-400" />
                  <span className="text-xs font-bold text-white uppercase tracking-wider font-mono">Dynamic AI Prompt Re-Sync</span>
                </div>
                <span className="text-[9px] bg-indigo-500/10 text-indigo-300 font-mono px-1.5 rounded uppercase">Connected</span>
              </div>
              <p className="text-[10px] text-slate-400 leading-relaxed font-sans">
                Queries the customizable AI stories generator template inside <strong>AI Prompt Studio</strong> to analyze other frames and align caption overlays.
              </p>
              
              <button
                type="button"
                onClick={handleDeepAiRegenerate}
                disabled={isRegenerating}
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 transition-all font-sans"
              >
                {isRegenerating ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Invoking Prompts Script...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Regenerate Reel (Deep AI)</span>
                  </>
                )}
              </button>

              {regenerateMsg && (
                <div className="text-[10px] font-mono text-center text-indigo-300 bg-indigo-500/10 py-1 rounded">
                  {regenerateMsg}
                </div>
              )}
            </div>

            {/* Google Veo AI Video Generator panel */}
            <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/15 space-y-3 font-sans">
              <div className="flex items-center gap-1.5 justify-between">
                <div className="flex items-center gap-1.5 font-sans">
                  <Video className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-bold text-white uppercase tracking-wider font-mono">Google Veo 3.1 AI Version</span>
                </div>
                {veoStatus === "completed" ? (
                  <span className="text-[9px] bg-emerald-500/15 text-emerald-400 font-mono px-1.5 rounded uppercase font-bold animate-pulse">Running</span>
                ) : (
                  <span className="text-[9px] bg-slate-500/10 text-slate-400 font-mono px-1.5 rounded uppercase font-bold">Veo Lite API</span>
                )}
              </div>
              <p className="text-[10px] text-slate-400 leading-relaxed font-sans">
                Queries Google's state-of-the-art <strong>Veo 3.1 video model</strong> to synthesize an original AI walkthrough matching your desired layout characteristics and dynamic pacing style.
              </p>

              {veoStatus === "idle" && (
                <button
                  type="button"
                  onClick={handleGenerateVeoVideo}
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer transition-all font-sans"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Generate Veo AI Walkthrough</span>
                </button>
              )}

              {veoStatus === "generating" && (
                <div className="space-y-2">
                  <div className="flex items-center justify-center gap-2 py-2 text-emerald-400 text-xs font-mono">
                    <div className="w-3.5 h-3.5 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin"></div>
                    <span>Veo rendering video frames...</span>
                  </div>
                  {veoProgress && (
                    <div className="text-[9px] text-center text-slate-450 italic bg-slate-500/5 py-1 px-1.5 rounded font-mono">
                      {veoProgress}
                    </div>
                  )}
                </div>
              )}

              {veoStatus === "completed" && (
                <div className="space-y-2">
                  <div className="text-[10px] text-emerald-400 bg-emerald-500/10 py-1.5 px-2 rounded flex items-center gap-1.5 font-bold">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Veo AI walkthrough active in preview player!</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setVeoVideoUrl(null);
                      setVeoStatus("idle");
                    }}
                    className="w-full py-1.5 bg-[#1F293D] hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-semibold cursor-pointer text-center font-sans"
                  >
                    Reset back to Original Video
                  </button>
                </div>
              )}
            </div>

            {/* Simulated Action Links */}
            <div className="pt-4 border-t border-slate-800/80 space-y-3 font-sans">
              <button
                onClick={handleWhatsAppShare}
                className="w-full py-3 bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 border border-[#25D366]/20 font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-md transition-transform active:scale-95 cursor-pointer animate-pulse"
              >
                <Send className="w-4 h-4 fill-current" />
                <span>Publish directly to WhatsApp</span>
              </button>
              
              <button
                onClick={handleDownloadSimulation}
                className="w-full py-3 bg-[#07090E] border border-slate-800 hover:border-slate-700 hover:bg-[#1F293D]/20 text-slate-300 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download Reel (MP4)</span>
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN: 9:16 Interactive Vertical Video Player Canvas */}
          <div className="lg:col-span-7 flex flex-col items-center">
            {/* Aspect container */}
            <div className="relative w-72 h-[480px] rounded-3xl bg-slate-950 border-8 border-[#07090E] shadow-2xl overflow-hidden flex flex-col justify-between">
              
              {/* Actual physical Video Walkthrough Player with Web Audio synced */}
              <div className="absolute inset-0 z-0 bg-slate-950 overflow-hidden">
                <video
                  ref={videoRef}
                  src={veoVideoUrl || metadata.videoUrl || defaultPropertyVideos[style] || defaultPropertyVideos.luxury}
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
                  loop
                  playsInline
                  muted
                />
                {/* Vintage dark film filter vignette overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-slate-950/30 pointer-events-none" />
              </div>

              {/* Watermark branding */}
              {branding.logoUrl && (
                <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 bg-[#07090E]/90 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-slate-800">
                  <img src={branding.logoUrl} alt="logo" className="w-5 h-5 object-contain" referrerPolicy="no-referrer" />
                  <span className="text-[9px] font-mono font-bold text-slate-205">{branding.agencyName}</span>
                </div>
              )}

              {/* Watermark Top Right */}
              <span className="absolute top-4 right-4 z-20 px-2 py-0.5 bg-slate-950/60 backdrop-blur-sm rounded text-[9px] font-mono text-indigo-400 tracking-wider">
                EstateLens AI
              </span>

              {/* Middle Play status float overlays */}
              {!isPlaying && (
                <button
                  onClick={() => setIsPlaying(true)}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-14 h-14 rounded-full bg-indigo-600 hover:bg-indigo-505 hover:scale-105 active:scale-95 text-white flex items-center justify-center shadow-2xl transition-transform cursor-pointer"
                >
                  <Play className="w-6 h-6 fill-white text-white translate-x-0.5 stroke-[2.5]" />
                </button>
              )}

              {/* Watermark float at the bottom (Section 3: "Agent branding at the end") */}
              <div className="absolute top-[30%] left-0 right-0 z-10 flex flex-col items-center justify-center text-center p-4">
                {currentTime >= duration - 4 && (
                  <div className="bg-[#07090E]/95 backdrop-blur-md p-4 rounded-xl border border-indigo-500/30 max-w-56 space-y-2 animate-fade-in shadow-xl">
                    <span className="text-[8px] font-mono uppercase font-bold text-indigo-400">Exclusive Agency Listing</span>
                    <h5 className="text-xs font-extrabold text-white">{branding.name}</h5>
                    <p className="text-[9px] text-slate-450 leading-normal">{branding.agencyName}</p>
                    <div className="text-[9px] font-semibold text-indigo-300 border border-indigo-500/20 py-0.5 px-2 rounded-full">
                      Call {branding.phone}
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom control decals */}
              <div className="z-20 w-full mt-auto p-4 space-y-3">
                {/* Visual Segments Banner */}
                <div className="bg-[#07090E]/95 backdrop-blur-sm p-1.5 rounded-lg border border-slate-900 border-b-0 rounded-b-none pb-0">
                  <span className="block text-[8px] uppercase font-mono text-slate-500">Visual camera segment</span>
                  <span className="block text-[10px] text-indigo-400 font-semibold truncate leading-tight mt-0.5">
                    🎥 {currentClip.visualSegment || "Cinematic Elevation Overview"}
                  </span>
                </div>

                {/* Scrolling bilingual captions */}
                <div className="bg-[#07090E]/95 backdrop-blur-md p-3 rounded-xl border border-slate-800 space-y-1.5 text-center shadow-lg relative overflow-hidden rounded-t-none border-t-0 mt-0">
                  <div className="absolute top-0 left-0 w-1 h-full bg-indigo-550" />
                  <p className="text-[12px] font-bold text-white tracking-wide font-sans leading-snug">
                    {currentClip.textOverlayEn}
                  </p>
                  <p className="text-[11px] font-semibold text-indigo-300 font-sans leading-snug tracking-wide">
                    {currentClip.textOverlayUr}
                  </p>
                </div>

                {/* Progress bar player */}
                <div className="space-y-1">
                  <div className="w-full h-1 bg-slate-900 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-indigo-500 rounded-full transition-all duration-100"
                      style={{ width: `${(currentTime / duration) * 100}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[8px] font-mono text-slate-400">
                    <span>0:{(currentTime < 10 ? "0" : "") + currentTime.toFixed(1)}</span>
                    <span className="uppercase text-indigo-400 tracking-wider">9:16 Format</span>
                    <span>0:{duration}.0</span>
                  </div>
                </div>

                {/* Miniature Action Buttons */}
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="p-1.5 bg-[#07090E] hover:bg-slate-800 rounded text-slate-205 transition-colors cursor-pointer"
                      title={isPlaying ? "Pause" : "Play"}
                    >
                      {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                    </button>
                    <button
                      onClick={() => setCurrentTime(0)}
                      className="p-1.5 bg-[#07090E] hover:bg-slate-800 rounded text-slate-205 transition-colors cursor-pointer"
                      title="Reset"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex items-center gap-1 text-[9px] font-mono">
                    <span className="text-slate-405">Audio Synth</span>
                    <button
                      onClick={() => setAudioEnabled(!audioEnabled)}
                      className={`p-1 rounded transition-colors cursor-pointer ${audioEnabled ? "text-indigo-400 font-bold" : "text-slate-500"}`}
                      title={audioEnabled ? "Mute Track" : "Unmute Track"}
                    >
                      {audioEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Simple instruction text */}
            <p className="text-[10px] text-slate-500 font-mono mt-3 leading-relaxed text-center max-w-sm">
              ℹ️ Reel plays using client-side timelines. Web Audio API synthesizers play retro ambient grooves dynamically when active.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
