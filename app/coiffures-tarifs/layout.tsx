import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Prestations Beauté à Bamako | Reina Beauty",
  description: "Micro Locks, tresses, henné, soins naturels, manucure et pédicure pour femmes chez Reina Beauty à Bamako.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
