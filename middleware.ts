import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { isDekkhotellEmailAllowed } from "@/lib/dekkhotell/allowed-emails";

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;
  const isLoginPage = pathname === "/dekkhotell/login";

  if (user && !isDekkhotellEmailAllowed(user.email)) {
    await supabase.auth.signOut();

    if (isLoginPage) {
      return response;
    }

    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/dekkhotell/login";
    loginUrl.search = "?error=unauthorized";
    return NextResponse.redirect(loginUrl);
  }

  if (!user && !isLoginPage) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/dekkhotell/login";
    return NextResponse.redirect(loginUrl);
  }

  if (user && isLoginPage) {
    const dashboardUrl = request.nextUrl.clone();
    dashboardUrl.pathname = "/dekkhotell";
    return NextResponse.redirect(dashboardUrl);
  }

  return response;
}

export const config = {
  matcher: ["/dekkhotell/:path*"],
};
