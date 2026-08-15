export const phone = "+22371989895";
export const phoneDisplay = "71 98 98 95";
export const whatsapp = `https://wa.me/22371989895?text=${encodeURIComponent("Bonjour Reina Beauty, je souhaite réserver un rendez-vous.")}`;

export type Service = {
  id: number;
  category: "locks" | "tresses" | "soins" | "visage" | "teinture" | "henne" | "maquillage" | "onglerie";
  title: string;
  subtitle: string;
  description: string;
  duration: string;
  price: string;
  image: string;
  highlight?: string;
};

export const services: readonly Service[] = [
  { id: 1, category: "locks", title: "Micro Locks — Création & Installation", subtitle: "Départ et grille sur mesure", description: "Installation minutieuse respectant la densité naturelle, avec une grille adaptée à votre cuir chevelu et au résultat souhaité.", duration: "4h – 8h", price: "", image: "/images/coiffures/locks/reina-installation-locks-tiktok.webp", highlight: "Incontournable" },
  { id: 2, category: "locks", title: "Micro Locks — Resserrage & Entretien", subtitle: "Soin de suivi régulier", description: "Entretien des repousses, contrôle de la grille, nettoyage doux et hydratation pour préserver des locks nettes et saines.", duration: "2h – 3h", price: "", image: "/images/coiffures/locks/reina-microlocks-color-clean.png" },
  { id: 3, category: "tresses", title: "Nattes Artistiques", subtitle: "Créations soignées et protectrices", description: "Des nattes réalisées avec précision, adaptées à votre style, à la longueur de vos cheveux et à l’occasion, avec des finitions nettes et confortables.", duration: "Selon le modèle", price: "", image: "/images/coiffures/nattes/reina-nattes-artistiques.webp", highlight: "Populaire" },
  { id: 4, category: "visage", title: "Soin du Visage au Miel & Poudres", subtitle: "Nettoyage, douceur et éclat", description: "Un rituel visage au miel et aux poudres botaniques pour nettoyer la peau en douceur, retirer les impuretés et raviver naturellement l’éclat du teint.", duration: "Selon le diagnostic", price: "", image: "/images/soins/visage/reina-soin-visage-tiktok.webp", highlight: "Signature" },
  { id: 5, category: "soins", title: "Bain d’Huiles Végétales", subtitle: "Nutrition et souplesse des cheveux", description: "Une sélection d’huiles végétales est appliquée avec soin sur les longueurs et le cuir chevelu pour nourrir la fibre, apporter de la souplesse et limiter la casse.", duration: "45 min – 1h", price: "", image: "/images/soins/capillaires/reina-bain-huiles.webp", highlight: "Rituel botanique" },
  { id: 15, category: "soins", title: "Vapeur spa capillaire", subtitle: "Une hydratation douce et profonde", description: "La vapeur tiède accompagne le soin capillaire et aide les cheveux à mieux recevoir l’hydratation, dans un moment de détente adapté à leur nature et à leur état.", duration: "30 – 45 min", price: "", image: "/images/soins/capillaires/reina-vapeur-capillaire.webp" },
  { id: 16, category: "soins", title: "Massage du Cuir Chevelu", subtitle: "Détente et soin des racines", description: "Des gestes doux et précis sont réalisés sur le cuir chevelu pour favoriser la relaxation et compléter votre rituel de soin dans une atmosphère apaisante.", duration: "20 – 30 min", price: "", image: "/images/soins/capillaires/reina-massage-cuir-chevelu.webp" },
  { id: 6, category: "teinture", title: "Coloration Bordeaux Velours", subtitle: "Une nuance profonde et élégante", description: "Une coloration bordeaux intense aux reflets subtils, personnalisée après un diagnostic de vos cheveux pour obtenir un résultat harmonieux et lumineux.", duration: "1h 30 – 3h", price: "", image: "/images/coiffures/colorations/reina-coloration-bordeaux.webp", highlight: "Signature" },
  { id: 12, category: "teinture", title: "Coloration Cuivrée Lumineuse", subtitle: "Des reflets chauds et éclatants", description: "Une teinte cuivrée vibrante qui réchauffe la chevelure et met en valeur les textures naturelles, les tresses et les locks.", duration: "1h 30 – 3h", price: "", image: "/images/coiffures/colorations/reina-coloration-cuivree.webp" },
  { id: 13, category: "teinture", title: "Coloration Miel Doré", subtitle: "Une lumière douce et naturelle", description: "Des nuances miel et caramel délicatement travaillées pour illuminer les boucles et créer un relief élégant, adapté à votre carnation.", duration: "1h 30 – 3h", price: "", image: "/images/coiffures/colorations/reina-coloration-miel-dore.webp" },
  { id: 14, category: "teinture", title: "Coloration Auburn", subtitle: "Un brun chaud aux reflets rouges", description: "Une nuance auburn sophistiquée, du brun cannelle au rouge chaud, réalisée sur mesure selon votre base et l’état de vos cheveux.", duration: "1h 30 – 3h", price: "", image: "/images/coiffures/locks/reina-microlocks-color-clean.png" },
  { id: 7, category: "maquillage", title: "Maquillage Événementiel", subtitle: "Mise en beauté sur mesure", description: "Préparation du teint, mise en valeur du regard et des lèvres avec une finition élégante et longue tenue, adaptée à votre événement.", duration: "1h", price: "", image: "/images/maquillage/reina-maquillage-evenementiel.webp" },
  { id: 8, category: "onglerie", title: "Manucure & pédicure spa", subtitle: "Soin complet des mains et des pieds", description: "Gommage nourrissant, soin des cuticules, massage relaxant et pose soignée dans une atmosphère confortable.", duration: "1h 15", price: "", image: "https://images.pexels.com/photos/34930135/pexels-photo-34930135/free-photo-of-professional-pedicure-session-at-beauty-salon.jpeg?auto=compress&dpr=1&h=750&w=1260" },
  { id: 9, category: "henne", title: "Henné Artistique & Traditionnel", subtitle: "Motifs royaux et tracé fin", description: "Création personnalisée à la main avec un henné préparé avec soin pour une finition élégante et raffinée.", duration: "1h – 3h", price: "", image: "/images/henne/reina-henne-tiktok.webp", highlight: "Art Reina" },
  { id: 10, category: "tresses", title: "Laïfou", subtitle: "Coiffure protectrice légère", description: "Une coiffure souple et élégante, travaillée selon la densité et la longueur de vos cheveux pour un résultat naturel, confortable et facile à porter.", duration: "Selon la longueur", price: "", image: "/images/coiffures/laifou/reina-laifou-tiktok.webp" },
  { id: 11, category: "tresses", title: "Napi", subtitle: "Texture naturelle et volume maîtrisé", description: "Une mise en forme qui révèle la texture naturelle des cheveux, avec un travail précis du volume et des finitions adaptées à votre visage et à votre style.", duration: "Selon la densité", price: "", image: "/images/coiffures/nappi/reina-nappi-tiktok.webp" },
];

export const formations = [
  { title: "Masterclass Henné", description: "Maîtrisez la préparation, les cônes et le tracé haute précision.", duration: "3 jours" },
  { title: "Art des tresses & Sectionnement", description: "Apprenez le tressage net, rapide et confortable.", duration: "1 semaine" },
  { title: "Maquillage professionnel", description: "Maîtrisez la préparation du teint, l’harmonie des couleurs et les finitions longue tenue.", duration: "1 semaine" },
] as const;

export const products = [
  { id: 1, title: "Soin du visage Miel & Poudres Botaniques", description: "Rituel naturel destiné à nettoyer la peau en douceur et à raviver l’éclat du teint.", price: "", tag: "Soin visage" },
  { id: 2, title: "Huile de Croissance Intense", description: "Bain d’huiles végétales concentrées pour stimuler le cuir chevelu et prévenir la casse.", price: "10 000 FCFA", tag: "Best-seller" },
] as const;
