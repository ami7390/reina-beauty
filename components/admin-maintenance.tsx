"use client";

import { useEffect, useState } from "react";
import { CircleCheck, Construction, LoaderCircle, Power } from "lucide-react";

export function AdminMaintenance() {
  const [enabled, setEnabled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/admin/maintenance")
      .then(async (response) => {
        if (!response.ok) throw new Error("Impossible de lire l’état du site.");
        return response.json() as Promise<{ enabled: boolean }>;
      })
      .then((data) => setEnabled(data.enabled))
      .catch((reason: Error) => setError(reason.message))
      .finally(() => setLoading(false));
  }, []);

  async function toggleMaintenance() {
    setSaving(true);
    setError("");
    try {
      const response = await fetch("/api/admin/maintenance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ enabled: !enabled }),
      });
      if (!response.ok) throw new Error("La modification n’a pas pu être enregistrée.");
      const data = await response.json() as { enabled: boolean };
      setEnabled(data.enabled);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Une erreur est survenue.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <section id="maintenance" className="mt-10 overflow-hidden rounded-[2rem] border border-[#e6d2d7] bg-white shadow-[0_20px_60px_rgba(86,34,46,.08)]">
      <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center">
        <div className="flex gap-4">
          <span className={`grid size-12 shrink-0 place-items-center rounded-2xl ${enabled ? "bg-[#fff0e1] text-[#a8561f]" : "bg-[#edf7f0] text-[#277544]"}`}>
            {enabled ? <Construction className="size-6" /> : <CircleCheck className="size-6" />}
          </span>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#a14d60]">Visibilité du site</p>
            <h2 className="mt-1 font-serif text-3xl font-bold text-[#4b2029]">{loading ? "Vérification…" : enabled ? "Maintenance activée" : "Site en ligne"}</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#766267]">{enabled ? "Les visiteurs voient la page de mise à jour. L’administration reste accessible pour poursuivre votre travail." : "Toutes les pages publiques sont actuellement accessibles aux visiteurs."}</p>
            {error && <p className="mt-2 text-xs font-semibold text-red-700">{error}</p>}
          </div>
        </div>
        <button type="button" onClick={toggleMaintenance} disabled={loading || saving} className={`inline-flex min-w-56 items-center justify-center gap-2 rounded-full px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white transition disabled:cursor-wait disabled:opacity-60 ${enabled ? "bg-[#277544] hover:bg-[#1f6338]" : "bg-[#6f2636] hover:bg-[#57202c]"}`}>
          {saving ? <LoaderCircle className="size-4 animate-spin" /> : <Power className="size-4" />}
          {enabled ? "Remettre le site en ligne" : "Activer la maintenance"}
        </button>
      </div>
    </section>
  );
}
