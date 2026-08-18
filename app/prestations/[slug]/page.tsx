import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock3, Sparkles } from "lucide-react";
import { ManagedImage } from "@/components/managed-image";
import { services } from "@/lib/reina-data";

const families = {
  locks: { category: "locks", title: "Locks, Twist & Vanilles", intro: "Découvrez nos créations et entretiens : Micro Locks, Starter Locks, locks traditionnelles, retwist, Instant Locks, Twist, Micro Twist et Vanilles." },
  tresses: { category: "tresses", title: "Tresses & coiffures protectrices", intro: "Nattes artistiques, Laïfou, Napi et autres coiffures protectrices réalisées selon votre style et vos cheveux." },
  "soins-cheveux": { category: "soins", title: "Soins des cheveux", intro: "Des rituels ciblés pour nourrir les longueurs, prendre soin du cuir chevelu et accompagner votre routine capillaire." },
  "soins-visage": { category: "visage", title: "Soins du visage", intro: "Des soins visage pensés pour nettoyer la peau en douceur et raviver naturellement son éclat." },
  coloration: { category: "teinture", title: "Coloration", intro: "Des nuances personnalisées après diagnostic, pour illuminer ou transformer la chevelure en respectant son état." },
  henne: { category: "henne", title: "Henné artistique", intro: "Un véritable embellissement à la main : motifs fins, compositions traditionnelles ou personnalisées, réalisés avec précision pour sublimer mains et pieds." },
  onglerie: { category: "onglerie", title: "Manucure & pédicure", intro: "Des soins des mains et des pieds avec des finitions propres et soignées." },
} as const;

type FamilySlug = keyof typeof families;

export function generateStaticParams() {
  return Object.keys(families).map((slug) => ({ slug }));
}

export default async function ServiceFamilyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const family = families[slug as FamilySlug];
  if (!family) notFound();
  const items = services.filter((service) => service.category === family.category);

  return <main className="min-h-screen bg-luxury-bg pb-20">
    <section className="border-b border-luxury-line bg-gradient-to-br from-white to-[#f4e8ea] px-5 py-16 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Link href="/coiffures-tarifs#explorer" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-luxury-wine"><ArrowLeft className="size-4" /> Toutes les prestations</Link>
        <span className="mt-8 flex w-fit items-center gap-2 rounded-full bg-white px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-luxury-wine"><Sparkles className="size-4" /> Reina Beauty</span>
        <h1 className="mt-5 max-w-4xl font-serif text-5xl font-bold text-luxury-wine sm:text-6xl">{family.title}</h1>
        <p className="mt-5 max-w-2xl text-sm leading-7 text-luxury-muted">{family.intro}</p>
      </div>
    </section>

    <section className="mx-auto max-w-7xl px-5 pt-12 lg:px-8">
      {slug === "henne" && <div className="mb-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { image: 1, title: "Henné artistique — Mains", subtitle: "Motifs fins & élégants", description: "Composition personnalisée réalisée à la main pour sublimer les mains avec finesse." },
          { image: 2, title: "Henné traditionnel", subtitle: "Inspiration florale", description: "Motifs inspirés des traditions, adaptés à votre style et à l’occasion." },
          { image: 3, title: "Henné floral", subtitle: "Création sur mesure", description: "Fleurs, lignes et détails travaillés pour une décoration harmonieuse et unique." },
          { image: 4, title: "Henné pieds & chevilles", subtitle: "Finition délicate", description: "Décoration raffinée des pieds et chevilles, pensée pour compléter votre mise en beauté." },
        ].map((item) => <article key={item.image} className="group overflow-hidden rounded-3xl border border-luxury-line bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
          <div className="relative overflow-hidden">
            <ManagedImage src={`/images/prestations/henne/showcase/henne-${item.image}.webp`} alt={item.title} className="aspect-[3/4] h-full w-full object-cover transition duration-700 group-hover:scale-105" />
            <span className="absolute left-4 top-4 rounded-full bg-luxury-wine px-3 py-1 text-[9px] font-bold uppercase tracking-wider text-white">Art Reina</span>
          </div>
          <div className="p-5">
            <h2 className="font-serif text-xl font-bold text-luxury-wine">{item.title}</h2>
            <p className="mt-1 text-[11px] font-semibold text-luxury-pink">{item.subtitle}</p>
            <p className="mt-3 text-xs leading-6 text-luxury-muted">{item.description}</p>
            <div className="mt-4 border-t border-luxury-line pt-4">
              <strong className="text-xs text-luxury-wine">Tarif sur devis</strong>
              <a href={`https://wa.me/22371989895?text=${encodeURIComponent(`Bonjour Reina Beauty, je souhaite réserver : ${item.title}. Pouvez-vous me confirmer le tarif et la disponibilité ?`)}`} target="_blank" rel="noreferrer" className="mt-4 flex items-center justify-center gap-2 rounded-full bg-luxury-wine px-4 py-3 text-[9px] font-bold uppercase tracking-wider text-white"><Calendar className="size-4" /> Réserver</a>
            </div>
          </div>
        </article>)}
      </div>}
      <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">
        {items.map((service) => <article key={service.id} className="overflow-hidden rounded-3xl border border-luxury-line bg-white shadow-sm">
          <div className="relative h-60 overflow-hidden"><ManagedImage src={service.image} alt={service.title} className={`h-full w-full ${service.title === "Napi" ? "bg-luxury-bg object-contain object-top" : "object-cover"}`} />{service.highlight && <span className="absolute left-4 top-4 rounded-full bg-luxury-wine px-3 py-1 text-[9px] font-bold uppercase tracking-wider text-white">{service.highlight}</span>}</div>
          <div className="p-6">
            <h2 className="font-serif text-2xl font-bold">{service.title}</h2>
            <p className="mt-1 text-xs font-semibold text-luxury-pink">{service.subtitle}</p>
            <p className="mt-4 text-xs leading-6 text-luxury-muted">{service.description}</p>
            <div className="mt-5 flex items-center justify-between gap-4 border-t border-luxury-line pt-4 text-xs">
              <span className="inline-flex items-center gap-2 text-luxury-muted"><Clock3 className="size-4" /> {service.duration}</span>
              <strong className="text-right text-luxury-wine">{service.price}</strong>
            </div>
            <a href={`https://wa.me/22371989895?text=${encodeURIComponent(`Bonjour Reina Beauty, je souhaite réserver : ${service.title}. Pouvez-vous me confirmer le tarif et la disponibilité ?`)}`} target="_blank" rel="noreferrer" className="mt-5 flex items-center justify-center gap-2 rounded-full bg-luxury-wine px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-white"><Calendar className="size-4" /> Réserver sur WhatsApp</a>
          </div>
        </article>)}
      </div>
    </section>

    {slug === "henne" && <>
      <section className="mx-auto max-w-7xl px-5 pt-16 lg:px-8">
        <div className="overflow-hidden rounded-[2rem] border border-luxury-line bg-white p-6 shadow-sm sm:p-8 lg:p-10">
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_1.1fr]">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[.2em] text-luxury-pink">Formation henné</span>
              <h2 className="mt-2 font-serif text-3xl font-bold text-luxury-wine sm:text-4xl">L'univers de nos apprenties</h2>
              <p className="mt-4 text-sm leading-7 text-luxury-muted">Un aperçu illustratif de l'univers d'apprentissage : pratique, précision du geste et progression. Les visuels de cette section sont des images d'illustration et ne sont pas présentés comme des réalisations de nos élèves.</p>
              <Link href="/formation" className="mt-6 inline-flex items-center justify-center rounded-full bg-luxury-wine px-6 py-3 text-[10px] font-bold uppercase tracking-wider text-white">Découvrir nos formations</Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[1, 2].map((index) => <figure key={index} className="overflow-hidden rounded-3xl bg-luxury-bg">
                <ManagedImage src={`/images/prestations/henne/apprenties-${index}.webp`} alt={`Illustration formation henné ${index}`} className="aspect-[4/5] h-full w-full object-cover" />
              </figure>)}
            </div>
          </div>
        </div>
      </section>
    </>}
  </main>;
}
