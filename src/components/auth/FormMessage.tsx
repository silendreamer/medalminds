type FormMessageProps = {
  kind: "error" | "success" | "info";
  children: React.ReactNode;
};

export function FormMessage({ kind, children }: FormMessageProps) {
  return (
    <div className={`auth-message auth-message--${kind}`} role={kind === "error" ? "alert" : "status"}>
      {children}
    </div>
  );
}
