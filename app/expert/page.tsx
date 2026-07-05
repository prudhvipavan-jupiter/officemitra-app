import type { Metadata } from "next";
import Link from "next/link";
import {
  AlertCircle,
  Check,
  Clock,
  MessageCircle,
  Shield,
  X,
} from "lucide-react";
import { ExpertQueryForm } from "@/components/expert/ExpertQueryForm";
import { PageHeader } from "@/components/ui/PageHeader";
import { DisclaimerNotice } from "@/components/ui/DisclaimerNotice";
import {
  EXPERT_AREAS,
  EXPERT_BEFORE_SUBMIT,
  EXPERT_CAN_HELP,
  EXPERT_CANNOT,
  EXPERT_CANNOT_FOOTNOTE,
  EXPERT_CTA,
  EXPERT_GUIDANCE_NOTE,
  EXPERT_HEADLINE,
  EXPERT_INTRO,
  EXPERT_RESPONSE_TIMES,
  EXPERT_TAGLINE,
  EXPERT_TYPICAL_QUERIES,
} from "@/lib/data/expert-content";

export const metadata: Metadata = {
  title: "Expert Assistance",
  description:
    "Personalized administrative guidance from experienced AP Government ministerial experts — bills, pension, SR, leave, pay, and G.O. interpretation.",
};

export default function ExpertPage() {
  return (
    <>
      <div className="page-header">
        <div className="page-header-inner max-w-4xl">
          <PageHeader
            breadcrumb={[{ label: "Home", href: "/" }, { label: "Expert Assistance" }]}
            title="Expert Assistance"
            description={EXPERT_HEADLINE}
          />
        </div>
      </div>

      <div className="page-body max-w-4xl space-y-10">
        <p className="text-lg leading-relaxed text-gray-700">{EXPERT_INTRO}</p>

        <div className="flex gap-3 rounded-xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-950">
          <Shield className="mt-0.5 h-5 w-5 shrink-0 text-amber-700" />
          <div>
            <p className="font-semibold text-amber-900">Guidance only</p>
            <p className="mt-1 leading-relaxed">{EXPERT_GUIDANCE_NOTE}</p>
          </div>
        </div>

        <DisclaimerNotice />

        <section>
          <h2 className="text-2xl font-bold text-navy-900">Areas of expertise</h2>
          <p className="mt-1 text-gray-600">Our experts can assist you with the following:</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {EXPERT_AREAS.map((area) => (
              <div key={area.title} className="card !p-5">
                <h3 className="font-semibold text-navy-900">{area.title}</h3>
                <ul className="mt-3 space-y-1.5 text-sm text-gray-700">
                  {area.items.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gold-600" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <div className="card">
            <h2 className="text-xl font-bold text-navy-900">What we can help with</h2>
            <ul className="mt-4 space-y-2.5">
              {EXPERT_CAN_HELP.map((item) => (
                <li key={item} className="flex gap-2.5 text-sm text-gray-700">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="card border-rose-100 bg-rose-50/30">
            <h2 className="text-xl font-bold text-navy-900">What we do not provide</h2>
            <p className="mt-1 text-sm text-gray-600">OfficeMitra does not:</p>
            <ul className="mt-4 space-y-2.5">
              {EXPERT_CANNOT.map((item) => (
                <li key={item} className="flex gap-2.5 text-sm text-gray-700">
                  <X className="mt-0.5 h-4 w-4 shrink-0 text-rose-600" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm leading-relaxed text-gray-600">{EXPERT_CANNOT_FOOTNOTE}</p>
          </div>
        </section>

        <section className="card">
          <h2 className="text-xl font-bold text-navy-900">Before you submit your query</h2>
          <p className="mt-1 text-sm text-gray-600">To help us respond quickly, please include:</p>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {EXPERT_BEFORE_SUBMIT.map((item) => (
              <li key={item} className="flex gap-2 text-sm text-gray-700">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-navy-900">Typical queries we handle</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {EXPERT_TYPICAL_QUERIES.map((q) => (
              <span key={q} className="badge bg-navy-50 text-navy-700 ring-1 ring-navy-100">
                {q}
              </span>
            ))}
          </div>
        </section>

        <section className="card">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-gold-600" />
            <h2 className="text-xl font-bold text-navy-900">Response time</h2>
          </div>
          <dl className="mt-4 space-y-3">
            {EXPERT_RESPONSE_TIMES.map((row) => (
              <div key={row.label} className="flex justify-between gap-4 border-b border-navy-50 pb-3 text-sm last:border-0">
                <dt className="text-gray-600">{row.label}</dt>
                <dd className="font-semibold text-navy-900">{row.time}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="expert-banner">
          <div className="pl-3">
            <h2 className="text-xl font-bold text-navy-900">Need expert guidance?</h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-gray-700">{EXPERT_CTA}</p>
            <p className="mt-4 text-sm font-semibold text-gold-700">{EXPERT_TAGLINE}</p>
          </div>
        </section>

        <ExpertQueryForm />

        <div className="flex flex-wrap gap-3 pb-4">
          <Link href="/contact" className="btn-secondary">
            General contact
          </Link>
          <Link href="/community" className="btn-secondary">
            <MessageCircle className="h-4 w-4" />
            Ask in Community
          </Link>
        </div>
      </div>
    </>
  );
}
