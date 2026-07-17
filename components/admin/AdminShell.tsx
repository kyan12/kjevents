"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import s from "./admin.module.css";

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/login", { method: "DELETE" });
    router.push("/admin/login");
  }

  const isQuotes = pathname.startsWith("/admin/quotes");

  return (
    <div className={s.shell}>
      <aside className={s.sidebar}>
        <div className={s.sideBrand}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/proposals/kj-monogram.png" alt="Kira Jia Events" />
          <div className={s.sideBrandName}>
            Kira Jia
            <br />
            Admin
          </div>
        </div>
        <Link
          href="/admin/quotes"
          className={`${s.navLink} ${isQuotes ? s.navLinkActive : ""}`}
        >
          Quote Builder
        </Link>
        <div className={`${s.navLink} ${s.navSoon}`}>
          Inquiries <span>· soon</span>
        </div>
        <div className={`${s.navLink} ${s.navSoon}`}>
          Vendors <span>· soon</span>
        </div>
        <div className={s.sideFoot}>
          <Link href="/" className={s.navLink}>
            ← Back to site
          </Link>
          <button type="button" onClick={logout} className={`${s.btn} ${s.btnGhost}`}>
            Log out
          </button>
        </div>
      </aside>
      <main className={s.main}>{children}</main>
    </div>
  );
}
