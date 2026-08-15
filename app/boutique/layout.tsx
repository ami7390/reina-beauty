import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Boutique Reina Beauty | Produits capillaires à Bamako",
  description: "Achetez les produits Reina Beauty : huiles, sérums, baumes et accessoires. Panier avec commande directe sur WhatsApp.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
