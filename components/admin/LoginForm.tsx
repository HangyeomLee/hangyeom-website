"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./admin.module.css";

export function LoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        setError("Wrong password.");
        return;
      }
      router.refresh();
    } catch {
      setError("Login failed. Try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <form className={styles.loginBox} onSubmit={submit}>
      <h1 className={styles.adminTitle}>Admin</h1>
      <input
        type="password"
        className={styles.loginInput}
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoFocus
      />
      {error && <p className={styles.loginError}>{error}</p>}
      <button type="submit" className={styles.btnPrimary} disabled={busy || !password}>
        {busy ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
