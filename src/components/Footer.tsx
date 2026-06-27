export function Footer() {
  return (
    <footer
      style={{
        background: "#1a2745",
        color: "#aeb8cd",
        padding: "30px 0",
        fontSize: "13.5px",
        marginTop: "auto"
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
          flexWrap: "wrap"
        }}
      >
        <span>© 2024 Medal Minds</span>
        <div style={{ display: "flex", gap: "22px" }}>
          <a
            href="#"
            style={{
              color: "#cdd6e8",
              textDecoration: "none",
              transition: "color 150ms ease"
            }}
          >
            About
          </a>
          <a
            href="#"
            style={{
              color: "#cdd6e8",
              textDecoration: "none",
              transition: "color 150ms ease"
            }}
          >
            Contact
          </a>
          <a
            href="#"
            style={{
              color: "#cdd6e8",
              textDecoration: "none",
              transition: "color 150ms ease"
            }}
          >
            Privacy
          </a>
        </div>
      </div>
    </footer>
  );
}
