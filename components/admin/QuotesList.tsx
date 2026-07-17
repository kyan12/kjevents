"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { ProposalSummary } from "@/lib/proposal/store";
import s from "./admin.module.css";

export default function QuotesList() {
  const router = useRouter();
  const [items, setItems] = useState<ProposalSummary[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/proposals", { cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setItems(data.proposals);
    } catch (e) {
      setError(`Could not load proposals (${String(e)})`);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function createNew() {
    setBusy(true);
    const res = await fetch("/api/proposals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });
    setBusy(false);
    if (res.ok) {
      const data = await res.json();
      router.push(`/admin/quotes/${data.proposal.id}`);
    } else {
      setError("Failed to create proposal.");
    }
  }

  async function remove(id: string, name: string) {
    if (!confirm(`Delete the proposal for “${name}”? This cannot be undone.`)) return;
    const res = await fetch(`/api/proposals/${id}`, { method: "DELETE" });
    if (res.ok) load();
  }

  function copyLink(slug: string) {
    navigator.clipboard.writeText(`${window.location.origin}/p/${slug}`);
  }

  return (
    <>
      <div className={s.pageHead}>
        <div>
          <h1 className={s.pageTitle}>Quote Builder</h1>
          <div className={s.pageSub}>
            AI-assisted proposals &amp; quotations for events and weddings
          </div>
        </div>
        <button className={`${s.btn} ${s.btnPrimary}`} onClick={createNew} disabled={busy}>
          + New proposal
        </button>
      </div>

      {error ? <div className={s.error}>{error}</div> : null}

      <div className={s.card}>
        <table className={s.table}>
          <thead>
            <tr>
              <th>Client / Event</th>
              <th>Event date</th>
              <th>Status</th>
              <th>Updated</th>
              <th style={{ width: 1 }}></th>
            </tr>
          </thead>
          <tbody>
            {items === null ? (
              <tr>
                <td colSpan={5} className={s.subtle}>
                  Loading…
                </td>
              </tr>
            ) : items.length === 0 ? (
              <tr>
                <td colSpan={5} className={s.subtle}>
                  No proposals yet — create one to get started.
                </td>
              </tr>
            ) : (
              items.map((p) => (
                <tr key={p.id}>
                  <td>
                    <div className={s.rowTitle}>
                      {p.clientName}
                      {p.seed ? <span className={s.seedChip}>Demo</span> : null}
                    </div>
                    <div className={s.rowSub}>{p.eventTitle}</div>
                  </td>
                  <td className={s.subtle}>{p.eventDate ?? "—"}</td>
                  <td>
                    <span
                      className={`${s.statusChip} ${
                        p.status === "sent" ? s.statusSent : p.status === "draft" ? s.statusDraft : ""
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td className={s.subtle}>{new Date(p.updatedAt).toLocaleDateString()}</td>
                  <td>
                    <div style={{ display: "flex", gap: "0.3rem" }}>
                      <a className={`${s.btn} ${s.btnSm}`} href={`/admin/quotes/${p.id}`}>
                        Edit
                      </a>
                      <a
                        className={`${s.btn} ${s.btnSm}`}
                        href={`/p/${p.slug}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        View
                      </a>
                      <button className={`${s.btn} ${s.btnSm}`} onClick={() => copyLink(p.slug)}>
                        Copy link
                      </button>
                      {!p.seed ? (
                        <button
                          className={`${s.btn} ${s.btnSm} ${s.btnDanger}`}
                          onClick={() => remove(p.id, p.clientName)}
                        >
                          Delete
                        </button>
                      ) : null}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
