import { LockKeyhole } from "lucide-react";
import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/admin-auth";
import { adminPasswordConfigured } from "@/lib/admin-session";

export const dynamic = "force-dynamic";

export default async function AdminLoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  if (await isAdmin()) redirect("/admin");
  const { error } = await searchParams;
  const configured = adminPasswordConfigured();

  return (
    <main className="grid min-h-screen place-items-center bg-[#fff7f8] px-5 py-12">
      <div className="w-full max-w-md rounded-[2rem] border border-[#ead9dc] bg-white p-8 shadow-xl sm:p-10">
        <LockKeyhole className="size-10 text-[#7b2d3e]" />
        <h1 className="mt-5 font-serif text-4xl font-bold text-[#4b2029]">Administration</h1>
        <p className="mt-3 text-sm leading-7 text-[#766267]">Connectez-vous pour gérer Reina Beauty.</p>
        {!configured && <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">Configuration manquante : ajoutez ADMIN_PASSWORD et ADMIN_SESSION_SECRET dans Vercel.</div>}
        {error && <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">Mot de passe incorrect.</div>}
        <form action="/api/admin/login" method="post" className="mt-7 space-y-4">
          <label className="block text-xs font-bold uppercase tracking-wider text-[#6f2636]" htmlFor="password">Mot de passe</label>
          <input id="password" name="password" type="password" required autoComplete="current-password" className="w-full rounded-2xl border border-[#d8b9c0] bg-white px-4 py-3 outline-none focus:border-[#6f2636]" />
          <button type="submit" disabled={!configured} className="w-full rounded-full bg-[#6f2636] px-6 py-3 text-xs font-bold uppercase tracking-wider text-white disabled:cursor-not-allowed disabled:opacity-50">Se connecter</button>
        </form>
        <a href="/" className="mt-6 inline-block text-sm font-semibold text-[#6f2636]">Retour au site</a>
      </div>
    </main>
  );
}
