import Link from "next/link";
import { Sparkles, MapPin, ShieldCheck } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:bg-blue-700 transition">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <span className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-1.5">
              DentalSEO<span className="text-blue-600">Hub</span>
            </span>
            <span className="block text-[10px] uppercase font-semibold tracking-wider text-slate-400 -mt-1">
              Verified Agency Directory
            </span>
          </div>
        </Link>

        <nav className="flex items-center gap-6">
          <Link
            href="/#cities"
            className="text-sm font-medium text-slate-600 hover:text-blue-600 transition flex items-center gap-1"
          >
            <MapPin className="w-4 h-4 text-slate-400" />
            Explore Cities
          </Link>
          <a
            href="#lead-form"
            className="inline-flex items-center justify-center text-xs sm:text-sm font-semibold px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition shadow-sm"
          >
            Find an Agency
          </a>
        </nav>
      </div>
    </header>
  );
}
