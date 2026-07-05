import { redirect } from "next/navigation";
import { AdminCommunityQueue } from "@/components/admin/AdminCommunityQueue";
import { isAdmin } from "@/lib/auth";

export default async function AdminCommunityPage() {
  if (!(await isAdmin())) redirect("/admin/login");

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-2xl font-bold text-navy-900">Community moderation</h1>
      <p className="mt-1 text-gray-600">Review staff questions before publishing to the public community page.</p>
      <div className="mt-8">
        <AdminCommunityQueue />
      </div>
    </div>
  );
}
