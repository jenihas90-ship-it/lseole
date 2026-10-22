import Link from "next/link";
import { Sparkles, ShieldCheck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                DentalSEO<span className="text-blue-500">Hub</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              The premier programmatic directory and intelligence platform connecting high-growth dental practices with specialized marketing and patient acquisition agencies.
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Independent, editorial & performance-verified listings</span>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-3">Top Markets</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/dental-agencies/dallas" className="hover:text-white transition">Dallas Dental SEO</Link></li>
              <li><Link href="/dental-agencies/austin" className="hover:text-white transition">Austin Dental SEO</Link></li>
              <li><Link href="/dental-agencies/miami" className="hover:text-white transition">Miami Dental SEO</Link></li>
              <li><Link href="/dental-agencies/chicago" className="hover:text-white transition">Chicago Dental SEO</Link></li>
              <li><Link href="/dental-agencies/atlanta" className="hover:text-white transition">Atlanta Dental SEO</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-3">For Agencies</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#lead-form" className="hover:text-white transition">Claim Practice Leads</a></li>
              <li><a href="#lead-form" className="hover:text-white transition">Agency Verification</a></li>
              <li><a href="#lead-form" className="hover:text-white transition">Partner API & Webhooks</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 text-xs text-slate-500 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} DentalSEOHub. Built on Programmatic SEO Architecture.</p>
          <div className="flex gap-6">
            <span>Next.js App Router (SSG)</span>
            <span>Vercel Edge</span>
            <span>Google Places (New) Data Pipeline</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
