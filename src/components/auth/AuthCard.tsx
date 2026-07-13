type AuthCardProps = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
};

export function AuthCard({ title, subtitle, children }: AuthCardProps) {
  return (
    <div className="auth-card">
      <div className="auth-card-header">
        <h1 className="auth-card-title">{title}</h1>
        {subtitle ? <p className="auth-card-subtitle">{subtitle}</p> : null}
      </div>
      {children}
    </div>
  );
}
