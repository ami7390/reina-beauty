import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Formations Beauté à Bamako | Reina Beauty",
  description: "Formations professionnelles en henné, tresses et locks proposées par Reina Beauty à Bamako.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
