import "server-only";

import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { createClient as createSupaClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

type CookieToSet = { name: string; value: string; options?: CookieOptions };

/**
 * Read-only / SSR Supabase client tied to the current request's cookies.
 * Use this in Server Components, Route Handlers and Server Actions.
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet: CookieToSet[]) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch {
            // Setting cookies is only allowed inside Server Actions /
            // Route Handlers. Ignore in pure RSC reads.
          }
        },
      },
    }
  );
}

/**
 * Cookie-free server client for public, cacheable reads.
 * Safe to use inside unstable_cache because it does not touch
 * dynamic request APIs like cookies()/headers().
 */
export function createPublicClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  if (!url || !key) {
    throw new Error("Supabase public credentials are missing.");
  }
  return createSupaClient(url, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
    global: {
      fetch,
    },
  });
}

/**
 * Privileged client (service role). Use ONLY on the server for
 * trusted operations such as contact-message inserts triggered by
 * untrusted public input where we still want to bypass RLS, or
 * for admin maintenance tasks.
 */
export function createServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  if (!url || !key) {
    throw new Error("Supabase service role credentials are missing.");
  }
  return createSupaClient(url, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
