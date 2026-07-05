import { portalLinks } from "@/lib/site-data";

export default function PortalsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-bold text-navy-900">Official Portals</h1>
      <p className="mt-2 text-gray-600">Curated links to Andhra Pradesh government systems.</p>
      <ul className="mt-8 space-y-4">
        {portalLinks.map((p) => (
          <li key={p.url} className="card">
            <a href={p.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-navy-800 hover:text-gold-600">
              {p.name}
            </a>
            <p className="mt-1 text-sm text-gray-600">{p.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
