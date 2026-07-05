"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

function useCountUp(target: number, active: boolean, duration = 1400) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    let start: number | null = null;
    let frame: number;
    const step = (ts: number) => {
      if (start === null) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [target, active, duration]);

  return value;
}

function StatCard({
  value,
  suffix,
  label,
  href,
  delay,
}: {
  value: number;
  suffix: string;
  label: string;
  href: string;
  delay: number;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [active, setActive] = useState(false);
  const count = useCountUp(value, active);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Link
      ref={ref}
      href={href}
      className="home-stat-card group"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <p className="text-3xl font-bold tracking-tight text-navy-900 md:text-4xl">
        {count}
        {suffix}
      </p>
      <p className="mt-2 text-sm font-medium text-gray-600 group-hover:text-navy-800">{label}</p>
    </Link>
  );
}

export function HomeStats({
  stats,
}: {
  stats: { value: number; suffix: string; label: string; href: string }[];
}) {
  return (
    <section className="border-b border-navy-100/80 bg-gradient-to-b from-white to-navy-50/50 px-4 py-12 md:py-16">
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
        {stats.map((item, i) => (
          <StatCard key={item.label} {...item} delay={i * 80} />
        ))}
      </div>
    </section>
  );
}
