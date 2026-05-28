import { useState, useEffect } from "react";
import { UserState, AgentBranding, PropertyMarketingPack, PropertyMetadata, PropertyType } from "./types";
import LandingPage from "./components/LandingPage";
import Navbar from "./components/Navbar";
import UploadForm from "./components/UploadForm";
import AnalysisResults from "./components/AnalysisResults";
import Library from "./components/Library";
import BrandingSettings from "./components/BrandingSettings";
import PromptStudio from "./components/PromptStudio";

// High-polish preset properties to populate empty state on first launch
const INITIAL_PROPERTIES_PRESET: PropertyMarketingPack[] = [
  {
    id: "prop-preset-1",
    metadata: {
      id: "prop-preset-1",
      propertyType: "House",
      size: "10",
      unit: "marla",
      location: "Phase 6 DHA, Lahore",
      basePrice: "4.8 Crore PKR",
      targetAudience: "Overseas Pakistani Families looking for ready modern luxury homes",
      tone: "Luxury/Calm",
      language: "Bilingual",
      createdAt: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
    },
    branding: {
      name: "Mohammad Usman Lodhi",
      agencyName: "Elite Pillars PK",
      phone: "+92 300 1234567",
      whatsapp: "923001234567",
      themeColor: "emerald",
    },
    analysis: {
      title: "10 Marla Spanish Villa with Dual Lounge Ceiling",
      specs: {
        bedrooms: "5 Beds",
        bathrooms: "6 Baths",
        floors: "Double Story",
        estimatedPriceRange: "4.5 Crore - 5.0 Crore PKR",
        facingDirection: "Corner Corner (South-East)",
        parkingCapacity: "2 Sedan slots inside main gate",
      },
      portalListing: `**10 MARLA LUXURIOUS CORNER IN DHA PHASE 6 - SPANISH ARCHITECTURE INTRODUCED**

Elite Pillars PK proudly presents a ready-to-move signature luxury residence in the heart of Sector C, DHA Phase 6 Lahore. This 10 Marla residence has been customized by an award-winning architect incorporating rich Mediterranean Spanish elevations.

**Premium structural specs include:**
- 5 Luxury Bedrooms (all master styled with private attach walking cabinets)
- 6 High-End Imported Tile designer Washrooms equipped with double vanity basins
- Massive double ceiling height drawing and dining lounge maximizing sunlight infiltration
- Dual fully loaded kitchens (Main Spanish style open island + secondary greasy kitchen)
- Ash Wood woodwork and high grade solid concrete foundations 
- Private corner lawn overlooking 60ft arterial road

**زمین کی تفصیلات اور لوکیشن:**
یہ خوبصورت کونے کا مکان ڈی ایچ اے فیز 6 لاہور کے سب سے پرسکون اور ڈویلپڈ سیکٹر سیکٹر سی میں واقع ہے۔ یہاں سے مین روڈ، مارکیٹ، پارک اور جدید تعلیمی اداروں تک فوری باآسانی رسائی حاصل ہے۔ یہ مکان ان لوگوں کے لئے تیار کیا گیا ہے جو جدید ترین سہولیات اور پرسکون ماحول میں اپنے خاندان کے ساتھ رہنا چاہتے ہیں۔`,
      whatsappPitch: `🔥 *HOT OFF-MARKET: 10 MARLA CORNER SPANISH PLAZA IN DHA LAHORE* 🔥

Looking for an absolute masterpiece in DHA Phase 6? Skip the broker queues! This ready-to-move luxury home has just become available. 

📐 *Size:* 10 Marla (Corner plot facing 60ft wide road)
📍 *Location:* Sector C, DHA Phase 6 Lahore
💰 *Asking Price:* 4.8 Crore PKR (Negotiable for cash buyers)

*Core Highlights:*
✅ 5 Master Bedrooms with integrated modern wardrobes
✅ Double height ceiling lounge with Italian chandeliers
✅ Spanish customized open main kitchen with built-in appliances
✅ Beautiful corner layout with private garden space

*کونے کا خوبصورت ترین ڈیزائن والا لگژری مکان* - فوری پوزیشن اور قانونی کاغذات کی مکمل تصدیق شدہ دستاویزات۔

🎬 _Watch 9:16 Vertical Reel directly inside our channel._

DM for scheduling private viewing tours:
📞 *Call Agent:* Mohammad Usman Lodhi (+92 300 1234567)
💬 *WhatsApp direct:* http://wa.me/923001234567`,
      socialCaption: `Masterful architecture meets premium Mediterranean elevation in DHA Phase 6 Lahore! ✨ Checking out this stunning 10 Marla corner villa complete with massive double-height lounge ceilings, ash wood fixtures, and custom dual open kitchens. 

🔑 Price Guide: 4.8 Crore PKR 
📍 Location: DHA Phase 6 Lahore

Tag someone who is looking to invest in DHA! DM us directly to book a private tour guide. 

#DHALahore #LuxuryRealEstate #LahoreProperties #ZameenPk #PakistanProperty #RealEstateAgent #ModernArchitecture #SpanishVilla`,
      voiceover15s: `[0:00 - 0:05] Visual: Wide drone sweeping drone facad of the Spanish corner. Text: "Mediterranean masterpiece in DHA 6" Narration: "Looking for absolute luxury? Behold this 10 Marla Spanish Villa!"
[0:05 - 0:10] Visual: Dual lounge lights shimmering. Text: "Double height ceiling lounge" Narration: "With massive double height lounge ceilings and solid Turkish tiles!"
[0:10 - 0:15] Visual: Spanish island kitchen with white marble. Text: "Asking 4.8 Crore PKR | Call Now" Narration: "Corner plot facing DHA's premium sector. Calling all buyers - DM now!"`,
      voiceover30s: `[0:00 - 0:08] Visual: Camera panning from wide gate into the Spanish tile courtyard. Text: "Corner Spanish Home DHALahore" Narration: "Looking for an absolute signature home? Step inside this ready-to-move Spanish villa in Sector C DHA Phase 6!"
[0:08 - 0:16] Visual: Living room double lounge with warm orange hanging lanterns. Text: "Italian Chandeliers Installed" Narration: "The double height main lounge is flooded with organic sunlight, pairing solid wood accents with imported marble."
[0:16 - 0:24] Visual: Chef style kitchen island showing gold fixtures. Text: "Custom open cooking island" Narration: "It features dual custom kitchens, master suites with marble vanity baths, and an amazing corner landscape."
[0:24 - 0:30] Visual: End card with branding details. Text: "Owner requesting 4.8 Crore PKR. Call us today!" Narration: "Listing is asking 4.8 Crore PKR. Hit the link below to coordinate your physical tour immediately!"`,
      voiceover45s: `[0:00 - 0:10] Visual: Slow high-contrast slider from garden patio to front elevation. Text: "10 Marla Spanish Design DHA Phase 6" Narration: "Welcome to Elite Pillars PK. Today, we are taking a tour of this ready modern Spanish elevation House in Lahore's most prestigious sector Phase 6 DHA."
[0:10 - 0:22] Visual: Floating camera entering the double heights wood ceiling drawing area. Text: "Double height drawing room ceiling" Narration: "The property features a corner structure with extra security coverage, ash wood custom woodwork, and direct access from the dual outer road intersections."
[0:22 - 0:35] Visual: Master bedding with elegant accent panels. Text: "5 Luxury Master Bedroom Suites" Narration: "You enjoy 5 grand master suites with customized wardrobes, integrated heating, and imported double-glazed structural windows, providing complete soundproofing."
[0:35 - 0:45] Visual: Contact card scrolling. Text: "Elite Pillars PK • mohammad usman lodhi (+923001234567)" Narration: "Owner guide price is set at 4.8 Crore PKR with legal deeds verified. Shoot a direct message on WhatsApp or call today for slot reservations."`,
      redFlags: [
        "Check concrete dampness/plaster bubbling along the basement floor corner joints (DHA Islamabad & Lahore water drainage issues).",
        "Verify water pressure levels at the master bath second story shower during high load morning sequences.",
        "Check load management setup and gas pressure status (verify main line gas pipelines or LPG reserve setup status).",
        "Assess property facing direction (ensure corner South-East sun orientation works comfortably during PK peak summer).",
        "Inspect electrical circuit boxes (verify double phase or three phase main line copper distribution quality).",
        "Verify original allotment files, possession letter, and CDC transfers with local DHA administration office direct."
      ],
      reelClips: [
        { start: 0, end: 5, visualSegment: "Wide exterior drone facad sweep", textOverlayEn: "Mediterranean masterpiece in DHA Phase 6", textOverlayUr: "ڈی ایچ اے فیز 6 لاہور کا شاہکار" },
        { start: 5, end: 10, visualSegment: "Slow vertical slider entering kitchen island", textOverlayEn: "Modern Spanish custom island kitchen", textOverlayUr: "جدید ہسپانوی اوپن کچن" },
        { start: 10, end: 15, visualSegment: "Low pan of double level drawing room layout", textOverlayEn: "Double height open lounge ceiling", textOverlayUr: "ڈبل اونچائی والا لاؤنج ہال" },
        { start: 15, end: 20, visualSegment: "Camera focusing on gold shower fittings", textOverlayEn: "5 Bedrooms luxury wet-room vanity baths", textOverlayUr: "5 لگژری خوابگاہیں مع اٹیچ باتھ روم" },
        { start: 20, end: 25, visualSegment: "View from corner garden overwide arterial road", textOverlayEn: "Corner plot premium road access", textOverlayUr: "کونے کا مکان مع لان" },
        { start: 25, end: 30, visualSegment: "End page of agent card and CTA", textOverlayEn: "Price: 4.8 Crore PKR. Call us today!", textOverlayUr: "رابطہ کریں: محمد عثمان لودھی" }
      ]
    }
  },
  {
    id: "prop-preset-2",
    metadata: {
      id: "prop-preset-2",
      propertyType: "Apartment",
      size: "1850",
      unit: "sqft",
      location: "Dubai Marina Gateway, Dubai",
      basePrice: "2.5 Million AED",
      targetAudience: "International Real Estate Investors & Luxury Seekers",
      tone: "Corporate/Professional",
      language: "English",
      createdAt: new Date(Date.now() - 3 * 24 * 3600 * 1000).toISOString(),
    },
    branding: {
      name: "Sarah Mansoor Advisors",
      agencyName: "Gulf Prime Properties",
      phone: "+971 50 1234567",
      whatsapp: "971501234567",
      themeColor: "gold",
    },
    analysis: {
      title: "3 Bedroom High-Rise Overlooking Dubai Yacht Harbor",
      specs: {
        bedrooms: "3 Master Beds",
        bathrooms: "4 luxury Baths",
        floors: "45th Floor Unit",
        estimatedPriceRange: "2.4 Million - 2.7 Million AED",
        facingDirection: "Full West Panoramic Marina Facing",
        parkingCapacity: "2 basement reserved spaces",
      },
      portalListing: `**STUNNING 3 BEDROOM APARTMENT IN DUBAI MARINA WITH PANORAMIC HARBOR VIEW**

Gulf Prime Properties is delighted to launch this premium high-rise 3-bedroom residence on the 45th floor of Marina Gateway Tower, Dubai. Spanned over an expansive 1,850 Sq. Ft., this corner layout offers unmatched, floor-to-ceiling panoramic views of the luxury Yacht Marina.

**Excellent Key Amenities:**
- 3 Ensuite Master Bedrooms with custom wooden flooring 
- Oversized glass-paneled terrace ideal for evening lounges
- Fully built-in gourmet kitchen with upscale German appliances
- Multi-tier advanced security controls with smart electronic lock codes
- Instant walking access to the metro line, Dubai Marina Mall, and ocean beachfront

Ideal cash investment returning strong positive rental yield above 8.5% with premium capital appreciation trends. Clean title deeding and title papers fully cleared for international buyers.`,
      whatsappPitch: `🌴 *DUBAI MARINA MASTERPIECE: 3 BED CORNER HIGHLIGHT* 🌴

On the hunt for a high-yield prime investment overlooking Dubai Yacht Harbor? Check out this luxury residence!

📐 *Unit Size:* 1,850 Sq. Ft. (45th Floor high corner)
📍 *Location:* Marina Gateway Tower, Dubai Marina, UAE
💰 *Investment:* 2.5 Million AED (8.5% potential rental yield)

*Core Highlights:*
✨ Fully panoramic ocean & harbor floor-to-ceiling glass
✨ 3 Master Bedrooms with solid timber finishes
✨ Large viewing terrace deck
✨ Steps from Dubai Marina Mall & beachfront dining

🎬 _Watch our 9:16 vertical overview directly inside._

DM for VIP inspections and payment plans:
📞 *Call Advisor:* Sarah Mansoor (+971 50 1234567)
💬 *WhatsApp link:* http://wa.me/971501234567`,
      socialCaption: `Live the ultra-luxury dream overlooking the iconic Dubai Marina Yacht Harbor! 🛥️ Entering this magnificent 3 Bedroom corner apartment situated on the 45th floor of Marina Gateway Tower. Complete with German amenities, private deck, and sunset panoramas.

🔑 Listed at: 2.50 Million AED
⭐ Ideal for premium holiday homes or clean rental portfolios.

DM us now to arrange your private luxury tour! 

#DubaiMarina #DubaiProperties #LuxuryApartments #GulfRealEstate #InvestInDubai #DubaiMarinaYachtClub #SarahMansoorAdvisors`,
      voiceover15s: `[0:00 - 0:05] Visual: Full landscape panning over Dubai Yacht Marina. Text: "Views of Dubai Marina Yacht Harbor" Narration: "Wake up to Yacht views in this exceptional Dubai Marina corner unit!"
[0:05 - 0:10] Visual: Modern glass deck with white couches. Text: "45th Floor Sunsets" Narration: "Enjoy panoramic 45th-floor sunset decks and luxury marble finishes."
[0:10 - 0:15] Visual: Gourmet grey kitchen layout. Text: "2.5M AED | DM for Payment Plans" Narration: "Asking 2.5 Million AED. Clean title cleared. DM now for VIP scheduling!"`,
      voiceover30s: `[0:00 - 0:08] Visual: Camera floating through high-rise ceiling of the living room. Text: "Dubai Marina Gateway Corner unit" Narration: "Welcome to Dubai Marina Gateway Tower. Step inside this stunning 1,850 Sq. Ft. corner apartment on the 45th floor!"
[0:08 - 0:16] Visual: Glass balcony slide shot looking down over Yachts. Text: "Panoramic harbor views" Narration: "Wake up to infinite ocean sunset rays and panoramic layouts overlooking Dubai's premier yacht club."
[0:16 - 0:24] Visual: Chef oven showing automated controls. Text: "Premium built-in German appliances" Narration: "It boasts three ensuite bedrooms, an open plan German gourmet kitchen, and immediate metro access."
[0:24 - 0:30] Visual: End frame detailing contact information. Text: "Listed at 2.5 Million AED • PM us today!" Narration: "Priced at 2.5 Million AED. International buyers welcome. Click below to schedule a call!"`,
      voiceover45s: `[0:00 - 0:10] Visual: Clean slider from lobby to the high floor master balcony. Text: "Marina Gateway Residence, Dubai Marina" Narration: "Welcome to Gulf Prime Properties. Today, we are taking a tour of this magnificent 45th floor master-unit residence overlooking Dubai Yacht Club."
[0:10 - 0:22] Visual: Master bedding with elegant accent panels. Text: "3 ensuite beds with timber floors" Narration: "Spread over 1,850 Sq. Ft., this corner layout offers floor-to-ceiling glass paneling, full acoustic double-glazing, and built-in premium timber accents."
[0:22 - 0:35] Visual: Open kitchen with clean grey cabinetry. Text: "Fully fitted German chef style layouts" Narration: "The custom chef's kitchen features built-in premium German fixtures, seamless soft close cabinetry, and elegant task lighting perfect for luxury hosting."
[0:35 - 0:45] Visual: Contact info and WA link logo. Text: "Listed at 2.5 Million AED. Call Sarah Mansoor (+971501234567)" Narration: "Priced at 2.5 Million AED, with ready title deeds. Get in touch with Sarah Mansoor Advisors right away to schedule private viewings."`,
      redFlags: [
        "Verify building maintenance/chiller fees structure (typical yearly chiller bill estimations inside Marina Gate sectors).",
        "Check balcony glass safety locks and wind load pressure levels during sandy afternoon storms.",
        "Inspect electrical circuit boxes (verify smart home automation integrations and dual central cooling thermostat boards).",
        "Verify parking accessibility (check tight layout spots in basement parking level negative-2).",
        "Confirm title deed allocation details with international property registry system inside Dubai Land Department."
      ],
      reelClips: [
        { start: 0, end: 5, visualSegment: "Panoramic sliding sweep of Marina harbor", textOverlayEn: "Panoramic sunset views of Dubai Marina Overlook", textOverlayUr: "دبئی مرینا اور خوبصورت جزیرے کا نظارہ" },
        { start: 5, end: 10, visualSegment: "Glass balcony slider view in sunset", textOverlayEn: "Oversized structural glass balcony terrace", textOverlayUr: "وسیع و عریض شیشے والی بالکونی" },
        { start: 10, end: 15, visualSegment: "German chef design kitchen and counter layout", textOverlayEn: "Built-in premium fitted German appliances", textOverlayUr: "جدید جرمن طرز کا اوپن کچن" },
        { start: 15, end: 20, visualSegment: "Master bedroom suite with premium timber floorboards", textOverlayEn: "3 Grand master bedrooms with solid wood flooring", textOverlayUr: "3 کشادہ بیڈ روم مع لکڑی کے فرش" },
        { start: 20, end: 25, visualSegment: "Lounge foyer overview showing ambient lamps", textOverlayEn: "45th Floor luxury high-rise layout", textOverlayUr: "45ویں منزل پر واقع لگژری اپارٹمنٹ" },
        { start: 25, end: 30, visualSegment: "Contact details and ending call-out graphics", textOverlayEn: "2.5M AED - DM Sarah Mansoor Advisors now!", textOverlayUr: "ہم سے رابطہ کریں: سارہ منصور ایڈوائزرز" }
      ]
    }
  }
];

export default function App() {
  const [currentPage, setCurrentPage] = useState<"marketing" | "app">("marketing");
  const [user, setUser] = useState<UserState>({
    isLoggedIn: false,
    email: "",
    tier: "free",
    reelsCreatedThisMonth: 0,
  });

  const [branding, setBranding] = useState<AgentBranding>({
    name: "Mohammad Usman Lodhi",
    agencyName: "Elite Pillars PK",
    phone: "+92 300 1234567",
    whatsapp: "923001234567",
    themeColor: "emerald",
  });

  const [activeTab, setActiveTab] = useState<"analyze" | "library" | "branding">("analyze");
  const [properties, setProperties] = useState<PropertyMarketingPack[]>(INITIAL_PROPERTIES_PRESET);
  const [activeProductPack, setActiveProductPack] = useState<PropertyMarketingPack | null>(INITIAL_PROPERTIES_PRESET[0]);

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyzingProgressMessage, setAnalyzingProgressMessage] = useState("");
  const [analysisError, setAnalysisError] = useState<string | null>(null);

  // Sync state with relational JSON database on startup with local session fallback
  useEffect(() => {
    const savedUser = localStorage.getItem("estatelens_user");
    if (savedUser) {
      try {
        const u = JSON.parse(savedUser);
        setUser(u);
        setCurrentPage("app");
      } catch (e) {}
    }

    // Live Query Database
    const syncDb = async () => {
      try {
        const propRes = await fetch("/api/properties");
        if (propRes.ok) {
          const propsData = await propRes.json();
          if (propsData.success && propsData.data && propsData.data.length > 0) {
            setProperties(propsData.data);
            setActiveProductPack(propsData.data[0]);
          }
        }

        const brandRes = await fetch("/api/branding");
        if (brandRes.ok) {
          const brandData = await brandRes.json();
          if (brandData.success && brandData.data) {
            setBranding(brandData.data);
          }
        }
      } catch (e) {
        console.warn("Express APIs offline, fallback to localized storage matrices:", e);
        const savedBranding = localStorage.getItem("estatelens_branding");
        const savedProperties = localStorage.getItem("estatelens_properties_v2");
        if (savedBranding) {
          try { setBranding(JSON.parse(savedBranding)); } catch (err) {}
        }
        if (savedProperties) {
          try {
            const parsedProps = JSON.parse(savedProperties);
            setProperties(parsedProps);
            setActiveProductPack(parsedProps[0] || null);
          } catch (err) {}
        }
      }
    };

    syncDb();
  }, []);

  const handleLogin = (email: string, isSignUp: boolean) => {
    const newUser: UserState = {
      isLoggedIn: true,
      email,
      tier: isSignUp ? "pro" : "free", // Sign up defaults to Pro for awesome rich preview testing!
      reelsCreatedThisMonth: isSignUp ? 1 : 0,
    };
    setUser(newUser);
    localStorage.setItem("estatelens_user", JSON.stringify(newUser));
    setCurrentPage("app");

    // Adjust default branding for prefilled profile names as requested
    if (email.includes("sarah") || email.includes("dubai")) {
      const defaultSarah: AgentBranding = {
        name: "Sarah Mansoor Advisors",
        agencyName: "Gulf Prime Properties",
        phone: "+971 50 1234567",
        whatsapp: "971501234567",
        themeColor: "gold",
      };
      setBranding(defaultSarah);
      localStorage.setItem("estatelens_branding", JSON.stringify(defaultSarah));
    } else if (email.includes("awan") || email.includes("dha")) {
      const defaultAwan: AgentBranding = {
        name: "Mohammad Usman Lodhi",
        agencyName: "Elite Pillars PK",
        phone: "+92 300 1234567",
        whatsapp: "923001234567",
        themeColor: "emerald",
      };
      setBranding(defaultAwan);
      localStorage.setItem("estatelens_branding", JSON.stringify(defaultAwan));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("estatelens_user");
    setUser({ isLoggedIn: false, email: "", tier: "free", reelsCreatedThisMonth: 0 });
    setCurrentPage("marketing");
    setActiveTab("analyze");
  };

  const handleSaveBranding = async (newBranding: AgentBranding) => {
    setBranding(newBranding);
    localStorage.setItem("estatelens_branding", JSON.stringify(newBranding));
    try {
      await fetch("/api/branding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBranding)
      });
    } catch (e) {
      console.warn("Failed syncing branding to database", e);
    }
  };

  const handleUpgradeTier = (newTier: "free" | "pro" | "agency") => {
    const upgradedUser = { ...user, tier: newTier };
    setUser(upgradedUser);
    localStorage.setItem("estatelens_user", JSON.stringify(upgradedUser));
  };

  const handleIncrementReelCount = () => {
    const updated = { ...user, reelsCreatedThisMonth: user.reelsCreatedThisMonth + 1 };
    setUser(updated);
    localStorage.setItem("estatelens_user", JSON.stringify(updated));
  };

  const handleDeleteProperty = async (id: string) => {
    const updated = properties.filter((p) => p.id !== id);
    setProperties(updated);
    localStorage.setItem("estatelens_properties_v2", JSON.stringify(updated));
    if (activeProductPack?.id === id) {
      setActiveProductPack(updated[0] || null);
    }
    try {
      await fetch(`/api/properties/${id}`, {
        method: "DELETE"
      });
    } catch (e) {
      console.warn("Failed physically deleting from database", e);
    }
  };

  // Central Gemini API request router
  const handleAnalyzeStart = async (metadataIn: Omit<PropertyMetadata, "id" | "createdAt">, file?: File) => {
    setIsAnalyzing(true);
    setAnalysisError(null);
    setAnalyzingProgressMessage(file ? "Uploading video to Gemini for analysis..." : "Generating listing from your details...");

    const id = "prop-" + Date.now();
    const isYouTube = !file && metadataIn.videoUrl && (metadataIn.videoUrl.includes("youtube.com") || metadataIn.videoUrl.includes("youtu.be"));

    const preparedMetadata: PropertyMetadata = {
      ...metadataIn,
      id,
      // A local object URL is only used for the in-app preview thumbnail.
      videoUrl: file ? URL.createObjectURL(file) : metadataIn.videoUrl,
      createdAt: new Date().toISOString(),
    };

    // Cycle through loader steps for dynamic feedback
    const messageInterval = setInterval(() => {
      const phrases = file
        ? [
            "Watching the walkthrough frame by frame...",
            "Reading on-screen text & price overlays...",
            "Detecting rooms, layout and finishes...",
            "Marking the strongest reel moments...",
            "Writing bilingual scripts & captions...",
          ]
        : [
            "Structuring portal listing...",
            "Drafting WhatsApp pitch...",
            "Writing social caption & hashtags...",
            "Building reel storyboard...",
          ];
      setAnalyzingProgressMessage(phrases[Math.floor(Math.random() * phrases.length)]);
    }, 3000);

    try {
      let response: Response;

      if (file) {
        // REAL video upload: send the actual bytes as multipart/form-data.
        const form = new FormData();
        form.append("video", file, file.name);
        form.append("id", id);
        form.append("propertyType", metadataIn.propertyType);
        form.append("size", metadataIn.size);
        form.append("unit", metadataIn.unit);
        form.append("location", metadataIn.location);
        form.append("basePrice", metadataIn.basePrice);
        form.append("targetAudience", metadataIn.targetAudience);
        form.append("tone", metadataIn.tone);
        form.append("language", metadataIn.language);
        if (metadataIn.customNotes) form.append("customNotes", metadataIn.customNotes);
        // NOTE: do not set Content-Type; the browser sets the multipart boundary.
        response = await fetch("/api/analyze-video", { method: "POST", body: form });
      } else if (isYouTube) {
        response = await fetch("/api/analyze-youtube", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            youtubeUrl: metadataIn.videoUrl,
            propertyType: metadataIn.propertyType,
            size: metadataIn.size,
            unit: metadataIn.unit,
            location: metadataIn.location?.includes("Identifying") ? "" : metadataIn.location,
            basePrice: metadataIn.basePrice?.includes("Fetching") ? "" : metadataIn.basePrice,
            targetAudience: metadataIn.targetAudience,
            tone: metadataIn.tone,
            language: metadataIn.language,
            customNotes: metadataIn.customNotes,
          }),
        });
      } else {
        // No video at all: context-only generation.
        response = await fetch("/api/analyze-video", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(preparedMetadata),
        });
      }

      clearInterval(messageInterval);

      const resData = await response.json().catch(() => ({ success: false, message: "Unexpected server response." }));

      if (!response.ok || !resData.success || !resData.data) {
        throw new Error(resData.message || `Analysis failed (HTTP ${response.status}).`);
      }

      {
        const completedPack: PropertyMarketingPack = {
          id: resData.metadata?.id || id,
          metadata: { ...preparedMetadata, ...(resData.metadata || {}), videoUrl: preparedMetadata.videoUrl || resData.metadata?.videoUrl },
          branding: { ...branding },
          analysis: resData.data,
        };

        const updatedList = [completedPack, ...properties];
        setProperties(updatedList);
        localStorage.setItem("estatelens_properties_v2", JSON.stringify(updatedList));
        setActiveProductPack(completedPack);
        setIsAnalyzing(false);
      }

    } catch (e: any) {
      clearInterval(messageInterval);
      console.error("Analysis failed:", e);
      const msg = String(e?.message || "");
      let friendly = msg;
      if (msg.includes("503") || msg.toLowerCase().includes("not configured") || msg.toLowerCase().includes("api key")) {
        friendly = "The server is missing its GEMINI_API_KEY. Add it to your environment (see .env.example) and restart, then try again.";
      } else if (msg.toLowerCase().includes("public") || msg.includes("502")) {
        friendly = "Gemini could not analyse that video. If it is a YouTube link, make sure the video is public (not private or unlisted).";
      } else if (!friendly) {
        friendly = "Something went wrong during analysis. Please try again.";
      }
      setAnalysisError(friendly);
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-955">
      {currentPage === "marketing" ? (
        <LandingPage
          onStartDemo={() => {
            handleLogin("awan.lodhi@dhapakistan.com", false); // Default to trial awan lodhi account to jump right in
          }}
          onLogin={handleLogin}
        />
      ) : (
        <div className="flex flex-col flex-1">
          {/* Header Nav */}
          <Navbar
            user={user}
            branding={branding}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onLogout={handleLogout}
          />

          {/* Subview router */}
          <main className="flex-1 bg-slate-950 text-slate-100 relative print:bg-white print:text-slate-900">
            {/* Background glowing particles, hidden during printing */}
            <div className="absolute top-0 right-10 w-96 h-96 bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none no-print" />
            <div className="absolute top-[500px] left-10 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none no-print" />

            {activeTab === "analyze" && (
              <div className="space-y-8 no-print">
                {activeProductPack ? (
                  // If we have an active analyzed property, show results. Provide button to run a clean new analysis.
                  <div>
                    <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center bg-slate-900/10 border-b border-slate-900">
                      <span className="text-xs text-slate-400 font-mono">
                        Viewing campaign assets for: <strong className="text-emerald-400">{activeProductPack.analysis.title}</strong>
                      </span>
                      <button
                        onClick={() => {
                          setActiveProductPack(null); // Unsetting shows the input parameters form
                        }}
                        className="px-4 py-2 bg-slate-900 border border-slate-800 hover:border-slate-700 hover:bg-slate-800 rounded-xl text-xs text-slate-300 font-bold transition-all"
                      >
                        + Analyze New Video
                      </button>
                    </div>

                    <AnalysisResults
                      pack={activeProductPack}
                      onIncrementReelCount={handleIncrementReelCount}
                    />
                  </div>
                ) : (
                  <UploadForm
                    onAnalyzeStart={handleAnalyzeStart}
                    isAnalyzing={isAnalyzing}
                    analyzingProgressMessage={analyzingProgressMessage}
                    analysisError={analysisError}
                  />
                )}
              </div>
            )}

            {activeTab === "library" && (
              <div className="no-print">
                <Library
                  properties={properties}
                  onSelectProperty={(pack) => {
                    setActiveProductPack(pack);
                    setActiveTab("analyze");
                  }}
                  onDeleteProperty={handleDeleteProperty}
                />
              </div>
            )}

            {activeTab === "branding" && (
              <div className="no-print">
                <BrandingSettings
                  user={user}
                  branding={branding}
                  onSaveBranding={handleSaveBranding}
                  onUpgradeTier={handleUpgradeTier}
                />
              </div>
            )}

            {activeTab === "prompts" && (
              <div className="no-print">
                <PromptStudio />
              </div>
            )}

            {/* Print View Layer - Always rendered separately for print commands */}
            {activeTab === "analyze" && activeProductPack && (
              <div className="print-only hidden print:block bg-white p-0">
                <style dangerouslySetInnerHTML={{__html: `
                  @media print {
                    .no-print, nav, header, footer, button, .no-print * {
                      display: none !important;
                    }
                    .print-only {
                      display: block !important;
                      width: 100% !important;
                      background-color: white !important;
                      color: black !important;
                    }
                  }
                `}} />
                <div className="p-8 font-sans bg-white text-slate-950">
                  <div className="border-b-4 pb-6 min-h-24 flex justify-between items-start border-slate-300">
                    <div>
                      <span className="font-mono text-[9px] uppercase px-2 py-0.5 bg-slate-900 font-bold text-white rounded">Property Briefing Record</span>
                      <h2 className="text-xl font-serif font-extrabold text-slate-900 mt-2">{activeProductPack.analysis.title}</h2>
                      <p className="text-xs text-slate-500 mt-1">📍 {activeProductPack.metadata.location}</p>
                    </div>
                    <div className="text-right">
                      <h3 className="text-base font-extrabold">{activeProductPack.branding.agencyName}</h3>
                      <p className="text-xs text-slate-500">Responsible Advisor: {activeProductPack.branding.name}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-4 mt-6">
                    <div className="p-4 bg-slate-50 rounded-lg border border-slate-100 flex flex-col">
                      <span className="text-[9px] font-mono uppercase text-slate-400">Asking Price</span>
                      <span className="text-xs font-bold text-slate-900">{activeProductPack.metadata.basePrice}</span>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-lg border border-slate-100 flex flex-col">
                      <span className="text-[9px] font-mono uppercase text-slate-400">Total Size</span>
                      <span className="text-xs font-bold text-slate-900 capitalize">{activeProductPack.metadata.size} {activeProductPack.metadata.unit}</span>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-lg border border-slate-100 flex flex-col">
                      <span className="text-[9px] font-mono uppercase text-slate-400">Bedrooms / Baths</span>
                      <span className="text-xs font-bold text-slate-900">{activeProductPack.analysis.specs.bedrooms} Beds / {activeProductPack.analysis.specs.bathrooms} Baths</span>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-lg border border-slate-100 flex flex-col">
                      <span className="text-[9px] font-mono uppercase text-slate-400">Floors</span>
                      <span className="text-xs font-bold text-slate-900 capitalize">{activeProductPack.analysis.specs.floors}</span>
                    </div>
                  </div>

                  <div className="mt-8 space-y-2">
                    <h4 className="text-xs font-bold font-mono uppercase border-b pb-1 text-slate-900">Narrative Description</h4>
                    <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-wrap py-2 font-normal">
                      {activeProductPack.analysis.portalListing}
                    </p>
                  </div>

                  <div className="mt-8 space-y-2 font-sans page-break-inside-avoid">
                    <h4 className="text-xs font-bold font-mono uppercase border-b pb-1 text-slate-900">Regional Smart Verification Checklist</h4>
                    <div className="grid grid-cols-2 gap-3 mt-3">
                      {activeProductPack.analysis.redFlags.map((flag, idx) => (
                        <div key={idx} className="p-3 bg-slate-50 rounded border border-slate-100 text-[10px] text-slate-705 leading-relaxed">
                          ⬜ <strong>[{idx + 1}]</strong> {flag}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-12 pt-6 border-t border-slate-300 flex justify-between items-center text-xs text-slate-500 font-sans">
                    <p>{activeProductPack.branding.agencyName} • {activeProductPack.branding.name}</p>
                    <p>Phone: {activeProductPack.branding.phone} | WA: {activeProductPack.branding.whatsapp}</p>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      )}
    </div>
  );
}
