import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/auth";
import { listContent } from "@/lib/cms/store";
import { listDiscussions } from "@/lib/community/store";

export default async function AdminPage() {
  if (!(await isAdmin())) redirect("/admin/login");

  const [articles, documents, updates, faq, pending] = await Promise.all([
    listContent("article", true),
    listContent("document", true),
    listContent("update", true),
    listContent("faq", true),
    listDiscussions("pending"),
  ]);

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-2xl font-bold text-navy-900">Admin dashboard</h1>
      <p className="mt-1 text-gray-600">Fresh OfficeMitra — English only, empty until you publish content.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {[
          { href: "/admin/articles", label: "Articles", count: articles.length },
          { href: "/admin/documents", label: "Documents", count: documents.length },
          { href: "/admin/updates", label: "Updates", count: updates.length },
          { href: "/admin/faq", label: "FAQ", count: faq.length },
          { href: "/admin/community", label: "Community queue", count: pending.length },
        ].map((item) => (
          <Link key={item.href} href={item.href} className="card">
            <p className="font-semibold text-navy-900">{item.label}</p>
            <p className="text-2xl font-bold text-gold-600">{item.count}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
