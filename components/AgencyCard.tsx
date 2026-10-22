import { Star, MapPin, Phone, Globe, ShieldCheck, ArrowRight } from "lucide-react";

export interface Agency {
  name: string;
  rating: number;
  reviewCount: number;
  website: string;
  address?: string;
  phone?: string;
  tags?: string[];
  verified?: boolean;
}

interface AgencyCardProps {
  agency: Agency;
  rank: number;
  city: string;
}

export default function AgencyCard({ agency, rank, city }: AgencyCardProps) {
  return (
    <article className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-between">
      {/* Top Banner & Rank */}
      <div>
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 font-bold text-sm flex items-center justify-center border border-blue-100 shrink-0">
              #{rank}
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-lg leading-snug hover:text-blue-600 transition">
                {agency.name}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex items-center text-amber-500 gap-1 text-sm font-semibold">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>{agency.rating.toFixed(1)}</span>
                </div>
                <span className="text-xs text-slate-400">•</span>
                <span className="text-xs text-slate-500 font-medium">
                  {agency.reviewCount} Google reviews
                </span>
              </div>
            </div>
          </div>

          {agency.verified && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Verified
            </span>
          )}
        </div>

        {/* Location & Contact Info */}
        <div className="space-y-1.5 text-xs text-slate-600 mb-4 bg-slate-50/80 rounded-xl p-3 border border-slate-100">
          {agency.address && (
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="truncate">{agency.address}</span>
            </div>
          )}
          {agency.phone && (
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>{agency.phone}</span>
            </div>
          )}
        </div>

        {/* Capabilities / Tags */}
        {agency.tags && agency.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-6">
            {agency.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 text-slate-700"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Action Footer */}
      <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
        {agency.website ? (
          <a
            href={agency.website}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-blue-600 transition"
          >
            <Globe className="w-3.5 h-3.5" />
            Visit Website
          </a>
        ) : (
          <span />
        )}

        <a
          href="#lead-form"
          className="inline-flex items-center gap-1 px-3.5 py-2 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition shadow-sm"
        >
          Request Quote
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </article>
  );
}
