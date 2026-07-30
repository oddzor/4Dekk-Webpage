import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Dashboard from "@/components/dekkhotell/Dashboard";

export default async function DekkhotellPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/dekkhotell/login");
  }

  return <Dashboard userEmail={user.email ?? ""} />;
}
