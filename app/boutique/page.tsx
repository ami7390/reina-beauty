"use client";

import { ManagedImage } from "@/components/managed-image";
import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  ChevronDown,
  Leaf,
  MessageCircle,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  Sparkles,
  Star,
  Trash2,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const WHATSAPP_NUMBER = "22371989895";
const CART_STORAGE_KEY = "reina-beauty-cart-v1";

type ShopProduct = {
  id: string;
  title: string;
  category: string;
  description: string;
  price: string;
  image: string;
  badge: string;
};

type CartState = Record<string, number>;

const fallbackProducts: ShopProduct[] = [
  {
    id: "huile-capillaire",
    title: "Huile capillaire nourrissante",
    category: "Huiles & sérums",
    description: "Une huile capillaire conçue pour accompagner la routine des cheveux crépus, frisés, bouclés, tressés ou lockés, sans alourdir les longueurs.",
    price: "",
    image: "/images/produits/huile-capillaire/reina-huile-capillaire.webp",
    badge: "Nutrition",
  },
  {
    id: "serum-pousse",
    title: "Sérum Secret Pousse",
    category: "Huiles & sérums",
    description: "Un sérum en flacon compte-gouttes pour compléter le massage du cuir chevelu et prendre soin des tempes, contours et zones fragilisées.",
    price: "",
    image: "/images/produits/serum-pousse/reina-serum-pousse.webp",
    badge: "Rituel pousse",
  },
  {
    id: "baume",
    title: "Baume nourrissant Reina Beauty",
    category: "Baumes",
    description: "Une texture riche pensée pour nourrir tous les types de cheveux et préserver la souplesse des longueurs entre deux coiffages.",
    price: "",
    image: "/images/produits/baume-capillaire/reina-baume-capillaire.webp",
    badge: "Tous types de cheveux",
  },
  {
    id: "dermaroller",
    title: "Rouleau de soin du cuir chevelu",
    category: "Accessoires",
    description: "Un accessoire destiné à compléter certaines routines du cuir chevelu, uniquement après conseil personnalisé sur son utilisation et son entretien.",
    price: "",
    image: "/images/produits/dermaroller/reina-dermaroller.webp",
    badge: "Accessoire",
  },
];

const services = [
  {
    id: "visage-miel",
    title: "Soin du visage au miel et aux poudres",
    description: "Un rituel botanique réservé au visage, adapté aux besoins de votre peau pour nettoyer en douceur et raviver l’éclat du teint.",
    image: "/images/soins/visage/reina-soin-visage-tiktok.webp",
    badge: "Soin visage",
  },
  {
    id: "manucure",
    title: "Manucure soin complet",
    description: "Un soin complet pour nettoyer, adoucir et embellir les mains et les ongles dans une atmosphère calme et féminine.",
    image: "https://images.pexels.com/photos/3997379/pexels-photo-3997379.jpeg?auto=compress&dpr=1&h=900&w=1200",
    badge: "Soin des mains",
  },
  {
    id: "pedicure",
    title: "Pédicure soin spa",
    description: "Un rituel confortable comprenant le soin des ongles et des cuticules, un gommage doux et une finition soignée.",
    image: "https://images.pexels.com/photos/34930135/pexels-photo-34930135/free-photo-of-professional-pedicure-session-at-beauty-salon.jpeg?auto=compress&dpr=1&h=900&w=1200",
    badge: "Soin des pieds",
  },
] as const;

const faqs = [
  ["Comment fonctionne la commande ?", "Ajoutez les produits souhaités au panier, ajustez les quantités puis cliquez sur Commander sur WhatsApp. Le récapitulatif complet est envoyé à Reina Beauty pour confirmer le stock, le total et la remise ou livraison."],
  ["Puis-je commander plusieurs produits ?", "Oui. Le panier accepte plusieurs références et plusieurs quantités par produit. Il reste enregistré sur votre appareil même si vous rechargez la page."],
  ["Comment sont confirmés les prix ?", "Les prix affichés dans la boutique sont repris dans le récapitulatif. Si un produit est indiqué sur demande, notre équipe vous confirme son prix avant validation définitive."],
  ["Comment réserver un soin ?", "Les prestations ne passent pas dans le panier produit. Utilisez directement le bouton Réserver sur WhatsApp de la prestation souhaitée."],
] as const;

function parseFcfa(price: string) {
  if (!price) return null;
  const digits = price.replace(/[^0-9]/g, "");
  if (!digits) return null;
  return Number(digits);
}

function formatFcfa(amount: number) {
  return `${new Intl.NumberFormat("fr-FR").format(amount)} FCFA`;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<ShopProduct[]>(fallbackProducts);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [category, setCategory] = useState("Tous");
  const [cart, setCart] = useState<CartState>({});
  const [cartOpen, setCartOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [customerName, setCustomerName] = useState("");
  const [fulfillment, setFulfillment] = useState<"Retrait au salon" | "Livraison">("Retrait au salon");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(CART_STORAGE_KEY);
      if (saved) setCart(JSON.parse(saved) as CartState);
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart, hydrated]);

  useEffect(() => {
    fetch("/api/products", { cache: "no-store" })
      .then((response) => response.json())
      .then((data: { products?: Array<{ id: number; title: string; category: string; description: string; price: string; image_url: string; badge: string }> }) => {
        const fromSupabase = (data.products ?? []).map((item) => ({
          id: `db-${item.id}`,
          title: item.title,
          category: item.category || "Produits Reina Beauty",
          description: item.description,
          price: item.price || "",
          image: item.image_url || "/images/produits/baume-capillaire/reina-baume-capillaire.webp",
          badge: item.badge || "Reina Beauty",
        }));
        if (fromSupabase.length > 0) setProducts(fromSupabase);
      })
      .catch(() => {})
      .finally(() => setLoadingProducts(false));
  }, []);

  const categories = useMemo(() => ["Tous", ...Array.from(new Set(products.map((product) => product.category)))], [products]);
  const filteredProducts = category === "Tous" ? products : products.filter((product) => product.category === category);
  const cartLines = products
    .filter((product) => (cart[product.id] ?? 0) > 0)
    .map((product) => ({ product, quantity: cart[product.id] ?? 0 }));
  const itemCount = cartLines.reduce((sum, line) => sum + line.quantity, 0);
  const pricedLines = cartLines.filter(({ product }) => parseFcfa(product.price) !== null);
  const total = pricedLines.reduce((sum, { product, quantity }) => sum + (parseFcfa(product.price) ?? 0) * quantity, 0);
  const hasUnpriced = cartLines.some(({ product }) => parseFcfa(product.price) === null);

  function changeQuantity(id: string, delta: number) {
    setCart((current) => {
      const nextQuantity = Math.max(0, (current[id] ?? 0) + delta);
      const next = { ...current };
      if (nextQuantity === 0) delete next[id];
      else next[id] = nextQuantity;
      return next;
    });
  }

  function removeFromCart(id: string) {
    setCart((current) => {
      const next = { ...current };
      delete next[id];
      return next;
    });
  }

  const whatsappMessage = useMemo(() => {
    const lines = cartLines.map(({ product, quantity }, index) => {
      const unit = product.price?.trim() || "Prix à confirmer";
      const numericPrice = parseFcfa(product.price);
      const subtotal = numericPrice === null ? "à confirmer" : formatFcfa(numericPrice * quantity);
      return `${index + 1}. ${product.title}\n   Quantité : ${quantity}\n   Prix unitaire : ${unit}\n   Sous-total : ${subtotal}`;
    });
    const totalText = total > 0 ? formatFcfa(total) : "à confirmer";
    return [
      "Bonjour Reina Beauty 👋",
      customerName.trim() ? `Je m'appelle ${customerName.trim()} et je souhaite passer cette commande :` : "Je souhaite passer cette commande :",
      "",
      ...lines,
      "",
      `Total${hasUnpriced ? " provisoire" : ""} : ${totalText}`,
      `Mode souhaité : ${fulfillment}`,
      "",
      "Pouvez-vous me confirmer la disponibilité et le montant final ? Merci.",
    ].join("\n");
  }, [cartLines, customerName, fulfillment, hasUnpriced, total]);

  return (
    <main className="min-h-screen bg-luxury-bg pb-28">
      <section className="relative isolate overflow-hidden border-b border-luxury-line px-5 py-20 lg:px-8">
        <ManagedImage src="/images/soins/baume/reina-baume-preparation-tiktok.webp" alt="Boutique Reina Beauty" className="absolute inset-0 -z-20 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-white via-white/95 to-white/35" />
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <span className="luxury-badge"><Leaf className="size-4" /> Boutique Reina Beauty</span>
            <h1 className="mt-6 font-serif text-5xl font-bold leading-tight text-luxury-deep sm:text-6xl">Vos produits, votre panier, <span className="text-luxury-wine">une commande simple</span></h1>
            <p className="mt-5 max-w-xl text-sm leading-7 text-luxury-muted">Ajoutez vos produits au panier, choisissez les quantités et envoyez votre commande complète à notre équipe sur WhatsApp. Les produits publiés depuis l’administration apparaissent automatiquement ici.</p>
            <button type="button" onClick={() => setCartOpen(true)} className="mt-7 inline-flex items-center gap-3 rounded-full bg-luxury-wine px-6 py-3.5 text-xs font-bold uppercase text-white shadow-lg">
              <ShoppingCart className="size-4" /> Voir mon panier {itemCount > 0 && <span className="rounded-full bg-white px-2 py-0.5 text-luxury-wine">{itemCount}</span>}
            </button>
          </div>
        </div>
      </section>

      <section className="bg-luxury-wine px-5 py-7 text-white">
        <div className="mx-auto grid max-w-7xl gap-5 text-center text-[10px] font-bold uppercase tracking-wider md:grid-cols-3">
          <p className="flex items-center justify-center gap-2"><ShoppingBag className="size-5 text-luxury-champagne" /> Panier multi-produits</p>
          <p className="flex items-center justify-center gap-2"><MessageCircle className="size-5 text-luxury-champagne" /> Validation sur WhatsApp</p>
          <p className="flex items-center justify-center gap-2"><ShieldCheck className="size-5 text-luxury-champagne" /> Confirmation du stock avant paiement</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pt-16 lg:px-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[.25em] text-luxury-pink">Catalogue</p>
            <h2 className="mt-2 font-serif text-4xl font-bold text-luxury-deep">Produits disponibles</h2>
            <p className="mt-3 max-w-2xl text-xs leading-6 text-luxury-muted">Les produits publiés dans l’administration sont synchronisés avec cette boutique.</p>
          </div>
          <button type="button" onClick={() => setCartOpen(true)} className="inline-flex items-center justify-center gap-2 rounded-full border border-luxury-line bg-white px-5 py-3 text-[10px] font-bold uppercase text-luxury-wine">
            <ShoppingCart className="size-4" /> Panier ({itemCount})
          </button>
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {categories.map((item) => (
            <button key={item} type="button" onClick={() => setCategory(item)} className={`rounded-full px-4 py-2.5 text-[10px] font-bold uppercase transition ${category === item ? "bg-luxury-wine text-white" : "border border-luxury-line bg-white text-luxury-muted"}`}>
              {item}
            </button>
          ))}
        </div>

        {loadingProducts && <p className="mt-8 text-xs text-luxury-muted">Chargement du catalogue…</p>}

        <motion.div layout className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => {
              const quantity = cart[product.id] ?? 0;
              return (
                <motion.article layout key={product.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex overflow-hidden rounded-3xl border border-luxury-line bg-white shadow-sm">
                  <div className="flex w-full flex-col">
                    <div className="relative aspect-[4/3] overflow-hidden bg-luxury-bg">
                      <ManagedImage src={product.image} alt={product.title} className="h-full w-full object-cover transition duration-500 hover:scale-[1.03]" />
                      {product.badge && <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-[9px] font-bold uppercase text-luxury-wine shadow">{product.badge}</span>}
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <p className="text-[9px] font-bold uppercase tracking-[.18em] text-luxury-pink">{product.category}</p>
                      <h3 className="mt-2 font-serif text-2xl font-bold text-luxury-deep">{product.title}</h3>
                      <p className="mt-3 line-clamp-3 text-xs leading-6 text-luxury-muted">{product.description}</p>
                      <div className="mt-auto pt-6">
                        <div className="mb-4 flex items-center justify-between gap-3 border-t border-luxury-line pt-5">
                          <strong className="font-serif text-xl text-luxury-wine">{product.price || "Prix sur demande"}</strong>
                          <span className="text-[9px] font-bold uppercase text-green-700">Sur confirmation</span>
                        </div>
                        {quantity === 0 ? (
                          <button type="button" onClick={() => changeQuantity(product.id, 1)} className="flex w-full items-center justify-center gap-2 rounded-full bg-luxury-wine px-4 py-3 text-[10px] font-bold uppercase text-white">
                            <ShoppingCart className="size-4" /> Ajouter au panier
                          </button>
                        ) : (
                          <div className="flex items-center justify-between rounded-full border border-luxury-line bg-luxury-bg p-1.5">
                            <button type="button" aria-label={`Retirer une unité de ${product.title}`} onClick={() => changeQuantity(product.id, -1)} className="grid size-9 place-items-center rounded-full bg-white text-luxury-wine"><Minus className="size-4" /></button>
                            <span className="text-xs font-bold text-luxury-wine">{quantity} dans le panier</span>
                            <button type="button" aria-label={`Ajouter une unité de ${product.title}`} onClick={() => changeQuantity(product.id, 1)} className="grid size-9 place-items-center rounded-full bg-luxury-wine text-white"><Plus className="size-4" /></button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pt-20 lg:px-8">
        <div className="text-center">
          <p className="text-[10px] font-bold uppercase tracking-[.25em] text-luxury-pink">Prestations au salon</p>
          <h2 className="mt-2 font-serif text-4xl font-bold">Réserver un soin</h2>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {services.map((service) => (
            <article key={service.id} className="overflow-hidden rounded-3xl border border-luxury-line bg-white shadow-sm">
              <div className="relative aspect-[4/3] overflow-hidden"><ManagedImage src={service.image} alt={service.title} className="h-full w-full object-cover" /><span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-[9px] font-bold uppercase text-luxury-wine">{service.badge}</span></div>
              <div className="p-6"><h3 className="font-serif text-2xl font-bold">{service.title}</h3><p className="mt-3 text-xs leading-6 text-luxury-muted">{service.description}</p><a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Bonjour Reina Beauty, je souhaite réserver : ${service.title}.`)}`} target="_blank" rel="noreferrer" className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-luxury-wine px-4 py-3 text-[10px] font-bold uppercase text-white"><MessageCircle className="size-4" /> Réserver sur WhatsApp</a></div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 pt-20 lg:px-8">
        <div className="text-center"><p className="text-[10px] font-bold uppercase tracking-[.25em] text-luxury-pink">Commande & livraison</p><h2 className="mt-2 font-serif text-4xl font-bold">Questions fréquentes</h2></div>
        <div className="mt-9 space-y-3">
          {faqs.map(([question, answer], index) => <article key={question} className="overflow-hidden rounded-2xl border border-luxury-line bg-white"><button type="button" onClick={() => setOpenFaq(openFaq === index ? null : index)} aria-expanded={openFaq === index} className="flex w-full items-center justify-between gap-5 p-6 text-left font-serif text-base font-bold"><span>{question}</span><ChevronDown className={`size-5 shrink-0 text-luxury-wine transition ${openFaq === index ? "rotate-180" : ""}`} /></button><AnimatePresence>{openFaq === index && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}><p className="border-t border-luxury-line px-6 pb-6 pt-4 text-xs leading-6 text-luxury-muted">{answer}</p></motion.div>}</AnimatePresence></article>)}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pt-20 lg:px-8">
        <div className="grid gap-6 md:grid-cols-3">{[["Commande claire", "Votre panier détaille chaque produit, sa quantité et son prix avant l’envoi sur WhatsApp."], ["Confirmation humaine", "Notre équipe confirme le stock et le montant final avant toute validation de commande."], ["Conseil Reina Beauty", "Un doute sur un produit ? Ajoutez-le au panier et posez votre question directement dans la conversation WhatsApp."]].map(([title, text]) => <article key={title} className="rounded-3xl border border-luxury-line bg-white p-7 shadow-sm"><div className="flex gap-1 text-luxury-wine">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="size-3.5 fill-current" />)}</div><h3 className="mt-5 font-serif text-xl font-bold">{title}</h3><p className="mt-3 text-xs leading-6 text-luxury-muted">{text}</p></article>)}</div>
      </section>

      {itemCount > 0 && (
        <button type="button" onClick={() => setCartOpen(true)} className="fixed bottom-5 right-5 z-[65] flex items-center gap-3 rounded-full bg-green-700 px-5 py-3.5 text-xs font-bold text-white shadow-2xl sm:right-8">
          <ShoppingCart className="size-5" /> Panier <span className="rounded-full bg-white px-2 py-0.5 text-green-800">{itemCount}</span>
        </button>
      )}

      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.button type="button" aria-label="Fermer le panier" onClick={() => setCartOpen(false)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[79] bg-black/35 backdrop-blur-sm" />
            <motion.aside initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", stiffness: 280, damping: 28 }} className="fixed inset-y-0 right-0 z-[80] flex w-full max-w-md flex-col bg-white shadow-2xl">
              <div className="flex items-center justify-between border-b border-luxury-line px-5 py-5"><div><p className="text-[9px] font-bold uppercase tracking-[.2em] text-luxury-pink">Boutique Reina Beauty</p><h2 className="font-serif text-2xl font-bold text-luxury-deep">Mon panier ({itemCount})</h2></div><button type="button" onClick={() => setCartOpen(false)} className="grid size-10 place-items-center rounded-full bg-luxury-bg text-luxury-wine"><X className="size-5" /></button></div>

              <div className="flex-1 overflow-y-auto p-5">
                {cartLines.length === 0 ? (
                  <div className="grid h-full place-items-center text-center"><div><ShoppingCart className="mx-auto size-12 text-luxury-line" /><h3 className="mt-4 font-serif text-2xl font-bold">Votre panier est vide</h3><p className="mt-2 text-xs text-luxury-muted">Ajoutez un produit pour commencer votre commande.</p><button type="button" onClick={() => setCartOpen(false)} className="mt-5 rounded-full bg-luxury-wine px-5 py-3 text-[10px] font-bold uppercase text-white">Voir les produits</button></div></div>
                ) : (
                  <div className="space-y-4">
                    {cartLines.map(({ product, quantity }) => {
                      const unitPrice = parseFcfa(product.price);
                      return <article key={product.id} className="flex gap-4 rounded-2xl border border-luxury-line p-3"><ManagedImage src={product.image} alt={product.title} className="size-20 shrink-0 rounded-xl object-cover" /><div className="min-w-0 flex-1"><h3 className="line-clamp-2 font-serif text-base font-bold">{product.title}</h3><p className="mt-1 text-xs font-semibold text-luxury-wine">{product.price || "Prix sur demande"}</p><div className="mt-3 flex items-center gap-2"><button type="button" onClick={() => changeQuantity(product.id, -1)} className="grid size-8 place-items-center rounded-full border border-luxury-line"><Minus className="size-3.5" /></button><span className="min-w-6 text-center text-xs font-bold">{quantity}</span><button type="button" onClick={() => changeQuantity(product.id, 1)} className="grid size-8 place-items-center rounded-full bg-luxury-wine text-white"><Plus className="size-3.5" /></button><button type="button" onClick={() => removeFromCart(product.id)} className="ml-auto grid size-8 place-items-center rounded-full bg-red-50 text-red-700"><Trash2 className="size-3.5" /></button></div>{unitPrice !== null && <p className="mt-2 text-[10px] text-luxury-muted">Sous-total : <strong>{formatFcfa(unitPrice * quantity)}</strong></p>}</div></article>;
                    })}

                    <div className="rounded-2xl bg-luxury-bg p-4"><div className="flex items-center justify-between"><span className="text-xs font-semibold text-luxury-muted">Total{hasUnpriced ? " provisoire" : ""}</span><strong className="font-serif text-xl text-luxury-wine">{total > 0 ? formatFcfa(total) : "À confirmer"}</strong></div>{hasUnpriced && <p className="mt-2 text-[10px] leading-5 text-luxury-muted">Certains articles sont à prix sur demande. Reina Beauty confirmera le montant final sur WhatsApp.</p>}</div>

                    <label className="block text-xs font-semibold text-luxury-deep">Votre prénom ou nom <input value={customerName} onChange={(event) => setCustomerName(event.target.value)} placeholder="Ex. Aïssata" className="mt-2 w-full rounded-2xl border border-luxury-line bg-white px-4 py-3 font-normal outline-none focus:border-luxury-wine" /></label>
                    <div><p className="text-xs font-semibold text-luxury-deep">Mode souhaité</p><div className="mt-2 grid grid-cols-2 gap-2">{(["Retrait au salon", "Livraison"] as const).map((mode) => <button type="button" key={mode} onClick={() => setFulfillment(mode)} className={`rounded-xl border px-3 py-3 text-[10px] font-bold uppercase ${fulfillment === mode ? "border-luxury-wine bg-luxury-wine text-white" : "border-luxury-line bg-white text-luxury-muted"}`}>{mode}</button>)}</div></div>
                  </div>
                )}
              </div>

              {cartLines.length > 0 && <div className="border-t border-luxury-line p-5"><a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`} target="_blank" rel="noreferrer" className="flex w-full items-center justify-center gap-2 rounded-full bg-green-700 px-5 py-4 text-[11px] font-bold uppercase text-white shadow-lg"><MessageCircle className="size-5" /> Commander sur WhatsApp</a><p className="mt-3 text-center text-[9px] leading-4 text-luxury-muted">Aucun paiement n’est effectué sur le site. La commande est confirmée directement avec Reina Beauty sur WhatsApp.</p></div>}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </main>
  );
}
