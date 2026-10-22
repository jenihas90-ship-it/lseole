import Link from "next/link";
import enrichedData from "@/data/enriched_db.json";
import LeadCaptureForm from "@/components/LeadCaptureForm";
import CityDirectorySearch from "@/components/CityDirectorySearch";
import { MapPin, Star, ArrowRight, ShieldCheck, TrendingUp, Users, Award, Search } from "lucide-react";

export default function HomePage() {
  const { cities, totalAgencies, totalCities } = enrichedData;

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-900 via-slate-900 to-slate-900 text-white pt-20 pb-28 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        <div className="relative max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-300 border border-blue-400/20 backdrop-blur-sm">
            <Award className="w-4 h-4 text-blue-400" />
            <span>High-Ticket Dental Growth Intelligence</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Stop Trading Clicks for Pennies. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-teal-300">
              Rank for $15,000 Patient Cases.
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-slate-300 text-base sm:text-lg leading-relaxed">
            The lifetime value of a dental implant or cosmetic patient is measured in thousands. 
            Connect with specialized marketing agencies engineered to dominate the Google Local Pack in your metro.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#cities"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-lg shadow-blue-500/25 transition flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4" />
              <span>Browse Top Cities</span>
            </a>
            <a
              href="#lead-form"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-sm border border-white/20 transition flex items-center justify-center gap-2 backdrop-blur-sm"
            >
              <span>Get Free Agency Quotes</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Quick Highlights Bar */}
        <div className="max-w-5xl mx-auto mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-sm">
            <div className="text-2xl sm:text-3xl font-bold text-white">{totalCities}+</div>
            <div className="text-xs text-slate-400 mt-1">Major Metros Indexed</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-sm">
            <div className="text-2xl sm:text-3xl font-bold text-white">{totalAgencies}+</div>
            <div className="text-xs text-slate-400 mt-1">Verified Agencies</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-sm">
            <div className="text-2xl sm:text-3xl font-bold text-emerald-400">4.8★</div>
            <div className="text-xs text-slate-400 mt-1">Average Agency Rating</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-sm">
            <div className="text-2xl sm:text-3xl font-bold text-blue-400">100%</div>
            <div className="text-xs text-slate-400 mt-1">Dental Focused</div>
          </div>
        </div>
      </section>

      {/* City Directory Section */}
      <section id="cities" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-blue-600 mb-2">
            <MapPin className="w-3.5 h-3.5" />
            <span>Target Metro Areas</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Explore Dental SEO Agencies by Market
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Pre-rendered static landing pages featuring competitive landscape analysis, average cost per lead, and verified agency reviews.
          </p>
        </div>

        <CityDirectorySearch cities={cities} />
      </section>

      {/* Strategic Advantage / Education Section */}
      <section className="bg-slate-100/70 border-y border-slate-200 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              The Economics of Programmatic SEO
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1 tracking-tight">
              Why Dental Marketing Demands Specialization
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">High Patient Lifetime Value</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                A single dental implant or All-on-4 case generates $5,000 to $25,000. Dentists gladly pay $2,000–$5,000/mo to agencies that reliably produce these inquiries.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Hyper-Local Map Pack Dominance</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                72% of dental searches result in an appointment within a 5-mile radius. Specialized agencies master local citations and review velocity to win the Google 3-Pack.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Automated Mediation Model</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Rather than selling low-margin ad clicks, this programmatic platform acts as an automated lead generator, routing ready-to-buy practice inquiries directly to agency partners.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Central Lead Generation Form Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <LeadCaptureForm defaultCity="Dallas" defaultState="TX" />
      </section>
    </div>
  );
}
