import { NextResponse } from "next/server";
import { getSiteLogo, SITE_LOGO_ID } from "@/lib/site/store";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (id !== SITE_LOGO_ID) return new NextResponse("Not found", { status: 404 });
  const logo = await getSiteLogo();
  if (!logo) return new NextResponse("Not found", { status: 404 });
  return new NextResponse(new Uint8Array(logo.data), {
    headers: {
      "Content-Type": logo.mime_type,
      "Content-Disposition": `inline; filename="${logo.filename}"`,
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
