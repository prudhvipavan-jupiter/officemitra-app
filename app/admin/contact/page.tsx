import { redirect } from "next/navigation";
import { AdminContactQueue } from "@/components/admin/AdminContactQueue";
import { isAdmin } from "@/lib/auth";

export default async function AdminContactPage() {
  if (!(await isAdmin())) redirect("/admin/login");

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-2xl font-bold text-navy-900">Contact inbox</h1>
      <p className="mt-1 text-gray-600">
        Expert guidance requests, feedback, and general enquiries from the contact and expert pages.
      </p>
      <div className="mt-8">
        <AdminContactQueue />
      </div>
    </div>
  );
}
