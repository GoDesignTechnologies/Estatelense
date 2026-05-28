import { useState } from "react";
import { BookOpen, Search, MapPin, Building, Calendar, ArrowRight, Trash2, Video, Mail, Trash, MessageSquare } from "lucide-react";
import { PropertyMarketingPack } from "../types";

interface LibraryProps {
  properties: PropertyMarketingPack[];
  onSelectProperty: (pack: PropertyMarketingPack) => void;
  onDeleteProperty: (id: string) => void;
}

export default function Library({ properties, onSelectProperty, onDeleteProperty }: LibraryProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = properties.filter((p) => {
    const term = searchQuery.toLowerCase();
    return (
      p.analysis.title.toLowerCase().includes(term) ||
      p.metadata.location.toLowerCase().includes(term) ||
      p.metadata.size.toLowerCase().includes(term) ||
      p.metadata.propertyType.toLowerCase().includes(term)
    );
  });

  return (
    <div className="max-w-6xl mx-auto py-10 px-6 space-y-8 selection:bg-indigo-600 selection:text-white animate-fade-in">
      {/* Title block */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-extrabold tracking-tight text-white flex items-center gap-2.5">
            <BookOpen className="w-8 h-8 text-indigo-400" />
            Property Library
          </h1>
          <p className="text-sm text-slate-400 mt-1.5 font-sans leading-relaxed">
            Access, export, or regenerate text listings and short social Reels for all compiled properties.
          </p>
        </div>

        {/* Search Input Bar */}
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
          <input
            type="text"
            placeholder="Search by city, size, title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-[#0E121E]/80 border border-slate-800 focus:outline-none focus:border-indigo-500 rounded-xl text-white placeholder-slate-600 text-xs transition-colors"
          />
        </div>
      </div>

      {properties.length === 0 ? (
        <div className="p-16 rounded-2xl border border-slate-800 bg-[#0E121E]/40 backdrop-blur-sm text-center space-y-4 max-w-lg mx-auto">
          <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center text-slate-500 mx-auto">
            <BookOpen className="w-6 h-6 text-indigo-400" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-205">No properties in archive yet</h3>
            <p className="text-xs text-slate-450 mt-1 font-sans">Analyze your first video walkthrough. The completed assets pack will automatically save in this secure local directory.</p>
          </div>
        </div>
      ) : filtered.length === 0 ? (
        <div className="p-10 text-center text-slate-500 text-xs italic font-mono uppercase tracking-widest bg-[#0E121E]/10 border border-slate-800 rounded-xl max-w-md mx-auto">
          No matching properties found in library.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p) => {
            const { metadata, analysis, branding } = p;
            return (
              <div
                key={p.id}
                className="group p-6 rounded-2xl border border-slate-800/85 bg-[#0E121E]/60 backdrop-blur-md flex flex-col justify-between hover:border-slate-700/85 hover:shadow-2xl hover:shadow-indigo-550/[0.02] transition-all relative duration-300 hover:-translate-y-0.5"
              >
                {/* Delete direct floating action */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (confirm(`Remove "${p.analysis.title}" from your library?`)) {
                      onDeleteProperty(p.id);
                    }
                  }}
                  title="Delete Listing"
                  className="absolute top-4 right-4 p-2 rounded-lg bg-[#07090E]/80 hover:bg-red-500/15 text-slate-500 hover:text-red-400 border border-slate-800/80 opacity-0 group-hover:opacity-100 transition-all z-10 hover:border-red-500/20"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>

                <div className="space-y-4 cursor-pointer" onClick={() => onSelectProperty(p)}>
                  {/* Aspect or category indicators */}
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-md text-[9px] font-mono capitalize tracking-wider font-bold">
                      {metadata.propertyType}
                    </span>
                    <span className="text-[10px] text-slate-450 font-mono font-medium">
                      {metadata.size} {metadata.unit}
                    </span>
                  </div>

                  {/* Title */}
                  <div className="space-y-1">
                    <h3 className="text-base font-display font-extrabold text-slate-100 group-hover:text-indigo-400 transition-colors line-clamp-2 leading-tight">
                      {analysis.title}
                    </h3>
                    <p className="text-[11px] text-slate-500 flex items-center gap-1.5 font-sans font-medium">
                      <MapPin className="w-3.5 h-3.5 flex-shrink-0 text-slate-600" />
                      <span className="truncate">{metadata.location}</span>
                    </p>
                  </div>

                  {/* Pricing / metrics highlight */}
                  <div className="pt-3 flex justify-between items-center text-xs text-slate-400 border-t border-slate-800/80">
                    <div className="text-left">
                      <p className="text-[9px] text-slate-500 font-mono uppercase tracking-wider font-medium">Asking Price</p>
                      <p className="text-sm font-extrabold text-indigo-400 font-display">{metadata.basePrice}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[9px] text-slate-500 font-mono uppercase tracking-wider font-medium">Specs</p>
                      <p className="text-[11px] font-semibold text-slate-350">{analysis.specs.bedrooms} Beds / {analysis.specs.bathrooms} Baths</p>
                    </div>
                  </div>
                </div>

                {/* Bottom Trigger button */}
                <button
                  onClick={() => onSelectProperty(p)}
                  className="mt-5 w-full py-2.5 bg-[#07090E]/65 hover:bg-[#1F293D]/30 border border-slate-800 hover:border-slate-700 text-[11px] font-semibold text-slate-300 group-hover:text-slate-100 rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Open Marketing Pack</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-slate-400 group-hover:text-white" />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
