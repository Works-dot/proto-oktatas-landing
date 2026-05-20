import "./_group.css";

export function V1Boxed() {
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
      <div style={{ maxWidth: 560, width: "100%", textAlign: "center" }}>
        <h2 style={{ fontSize: 30, fontWeight: 700, margin: "0 0 8px", letterSpacing: "-0.01em" }}>
          Indulj a következő csoporttal
        </h2>
        <p style={{ fontSize: 16, color: "var(--muted)", margin: "0 0 28px" }}>
          Add meg az adataidat, és értesítünk, amikor indul.
        </p>

        <form
          onSubmit={(e) => e.preventDefault()}
          style={{
            background: "#FFFFFF",
            border: "1px solid var(--hairline)",
            borderRadius: 20,
            padding: 28,
            boxShadow: "0 1px 2px rgba(42,26,46,0.04), 0 8px 24px rgba(42,26,46,0.04)",
            textAlign: "left",
          }}
        >
          <div className="works-cta-section-title">Kapcsolat</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
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
          </div>

          <div className="works-cta-divider" />

          <div className="works-cta-section-title">Részvétel</div>
          <div style={{ maxWidth: 220 }}>
            <label className="works-cta-label">Érdeklődők száma</label>
            <input className="works-cta-input" type="number" min={1} placeholder="pl. 3" required />
          </div>

          <div className="works-cta-divider" />

          <div className="works-cta-section-title">
            Üzenet <span style={{ color: "var(--muted)", fontWeight: 500, textTransform: "none", letterSpacing: 0 }}>· opcionális</span>
          </div>
          <textarea
            className="works-cta-textarea"
            rows={3}
            placeholder="Kérdés, kontextus, bármi amit jó ha tudunk…"
          />

          <button type="submit" className="works-cta-button" style={{ marginTop: 20 }}>
            Érdekel
          </button>
          <p style={{ fontSize: 12, color: "var(--muted)", textAlign: "center", margin: "12px 0 0" }}>
            Válaszolunk 2 munkanapon belül.
          </p>
        </form>
      </div>
    </div>
  );
}
