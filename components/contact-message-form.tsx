"use client";

import { CheckCircle2, LoaderCircle, Send } from "lucide-react";
import { FormEvent, useState } from "react";

export function ContactMessageForm() {
  const [state, setState] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("sending");
    setFeedback("");
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const result = await response.json() as { error?: string; message?: string };
      if (!response.ok) throw new Error(result.error || "Impossible d’envoyer le message.");
      form.reset();
      setState("success");
      setFeedback(result.message || "Votre message a bien été envoyé.");
    } catch (error) {
      setState("error");
      setFeedback(error instanceof Error ? error.message : "Une erreur est survenue.");
    }
  }

  return <form onSubmit={submit} className="mt-8 grid gap-5 sm:grid-cols-2">
    <label className="text-xs font-semibold text-luxury-deep">Nom complet *<input required name="name" minLength={2} maxLength={100} autoComplete="name" className="mt-2 w-full rounded-2xl border border-luxury-line bg-luxury-bg px-4 py-3.5 font-normal outline-none transition focus:border-luxury-wine" placeholder="Votre nom" /></label>
    <label className="text-xs font-semibold text-luxury-deep">Téléphone *<input required name="phone" minLength={6} maxLength={40} autoComplete="tel" className="mt-2 w-full rounded-2xl border border-luxury-line bg-luxury-bg px-4 py-3.5 font-normal outline-none transition focus:border-luxury-wine" placeholder="Ex. 71 98 98 95" /></label>
    <label className="text-xs font-semibold text-luxury-deep">E-mail<input name="email" type="email" maxLength={160} autoComplete="email" className="mt-2 w-full rounded-2xl border border-luxury-line bg-luxury-bg px-4 py-3.5 font-normal outline-none transition focus:border-luxury-wine" placeholder="vous@exemple.com" /></label>
    <label className="text-xs font-semibold text-luxury-deep">Objet *<select required name="subject" defaultValue="" className="mt-2 w-full rounded-2xl border border-luxury-line bg-luxury-bg px-4 py-3.5 font-normal outline-none transition focus:border-luxury-wine"><option value="" disabled>Choisir un sujet</option><option>Réservation</option><option>Prestation</option><option>Formation</option><option>Produits capillaires</option><option>Autre demande</option></select></label>
    <label className="hidden" aria-hidden="true">Site web<input name="website" tabIndex={-1} autoComplete="off" /></label>
    <label className="text-xs font-semibold text-luxury-deep sm:col-span-2">Votre message *<textarea required name="message" minLength={10} maxLength={2000} rows={6} className="mt-2 w-full resize-y rounded-2xl border border-luxury-line bg-luxury-bg px-4 py-3.5 font-normal leading-6 outline-none transition focus:border-luxury-wine" placeholder="Expliquez-nous votre besoin..." /></label>
    <div className="sm:col-span-2"><button disabled={state === "sending"} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-luxury-wine px-7 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-lg transition hover:bg-luxury-footer disabled:cursor-wait disabled:opacity-70">{state === "sending" ? <LoaderCircle className="size-4 animate-spin" /> : <Send className="size-4" />}{state === "sending" ? "Envoi en cours" : "Envoyer le message"}</button>{feedback && <p role="status" className={`mt-4 flex items-center gap-2 rounded-2xl px-4 py-3 text-xs ${state === "success" ? "bg-emerald-50 text-emerald-800" : "bg-red-50 text-red-700"}`}>{state === "success" && <CheckCircle2 className="size-4" />}{feedback}</p>}</div>
  </form>;
}
