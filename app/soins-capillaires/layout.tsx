import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Soins Capillaires Naturels à Bamako | Reina Beauty",
  description: "Produits capillaires, huiles, sérums, baumes naturels et soin du visage au miel et aux poudres botaniques.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
