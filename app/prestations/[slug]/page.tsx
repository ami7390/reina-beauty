import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock3, Sparkles } from "lucide-react";
import { ManagedImage } from "@/components/managed-image";
import { DelayedLockVideo } from "@/components/delayed-lock-video";
import { services } from "@/lib/reina-data";

const families = {
  locks: { category: "locks", title: "Locks, Twist & Vanilles", intro: "Découvrez nos créations et entretiens : Micro Locks, Dreadlocks, Sister Locks, Twist, Micro Twist et Vanilles." },
  tresses: { category: "tresses", title: "Tresses & coiffures protectrices", intro: "Nattes artistiques, Laïfou, Napi et autres coiffures protectrices réalisées selon votre style et vos cheveux." },
  "soins-cheveux": { category: "soins", title: "Soins des cheveux", intro: "Des rituels ciblés pour nourrir les longueurs, prendre soin du cuir chevelu et accompagner votre routine capillaire." },
  "soins-visage": { category: "visage", title: "Soins du visage", intro: "Des soins visage pensés pour nettoyer la peau en douceur et raviver naturellement son éclat." },
  coloration: { category: "teinture", title: "Coloration", intro: "Des nuances personnalisées après diagnostic, pour illuminer ou transformer la chevelure en respectant son état." },
  henne: { category: "henne", title: "Henné artistique", intro: "Un véritable embellissement à la main : motifs fins, compositions traditionnelles ou personnalisées, réalisés avec précision pour sublimer mains et pieds." },
  onglerie: { category: "onglerie", title: "Manucure & pédicure", intro: "Des soins des mains et des pieds avec des finitions propres et soignées." },
} as const;

type FamilySlug = keyof typeof families;

const heroVideos: Partial<Record<FamilySlug, { src: string; poster?: string; label: string }>> = {
  locks: { src: "https://www.pexels.com/download/video/7951294/", poster: "/images/coiffures/locks/reina-installation-locks-tiktok.webp", label: "Coiffure afro et locks en salon" },
  tresses: { src: "https://www.pexels.com/download/video/7951294/", poster: "/images/coiffures/nattes/reina-nattes-artistiques.webp", label: "Tressage afro en salon" },
  "soins-visage": { src: "https://www.pexels.com/download/video/12322704/", label: "Soin du visage sur peau noire" },
  "soins-cheveux": { src: "https://www.pexels.com/download/video/7951294/", label: "Soin et coiffure de cheveux afro" },
  onglerie: { src: "https://www.pexels.com/download/video/7754446/", label: "Manucure et pédicure en salon" },
  henne: { src: "https://www.pexels.com/download/video/7754485/", label: "Beauté en salon" },
};

const serviceVideos: Partial<Record<number, string>> = {
  1: "/videos/locks/microlocks-creation.mp4",
  2: "/videos/locks/microlocks-entretien.mp4",
  19: "/videos/locks/dreadlocks.mp4",
  20: "/videos/locks/sister-locks.mp4",
  22: "/videos/locks/twist.mp4",
  23: "/videos/locks/micro-twist.mp4",
  21: "/videos/locks/vanilles.mp4",
  3: "/videos/tresses/nattes-artistiques.mp4",
  10: "/videos/tresses/laifou.mp4",
  11: "/videos/tresses/napi.mp4",
  4: "/videos/soins/soin-visage.mp4",
  5: "/videos/soins/bain-huiles.mp4",
  16: "/videos/soins/massage-cuir-chevelu.mp4",
  9: "/videos/henne/principal.mp4",
  8: "/videos/onglerie/pedicure-soin.mp4",
};

export function generateStaticParams() {
  return Object.keys(families).map((slug) => ({ slug }));
}

export default async function ServiceFamilyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const family = families[slug as FamilySlug];
  if (!family) notFound();
  const items = services.filter((service) => service.category === family.category);

  return <main className="min-h-screen bg-luxury-bg pb-20">
    <section className={`relative isolate overflow-hidden border-b border-luxury-line px-5 py-16 lg:px-8 ${heroVideos[slug as FamilySlug] ? "bg-luxury-wine text-white" : "bg-gradient-to-br from-white to-[#f4e8ea]"}`}>
      {heroVideos[slug as FamilySlug] && <>
        <video autoPlay muted loop playsInline preload="metadata" poster={heroVideos[slug as FamilySlug]?.poster} className="absolute inset-0 -z-20 h-full w-full object-cover" aria-label={heroVideos[slug as FamilySlug]?.label}>
          <source src={heroVideos[slug as FamilySlug]?.src} type="video/mp4" />
        </video>
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#3f1023]/95 via-[#3f1023]/78 to-[#3f1023]/48" />
      </>}
      <div className="mx-auto max-w-6xl">
        <Link href="/coiffures-tarifs#explorer" className={`inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider ${heroVideos[slug as FamilySlug] ? "text-white" : "text-luxury-wine"}`}><ArrowLeft className="size-4" /> Toutes les prestations</Link>
        <span className={`mt-8 flex w-fit items-center gap-2 rounded-full px-4 py-2 text-[10px] font-bold uppercase tracking-wider ${heroVideos[slug as FamilySlug] ? "bg-white/15 text-white backdrop-blur-sm" : "bg-white text-luxury-wine"}`}><Sparkles className="size-4" /> Reina Beauty</span>
        <h1 className={`mt-5 max-w-4xl font-serif text-5xl font-bold sm:text-6xl ${heroVideos[slug as FamilySlug] ? "text-white" : "text-luxury-wine"}`}>{family.title}</h1>
        <p className={`mt-5 max-w-2xl text-sm leading-7 ${heroVideos[slug as FamilySlug] ? "text-white/80" : "text-luxury-muted"}`}>{family.intro}</p>
      </div>
    </section>

    <section className="mx-auto max-w-7xl px-5 pt-12 lg:px-8">
      {slug === "henne" && <div className="mb-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { image: 1, video: "/videos/henne/pieds-chevilles.mp4", title: "Henné pieds & chevilles", subtitle: "Finition délicate", description: "Décoration raffinée des pieds et chevilles, pensée pour compléter votre mise en beauté." },
          { image: 2, video: "/videos/henne/traditionnel.mp4", title: "Henné traditionnel", subtitle: "Inspiration florale", description: "Motifs inspirés des traditions, adaptés à votre style et à l’occasion." },
          { image: 3, video: "/videos/henne/floral.mp4", title: "Henné floral", subtitle: "Création sur mesure", description: "Fleurs, lignes et détails travaillés pour une décoration harmonieuse et unique." },
          { image: 4, video: "/videos/henne/artistique-mains.mp4", title: "Henné artistique — Mains", subtitle: "Motifs fins & élégants", description: "Composition personnalisée réalisée à la main pour sublimer les mains avec finesse." },
        ].map((item) => <article key={item.image} className="group overflow-hidden rounded-3xl border border-luxury-line bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
          <DelayedLockVideo image={`/images/prestations/henne/showcase/henne-${item.image}.webp`} video={item.video} alt={item.title} highlight="Art Reina" />
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
          {["locks", "tresses", "soins-cheveux", "soins-visage", "henne", "onglerie"].includes(slug) && serviceVideos[service.id] ? <DelayedLockVideo image={service.image} video={serviceVideos[service.id]!} alt={service.title} highlight={service.highlight} /> : <div className="relative h-60 overflow-hidden"><ManagedImage src={service.image} alt={service.title} className={`h-full w-full ${service.title === "Napi" ? "bg-luxury-bg object-contain object-top" : "object-cover"}`} />{service.highlight && <span className="absolute left-4 top-4 rounded-full bg-luxury-wine px-3 py-1 text-[9px] font-bold uppercase tracking-wider text-white">{service.highlight}</span>}</div>}
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
