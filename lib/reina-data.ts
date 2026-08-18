export const phone = "+22371989895";
export const phoneDisplay = "71 98 98 95";
export const whatsapp = `https://wa.me/22371989895?text=${encodeURIComponent("Bonjour Reina Beauty, je souhaite réserver un rendez-vous.")}`;

export type Service = {
  id: number;
  category: "locks" | "tresses" | "twists" | "soins" | "visage" | "teinture" | "henne" | "maquillage" | "onglerie";
  title: string;
  subtitle: string;
  description: string;
  duration: string;
  price: string;
  image: string;
  highlight?: string;
};

export const services: readonly Service[] = [
  { id: 1, category: "locks", title: "Micro Locks — Création & Installation", subtitle: "Départ et grille sur mesure", description: "Installation minutieuse avec une grille adaptée à la densité naturelle, au cuir chevelu et au résultat souhaité.", duration: "4h – 8h", price: "À partir de 15 000 FCFA", image: "/images/coiffures/locks/reina-installation-locks-tiktok.webp", highlight: "Incontournable" },
  { id: 2, category: "locks", title: "Micro Locks — Resserrage & Entretien", subtitle: "Suivi des repousses", description: "Resserrage des repousses, contrôle de la grille et entretien pour conserver des Micro Locks nettes et régulières.", duration: "2h – 3h", price: "Tarif sur devis", image: "/images/coiffures/locks/reina-microlocks-color-clean.png" },
  { id: 17, category: "locks", title: "Starter Locks", subtitle: "Démarrage de locks naturelles", description: "Création d’un départ de locks adapté à votre texture, votre densité et au rendu final souhaité.", duration: "Selon la densité", price: "Tarif sur devis", image: "/images/coiffures/locks/reina-microlocks-clean.png" },
  { id: 18, category: "locks", title: "Locks Traditionnelles — Création", subtitle: "Sections et départ personnalisés", description: "Création de locks traditionnelles avec choix de la taille, du sectionnement et de la méthode de départ selon vos cheveux.", duration: "Selon la longueur", price: "Tarif sur devis", image: "/images/coiffures/locks/reina-microlocks.png" },
  { id: 19, category: "locks", title: "Retwist & Entretien Locks", subtitle: "Repousses et finitions", description: "Entretien des racines, remise en forme et finitions pour préserver une apparence propre et harmonieuse.", duration: "Selon la repousse", price: "Tarif sur devis", image: "/images/coiffures/locks/reina-microlocks-color-clean.png" },
  { id: 20, category: "locks", title: "Instant Locks", subtitle: "Transformation plus immédiate", description: "Technique de création de locks avec travail au crochet, proposée après diagnostic de la texture et de l’état des cheveux.", duration: "Selon la longueur", price: "Tarif sur devis", image: "/images/coiffures/locks/reina-installation-locks-tiktok.webp" },

  { id: 21, category: "twists", title: "Vanilles", subtitle: "Coiffure protectrice torsadée", description: "Des vanilles régulières et souples, réalisées selon la longueur, la densité et le rendu souhaité.", duration: "Selon la longueur", price: "Tarif sur devis", image: "/images/coiffures/twists/reina-vanilles.webp", highlight: "Protectrice" },
  { id: 22, category: "twists", title: "Twist", subtitle: "Torsades naturelles", description: "Des twists travaillés avec soin pour un résultat net, léger et facile à porter au quotidien.", duration: "Selon la densité", price: "Tarif sur devis", image: "/images/coiffures/twists/reina-micro-twist.webp" },
  { id: 23, category: "twists", title: "Micro Twist", subtitle: "Fines torsades longue tenue", description: "Des micro twists fins et réguliers pour un rendu élégant, léger et polyvalent.", duration: "Selon la longueur et la densité", price: "Tarif sur devis", image: "/images/coiffures/twists/reina-micro-twist.webp", highlight: "Fin & léger" },
  { id: 3, category: "tresses", title: "Nattes Artistiques", subtitle: "Créations protectrices", description: "Des nattes réalisées avec précision, adaptées au style, à la longueur et à l’occasion.", duration: "Selon le modèle", price: "Tarif sur devis", image: "/images/coiffures/nattes/reina-nattes-artistiques.webp", highlight: "Populaire" },
  { id: 10, category: "tresses", title: "Laïfou", subtitle: "Coiffure protectrice légère", description: "Une coiffure souple et élégante, travaillée selon la densité et la longueur de vos cheveux.", duration: "Selon la longueur", price: "Tarif sur devis", image: "/images/coiffures/laifou/reina-laifou-tiktok.webp" },
  { id: 11, category: "tresses", title: "Napi", subtitle: "Texture naturelle et volume", description: "Une mise en forme qui révèle la texture naturelle des cheveux avec un volume maîtrisé.", duration: "Selon la densité", price: "Tarif sur devis", image: "/images/coiffures/nappi/reina-nappi-tiktok.webp" },
  { id: 4, category: "visage", title: "Soin du Visage au Miel & Poudres", subtitle: "Nettoyage et éclat", description: "Un rituel visage au miel et aux poudres botaniques pour nettoyer en douceur et raviver l’éclat.", duration: "Selon le diagnostic", price: "Tarif sur devis", image: "/images/soins/visage/reina-soin-visage-tiktok.webp", highlight: "Signature" },
  { id: 5, category: "soins", title: "Bain d’Huiles Végétales", subtitle: "Nutrition et souplesse", description: "Une sélection d’huiles végétales appliquée sur les longueurs et le cuir chevelu pour nourrir et limiter la casse.", duration: "45 min – 1h", price: "Tarif sur devis", image: "/images/soins/capillaires/reina-bain-huiles.webp", highlight: "Rituel botanique" },
  { id: 16, category: "soins", title: "Massage du Cuir Chevelu", subtitle: "Détente et soin des racines", description: "Des gestes doux et précis pour favoriser la relaxation et compléter votre rituel de soin.", duration: "20 – 30 min", price: "Tarif sur devis", image: "/images/soins/capillaires/reina-massage-cuir-chevelu.webp" },
  { id: 6, category: "teinture", title: "Coloration Bordeaux Velours", subtitle: "Nuance profonde et élégante", description: "Une coloration bordeaux personnalisée après diagnostic pour un résultat harmonieux.", duration: "1h 30 – 3h", price: "Tarif sur devis", image: "/images/coiffures/colorations/reina-coloration-bordeaux.webp", highlight: "Signature" },
  { id: 12, category: "teinture", title: "Coloration Cuivrée Lumineuse", subtitle: "Reflets chauds", description: "Une teinte cuivrée vibrante qui réchauffe la chevelure et met en valeur les textures naturelles.", duration: "1h 30 – 3h", price: "Tarif sur devis", image: "/images/coiffures/colorations/reina-coloration-cuivree.webp" },
  { id: 13, category: "teinture", title: "Coloration Miel Doré", subtitle: "Lumière douce", description: "Des nuances miel et caramel pour illuminer les boucles et créer un relief élégant.", duration: "1h 30 – 3h", price: "Tarif sur devis", image: "/images/coiffures/colorations/reina-coloration-miel-dore.webp" },
  { id: 14, category: "teinture", title: "Coloration Auburn", subtitle: "Brun chaud aux reflets rouges", description: "Une nuance auburn sophistiquée réalisée sur mesure selon votre base et l’état des cheveux.", duration: "1h 30 – 3h", price: "Tarif sur devis", image: "/images/coiffures/locks/reina-microlocks-color-clean.png" },
  { id: 7, category: "maquillage", title: "Maquillage Événementiel", subtitle: "Mise en beauté sur mesure", description: "Préparation du teint, mise en valeur du regard et finition adaptée à votre événement.", duration: "1h", price: "Tarif sur devis", image: "/images/maquillage/reina-maquillage-evenementiel.webp" },
  { id: 8, category: "onglerie", title: "Manucure & Pédicure Spa", subtitle: "Mains et pieds", description: "Soin des cuticules, gommage, massage et finitions soignées dans une atmosphère confortable.", duration: "1h 15", price: "Tarif sur devis", image: "https://images.pexels.com/photos/34930135/pexels-photo-34930135/free-photo-of-professional-pedicure-session-at-beauty-salon.jpeg?auto=compress&dpr=1&h=750&w=1260" },
  { id: 9, category: "henne", title: "Henné Artistique & Traditionnel", subtitle: "Motifs et tracé fin", description: "Création personnalisée à la main avec un henné préparé avec soin.", duration: "1h – 3h", price: "Tarif sur devis", image: "/images/henne/reina-henne-tiktok.webp", highlight: "Art Reina" },
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
