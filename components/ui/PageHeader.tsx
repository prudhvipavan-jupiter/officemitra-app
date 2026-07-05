import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function PageHeader({
  title,
  description,
  breadcrumb,
}: {
  title: string;
  description?: string;
  breadcrumb?: { label: string; href?: string }[];
}) {
  return (
    <div className="page-header">
      {breadcrumb && breadcrumb.length > 0 && (
        <nav aria-label="Breadcrumb" className="mb-4 flex flex-wrap items-center gap-1 text-sm text-gray-500">
          {breadcrumb.map((item, i) => (
            <span key={item.label} className="flex items-center gap-1">
              {i > 0 && <ChevronRight className="h-3.5 w-3.5 text-gray-400" />}
              {item.href ? (
                <Link href={item.href} className="hover:text-navy-700">
                  {item.label}
                </Link>
              ) : (
                <span className="text-navy-800">{item.label}</span>
              )}
            </span>
          ))}
        </nav>
      )}
      <h1 className="text-3xl font-bold tracking-tight text-navy-900 md:text-4xl">{title}</h1>
      {description && <p className="mt-3 max-w-2xl text-base leading-relaxed text-gray-600">{description}</p>}
    </div>
  );
}
