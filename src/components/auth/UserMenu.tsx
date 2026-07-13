"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { authClient } from "@/lib/authClient";

export function UserMenu() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  if (isPending) {
    return <div style={{ width: 24, height: 24, flexShrink: 0 }} aria-hidden="true" />;
  }

  if (!session) {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 14, flexShrink: 0 }}>
        <Link
          href="/login"
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: "#1a2745",
            textDecoration: "none",
          }}
        >
          Log in
        </Link>
        <Link
          href="/signup"
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: "#fff",
            background: "#5a92f0",
            padding: "8px 16px",
            borderRadius: 8,
            textDecoration: "none",
          }}
        >
          Sign up
        </Link>
      </div>
    );
  }

  const name = session.user.name || session.user.email;

  const handleLogout = async () => {
    setOpen(false);
    await authClient.signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <div ref={containerRef} style={{ position: "relative", flexShrink: 0 }}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="menu"
        aria-expanded={open}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          fontSize: 14,
          fontWeight: 600,
          color: "#1a2745",
          background: "transparent",
          border: "1px solid #e7e9ee",
          borderRadius: 8,
          padding: "6px 12px",
          cursor: "pointer",
        }}
      >
        <span
          style={{
            width: 22,
            height: 22,
            borderRadius: "50%",
            background: "#5a92f0",
            color: "#fff",
            fontSize: 12,
            fontWeight: 700,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
          aria-hidden="true"
        >
          {name.charAt(0).toUpperCase()}
        </span>
        {name}
      </button>

      {open && (
        <div
          role="menu"
          style={{
            position: "absolute",
            top: "calc(100% + 6px)",
            right: 0,
            minWidth: 160,
            background: "#fff",
            border: "1px solid #e7e9ee",
            borderRadius: 10,
            boxShadow: "0 8px 24px rgba(26, 39, 69, 0.12)",
            padding: 6,
            zIndex: 20,
          }}
        >
          <Link
            href="/account"
            role="menuitem"
            onClick={() => setOpen(false)}
            style={{
              display: "block",
              fontSize: 14,
              fontWeight: 500,
              color: "#1a2745",
              textDecoration: "none",
              padding: "8px 10px",
              borderRadius: 6,
            }}
          >
            Account
          </Link>
          <button
            type="button"
            role="menuitem"
            onClick={handleLogout}
            style={{
              display: "block",
              width: "100%",
              textAlign: "left",
              fontSize: 14,
              fontWeight: 500,
              color: "#1a2745",
              background: "transparent",
              border: "none",
              padding: "8px 10px",
              borderRadius: 6,
              cursor: "pointer",
            }}
          >
            Log out
          </button>
        </div>
      )}
    </div>
  );
}
