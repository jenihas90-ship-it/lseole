import Link from "next/link";
import enrichedData from "@/data/enriched_db.json";
import { MapPin, Star, ArrowRight, FileText, Globe } from "lucide-react";

export const metadata = {
  title: "HTML Sitemap | DentalSEOHub",
  description: "Browse all indexed dental marketing and SEO agency directories across top US metropolitan areas.",
};

export default function HtmlSitemapPage() {
  const { cities } = enrichedData;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-10">
      <div className="border-b border-slate-200 pb-6">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 uppercase tracking-wider mb-2">
          <Globe className="w-4 h-4" />
          <span>HTML Sitemap for Human Visitors</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Website Directory & Market Index
        </h1>
        <p className="text-slate-600 text-sm mt-2">
          Looking for the machine-readable version for search engines? View the{" "}
          <a href="/sitemap.xml" className="text-blue-600 font-semibold underline">
            XML Sitemap for Googlebot
          </a>{" "}
          or the{" "}
          <a href="/robots.txt" className="text-blue-600 font-semibold underline">
            robots.txt crawler rules
          </a>
          .
        </p>
      </div>

      <div className="space-y-6">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <FileText className="w-5 h-5 text-blue-600" />
          Core Pages
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href="/"
            className="p-4 bg-white rounded-xl border border-slate-200 hover:border-blue-500 hover:shadow-sm transition flex items-center justify-between"
          >
            <div>
              <div className="font-semibold text-slate-900 text-sm">Homepage / Directory Hub</div>
              <div className="text-xs text-slate-500 mt-0.5">https://lseole-aqc5.vercel.app/</div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400" />
          </Link>
          <Link
            href="/#lead-form"
            className="p-4 bg-white rounded-xl border border-slate-200 hover:border-blue-500 hover:shadow-sm transition flex items-center justify-between"
          >
            <div>
              <div className="font-semibold text-slate-900 text-sm">Quote Request / Matchmaking</div>
              <div className="text-xs text-slate-500 mt-0.5">https://lseole-aqc5.vercel.app/#lead-form</div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400" />
          </Link>
        </div>
      </div>

      <div className="space-y-6 pt-4">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-blue-600" />
          Target Dental Markets ({cities.length} Cities)
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {cities.map((city) => (
            <Link
              key={city.slug}
              href={`/dental-agencies/${city.slug}`}
              className="p-4 bg-white rounded-xl border border-slate-200 hover:border-blue-500 hover:shadow-sm transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                    {city.state}
                  </span>
                  <div className="flex items-center gap-1 text-xs font-semibold text-amber-500">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>{city.averageRating}</span>
                  </div>
                </div>
                <div className="font-bold text-slate-900 text-sm">
                  {city.cityName} Dental SEO
                </div>
                <div className="text-xs text-slate-500 mt-1 line-clamp-1">
                  {city.agencyCount} agencies indexed
                </div>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-100 text-xs text-blue-600 font-semibold flex items-center gap-1">
                <span>View market</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
