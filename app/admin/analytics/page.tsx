import { redirect } from "next/navigation";
import { AdminAnalyticsDashboard } from "@/components/admin/AdminAnalyticsDashboard";
import { isAdmin } from "@/lib/auth";

export default async function AdminAnalyticsPage() {
  if (!(await isAdmin())) redirect("/admin/login");

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-2xl font-bold text-navy-900">Site analytics</h1>
      <p className="mt-1 text-gray-600">Page views and visitor activity on the public website.</p>
      <div className="mt-8">
        <AdminAnalyticsDashboard />
      </div>
    </div>
  );
}
