"use client";

import { ManagedImage } from "@/components/managed-image";

import { AnimatePresence, motion } from "framer-motion";
import { Calendar, CheckCircle2, CircleDollarSign, Clock3, Coffee, Search, ShieldCheck, Sparkles, Star } from "lucide-react";
import { useMemo, useState } from "react";
import { services } from "@/lib/reina-data";

const sections = [
  ["all", "Toutes"],
  ["coiffure", "Coiffures"],
  ["soins", "Soins"],
  ["couleur", "Coloration"],
  ["beaute", "Beauté"],
] as const;

const subcategories: Record<string, readonly [string, string][]> = {
  coiffure: [["locks", "Micro Locks"], ["tresses", "Tresses & coiffures protectrices"]],
  soins: [["soins", "Cheveux"], ["visage", "Visage"]],
  couleur: [["teinture", "Coloration"]],
  beaute: [["henne", "Henné"], ["maquillage", "Maquillage"], ["onglerie", "Manucure & pédicure"]],
};

function serviceSection(category: string) {
  if (["locks", "tresses"].includes(category)) return "coiffure";
  if (["soins", "visage"].includes(category)) return "soins";
  if (category === "teinture") return "couleur";
  return "beaute";
}

export default function PrestationsPage() {
  const [section, setSection] = useState("all");
  const [subcategory, setSubcategory] = useState("all");
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("fr");
    return services.filter((service) => {
      const matchesSection = section === "all" || serviceSection(service.category) === section;
      const matchesSubcategory = subcategory === "all" || service.category === subcategory;
      const haystack = `${service.title} ${service.subtitle} ${service.description}`.toLocaleLowerCase("fr");
      return matchesSection && matchesSubcategory && (!normalized || haystack.includes(normalized));
    });
  }, [section, subcategory, query]);

  const reset = () => { setSection("all"); setSubcategory("all"); setQuery(""); };

  return (
    <main className="min-h-screen bg-luxury-bg pb-20">
      <section className="border-b border-luxury-line bg-gradient-to-b from-white to-luxury-bg px-5 py-16 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="luxury-badge"><Sparkles className="size-4" /> Expertise & haute précision</span>
          <h1 className="mt-5 font-serif text-5xl font-bold text-luxury-wine sm:text-6xl">Nos Prestations</h1>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-luxury-muted">Découvrez toutes les expertises Reina Beauty dans un cadre intime exclusivement réservé aux femmes. Chaque rendez-vous est adapté à vos besoins. Les tarifs indiqués sont des repères et sont confirmés selon la longueur, la densité et la prestation choisie.</p>
        </div>
      </section>

      <section className="bg-luxury-wine px-5 py-7 text-white lg:px-8" aria-label="Attentions incluses">
        <div className="mx-auto grid max-w-7xl gap-5 text-center sm:grid-cols-2 lg:grid-cols-4">
          <PrestigeItem icon={CheckCircle2}>Diagnostic personnalisé</PrestigeItem>
          <PrestigeItem icon={Coffee}>Boisson de bienvenue</PrestigeItem>
          <PrestigeItem icon={ShieldCheck}>Cadre intime et féminin</PrestigeItem>
          <PrestigeItem icon={Star}>Finitions soignées</PrestigeItem>
        </div>
      </section>

      <section className="sticky top-20 z-40 border-b border-luxury-line bg-white/95 px-5 py-4 shadow-sm backdrop-blur-xl lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <label className="relative block w-full lg:max-w-xs">
            <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-luxury-muted" />
            <span className="sr-only">Rechercher une prestation</span>
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Rechercher : locks, miel, henné…" className="w-full rounded-full border border-luxury-line bg-luxury-bg py-3 pl-11 pr-4 text-xs outline-none focus:border-luxury-wine" />
          </label>
          <div className="text-[10px] font-semibold uppercase tracking-[.16em] text-luxury-muted">Recherche rapide des prestations</div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pt-12 lg:px-8">
        <div className="overflow-hidden rounded-[2rem] border border-luxury-line bg-white shadow-xl shadow-black/5">
          <div className="border-b border-luxury-line bg-gradient-to-r from-luxury-bg via-white to-luxury-bg px-6 py-7 text-center sm:px-9">
            <p className="text-[9px] font-bold uppercase tracking-[.24em] text-luxury-pink">Navigation rapide</p>
            <h2 className="mt-2 font-serif text-3xl font-bold text-luxury-wine">Filtrer nos prestations</h2>
            <p className="mx-auto mt-2 max-w-2xl text-xs leading-6 text-luxury-muted">Choisissez une catégorie, puis une sous-catégorie pour afficher uniquement les prestations qui vous intéressent.</p>
            <button type="button" onClick={reset} className={`mt-5 rounded-full border px-5 py-2.5 text-[10px] font-bold uppercase tracking-wider transition ${section === "all" && subcategory === "all" ? "border-luxury-wine bg-luxury-wine text-white" : "border-luxury-line bg-white text-luxury-wine hover:border-luxury-pink"}`}>Toutes les prestations</button>
          </div>

          <div className="grid divide-y divide-luxury-line md:grid-cols-2 md:divide-x md:divide-y-0 xl:grid-cols-4">
            {sections.filter(([id]) => id !== "all").map(([id, label]) => (
              <div key={id} className={`p-6 sm:p-7 ${section === id ? "bg-luxury-champagne/35" : "bg-white"}`}>
                <button type="button" onClick={() => { setSection(id); setSubcategory("all"); }} className="group flex w-full items-center justify-between gap-3 text-left">
                  <div>
                    <span className="text-[8px] font-bold uppercase tracking-[.2em] text-luxury-pink">Catégorie</span>
                    <h3 className="mt-1 font-serif text-2xl font-bold text-luxury-wine transition group-hover:text-luxury-pink">{label}</h3>
                  </div>
                  <span className={`flex size-7 shrink-0 items-center justify-center rounded-full border text-xs transition ${section === id && subcategory === "all" ? "border-luxury-wine bg-luxury-wine text-white" : "border-luxury-line text-luxury-muted group-hover:border-luxury-pink"}`}>✓</span>
                </button>

                <div className="mt-5 border-t border-luxury-line pt-4">
                  <p className="mb-3 text-[8px] font-bold uppercase tracking-[.18em] text-luxury-muted">Sous-catégories</p>
                  <div className="flex flex-wrap gap-2">
                    {(subcategories[id] ?? []).map(([subId, subLabel]) => (
                      <button key={subId} type="button" onClick={() => { setSection(id); setSubcategory(subId); }} className={`rounded-full border px-3.5 py-2 text-[9px] font-bold uppercase tracking-wider transition ${section === id && subcategory === subId ? "border-luxury-wine bg-luxury-wine text-white shadow-sm" : "border-luxury-line bg-luxury-bg text-luxury-wine hover:border-luxury-pink hover:bg-luxury-champagne"}`}>{subLabel}</button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pt-16 lg:px-8">
        <div className="mb-8 flex flex-col gap-3 border-b border-luxury-line pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[.2em] text-luxury-pink">Prestations disponibles</p>
            <h2 className="mt-2 font-serif text-3xl font-bold text-luxury-wine">{sections.find(([id]) => id === section)?.[1] ?? "Toutes les prestations"}{subcategory !== "all" ? ` · ${Object.values(subcategories).flat().find(([id]) => id === subcategory)?.[1] ?? ""}` : ""}</h2>
          </div>
          {(section !== "all" || subcategory !== "all" || query) && <button type="button" onClick={reset} className="text-[10px] font-bold uppercase tracking-wider text-luxury-wine underline underline-offset-4">Voir toutes les prestations</button>}
        </div>
        {filtered.length === 0 ? <div className="rounded-3xl border border-luxury-line bg-white px-6 py-20 text-center"><p className="text-sm text-luxury-muted">Aucune prestation ne correspond à votre sélection.</p><button type="button" onClick={reset} className="mt-5 text-xs font-bold uppercase text-luxury-wine underline">Réinitialiser</button></div> :
          <motion.div layout className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((service) => <motion.article layout initial={{ opacity: 0, scale: .94 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: .94 }} key={service.id} className="group flex flex-col overflow-hidden rounded-3xl border border-luxury-line bg-white shadow-sm transition hover:shadow-xl">
                <div className="relative h-56 overflow-hidden">
                  <ManagedImage src={service.image} alt={service.title} className={`h-full w-full transition duration-700 group-hover:scale-105 ${service.title === "Napi" ? "bg-luxury-bg object-contain object-top" : "object-cover"}`} />
                  {service.highlight && <span className="absolute left-4 top-4 rounded-full bg-luxury-wine px-3 py-1 text-[9px] font-bold uppercase tracking-wider text-white">{service.highlight}</span>}
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <h2 className="font-serif text-2xl font-bold">{service.title}</h2>
                  <p className="mt-1 text-xs font-semibold text-luxury-pink">{service.subtitle}</p>
                  <p className="mt-4 flex-1 text-xs leading-6 text-luxury-muted">{service.description}</p>
                  <div className="mt-6 border-t border-luxury-line pt-5">
                    <p className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-luxury-muted"><Clock3 className="size-3.5" /> Durée indicative : {service.duration}</p>
                    <div className="mt-3 flex items-center justify-between gap-3 rounded-2xl bg-luxury-bg px-4 py-3">
                      <span className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-wider text-luxury-muted"><CircleDollarSign className="size-4 text-luxury-pink" /> Plage tarifaire</span>
                      <strong className="text-right text-xs text-luxury-wine">{service.price}</strong>
                    </div>
                    <a href={`https://wa.me/22371989895?text=${encodeURIComponent(`Bonjour Reina Beauty, je souhaite réserver la prestation : ${service.title}. Pouvez-vous me confirmer le tarif selon mes besoins ?`)}`} target="_blank" rel="noreferrer" className="mt-4 flex w-full items-center justify-center gap-2 rounded-full border border-luxury-line bg-luxury-bg px-5 py-3 text-xs font-bold uppercase tracking-wider text-luxury-wine transition hover:bg-luxury-wine hover:text-white"><Calendar className="size-4" /> Réserver cette prestation</a>
                  </div>
                </div>
              </motion.article>)}
            </AnimatePresence>
          </motion.div>}
      </section>

      <section className="mx-auto max-w-5xl px-5 pt-20 lg:px-8">
        <div className="grid items-center gap-8 rounded-3xl border border-luxury-line bg-white p-8 shadow-xl sm:p-12 lg:grid-cols-2">
          <div><p className="text-[10px] font-bold uppercase tracking-[.22em] text-luxury-pink">Diagnostic sur mesure</p><h2 className="mt-3 font-serif text-3xl font-bold sm:text-4xl">Une prestation complexe ? Parlons-en.</h2><p className="mt-4 text-sm leading-7 text-luxury-muted">La création de Micro Locks, les colorations et certaines coiffures dépendent de la longueur, de la densité et du résultat souhaité. Envoyez une photo sur WhatsApp pour recevoir un conseil personnalisé.</p></div>
          <a href={`https://wa.me/22371989895?text=${encodeURIComponent("Bonjour Reina Beauty, je souhaite un diagnostic et un devis personnalisé pour mes cheveux.")}`} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 rounded-full bg-luxury-wine px-7 py-4 text-xs font-bold uppercase tracking-wider text-white"><Calendar className="size-4" /> Demander un diagnostic</a>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 pt-20 lg:px-8">
        <div className="rounded-3xl bg-luxury-footer p-8 text-white shadow-2xl sm:p-12">
          <div className="mx-auto max-w-xl text-center"><ShieldCheck className="mx-auto size-9 text-luxury-champagne" /><h2 className="mt-4 font-serif text-3xl font-bold">Politique du salon</h2><p className="mt-2 text-xs text-white/70">Pour une expérience fluide, intime et respectueuse.</p></div>
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            <Policy title="100% féminin">Cadre exclusivement réservé aux femmes, avec respect de votre intimité et de votre confort.</Policy>
            <Policy title="Ponctualité">Merci d’arriver quelques minutes avant votre créneau. Un retard important peut entraîner un report.</Policy>
            <Policy title="Réservation">Rendez-vous ouverts 7j/7 par WhatsApp ou téléphone au 71 98 98 95.</Policy>
          </div>
        </div>
      </section>
    </main>
  );
}

function Policy({ title, children }: { title: string; children: React.ReactNode }) {
  return <div className="rounded-2xl bg-white/10 p-6"><h3 className="text-xs font-bold uppercase tracking-wider text-luxury-champagne">{title}</h3><p className="mt-3 text-xs leading-6 text-white/80">{children}</p></div>;
}

function PrestigeItem({ icon: Icon, children }: { icon: React.ComponentType<{ className?: string }>; children: React.ReactNode }) {
  return <div className="flex items-center justify-center gap-3"><Icon className="size-5 shrink-0 text-luxury-champagne" /><span className="text-[10px] font-bold uppercase tracking-[.16em]">{children}</span></div>;
}
