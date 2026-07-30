import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { isDekkhotellEmailAllowed } from "@/lib/dekkhotell/allowed-emails";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/dekkhotell";

  if (code) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      if (!isDekkhotellEmailAllowed(data.user?.email)) {
        await supabase.auth.signOut();
        return NextResponse.redirect(
          `${origin}/dekkhotell/login?error=unauthorized`,
        );
      }

      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  return NextResponse.redirect(`${origin}/dekkhotell/login?error=auth`);
}
