"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, MapPin, Star, ArrowRight, Sparkles } from "lucide-react";

export interface CitySummary {
  slug: string;
  cityName: string;
  state: string;
  heroSubtitle: string;
  agencyCount: number;
  averageRating: number;
}

interface CityDirectorySearchProps {
  cities: CitySummary[];
}

export default function CityDirectorySearch({ cities }: CityDirectorySearchProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedState, setSelectedState] = useState<string>("ALL");

  const uniqueStates = useMemo(() => {
    const states = Array.from(new Set(cities.map((c) => c.state))).sort();
    return ["ALL", ...states];
  }, [cities]);

  const filteredCities = useMemo(() => {
    return cities.filter((city) => {
      const matchesSearch =
        city.cityName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        city.state.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesState = selectedState === "ALL" || city.state === selectedState;
      return matchesSearch && matchesState;
    });
  }, [cities, searchTerm, selectedState]);

  return (
    <div className="space-y-8">
      {/* Search & State Filter Controls */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-6 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by city (e.g. Dallas, Miami, Phoenix)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
        </div>

        {/* State Pill Selectors */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
          {uniqueStates.map((st) => (
            <button
              key={st}
              onClick={() => setSelectedState(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                selectedState === st
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {st === "ALL" ? "All States" : st}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Results */}
      {filteredCities.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-8 space-y-3">
          <p className="text-slate-600 text-sm">No markets match &quot;{searchTerm}&quot;.</p>
          <button
            onClick={() => {
              setSearchTerm("");
              setSelectedState("ALL");
            }}
            className="text-xs font-semibold text-blue-600 hover:underline"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCities.map((city) => (
            <Link
              key={city.slug}
              href={`/dental-agencies/${city.slug}`}
              className="group bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm hover:shadow-lg hover:border-blue-400 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-100">
                    <MapPin className="w-3 h-3" />
                    {city.state}
                  </span>
                  <div className="flex items-center gap-1 text-xs font-semibold text-amber-500">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{city.averageRating} Avg</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition flex items-center justify-between">
                  <span>{city.cityName}</span>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition" />
                </h3>

                <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                  {city.heroSubtitle}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                <span className="font-semibold text-slate-800">
                  {city.agencyCount} Agencies Indexed
                </span>
                <span className="text-blue-600 font-semibold group-hover:underline">
                  View Market Analysis →
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
