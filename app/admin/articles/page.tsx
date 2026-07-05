import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/auth";
import { CmsEditor } from "@/components/admin/CmsEditor";

export default async function AdminArticlesPage() {
  if (!(await isAdmin())) redirect("/admin/login");
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <CmsEditor type="article" />
    </div>
  );
}
