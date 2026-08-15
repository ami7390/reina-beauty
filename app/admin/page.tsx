import { LockKeyhole, LogOut } from "lucide-react";
import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/admin-auth";
import { AdminMessages } from "@/components/admin-messages";
import { AdminProducts } from "@/components/admin-products";
import { AdminMaintenance } from "@/components/admin-maintenance";
import { AdminSiteImages } from "@/components/admin-site-images";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!(await isAdmin())) redirect("/admin/login");

  return <main className="min-h-screen bg-[linear-gradient(180deg,#f8ecee_0,#fff9fa_280px,#fff7f8_100%)] px-5 py-12 lg:px-8"><div className="mx-auto max-w-7xl"><div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"><div><span className="inline-flex items-center gap-2 rounded-full border border-[#ddc1c7] bg-white/70 px-4 py-2 text-[10px] font-bold uppercase tracking-[.18em] text-[#6f2636]"><LockKeyhole className="size-4" /> Espace privé</span><h1 className="mt-5 font-serif text-5xl font-bold text-[#4b2029] sm:text-6xl">Administration Reina Beauty</h1><p className="mt-3 text-sm text-[#766267]">Gérez les messages, le catalogue et la visibilité du site.</p></div><form action="/api/admin/logout" method="post"><button type="submit" className="inline-flex w-fit items-center gap-2 rounded-full border border-[#d8b9c0] bg-white px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-[#6f2636]"><LogOut className="size-4" /> Se déconnecter</button></form></div><nav className="mt-8 flex flex-wrap gap-3"><a href="#maintenance" className="rounded-full bg-[#6f2636] px-5 py-3 text-[10px] font-bold uppercase text-white">Maintenance</a><a href="#messages" className="rounded-full border border-[#d8b9c0] bg-white px-5 py-3 text-[10px] font-bold uppercase text-[#6f2636]">Messages</a><a href="#produits" className="rounded-full border border-[#d8b9c0] bg-white px-5 py-3 text-[10px] font-bold uppercase text-[#6f2636]">Produits</a><a href="#images-site" className="rounded-full border border-[#d8b9c0] bg-white px-5 py-3 text-[10px] font-bold uppercase text-[#6f2636]">Images du site</a></nav><AdminMaintenance /><section id="messages"><AdminMessages initialMessages={[]} /></section><section id="produits" className="mt-20 border-t border-[#e8d3d8] pt-12"><p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#a14d60]">Gestion du catalogue</p><h2 className="mt-2 font-serif text-4xl font-bold text-[#4b2029]">Produits Reina Beauty</h2><AdminProducts /></section><AdminSiteImages /></div></main>;
}
