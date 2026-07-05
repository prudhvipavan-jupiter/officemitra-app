import Link from "next/link";

export default function ExpertPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 text-center">
      <h1 className="text-3xl font-bold text-navy-900">Expert Assistance</h1>
      <p className="mt-4 text-gray-700">
        Personalized guidance from experienced Health Department administrative practitioners.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/contact" className="btn-primary">Contact OfficeMitra</Link>
        <Link href="/community" className="btn-secondary">Ask in Community</Link>
      </div>
    </div>
  );
}
