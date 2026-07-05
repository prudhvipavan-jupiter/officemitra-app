import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { HomeSearch } from "@/components/HomeSearch";
import { platformModules, secondaryModules } from "@/lib/modules";

export default function HomePage() {
  return (
    <>
      <section className="hero-gradient px-4 py-16 text-white md:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-gold-300">
            <Sparkles className="h-3.5 w-3.5" />
            Andhra Pradesh · English
          </p>
          <h1 className="mt-6 text-3xl font-bold leading-tight tracking-tight md:text-5xl md:leading-tight">
            One stop for office knowledge and tools
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-navy-100">
            Practical guidance for AP government ministerial staff — articles, documents, community Q&amp;A,
            calculators, and official portal links.
          </p>
          <HomeSearch />
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/tools" className="btn-primary">
              Explore Tools
            </Link>
            <Link
              href="/portals"
              className="inline-flex items-center justify-center rounded-lg border border-white/25 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-sm hover:bg-white/20"
            >
              Official Portals
            </Link>
          </div>
        </div>
      </section>

      <section className="page-body">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-navy-900">Everything in one place</h2>
            <p className="mt-1 text-gray-600">Browse by module — content is added and updated through the admin CMS.</p>
          </div>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {platformModules.map((mod) => (
            <Link key={mod.href} href={mod.href} className="card-interactive group">
              <div className={`module-icon ${mod.accent}`}>
                <mod.icon className="h-5 w-5" strokeWidth={1.75} />
              </div>
              <h3 className="mt-4 font-semibold text-navy-900 group-hover:text-navy-700">{mod.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-gray-600">{mod.description}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-gold-600">
                Open <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-navy-50 px-4 py-14">
        <div className="page-body !py-0">
          <h2 className="text-2xl font-bold text-navy-900">Also available</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {secondaryModules.map((mod) => (
              <Link key={mod.href} href={mod.href} className="card-interactive flex items-start gap-4">
                <div className="module-icon bg-white text-navy-700 ring-1 ring-navy-100">
                  <mod.icon className="h-5 w-5" strokeWidth={1.75} />
                </div>
                <div>
                  <h3 className="font-semibold text-navy-900">{mod.title}</h3>
                  <p className="mt-1 text-sm text-gray-600">{mod.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="page-body">
        <div className="expert-banner md:flex md:items-center md:justify-between md:gap-8">
          <div className="pl-3">
            <p className="text-xs font-bold uppercase tracking-widest text-gold-600">Expert Assistance</p>
            <h2 className="mt-2 text-2xl font-bold text-navy-900">Need professional guidance?</h2>
            <p className="mt-2 max-w-lg text-gray-700">
              Contact us for establishment and finance guidance from practitioners with Health Department
              administrative experience. Not legal advice — practical office guidance only.
            </p>
          </div>
          <div className="mt-6 flex shrink-0 flex-wrap gap-3 md:mt-0">
            <Link href="/contact" className="btn-primary">
              Contact OfficeMitra
            </Link>
            <Link href="/community" className="btn-secondary">
              Ask in Community
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
