"use client";

import { Check, Mail, MailOpen, Search, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { ContactMessage } from "@/lib/contact-messages";

export function AdminMessages({ initialMessages }: { initialMessages: ContactMessage[] }) {
  const [messages, setMessages] = useState(initialMessages);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all");
  const visible = useMemo(() => messages.filter((item) => (filter === "all" || item.status === filter) && `${item.name} ${item.phone} ${item.email ?? ""} ${item.subject} ${item.message}`.toLowerCase().includes(query.toLowerCase())), [messages, query, filter]);
  const unread = messages.filter((message) => message.status === "unread").length;
  const today = messages.filter((message) => new Date(message.created_at).toDateString() === new Date().toDateString()).length;

  useEffect(() => {
    fetch("/api/admin/messages/inbox")
      .then(async (response) => { if (!response.ok) throw new Error(); return response.json(); })
      .then((data: { messages: ContactMessage[] }) => setMessages(data.messages))
      .finally(() => setLoading(false));
  }, []);

  async function changeStatus(id: number, status: "read" | "unread") {
    const response = await fetch(`/api/admin/messages/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }) });
    if (response.ok) setMessages((items) => items.map((item) => item.id === id ? { ...item, status } : item));
  }

  async function remove(id: number) {
    if (!window.confirm("Supprimer définitivement ce message ?")) return;
    const response = await fetch(`/api/admin/messages/${id}`, { method: "DELETE" });
    if (response.ok) setMessages((items) => items.filter((item) => item.id !== id));
  }

  return <>
    <section className="mt-10 grid gap-4 sm:grid-cols-3"><Stat icon={MailOpen} label="Tous les messages" value={messages.length} /><Stat icon={Mail} label="Non lus" value={unread} accent /><Stat icon={Check} label="Reçus aujourd’hui" value={today} /></section>
    <div className="mt-8 flex flex-col gap-3 rounded-3xl border border-[#ead9dc] bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between"><label className="relative flex-1"><Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-[#8b7378]" /><input value={query} onChange={(event) => setQuery(event.target.value)} className="w-full rounded-2xl border border-[#ead9dc] bg-[#fff9fa] py-3 pl-11 pr-4 text-sm outline-none focus:border-[#7b2d3e]" placeholder="Rechercher un nom, numéro ou message..." /></label><div className="flex gap-2">{([['all','Tous'],['unread','Non lus'],['read','Lus']] as const).map(([value, label]) => <button key={value} onClick={() => setFilter(value)} className={`rounded-full px-4 py-2.5 text-[10px] font-bold uppercase tracking-wider ${filter === value ? "bg-[#6f2636] text-white" : "bg-[#f8ecee] text-[#6f2636]"}`}>{label}</button>)}</div></div>
    <div className="mt-5 space-y-4">{loading && <div className="rounded-3xl border border-[#ead9dc] bg-white px-6 py-12 text-center text-sm text-[#8b7378]">Chargement des messages…</div>}{!loading && visible.map((item) => <article key={item.id} className={`rounded-3xl border bg-white p-6 shadow-sm transition sm:p-7 ${item.status === "unread" ? "border-[#c8939f] shadow-[0_12px_35px_rgba(103,35,50,.08)]" : "border-[#ead9dc]"}`}><div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between"><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-3">{item.status === "unread" ? <Mail className="size-5 text-[#8b3044]" /> : <MailOpen className="size-5 text-[#9a8589]" />}<h2 className="font-serif text-2xl font-bold text-[#4b2029]">{item.name}</h2>{item.status === "unread" && <span className="rounded-full bg-[#f6dfe4] px-3 py-1 text-[9px] font-bold uppercase tracking-wider text-[#7b2d3e]">Nouveau</span>}</div><p className="mt-1 text-xs text-[#8b7378]">{new Intl.DateTimeFormat("fr-FR", { dateStyle: "long", timeStyle: "short" }).format(new Date(item.created_at))}</p><div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs"><a className="font-semibold text-[#6f2636]" href={`tel:${item.phone}`}>{item.phone}</a>{item.email && <a className="text-[#6f2636] underline decoration-[#d4aeb6] underline-offset-4" href={`mailto:${item.email}`}>{item.email}</a>}</div><p className="mt-5 text-[10px] font-bold uppercase tracking-[.18em] text-[#a14d60]">{item.subject}</p><p className="mt-2 whitespace-pre-wrap text-sm leading-7 text-[#5f5355]">{item.message}</p></div><div className="flex shrink-0 gap-2 md:flex-col">{item.status === "unread" ? <button onClick={() => changeStatus(item.id, "read")} className="inline-flex items-center justify-center gap-2 rounded-full bg-[#edf8f2] px-4 py-2.5 text-[10px] font-bold uppercase text-emerald-800"><Check className="size-4" /> Marquer lu</button> : <button onClick={() => changeStatus(item.id, "unread")} className="inline-flex items-center justify-center gap-2 rounded-full bg-[#f8ecee] px-4 py-2.5 text-[10px] font-bold uppercase text-[#6f2636]"><Mail className="size-4" /> Non lu</button>}<button onClick={() => remove(item.id)} aria-label={`Supprimer le message de ${item.name}`} className="inline-flex items-center justify-center gap-2 rounded-full border border-red-100 px-4 py-2.5 text-[10px] font-bold uppercase text-red-700"><Trash2 className="size-4" /> Supprimer</button></div></div></article>)}{!loading && visible.length === 0 && <div className="rounded-3xl border border-dashed border-[#d9bcc2] bg-white/60 px-6 py-16 text-center"><MailOpen className="mx-auto size-9 text-[#b9979e]" /><h2 className="mt-4 font-serif text-2xl font-bold text-[#4b2029]">Aucun message</h2><p className="mt-2 text-sm text-[#8b7378]">Les nouveaux messages envoyés depuis la page Contact apparaîtront ici.</p></div>}</div>
  </>;
}

function Stat({ icon: Icon, label, value, accent = false }: { icon: typeof Mail; label: string; value: number; accent?: boolean }) { return <div className={`rounded-3xl border p-6 shadow-sm ${accent ? "border-[#7b2d3e] bg-[#6f2636] text-white" : "border-[#ead9dc] bg-white text-[#4b2029]"}`}><div className="flex items-center justify-between"><p className={`text-[10px] font-bold uppercase tracking-[.15em] ${accent ? "text-white/65" : "text-[#8b7378]"}`}>{label}</p><Icon className="size-5" /></div><p className="mt-5 font-serif text-4xl font-bold">{value}</p></div>; }
