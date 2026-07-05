import Link from "next/link";
import { redirect } from "next/navigation";
import {
  BarChart3,
  Bell,
  BookOpen,
  FolderOpen,
  HelpCircle,
  Inbox,
  MessageCircle,
  Settings,
} from "lucide-react";
import { isAdmin } from "@/lib/auth";
import { getAdminDashboardStats } from "@/lib/site-stats";

export default async function AdminPage() {
  if (!(await isAdmin())) redirect("/admin/login");

  const { articles, documents, updates, faq, pendingCommunity, newContacts, publicStats } =
    await getAdminDashboardStats();

  const published = {
    articles: articles.filter((a) => a.status === "published").length,
    documents: documents.filter((d) => d.status === "published").length,
    updates: updates.filter((u) => u.status === "published").length,
    faq: faq.filter((f) => f.status === "published").length,
  };

  const modules = [
    {
      href: "/admin/articles",
      label: "Articles",
      icon: BookOpen,
      total: articles.length,
      published: published.articles,
      hint: "Knowledge Hub content",
    },
    {
      href: "/admin/documents",
      label: "Documents",
      icon: FolderOpen,
      total: documents.length,
      published: published.documents,
      hint: "GOs, circulars, forms",
    },
    {
      href: "/admin/updates",
      label: "Updates",
      icon: Bell,
      total: updates.length,
      published: published.updates,
      hint: "Policy change notices",
    },
    {
      href: "/admin/faq",
      label: "FAQ",
      icon: HelpCircle,
      total: faq.length,
      published: published.faq,
      hint: `${publicStats.faq} live on site`,
    },
    {
      href: "/admin/community",
      label: "Community",
      icon: MessageCircle,
      total: pendingCommunity.length,
      published: publicStats.community,
      hint: pendingCommunity.length ? `${pendingCommunity.length} pending review` : "Moderation queue",
      alert: pendingCommunity.length > 0,
    },
    {
      href: "/admin/contact",
      label: "Contact inbox",
      icon: Inbox,
      total: newContacts,
      published: null,
      hint: newContacts ? `${newContacts} new message${newContacts > 1 ? "s" : ""}` : "Expert & general enquiries",
      alert: newContacts > 0,
    },
    {
      href: "/admin/analytics",
      label: "Analytics",
      icon: BarChart3,
      total: null,
      published: null,
      hint: "Page views and visitor stats",
    },
    {
      href: "/admin/settings",
      label: "Site settings",
      icon: Settings,
      total: null,
      published: null,
      hint: "Logo, branding",
    },
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">Admin dashboard</h1>
          <p className="mt-1 text-gray-600">
            Manage content, moderate community, and respond to contact requests.
          </p>
        </div>
        <p className="text-sm text-gray-500">
          Live: {publicStats.faq} FAQ · {publicStats.tools} tools · {publicStats.portals} portals
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {modules.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`card group ${item.alert ? "border-gold-300 ring-1 ring-gold-200" : ""}`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="module-icon bg-navy-50 text-navy-700">
                <item.icon className="h-5 w-5" />
              </div>
              {item.total !== null && (
                <span
                  className={`text-2xl font-bold ${item.alert ? "text-gold-600" : "text-navy-900"}`}
                >
                  {item.total}
                </span>
              )}
            </div>
            <p className="mt-4 font-semibold text-navy-900 group-hover:text-navy-700">{item.label}</p>
            <p className="mt-1 text-sm text-gray-600">{item.hint}</p>
            {item.published !== null && (
              <p className="mt-2 text-xs text-gray-500">{item.published} published on site</p>
            )}
          </Link>
        ))}
      </div>

      <div className="mt-10 rounded-2xl border border-navy-100 bg-white p-6">
        <h2 className="font-semibold text-navy-900">Quick actions</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link href="/admin/faq" className="btn-secondary text-sm">
            Manage FAQ
          </Link>
          <Link href="/admin/settings" className="btn-secondary text-sm">
            Upload site logo
          </Link>
          <Link href="/admin/contact" className="btn-secondary text-sm">
            View contact inbox
          </Link>
          <Link href="/" className="btn-secondary text-sm">
            Preview public site
          </Link>
        </div>
      </div>
    </div>
  );
}
