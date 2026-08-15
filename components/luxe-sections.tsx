"use client";

import { ManagedImage } from "@/components/managed-image";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CheckCircle2, ChevronDown, Leaf, ShieldCheck, Sparkles, Star } from "lucide-react";
import { useState } from "react";

const ritual = [
  { step: "01", title: "Diagnostic offert", text: "Analyse personnalisée de votre cuir chevelu, de vos cheveux et de votre objectif." },
  { step: "02", title: "Accueil privilégié", text: "Installez-vous dans notre cadre intime et profitez d’une boisson d’accueil." },
  { step: "03", title: "Soin sur mesure", text: "Application d’un protocole adapté à la prestation choisie et à vos besoins." },
  { step: "04", title: "Finition royale", text: "Coiffage haute précision et conseils d’entretien adaptés à votre routine." },
];

const recommendations: Record<string, { title: string; text: string }> = {
  "Démarrer ou entretenir des Micro Locks": { title: "Diagnostic Micro Locks", text: "Une consultation suivie d’un protocole adapté à la densité, la longueur et l’état de vos locks." },
  "Stimuler la pousse et limiter la casse": { title: "Rituel Pousse Botanique", text: "Une routine à base d’huiles, de sérum et de baume pour nourrir la fibre et prendre soin du cuir chevelu." },
  "Réaliser une coiffure protectrice": { title: "Coiffure Protectrice Sur Mesure", text: "Des tresses ou une coiffure étudiée selon votre cuir chevelu, votre style et votre quotidien." },
  "Sublimer mes mains ou pieds au henné": { title: "Henné Royal", text: "Un dessin personnalisé réalisé avec précision dans un cadre intime exclusivement féminin." },
};

const reviews = [
  { name: "Aïssata T.", role: "Micro Locks", text: "Une précision remarquable dans le resserrage de mes Micro Locks. Le cadre est calme, propre et privé." },
  { name: "Fatoumata K.", role: "Soin du visage", text: "Le soin au miel et aux poudres naturelles a laissé ma peau douce, propre et lumineuse." },
  { name: "Mariam S.", role: "Henné & tresses", text: "Un dessin au henné très fin, un accueil chaleureux et beaucoup de professionnalisme." },
];

const faqs = [
  { q: "Le salon est-il totalement privé et réservé aux femmes ?", a: "Oui. Reina Beauty est un espace intime exclusivement dédié aux femmes, pensé pour votre confort et votre confidentialité." },
  { q: "Combien de temps prend l’installation de Micro Locks ?", a: "La durée moyenne varie entre 4 et 8 heures selon la longueur, la densité et le résultat souhaité. Une estimation est donnée après diagnostic." },
  { q: "À quoi sert le soin au miel et aux poudres ?", a: "Ce protocole est un soin du visage. Il est adapté à votre peau après un échange avec l’équipe Reina Beauty." },
  { q: "Comment se déroulent les formations beauté ?", a: "Les sessions en henné, tresses et maquillage sont proposées en petit groupe ou en individuel, avec une pratique encadrée." },
  { q: "Comment réserver un rendez-vous ?", a: "La réservation se fait directement par WhatsApp ou par téléphone au 71 98 98 95." },
];

export function LuxeSections() {
  const [quizSelection, setQuizSelection] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [comparison, setComparison] = useState(50);
  const recommendation = recommendations[quizSelection];

  return (
    <div className="space-y-24 bg-luxury-bg py-20 lg:space-y-32 lg:py-28">
      <section className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionTitle eyebrow="L’exclusivité Reina" title="Votre parcours de soin" />
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {ritual.map((item) => (
            <motion.article whileHover={{ y: -6 }} key={item.step} className="relative overflow-hidden rounded-3xl border border-luxury-line bg-white p-8 shadow-sm">
              <span className="absolute right-5 top-3 font-serif text-5xl font-bold text-luxury-champagne">{item.step}</span>
              <h3 className="relative mt-8 font-serif text-xl font-bold text-luxury-wine">{item.title}</h3>
              <p className="relative mt-3 text-xs leading-6 text-luxury-muted">{item.text}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-luxury-line bg-white p-7 text-center shadow-xl sm:p-12">
          <span className="luxury-badge"><Sparkles className="size-4" /> Diagnostic intelligent</span>
          <h2 className="mt-5 font-serif text-3xl font-bold sm:text-4xl">Trouvez le soin parfait pour votre couronne</h2>
          <p className="mx-auto mt-3 max-w-lg text-sm text-luxury-muted">Choisissez votre objectif principal pour obtenir une recommandation immédiate.</p>
          <div className="mx-auto mt-8 max-w-xl">
            {!recommendation ? (
              <div className="space-y-3">
                {Object.keys(recommendations).map((option) => (
                  <button key={option} type="button" onClick={() => setQuizSelection(option)} className="group flex w-full items-center justify-between rounded-2xl border border-luxury-line bg-luxury-bg p-4 text-left text-xs font-semibold transition hover:bg-luxury-wine hover:text-white">
                    {option}<ArrowRight className="size-4 opacity-50 transition group-hover:translate-x-1 group-hover:opacity-100" />
                  </button>
                ))}
              </div>
            ) : (
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="rounded-3xl border border-luxury-line bg-luxury-bg p-7">
                <p className="text-[10px] font-bold uppercase tracking-[.2em] text-luxury-pink">Recommandation sur mesure</p>
                <h3 className="mt-3 font-serif text-2xl font-bold text-luxury-wine">{recommendation.title}</h3>
                <p className="mt-3 text-sm leading-7 text-luxury-muted">{recommendation.text}</p>
                <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                  <button type="button" onClick={() => setQuizSelection("")} className="px-5 py-3 text-xs font-semibold text-luxury-muted underline">Recommencer</button>
                  <a href={`https://wa.me/22371989895?text=${encodeURIComponent(`Bonjour Reina Beauty, après le diagnostic du site, je souhaite réserver : ${recommendation.title}.`)}`} target="_blank" rel="noreferrer" className="rounded-full bg-luxury-wine px-6 py-3 text-xs font-bold uppercase tracking-wider text-white">Réserver ce soin</a>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionTitle eyebrow="Ce qu’elles partagent" title="La confiance de nos clientes" />
        <div className="mt-14 grid gap-7 md:grid-cols-3">
          {reviews.map((review) => (
            <motion.blockquote whileHover={{ y: -6 }} key={review.name} className="flex min-h-72 flex-col justify-between rounded-3xl border border-luxury-line bg-white p-8 shadow-sm">
              <div>
                <div className="flex gap-1 text-luxury-wine">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="size-4 fill-current" />)}</div>
                <p className="mt-6 font-serif text-lg italic leading-8 text-luxury-text">« {review.text} »</p>
              </div>
              <footer className="mt-7 border-t border-luxury-line pt-5">
                <cite className="not-italic"><strong className="block text-sm">{review.name}</strong><span className="text-[10px] uppercase tracking-wider text-luxury-muted">{review.role}</span></cite>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 lg:px-8">
        <SectionTitle eyebrow="Finitions Reina" title="Explorez deux styles Micro Locks" />
        <div className="mt-12 grid items-center gap-10 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border-4 border-white shadow-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <ManagedImage src="/images/coiffures/locks/reina-microlocks-clean.png" alt="Micro Locks naturelles Reina Beauty" className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - comparison}% 0 0)` }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <ManagedImage src="/images/coiffures/locks/reina-microlocks-color-clean.png" alt="Micro Locks colorées Reina Beauty" className="absolute inset-0 h-full w-full object-cover" />
              </div>
              <div className="absolute inset-y-0 w-0.5 bg-white shadow-xl" style={{ left: `${comparison}%` }} />
              <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold uppercase">Colorées</span>
              <span className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold uppercase">Naturelles</span>
            </div>
            <label className="mt-5 block text-center text-xs font-semibold text-luxury-muted">
              Faites glisser pour comparer les finitions
              <input aria-label="Comparer les styles Micro Locks" type="range" min="10" max="90" value={comparison} onChange={(event) => setComparison(Number(event.target.value))} className="mt-3 w-full accent-luxury-wine" />
            </label>
          </div>
          <div className="lg:col-span-2">
            <p className="text-xs font-bold uppercase tracking-[.2em] text-luxury-pink">Votre style, votre signature</p>
            <h3 className="mt-3 font-serif text-4xl font-bold">Naturelles ou colorées, toujours sur mesure.</h3>
            <p className="mt-5 text-sm leading-7 text-luxury-muted">Le diagnostic permet de choisir la grille, la longueur, la finition et la couleur adaptées à votre visage et à vos cheveux.</p>
            <a href="/coiffures-tarifs" className="mt-7 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-luxury-wine">Voir les prestations <ArrowRight className="size-4" /></a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 lg:px-8">
        <SectionTitle eyebrow="Informations" title="Questions fréquentes" />
        <div className="mt-10 space-y-3">
          {faqs.map((faq, index) => {
            const open = openFaq === index;
            return <div key={faq.q} className="overflow-hidden rounded-2xl border border-luxury-line bg-white">
              <button type="button" aria-expanded={open} onClick={() => setOpenFaq(open ? null : index)} className="flex w-full items-center justify-between gap-4 p-6 text-left font-serif text-base font-bold">
                {faq.q}<ChevronDown className={`size-5 shrink-0 text-luxury-wine transition ${open ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence initial={false}>{open && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}><p className="border-t border-luxury-line px-6 py-5 text-sm leading-7 text-luxury-muted">{faq.a}</p></motion.div>}</AnimatePresence>
            </div>;
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-10 overflow-hidden rounded-3xl bg-luxury-deep p-8 text-white sm:p-12 lg:grid-cols-2 lg:p-16">
          <div>
            <ShieldCheck className="size-10 text-luxury-champagne" />
            <p className="mt-5 text-xs font-bold uppercase tracking-[.22em] text-luxury-pink">La charte Reina Beauty</p>
            <h2 className="mt-3 font-serif text-4xl font-bold sm:text-5xl">Beauté, intimité et confiance.</h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {["Espace exclusivement réservé aux femmes", "Confidentialité et accueil respectueux", "Produits botaniques sélectionnés", "Conseils personnalisés après chaque soin"].map((item) => (
              <div key={item} className="flex gap-3"><CheckCircle2 className="mt-0.5 size-5 shrink-0 text-luxury-pink" /><p className="text-sm leading-6 text-white/75">{item}</p></div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return <div className="mx-auto max-w-2xl text-center"><p className="text-xs font-bold uppercase tracking-[.25em] text-luxury-pink">{eyebrow}</p><h2 className="mt-3 font-serif text-4xl font-bold sm:text-5xl">{title}</h2></div>;
}
