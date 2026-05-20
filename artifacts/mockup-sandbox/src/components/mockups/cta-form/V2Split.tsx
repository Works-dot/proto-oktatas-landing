import "./_group.css";

export function V2Split() {
  return (
    <div
      className="works-cta-root"
      style={{
        background: "var(--warm)",
        minHeight: "100vh",
        padding: "48px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          maxWidth: 920,
          width: "100%",
          display: "grid",
          gridTemplateColumns: "1fr 1.05fr",
          gap: 40,
          alignItems: "center",
        }}
      >
        <div>
          <span
            style={{
              display: "inline-block",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--coral)",
              background: "var(--coral-soft)",
              padding: "5px 12px",
              borderRadius: 999,
              marginBottom: 18,
            }}
          >
            Jelentkezés
          </span>
          <h2 style={{ fontSize: 32, fontWeight: 700, lineHeight: 1.15, margin: "0 0 14px", letterSpacing: "-0.01em" }}>
            Indulj a következő<br />csoporttal
          </h2>
          <p style={{ fontSize: 16, color: "var(--muted)", margin: "0 0 24px", lineHeight: 1.55 }}>
            Add meg az adataidat, és értesítünk, amikor indul a következő turnus. Max 10 fős csoportokkal dolgozunk, hogy mindenki kapjon figyelmet.
          </p>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              "3 alkalom, háromhetente",
              "Alkalmanként ~4 óra, Works. iroda",
              "Válaszolunk 2 munkanapon belül",
            ].map((t) => (
              <li key={t} style={{ display: "flex", gap: 12, alignItems: "flex-start", fontSize: 14, color: "var(--dark)" }}>
                <span
                  aria-hidden
                  style={{
                    width: 8, height: 8, marginTop: 7,
                    background: "var(--coral)", transform: "rotate(45deg)", flexShrink: 0,
                  }}
                />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>

        <form
          onSubmit={(e) => e.preventDefault()}
          style={{
            background: "#FFFFFF",
            border: "1px solid var(--hairline)",
            borderRadius: 20,
            padding: 26,
            boxShadow: "0 1px 2px rgba(42,26,46,0.04), 0 8px 24px rgba(42,26,46,0.04)",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 12,
          }}
        >
          <div>
            <label className="works-cta-label">Név</label>
            <input className="works-cta-input" type="text" placeholder="Teljes név" required />
          </div>
          <div>
            <label className="works-cta-label">Cégnév</label>
            <input className="works-cta-input" type="text" placeholder="Cég neve" required />
          </div>
          <div>
            <label className="works-cta-label">Email</label>
            <input className="works-cta-input" type="email" placeholder="email@cegnev.hu" required />
          </div>
          <div>
            <label className="works-cta-label">Telefonszám</label>
            <input className="works-cta-input" type="tel" placeholder="+36 30 123 4567" required />
          </div>
          <div style={{ gridColumn: "1 / -1" }}>
            <label className="works-cta-label">Érdeklődők száma</label>
            <input className="works-cta-input" type="number" min={1} placeholder="pl. 3" required style={{ maxWidth: 180 }} />
          </div>
          <div style={{ gridColumn: "1 / -1" }}>
            <label className="works-cta-label">Üzenet · opcionális</label>
            <textarea className="works-cta-textarea" rows={3} placeholder="Kérdés, kontextus, bármi amit jó ha tudunk…" />
          </div>
          <button type="submit" className="works-cta-button" style={{ gridColumn: "1 / -1", marginTop: 4 }}>
            Érdekel
          </button>
        </form>
      </div>
    </div>
  );
}
