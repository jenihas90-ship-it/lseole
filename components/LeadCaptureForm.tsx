"use client";

import { useState } from "react";
import { Send, CheckCircle2, AlertCircle, Building2, User, Mail, Phone, DollarSign, Sparkles } from "lucide-react";

interface LeadCaptureFormProps {
  defaultCity?: string;
  defaultState?: string;
}

export default function LeadCaptureForm({ defaultCity = "", defaultState = "" }: LeadCaptureFormProps) {
  const [formData, setFormData] = useState({
    practiceName: "",
    contactName: "",
    email: "",
    phone: "",
    city: defaultCity ? `${defaultCity}, ${defaultState}` : "",
    procedureGoal: "Dental Implants / All-on-4",
    monthlyBudget: "$2,500 - $5,000 / month",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          submittedAt: new Date().toISOString(),
          sourceUrl: typeof window !== "undefined" ? window.location.href : "",
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to submit lead request");
      }

      setStatus("success");
    } catch (err: any) {
      setStatus("error");
      setErrorMessage(err.message || "An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div id="lead-form" className="bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden">
      <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 p-6 sm:p-8 text-white relative">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/15 backdrop-blur-sm border border-white/20 mb-3">
          <Sparkles className="w-3.5 h-3.5 text-blue-200" />
          <span>Priority Matchmaking Service</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
          Request Confidential Proposals for {defaultCity || "Your Practice"}
        </h3>
        <p className="text-blue-100 text-xs sm:text-sm mt-1 max-w-xl leading-relaxed">
          Connect directly with verified dental marketing agencies specialized in high-ticket patient acquisition and Google Maps local dominance.
        </p>
      </div>

      <div className="p-6 sm:p-8">
        {status === "success" ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold text-slate-900">Request Dispatched Successfully!</h4>
            <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              We have forwarded your practice profile to the top 3 verified dental agencies in{" "}
              <strong>{formData.city || "your target market"}</strong>. Qualified agency directors will review your case and reach out within 1 business day.
            </p>
            <button
              onClick={() => {
                setStatus("idle");
                setFormData({
                  practiceName: "",
                  contactName: "",
                  email: "",
                  phone: "",
                  city: defaultCity ? `${defaultCity}, ${defaultState}` : "",
                  procedureGoal: "Dental Implants / All-on-4",
                  monthlyBudget: "$2,500 - $5,000 / month",
                });
              }}
              className="text-xs font-semibold text-blue-600 hover:underline pt-2 inline-block"
            >
              Submit another request
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {status === "error" && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-slate-400" />
                  Dental Practice Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Apex Family Dental"
                  value={formData.practiceName}
                  onChange={(e) => setFormData({ ...formData, practiceName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  Your Name & Role
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Jane Smith (Owner)"
                  value={formData.contactName}
                  onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  Business Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="doctor@practicename.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  Direct Phone Number
                </label>
                <input
                  type="tel"
                  required
                  placeholder="(555) 000-0000"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Location / Metro Area
                </label>
                <input
                  type="text"
                  required
                  placeholder="City, State"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Primary Growth Procedure
                </label>
                <select
                  value={formData.procedureGoal}
                  onChange={(e) => setFormData({ ...formData, procedureGoal: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                >
                  <option value="Dental Implants / All-on-4">Dental Implants / All-on-4</option>
                  <option value="Cosmetic Veneers & Makeovers">Cosmetic Veneers & Makeovers</option>
                  <option value="Invisalign & Clear Aligners">Invisalign & Clear Aligners</option>
                  <option value="General New Patient Flow">General New Patient Flow</option>
                  <option value="Full Practice Reputation & SEO">Full Practice Reputation & SEO</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5 text-slate-400" />
                  Monthly Ad Budget
                </label>
                <select
                  value={formData.monthlyBudget}
                  onChange={(e) => setFormData({ ...formData, monthlyBudget: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                >
                  <option value="$2,000 - $3,500 / month">$2,000 - $3,500 / month</option>
                  <option value="$3,500 - $6,000 / month">$3,500 - $6,000 / month</option>
                  <option value="$6,000 - $12,000 / month">$6,000 - $12,000 / month</option>
                  <option value="$12,000+ / month">$12,000+ / month</option>
                </select>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 transition disabled:opacity-70 cursor-pointer"
              >
                {status === "submitting" ? (
                  <span>Dispatching to Verified Agencies...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Get Matched With Top Agencies</span>
                  </>
                )}
              </button>
            </div>

            <p className="text-[11px] text-slate-400 text-center">
              100% Free & Confidential for Dental Practices. No spam guaranteed.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
