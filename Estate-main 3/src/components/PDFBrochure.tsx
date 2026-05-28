import React from "react";
import { Printer, MapPin, Building, Phone, Send, Award, Calendar } from "lucide-react";
import { PropertyMarketingPack } from "../types";

interface PDFBrochureProps {
  pack: PropertyMarketingPack;
}

export default function PDFBrochure({ pack }: PDFBrochureProps) {
  const { metadata, analysis, branding } = pack;

  const handlePrint = (e: React.MouseEvent) => {
    e.preventDefault();
    window.print();
  };

  const getThemeTextClass = () => {
    switch (branding.themeColor) {
      case "gold": return "text-amber-500";
      case "cobalt": return "text-blue-500";
      case "charcoal": return "text-slate-600";
      default: return "text-emerald-500";
    }
  };

  const getThemeBorderClass = () => {
    switch (branding.themeColor) {
      case "gold": return "border-amber-500/30";
      case "cobalt": return "border-blue-500/30";
      case "charcoal": return "border-slate-300";
      default: return "border-emerald-500/30";
    }
  };

  const getThemeBgClass = () => {
    switch (branding.themeColor) {
      case "gold": return "bg-amber-500";
      case "cobalt": return "bg-blue-500";
      case "charcoal": return "bg-slate-700";
      default: return "bg-emerald-500";
    }
  };

  return (
    <div className="space-y-4 selection:bg-emerald-500 selection:text-slate-950">
      {/* Action panel */}
      <div className="no-print p-4 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between">
        <div>
          <h4 className="text-xs font-semibold uppercase text-slate-400 font-mono">Print-Ready Export Booklet</h4>
          <p className="text-[11px] text-slate-500 mt-1">Pre-styled for paper sizes. Click "Print Document" and choose "Save to PDF" or send directly to physical offices.</p>
        </div>
        <button
          onClick={handlePrint}
          className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold rounded-xl flex items-center gap-2 transition-all shadow-md"
        >
          <Printer className="w-4 h-4" />
          <span>Print / Save PDF</span>
        </button>
      </div>

      {/* Styled Printable Sheet */}
      <div id="printable-area" className="bg-white text-slate-900 p-8 sm:p-12 rounded-2xl border border-slate-200 shadow-2xl space-y-8 max-w-4xl mx-auto print:border-none print:shadow-none print:p-0">
        
        {/* Printable CSS Overrides Injection */}
        <style dangerouslySetInnerHTML={{__html: `
          @media print {
            body {
              background-color: white !important;
              color: black !important;
            }
            .no-print {
              display: none !important;
            }
            #printable-area {
              border: none !important;
              box-shadow: none !important;
              padding: 0 !important;
              margin: 0 !important;
              width: 100% !important;
              max-width: 100% !important;
              background-color: white !important;
            }
          }
        `}} />

        {/* Printable Header */}
        <div className={`border-b-4 pb-6 flex flex-col md:flex-row justify-between items-start gap-4 ${getThemeBorderClass()}`}>
          <div className="space-y-2">
            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[10px] uppercase font-mono font-bold tracking-wider ${getThemeBgClass()} text-white`}>
              Property Briefing File
            </span>
            <h2 className="text-2xl font-serif font-extrabold tracking-tight text-slate-950 leading-snug">{analysis.title}</h2>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-sans">
              <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
              <span>{metadata.location}</span>
            </div>
          </div>

          <div className="text-right md:min-w-48 space-y-1">
            <h3 className="font-sans font-bold text-lg text-slate-900">{branding.agencyName}</h3>
            <p className="text-xs text-slate-500 font-sans">Lead Broker: {branding.name}</p>
            <div className="flex items-center justify-end gap-1 text-[11px] text-slate-500 font-sans">
              <Calendar className="w-3 h-3" />
              <span>Generated {new Date(metadata.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        {/* Quick specs grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-100 flex flex-col gap-1">
            <span className="text-[10px] font-mono uppercase text-slate-400">Asking Price</span>
            <span className="text-sm font-extrabold text-slate-950">{metadata.basePrice}</span>
          </div>

          <div className="p-4 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-100 flex flex-col gap-1">
            <span className="text-[10px] font-mono uppercase text-slate-400">Total Size</span>
            <span className="text-sm font-extrabold text-slate-950 capitalize">{metadata.size} {metadata.unit}</span>
          </div>

          <div className="p-4 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-100 flex flex-col gap-1">
            <span className="text-[10px] font-mono uppercase text-slate-400">Bedrooms / Baths</span>
            <span className="text-sm font-extrabold text-slate-950">{analysis.specs.bedrooms} Beds / {analysis.specs.bathrooms} Baths</span>
          </div>

          <div className="p-4 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-100 flex flex-col gap-1">
            <span className="text-[10px] font-mono uppercase text-slate-400">Floors & Facing</span>
            <span className="text-sm font-extrabold text-slate-950 truncate capitalize">
              {analysis.specs.floors} flr • {analysis.specs.facingDirection || "East Facing"}
            </span>
          </div>
        </div>

        {/* Highlight Description (Zameen / Portal) */}
        <div className="space-y-3 font-sans">
          <h4 className={`text-xs font-mono uppercase tracking-widest font-extrabold border-b pb-1.5 ${getThemeBorderClass()} ${getThemeTextClass()}`}>
            Narrative Listing Details
          </h4>
          <div className="text-xs text-slate-700 leading-relaxed space-y-4 whitespace-pre-line font-normal font-sans">
            {analysis.portalListing}
          </div>
        </div>

        {/* Checklist */}
        <div className="space-y-3 font-sans">
          <h4 className={`text-xs font-mono uppercase tracking-widest font-extrabold border-b pb-1.5 ${getThemeBorderClass()} ${getThemeTextClass()}`}>
            Smart Due-Diligence Checklist (Verification Needed)
          </h4>
          <p className="text-[11px] text-slate-500 italic block">Agents must inspect these regional structures before finalizing the deeds.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
            {analysis.redFlags.map((flag, idx) => (
              <div key={idx} className="flex gap-2 text-xs text-slate-705 bg-slate-50 border border-slate-100 p-3 rounded-lg leading-normal">
                <input type="checkbox" className="mt-1 flex-shrink-0" id={`p-flag-${idx}`} />
                <label htmlFor={`p-flag-${idx}`} className="cursor-pointer">{flag}</label>
              </div>
            ))}
          </div>
        </div>

        {/* Printable Footer */}
        <div className={`pt-6 border-t flex flex-col sm:flex-row justify-between items-center gap-4 ${getThemeBorderClass()}`}>
          <div className="flex items-center gap-2">
            {branding.logoUrl ? (
              <img src={branding.logoUrl} alt="Logo" className="w-10 h-10 object-contain rounded" referrerPolicy="no-referrer" />
            ) : (
              <div className={`w-9 h-9 rounded bg-emerald-500 flex items-center justify-center font-bold text-white text-sm`}>
                EL
              </div>
            )}
            <div className="text-left">
              <p className="text-xs font-extrabold text-slate-900">{branding.name}</p>
              <p className="text-[10px] text-slate-500 uppercase font-mono">{branding.agencyName}</p>
            </div>
          </div>

          <div className="flex gap-4 font-sans text-xs">
            <div className="flex items-center gap-1 text-slate-700">
              <Phone className="w-4.5 h-4.5 text-slate-400" />
              <span>{branding.phone}</span>
            </div>
            <div className="flex items-center gap-1 text-slate-700">
              <Send className="w-4.5 h-4.5 text-emerald-500" />
              <span>{branding.whatsapp}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
