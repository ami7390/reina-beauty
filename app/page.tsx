"use client";

import { ManagedImage } from "@/components/managed-image";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  Clock3,
  Leaf,
  ShieldCheck,
  Sparkles,
  Star,
} from "lucide-react";
import { whatsapp } from "@/lib/reina-data";
import { LuxeSections } from "@/components/luxe-sections";

const fadeInUp = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0 },
};

const expertise = [
  {
    eyebrow: "Incontournable",
    title: "Locks, Tresses & Coiffures",
    description:
      "Installation minutieuse de Micro Locks, nattes, Laïfou, Napi et colorations sur mesure pour sublimer votre style.",
    href: "/coiffures-tarifs",
    link: "Découvrir les coiffures",
  },
  {
    eyebrow: "Soin botanique",
    title: "Gamme pousse & soins du visage",
    description:
      "Huiles, sérums et baumes pour la routine capillaire, complétés par un soin du visage au miel et aux poudres botaniques.",
    href: "/soins-capillaires",
    link: "Voir les soins capillaires",
  },
  {
    eyebrow: "Transmettre",
    title: "Formations Beauté",
    description:
      "Des formations professionnelles en henné traditionnel, tressage de précision et techniques beauté.",
    href: "/formations-beaute",
    link: "Découvrir les formations",
  },
];

const trustItems = [
  { icon: ShieldCheck, title: "Cadre 100% intime", text: "Espace strictement réservé aux femmes" },
  { icon: Award, title: "Expertise soignée", text: "Techniques précises et finitions élégantes" },
  { icon: Leaf, title: "Rituels naturels", text: "Miel et poudres pour le visage" },
  { icon: Clock3, title: "Ouvert 7J/7", text: "Lundi au dimanche, 8h30 – 17h30" },
];

const heroScenes = [
  {
    src: "/images/coiffures/locks/reina-installation-locks-tiktok.webp",
    alt: "Installation de Micro Locks par l’équipe Reina Beauty",
  },
  {
    src: "/images/henne/reina-henne.png",
    alt: "Création d’un henné traditionnel chez Reina Beauty",
  },
  {
    src: "/images/soins/baume/reina-baume-preparation-tiktok.webp",
    alt: "Préparation d’un soin botanique Reina Beauty",
  },
];

const prestigeStats = [
  ["100%", "Réservé aux femmes"],
  ["3", "Univers de beauté"],
  ["7J/7", "Ouvert toute la semaine"],
  ["8h30–17h30", "Horaires du salon"],
];

export default function HomePage() {
  return (
    <main className="overflow-x-hidden bg-luxury-bg">
      <section className="relative flex min-h-[88vh] items-center px-5 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-14 lg:grid-cols-12">
          <motion.div
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.14 }}
            className="text-center lg:col-span-6 lg:text-left"
          >
            <motion.span variants={fadeInUp} transition={{ duration: 0.65 }} className="luxury-badge">
              <Sparkles className="size-4" /> Maison de beauté féminine & spa capillaire
            </motion.span>
            <motion.h1
              variants={fadeInUp}
              transition={{ duration: 0.7 }}
              className="mt-7 font-serif text-5xl font-bold leading-[1.04] sm:text-6xl lg:text-7xl"
            >
              L’art de sublimer votre <span className="italic text-luxury-wine">couronne.</span>
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              transition={{ duration: 0.7 }}
              className="mx-auto mt-7 max-w-xl text-base font-light leading-8 text-luxury-muted lg:mx-0"
            >
              Une expérience exclusive dédiée aux femmes. Spécialistes des <strong>Micro Locks d’exception</strong>,
              des tresses haute précision, des produits capillaires nourrissants, des soins du visage et du henné royal.
            </motion.p>
            <motion.div variants={fadeInUp} transition={{ duration: 0.7 }} className="mt-9 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
              <a href={whatsapp} target="_blank" rel="noreferrer" className="home-cta bg-luxury-wine text-white shadow-xl hover:bg-luxury-footer">
                Réserver sur WhatsApp <ArrowRight className="size-4" />
              </a>
              <a href="/coiffures-tarifs" className="home-cta border-2 border-luxury-wine text-luxury-wine hover:bg-luxury-champagne">
                Voir les prestations
              </a>
            </motion.div>
            <motion.div variants={fadeInUp} transition={{ duration: 0.7 }} className="mt-10 grid grid-cols-3 gap-3 border-t border-luxury-line pt-7">
              {[["100%", "Dédié aux femmes"], ["Sur mesure", "Diagnostic offert"], ["Botanique", "Soin naturel"]].map(([value, label]) => (
                <div key={label}>
                  <p className="font-serif text-xl font-bold text-luxury-wine sm:text-2xl">{value}</p>
                  <p className="mt-1 text-[9px] font-bold uppercase tracking-wider text-luxury-muted">{label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 36 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.85, delay: 0.15 }}
            className="relative grid grid-cols-2 gap-4 lg:col-span-6"
          >
            <div className="space-y-4">
              <EditorialImage src="/images/henne/reina-henne.png" alt="Art du henné chez Reina Beauty" label="Henné royal" tall />
              <EditorialImage src="/images/coiffures/locks/reina-microlocks-clean.png" alt="Micro Locks soignées à Bamako" label="Micro Locks" />
            </div>
            <div className="space-y-4 pt-8">
              <EditorialImage src="/images/coiffures/tresses/reina-braids-child-clean.png" alt="Tresses artistiques pour femme" label="Tresses sculpturales" />
              <EditorialImage src="/images/coiffures/locks/reina-microlocks-color-clean.png" alt="Micro Locks avec teinture sur mesure" label="Teinture sur mesure" tall />
            </div>
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 5 }}
              className="absolute -bottom-5 left-1/2 hidden -translate-x-1/2 items-center gap-3 rounded-2xl border border-luxury-line bg-white/95 px-5 py-4 shadow-2xl backdrop-blur sm:flex"
            >
              <Star className="size-5 fill-luxury-wine text-luxury-wine" />
              <div>
                <p className="text-xs font-bold">Savoir-faire d’exception</p>
                <p className="text-[10px] uppercase tracking-wider text-luxury-muted">Mali & international</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="bg-luxury-footer px-5 py-11 text-white lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {trustItems.map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex items-center gap-4">
              <Icon className="size-8 shrink-0 text-luxury-champagne" />
              <div>
                <h2 className="font-serif text-sm font-bold uppercase tracking-wider">{title}</h2>
                <p className="mt-1 text-xs leading-5 text-white/75">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-b border-luxury-line bg-white px-5 py-20 lg:px-8 lg:py-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={fadeInUp}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-xs font-bold uppercase tracking-[.25em] text-luxury-pink">L’excellence du salon</p>
          <h2 className="mt-3 font-serif text-4xl font-bold sm:text-5xl">Nos domaines d’expertise</h2>
        </motion.div>
        <div className="mx-auto mt-14 grid max-w-7xl gap-7 md:grid-cols-3">
          {expertise.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="flex min-h-72 flex-col justify-between rounded-3xl border border-luxury-line bg-luxury-bg p-8 shadow-sm"
            >
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[.18em] text-luxury-pink">{item.eyebrow}</p>
                <h3 className="mt-3 font-serif text-2xl font-bold">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-luxury-muted">{item.description}</p>
              </div>
              <a href={item.href} className="mt-7 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-luxury-wine hover:gap-3">
                {item.link} <ArrowRight className="size-4" />
              </a>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="overflow-hidden bg-luxury-deep text-white">
        <div className="mx-auto grid max-w-7xl items-stretch lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.75 }}
            className="relative min-h-[420px] lg:min-h-[600px]"
          >
            <ManagedImage src="/images/soins/baume/reina-baume-preparation-tiktok.webp" alt="Préparation d’un soin botanique Reina Beauty" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-luxury-deep/70 via-transparent to-transparent" />
            <div className="absolute bottom-7 left-7 rounded-2xl border border-white/20 bg-black/25 px-5 py-4 backdrop-blur-md">
              <p className="text-[10px] font-bold uppercase tracking-[.2em] text-luxury-champagne">Préparations artisanales</p>
              <p className="mt-1 font-serif text-lg font-bold">Huiles, sérums & baumes capillaires</p>
            </div>
          </motion.div>
          <div className="flex flex-col justify-center px-6 py-14 sm:px-12 lg:px-16 lg:py-20">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-luxury-champagne"><Leaf className="size-4" /> Rituel botanique Reina</span>
            <h2 className="mt-6 font-serif text-4xl font-bold leading-tight sm:text-5xl">Nourrir la fibre.<br />Respecter votre couronne.</h2>
            <p className="mt-5 max-w-xl text-sm leading-7 text-white/70">Une gamme pensée pour tous les types de cheveux. Chaque geste aide à préserver l’hydratation, limiter la casse et accompagner la pousse naturelle.</p>
            <div className="mt-9 grid gap-4 sm:grid-cols-3">
              {[["01", "Clarifier", "Shampoing doux"], ["02", "Nourrir", "Huile & baume"], ["03", "Stimuler", "Sérum & massage"]].map(([step, title, detail]) => (
                <div key={step} className="rounded-2xl border border-white/15 bg-white/5 p-4">
                  <p className="font-serif text-2xl font-bold text-luxury-pink">{step}</p>
                  <h3 className="mt-2 text-xs font-bold uppercase tracking-wider">{title}</h3>
                  <p className="mt-1 text-[10px] text-white/55">{detail}</p>
                </div>
              ))}
            </div>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href="/soins-capillaires" className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-luxury-wine">Découvrir la gamme <ArrowRight className="size-4" /></a>
              <a href="/soins-capillaires#diagnostic" className="inline-flex items-center justify-center rounded-full border border-white/25 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white">Trouver mon rituel</a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-luxury-bg px-5 py-20 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-[.25em] text-luxury-pink">L’expertise en images</p>
            <h2 className="mt-3 font-serif text-4xl font-bold sm:text-5xl">Gestes précis, résultats remarquables</h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-luxury-muted">Entrez dans l’univers Reina Beauty : Micro Locks, art du henné et préparations botaniques réalisées avec soin.</p>
          </div>

          <div className="mt-12 grid gap-4 overflow-hidden rounded-3xl bg-luxury-deep p-2 shadow-2xl lg:grid-cols-3">
            <motion.figure
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7 }}
              className="relative flex min-h-[520px] items-center justify-center overflow-hidden rounded-2xl bg-black/35 lg:col-span-2 lg:min-h-[620px]"
            >
              <ManagedImage
                src="/images/coiffures/locks/reina-video-microlocks-poster.jpg"
                alt=""
                aria-hidden="true"
                className="absolute inset-0 h-full w-full scale-110 object-cover opacity-25 blur-2xl"
              />
              <video
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                poster="/images/coiffures/locks/reina-video-microlocks-poster.jpg"
                aria-label="Création et finition de locks chez Reina Beauty"
                className="relative z-10 h-full max-h-[620px] w-auto max-w-full object-contain shadow-2xl"
              >
                <source src="/videos/coiffures/reina-microlocks-ambiance.mp4" type="video/mp4" />
              </video>
              <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-t from-luxury-deep/70 via-transparent to-transparent" />
              <figcaption className="absolute bottom-6 left-6 right-6 z-30 text-white">
                <p className="text-[10px] font-bold uppercase tracking-[.2em] text-luxury-champagne">Au cœur du savoir-faire</p>
                <p className="mt-2 font-serif text-2xl font-bold">Du geste précis à la finition</p>
              </figcaption>
            </motion.figure>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {heroScenes.slice(1).map((scene, index) => (
                <motion.figure
                  key={scene.src}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.65, delay: (index + 1) * 0.12 }}
                  className="relative min-h-64 overflow-hidden rounded-2xl lg:min-h-0"
                >
                  <motion.img
                    src={scene.src}
                    alt={scene.alt}
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 13 + index * 2, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-luxury-deep/50 via-transparent to-transparent" />
                </motion.figure>
              ))}
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-3xl bg-white shadow-xl lg:grid-cols-4">
            {prestigeStats.map(([value, label]) => (
              <div key={label} className="bg-luxury-wine px-4 py-7 text-center text-white">
                <p className="font-serif text-3xl font-bold text-luxury-champagne sm:text-4xl">{value}</p>
                <p className="mt-1 text-[9px] font-bold uppercase tracking-[.14em] text-white/75 sm:text-[10px]">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <LuxeSections />

      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
        <div className="flex flex-col items-center justify-between gap-8 rounded-3xl bg-gradient-to-r from-luxury-wine to-luxury-pink p-8 text-white shadow-2xl sm:p-14 lg:flex-row">
          <div className="max-w-3xl text-center lg:text-left">
            <span className="rounded-full bg-white/15 px-4 py-2 text-[10px] font-bold uppercase tracking-widest">Expérience sur mesure</span>
            <h2 className="mt-5 font-serif text-3xl font-bold sm:text-5xl">Prête à vivre un moment d’exception ?</h2>
            <p className="mt-4 text-sm text-white/85">Réservation directe par téléphone ou WhatsApp au <strong>71 98 98 95</strong>.</p>
          </div>
          <a href={whatsapp} target="_blank" rel="noreferrer" className="shrink-0 rounded-full bg-white px-8 py-4 text-xs font-bold uppercase tracking-widest text-luxury-wine shadow-lg hover:bg-luxury-champagne">
            Réserver sur WhatsApp
          </a>
        </div>
      </section>
    </main>
  );
}

function EditorialImage({ src, alt, label, tall = false }: { src: string; alt: string; label: string; tall?: boolean }) {
  return (
    <motion.figure whileHover={{ y: -6 }} className={`group relative overflow-hidden rounded-3xl border-2 border-white shadow-xl ${tall ? "h-72 sm:h-80" : "h-48 sm:h-52"}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <ManagedImage src={src} alt={alt} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
      <figcaption className="absolute bottom-4 left-4 font-serif text-xs uppercase tracking-widest text-white">{label}</figcaption>
    </motion.figure>
  );
}
