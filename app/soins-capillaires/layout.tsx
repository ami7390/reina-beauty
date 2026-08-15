import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Boutique Reina Beauty",
  description: "Retrouvez la boutique Reina Beauty et commandez vos produits directement sur WhatsApp.",
};

export default function Layout({ children }: { children: React.ReactNode }) { return children; }
