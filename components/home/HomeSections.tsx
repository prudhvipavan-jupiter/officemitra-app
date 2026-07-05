"use client";

import Link from "next/link";
import {
  ArrowRight,
  Bell,
  BookOpen,
  Calculator,
  ClipboardList,
  ExternalLink,
  Calculator as CalcIcon,
  Check,
  FolderOpen,
  HelpCircle,
  MessageCircle,
  Shield,
  Users,
} from "lucide-react";
import {
  HOME_EXPERT_BANNER,
  HOME_HELP_SECTION,
  HOME_MODULES_SECTION,
  HOME_POPULAR_TOPICS,
  HOME_TRUST,
  HOME_WHY_OM,
} from "@/lib/data/homepage";
import { FadeIn } from "./FadeIn";

const MODULE_ICONS: Record<string, typeof BookOpen> = {
  "/knowledge": BookOpen,
  "/documents": FolderOpen,
  "/updates": Bell,
  "/process-templates": ClipboardList,
  "/community": MessageCircle,
  "/tools": Calculator,
  "/portals": ExternalLink,
  "/faq": HelpCircle,
};

const WHY_ICONS = {
  shield: Shield,
  calculator: CalcIcon,
  users: Users,
  message: MessageCircle,
} as const;

const HELP_ICONS = {
  help: HelpCircle,
  expert: Users,
  community: MessageCircle,
} as const;

type HomeModule = {
  href: string;
  title: string;
  description: string;
  accent: string;
};

export function HomeModulesGrid({ modules }: { modules: HomeModule[] }) {
  return (
    <section className="home-section">
      <FadeIn>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="home-heading">{HOME_MODULES_SECTION.title}</h2>
          <p className="home-subheading">{HOME_MODULES_SECTION.subtitle}</p>
        </div>
      </FadeIn>
      <div className="home-module-grid mt-12">
        {modules.map((mod, i) => {
          const Icon = MODULE_ICONS[mod.href] ?? BookOpen;
          return (
            <FadeIn key={mod.href} delay={i * 60} className="h-full">
              <Link href={mod.href} className="home-card group flex h-full flex-col">
                <div className={`module-icon ${mod.accent}`}>
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-navy-900 group-hover:text-navy-700">{mod.title}</h3>
                <p className="mt-2 flex-1 text-[0.9375rem] leading-relaxed text-gray-600">{mod.description}</p>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-gold-600">
                  Explore <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </span>
              </Link>
            </FadeIn>
          );
        })}
      </div>
    </section>
  );
}

export function HomePopularTopics() {
  return (
    <section className="home-section bg-navy-50/60">
      <FadeIn>
        <h2 className="home-heading text-center">Popular Topics</h2>
        <p className="home-subheading mx-auto mt-2 max-w-2xl text-center">
          Jump straight to common office subjects
        </p>
      </FadeIn>
      <FadeIn delay={100}>
        <div className="home-topics-grid mt-8">
          {HOME_POPULAR_TOPICS.map((topic) => (
            <Link key={topic.label} href={topic.href} className="home-chip justify-center text-center">
              {topic.label}
            </Link>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}

export function HomeWhyOfficeMitra() {
  return (
    <section className="home-section">
      <FadeIn>
        <h2 className="home-heading text-center">Why OfficeMitra?</h2>
      </FadeIn>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:items-stretch">
        {HOME_WHY_OM.map((item, i) => {
          const Icon = WHY_ICONS[item.icon];
          return (
            <FadeIn key={item.title} delay={i * 70} className="h-full">
              <div className="home-card flex h-full flex-col text-center">
                <div className="module-icon mx-auto bg-gold-100 text-gold-700">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-semibold text-navy-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{item.description}</p>
              </div>
            </FadeIn>
          );
        })}
      </div>
    </section>
  );
}

export function HomeMoreHelp() {
  return (
    <section className="home-section bg-gradient-to-b from-navy-50/80 to-white">
      <FadeIn>
        <h2 className="home-heading text-center">{HOME_HELP_SECTION.title}</h2>
      </FadeIn>
      <div className="mt-10 grid gap-5 md:grid-cols-3 md:items-stretch">
        {HOME_HELP_SECTION.cards.map((card, i) => {
          const Icon = HELP_ICONS[card.icon];
          return (
            <FadeIn key={card.title} delay={i * 80} className="h-full">
              <div className="home-card flex h-full min-h-[220px] flex-col">
                <div className="module-icon bg-white text-navy-700 ring-1 ring-navy-100">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-navy-900">{card.title}</h3>
                <p className="mt-2 flex-1 text-[0.9375rem] leading-relaxed text-gray-600">{card.description}</p>
                <Link href={card.href} className="btn-secondary mt-6 w-fit text-sm">
                  {card.cta}
                </Link>
              </div>
            </FadeIn>
          );
        })}
      </div>
    </section>
  );
}

export function HomeTrust() {
  return (
    <section className="home-section">
      <FadeIn>
        <div className="home-card home-trust-card">
          <h2 className="home-heading text-center">{HOME_TRUST.title}</h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {HOME_TRUST.items.map((item) => (
              <li key={item} className="flex gap-3 rounded-xl bg-white/60 p-4 text-[0.9375rem] leading-relaxed text-gray-700">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </FadeIn>
    </section>
  );
}

export function HomeExpertBanner() {
  const b = HOME_EXPERT_BANNER;
  return (
    <section className="home-section !pb-20">
      <FadeIn>
        <div className="expert-banner home-expert-banner grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-gold-600">{b.eyebrow}</p>
            <h2 className="mt-3 text-2xl font-bold text-navy-900 md:text-3xl">{b.title}</h2>
            <p className="mt-3 max-w-2xl text-[0.9375rem] leading-relaxed text-gray-700">{b.description}</p>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row md:flex-col lg:flex-row">
            <Link href={b.primaryCta.href} className="btn-primary shadow-md shadow-gold-600/20">
              {b.primaryCta.label}
            </Link>
            <Link href={b.secondaryCta.href} className="btn-secondary">
              {b.secondaryCta.label}
            </Link>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
