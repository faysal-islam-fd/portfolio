import { NextResponse } from "next/server";
import { getAbout } from "@/lib/queries";

export async function GET() {
  const about = await getAbout();
  if (about?.resume_url) {
    return NextResponse.redirect(about.resume_url, 302);
  }
  return NextResponse.json(
    { error: "Resume not configured." },
    { status: 404 }
  );
}
