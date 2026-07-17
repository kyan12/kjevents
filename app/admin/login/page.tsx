"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import s from "@/components/admin/admin.module.css";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    setBusy(false);
    if (res.ok) {
      router.push(params.get("next") || "/admin/quotes");
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Login failed.");
    }
  }

  return (
    <form className={s.loginCard} onSubmit={submit}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/proposals/kj-monogram.png" alt="Kira Jia Events" />
      <div className={s.loginTitle}>Admin Access</div>
      <input
        type="password"
        className={s.input}
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoFocus
      />
      {error ? <div className={s.error}>{error}</div> : null}
      <button className={`${s.btn} ${s.btnPrimary}`} disabled={busy || !password}>
        {busy ? "Checking…" : "Enter"}
      </button>
    </form>
  );
}

export default function LoginPage() {
  return (
    <div className={s.loginWrap}>
      <Suspense>
        <LoginForm />
      </Suspense>
    </div>
  );
}
