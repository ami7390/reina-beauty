"use client";

import Link from "next/link";
import { ManagedImage } from "@/components/managed-image";
import { motion } from "framer-motion";
import { ArrowDown, ArrowRight, Calendar, CheckCircle2, Coffee, Search, ShieldCheck, Sparkles, Star } from "lucide-react";
import { useMemo, useState } from "react";

const sections = [
  ["all", "Toutes"],
  ["coiffure", "Coiffures"],
  ["soins", "Soins"],
  ["couleur", "Coloration"],
  ["beaute", "Beauté"],
] as const;

const subcategories: Record<string, readonly [string, string][]> = {
  coiffure: [["locks", "Locks"], ["tresses", "Tresses"]],
  soins: [["soins-cheveux", "Cheveux"], ["soins-visage", "Visage"]],
  couleur: [["coloration", "Coloration"]],
  beaute: [["henne", "Henné artistique"], ["onglerie", "Manucure & pédicure"]],
};

const families = [
  { id: "locks", section: "coiffure", title: "Locks", subtitle: "Micro Locks, Starter Locks, locks traditionnelles, retwist & Instant Locks", price: "À partir de 15 000 FCFA", image: "/images/coiffures/locks/reina-installation-locks-tiktok.webp", href: "/prestations/locks" },
  { id: "tresses", section: "coiffure", title: "Tresses & coiffures protectrices", subtitle: "Nattes artistiques, Laïfou, Napi et styles protecteurs", price: "Tarif sur devis", image: "/images/coiffures/nattes/reina-nattes-artistiques.webp", href: "/prestations/tresses" },
  { id: "soins-cheveux", section: "soins", title: "Soins des cheveux", subtitle: "Nutrition, cuir chevelu et rituels capillaires", price: "Tarif sur devis", image: "/images/soins/capillaires/reina-bain-huiles.webp", href: "/prestations/soins-cheveux" },
  { id: "soins-visage", section: "soins", title: "Soins du visage", subtitle: "Nettoyage doux et éclat naturel", price: "Tarif sur devis", image: "/images/soins/visage/reina-soin-visage-tiktok.webp", href: "/prestations/soins-visage" },
  { id: "coloration", section: "couleur", title: "Coloration", subtitle: "Bordeaux, cuivré, miel, auburn et nuances personnalisées", price: "Tarif sur devis", image: "/images/coiffures/colorations/reina-coloration-bordeaux.webp", href: "/prestations/coloration" },
  { id: "henne", section: "beaute", title: "Henné artistique", subtitle: "Motifs fins, créations personnalisées et embellissement traditionnel", price: "Tarif sur devis", image: "/images/henne/reina-henne-client.webp", href: "/prestations/henne" },
  { id: "onglerie", section: "beaute", title: "Manucure & pédicure", subtitle: "Soin des mains, des pieds et finitions", price: "Tarif sur devis", image: "https://images.pexels.com/photos/34930135/pexels-photo-34930135/free-photo-of-professional-pedicure-session-at-beauty-salon.jpeg?auto=compress&dpr=1&h=750&w=1260", href: "/prestations/onglerie" },
] as const;

export default function PrestationsPage() {
  const [section, setSection] = useState("all");
  const [subcategory, setSubcategory] = useState("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("fr");
    const isDefaultView = section === "all" && subcategory === "all" && !normalized;
    const source = isDefaultView
      ? families.filter((family) => ["locks", "tresses", "soins-cheveux", "henne"].includes(family.id))
      : families;
    return source.filter((family) => {
      const matchesSection = section === "all" || family.section === section;
      const matchesSubcategory = subcategory === "all" || family.id === subcategory;
      const haystack = `${family.title} ${family.subtitle}`.toLocaleLowerCase("fr");
      return matchesSection && matchesSubcategory && (!normalized || haystack.includes(normalized));
    });
  }, [section, subcategory, query]);

  const reset = () => { setSection("all"); setSubcategory("all"); setQuery(""); };

  return <main className="min-h-screen bg-luxury-bg pb-20">
    <section className="relative overflow-hidden border-b border-luxury-line bg-white px-5 pb-10 pt-12 sm:pb-12 sm:pt-16 lg:px-8 lg:pt-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end">
          <div className="max-w-4xl">
            <p className="text-[10px] font-bold uppercase tracking-[.24em] text-luxury-pink">Prestations Reina Beauty</p>
            <h1 className="mt-4 font-serif text-[2.6rem] font-bold leading-[.98] text-luxury-wine sm:text-6xl lg:text-7xl">Votre beauté,<br/><span className="font-normal italic">votre rituel.</span></h1>
            <p className="mt-5 max-w-xl text-sm leading-7 text-luxury-muted">Parcourez nos univers et choisissez celui qui vous correspond. Chaque carte ouvre une page complète avec les variantes, les informations utiles et la réservation.</p>
          </div>
          <div className="rounded-3xl border border-luxury-line bg-luxury-bg p-5 sm:p-6">
            <p className="font-serif text-xl font-bold text-luxury-wine">Vous hésitez ?</p>
            <p className="mt-2 text-xs leading-6 text-luxury-muted">Expliquez-nous votre envie et nous vous orientons vers la prestation adaptée.</p>
            <a href="https://wa.me/22371989895?text=Bonjour%20Reina%20Beauty,%20je%20souhaite%20un%20conseil%20pour%20choisir%20ma%20prestation." target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-luxury-wine">Demander conseil <ArrowRight className="size-4" /></a>
          </div>
        </div>
        <div className="mt-9 flex items-center gap-5 border-t border-luxury-line pt-5">
          <a href="#explorer" className="inline-flex items-center gap-2 rounded-full bg-luxury-wine px-6 py-3 text-[10px] font-bold uppercase tracking-wider text-white">Voir les prestations <ArrowDown className="size-4" /></a>
          <span className="hidden text-[10px] font-semibold uppercase tracking-[.16em] text-luxury-muted sm:inline">Locks · Tresses · Soins · Henné · Beauté</span>
        </div>
      </div>
    </section>
    <section className="bg-luxury-wine px-5 py-6 text-white lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-4 text-center sm:grid-cols-2 lg:grid-cols-4">
        <PrestigeItem icon={CheckCircle2}>Diagnostic personnalisé</PrestigeItem>
        <PrestigeItem icon={Coffee}>Accueil attentionné</PrestigeItem>
        <PrestigeItem icon={ShieldCheck}>Cadre intime et féminin</PrestigeItem>
        <PrestigeItem icon={Star}>Finitions soignées</PrestigeItem>
      </div>
    </section>

    <section id="explorer" className="mx-auto max-w-7xl scroll-mt-28 px-5 pt-12 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[220px_minmax(0,1fr)]">
        <aside className="h-fit rounded-3xl border border-luxury-line bg-white p-4 shadow-sm lg:sticky lg:top-28">
          <button type="button" onClick={reset} className={`w-full rounded-2xl px-4 py-3 text-left text-xs font-bold transition ${section === "all" ? "bg-luxury-wine text-white" : "text-luxury-wine hover:bg-luxury-bg"}`}>Toutes</button>
          <div className="mt-2 space-y-2">
            {sections.filter(([id]) => id !== "all").map(([id, label]) => <div key={id} className="rounded-2xl border border-luxury-line/80 p-2">
              <button type="button" onClick={() => { setSection(id); setSubcategory("all"); }} className={`w-full rounded-xl px-3 py-2 text-left text-xs font-bold transition ${section === id && subcategory === "all" ? "bg-luxury-champagne text-luxury-wine" : "text-luxury-text hover:bg-luxury-bg"}`}>{label}</button>
              <div className="mt-1 space-y-1 border-l border-luxury-line pl-3">
                {(subcategories[id] ?? []).map(([subId, subLabel]) => <button key={subId} type="button" onClick={() => { setSection(id); setSubcategory(subId); }} className={`block w-full rounded-lg px-2 py-1.5 text-left text-[11px] transition ${subcategory === subId ? "font-bold text-luxury-wine" : "text-luxury-muted hover:text-luxury-wine"}`}>{subLabel}</button>)}
              </div>
            </div>)}
          </div>
        </aside>

        <div>
          <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div><p className="text-[10px] font-bold uppercase tracking-[.2em] text-luxury-pink">Nos univers</p><h2 className="mt-2 font-serif text-3xl font-bold text-luxury-wine">Choisissez votre prestation</h2></div>
            <label className="relative block w-full sm:max-w-xs"><Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-luxury-muted" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Rechercher" className="w-full rounded-full border border-luxury-line bg-white py-3 pl-11 pr-4 text-xs outline-none focus:border-luxury-wine" /></label>
          </div>

          {filtered.length === 0 ? <div className="rounded-3xl border border-luxury-line bg-white px-6 py-20 text-center"><p className="text-sm text-luxury-muted">Aucun univers ne correspond à votre sélection.</p><button type="button" onClick={reset} className="mt-5 text-xs font-bold uppercase text-luxury-wine underline">Réinitialiser</button></div> :
            <motion.div layout className="grid gap-6 md:grid-cols-2">
              {filtered.map((family) => <motion.article layout key={family.id} className="group overflow-hidden rounded-3xl border border-luxury-line bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                <Link href={family.href} className="block">
                  <div className="h-56 overflow-hidden"><ManagedImage src={family.image} alt={family.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" /></div>
                  <div className="p-5">
                    <h3 className="font-serif text-xl font-bold text-luxury-text">{family.title}</h3>
                    <p className="mt-1 line-clamp-2 text-xs leading-5 text-luxury-muted">{family.subtitle}</p>
                    <div className="mt-4 flex items-center justify-between gap-3 border-t border-luxury-line pt-4"><span className="text-[10px] font-bold text-luxury-wine">{family.price}</span><span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-luxury-wine">Découvrir <ArrowRight className="size-3.5" /></span></div>
                  </div>
                </Link>
              </motion.article>)}
            </motion.div>}
        </div>
      </div>
    </section>

    <section className="mx-auto max-w-5xl px-5 pt-20 lg:px-8"><div className="grid items-center gap-8 rounded-3xl border border-luxury-line bg-white p-8 shadow-xl sm:p-12 lg:grid-cols-2"><div><p className="text-[10px] font-bold uppercase tracking-[.22em] text-luxury-pink">Diagnostic sur mesure</p><h2 className="mt-3 font-serif text-3xl font-bold sm:text-4xl">Vous hésitez ?</h2><p className="mt-4 text-sm leading-7 text-luxury-muted">Envoyez une photo et le résultat souhaité. L’équipe vous orientera vers la prestation la plus adaptée et vous confirmera le tarif.</p></div><a href="https://wa.me/22371989895?text=Bonjour%20Reina%20Beauty,%20je%20souhaite%20un%20diagnostic%20et%20un%20devis%20personnalis%C3%A9." target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 rounded-full bg-luxury-wine px-7 py-4 text-xs font-bold uppercase tracking-wider text-white"><Calendar className="size-4" /> Demander un diagnostic</a></div></section>
  </main>;
}

function PrestigeItem({ icon: Icon, children }: { icon: React.ComponentType<{ className?: string }>; children: React.ReactNode }) {
  return <div className="flex items-center justify-center gap-3"><Icon className="size-5 shrink-0 text-luxury-champagne" /><span className="text-[10px] font-bold uppercase tracking-[.16em]">{children}</span></div>;
}
