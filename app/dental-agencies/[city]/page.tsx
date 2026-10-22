import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import enrichedData from "@/data/enriched_db.json";
import AgencyCard, { Agency } from "@/components/AgencyCard";
import FaqAccordion from "@/components/FaqAccordion";
import LeadCaptureForm from "@/components/LeadCaptureForm";
import { MapPin, Star, ShieldCheck, ChevronRight, FileText, HelpCircle, ArrowLeft } from "lucide-react";

interface CityPageProps {
  params: {
    city: string;
  };
}

// Generate static routes for all cities in enriched_db.json at build time (SSG)
export async function generateStaticParams() {
  return enrichedData.cities.map((city) => ({
    city: city.slug,
  }));
}

// Dynamic SEO Metadata for each localized landing page
export async function generateMetadata({ params }: CityPageProps): Promise<Metadata> {
  const cityDoc = enrichedData.cities.find((c) => c.slug.toLowerCase() === params.city.toLowerCase());

  if (!cityDoc) {
    return {
      title: "City Not Found | DentalSEOHub",
    };
  }

  return {
    title: cityDoc.metaTitle,
    description: cityDoc.metaDescription,
    alternates: {
      canonical: `https://dentalseohub.com/dental-agencies/${cityDoc.slug}`,
    },
    openGraph: {
      title: cityDoc.metaTitle,
      description: cityDoc.metaDescription,
      url: `https://dentalseohub.com/dental-agencies/${cityDoc.slug}`,
      type: "website",
    },
  };
}

export default function CityPage({ params }: CityPageProps) {
  const cityDoc = enrichedData.cities.find(
    (c) => c.slug.toLowerCase() === params.city.toLowerCase()
  );

  if (!cityDoc) {
    notFound();
  }

  // Schema.org Structured Data: FAQPage and ItemList
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": cityDoc.faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };

  const directorySchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": `${cityDoc.cityName} Dental SEO & Marketing Agencies`,
    "description": cityDoc.metaDescription,
    "itemListElement": cityDoc.agencies.map((agency: Agency, index: number) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "LocalBusiness",
        "name": agency.name,
        "telephone": agency.phone,
        "address": agency.address,
        "url": agency.website,
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": agency.rating,
          "reviewCount": agency.reviewCount,
        },
      },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://dentalseohub.com",
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Dental Marketing Agencies",
        "item": "https://dentalseohub.com/#cities",
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": `${cityDoc.cityName}, ${cityDoc.state}`,
        "item": `https://dentalseohub.com/dental-agencies/${cityDoc.slug}`,
      },
    ],
  };

  return (
    <div className="pb-24">
      {/* Inject Structured Data for SEO Rich Snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(directorySchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <Link href="/" className="hover:text-blue-600 transition">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <Link href="/#cities" className="hover:text-blue-600 transition">
              Markets
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-900 font-semibold">{cityDoc.cityName}, {cityDoc.state}</span>
          </nav>
        </div>
      </div>

      {/* City Hero Header */}
      <section className="bg-gradient-to-b from-blue-900 via-slate-900 to-slate-900 text-white py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1 text-xs font-semibold text-blue-300 hover:text-white transition bg-white/10 px-2.5 py-1 rounded-lg backdrop-blur-sm"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              All Metros
            </Link>
            <span className="inline-flex items-center gap-1 text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30 px-3 py-1 rounded-full">
              <MapPin className="w-3.5 h-3.5" />
              {cityDoc.cityName}, {cityDoc.state} Market Index
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            {cityDoc.h1}
          </h1>

          <p className="text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
            {cityDoc.heroSubtitle}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-slate-300">
            <div className="flex items-center gap-1.5 font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>{cityDoc.agencyCount} Verified Local Agencies</span>
            </div>
            <div className="flex items-center gap-1.5 font-semibold text-amber-300">
              <Star className="w-4 h-4 fill-amber-300 text-amber-300" />
              <span>{cityDoc.averageRating} Average Google Rating</span>
            </div>
            <div className="text-slate-400">
              Updated for 2026 Competitive Landscape
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Editorial, Agency Listings, and FAQs */}
        <div className="lg:col-span-8 space-y-12">
          {/* Unique 300-word Market Summary (Editorial Analysis) */}
          <section className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-wider mb-2">
              <FileText className="w-4 h-4" />
              <span>Local Market Intelligence</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mb-4">
              Dental Marketing & Patient Acquisition in {cityDoc.cityName}
            </h2>
            <div className="prose prose-slate prose-sm sm:prose-base max-w-none text-slate-600 leading-relaxed space-y-4">
              <p>{cityDoc.marketSummary}</p>
            </div>
          </section>

          {/* Directory Listings Cards */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  Top Ranked Dental Agencies in {cityDoc.cityName}
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Ranked by verified Google review metrics, local pack prominence, and dental case specialization.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5">
              {cityDoc.agencies.map((agency: Agency, index: number) => (
                <AgencyCard
                  key={index}
                  agency={agency}
                  rank={index + 1}
                  city={cityDoc.cityName}
                />
              ))}
            </div>
          </section>

          {/* FAQ Accordion Section */}
          <section className="space-y-4 pt-4">
            <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-wider">
              <HelpCircle className="w-4 h-4" />
              <span>Frequently Asked Questions</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              {cityDoc.cityName} Dental SEO & Lead Costs: FAQs
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Key benchmarks and cost expectations for practice owners in the {cityDoc.cityName} market.
            </p>

            <div className="mt-4">
              <FaqAccordion faqs={cityDoc.faqs} cityName={cityDoc.cityName} />
            </div>
          </section>
        </div>

        {/* Right Sticky Sidebar: High Intent Lead Capture */}
        <aside className="lg:col-span-4">
          <div className="sticky top-20 space-y-6">
            <LeadCaptureForm defaultCity={cityDoc.cityName} defaultState={cityDoc.state} />

            {/* Trust badge card */}
            <div className="bg-slate-100 rounded-2xl p-5 border border-slate-200 text-xs text-slate-600 space-y-2">
              <div className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                How the Matching Process Works
              </div>
              <p className="leading-relaxed">
                1. Submit your practice details and growth targets.
              </p>
              <p className="leading-relaxed">
                2. Our pipeline instantly evaluates capacity with the top 3 agencies in {cityDoc.cityName}.
              </p>
              <p className="leading-relaxed">
                3. Receive custom proposals with transparent cost-per-acquisition estimates.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
