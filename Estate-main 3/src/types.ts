export interface AgentBranding {
  logoUrl?: string;
  name: string;
  agencyName: string;
  phone: string;
  whatsapp: string;
  themeColor: "emerald" | "gold" | "cobalt" | "charcoal";
}

export type PropertyUnit = "marla" | "kanal" | "sqft" | "sqyd";
export type PropertyType = "House" | "Apartment" | "Commercial" | "Plot";
export type ReelStyle = "fast" | "luxury" | "clean";
export type LanguageOption = "English" | "Urdu" | "Bilingual";

export interface PropertyMetadata {
  id: string;
  videoUrl?: string;
  videoName?: string;
  propertyType: PropertyType;
  size: string;
  unit: PropertyUnit;
  location: string;
  basePrice: string;
  targetAudience: string;
  tone: "Luxury/Calm" | "Fast/Energetic" | "Corporate/Professional";
  language: LanguageOption;
  customNotes?: string;
  youtubeId?: string;
  createdAt: string;
}

export interface ReelClip {
  start: number;
  end: number;
  visualSegment: string;
  textOverlayEn: string;
  textOverlayUr: string;
}

export interface PropertySpecs {
  bedrooms: string;
  bathrooms: string;
  floors: string;
  estimatedPriceRange: string;
  facingDirection?: string;
  parkingCapacity?: string;
}

export interface ThumbnailSuggestions {
  headlineEn: string;
  headlineUr: string;
  badges: string[];
  focalPoints: string;
  recommendedStyle: string;
}

export interface GeminiAnalysisResult {
  title: string;
  portalListing: string;
  whatsappPitch: string;
  socialCaption: string;
  voiceover15s: string;
  voiceover30s: string;
  voiceover45s: string;
  redFlags: string[];
  specs: PropertySpecs;
  reelClips: ReelClip[];
  thumbnailSuggestions?: ThumbnailSuggestions;
  onScreenText?: { timestamp: string; text: string }[];
  detectedFeatures?: string[];
  analysisMode?: "video" | "context";
  veoOperationName?: string;
  veoPrompt?: string;
  veoVideoUrl?: string;
  veoStatus?: "idle" | "generating" | "completed" | "failed";
}

export interface PropertyMarketingPack {
  id: string;
  metadata: PropertyMetadata;
  analysis: GeminiAnalysisResult;
  branding: AgentBranding;
}

export interface UserState {
  isLoggedIn: boolean;
  email: string;
  tier: "free" | "pro" | "agency";
  reelsCreatedThisMonth: number;
}
