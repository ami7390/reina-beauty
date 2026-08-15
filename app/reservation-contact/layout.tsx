import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Réservation & Contact | Reina Beauty Bamako",
  description: "Réservez votre rendez-vous au salon Reina Beauty à Bamako par WhatsApp ou téléphone au 71 98 98 95.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
