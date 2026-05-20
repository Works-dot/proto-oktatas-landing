import "./_group.css";
import { useState } from "react";

export function V3Minimal() {
  const [attendees, setAttendees] = useState<string>("1");
  const opts = ["1", "2", "3", "4", "5", "5+"];
  return (
    <div
      className="works-cta-root"
      style={{
        background: "var(--warm)",
        minHeight: "100vh",
        padding: "56px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ maxWidth: 460, width: "100%" }}>
        <h2 style={{ fontSize: 30, fontWeight: 700, margin: "0 0 8px", letterSpacing: "-0.01em", textAlign: "center" }}>
          Indulj a következő csoporttal
        </h2>
        <p style={{ fontSize: 15, color: "var(--muted)", margin: "0 0 32px", textAlign: "center" }}>
          Add meg az adataidat, és értesítünk, amikor indul.
        </p>

        <form
          onSubmit={(e) => e.preventDefault()}
          style={{ display: "flex", flexDirection: "column", gap: 18 }}
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
            <label className="works-cta-label">Email cím</label>
            <input className="works-cta-input" type="email" placeholder="email@cegnev.hu" required />
          </div>
          <div>
            <label className="works-cta-label">Telefonszám</label>
            <input className="works-cta-input" type="tel" placeholder="+36 30 123 4567" required />
          </div>

          <div>
            <label className="works-cta-label">Érdeklődők száma</label>
            <div
              role="radiogroup"
              aria-label="Érdeklődők száma"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(6, 1fr)",
                gap: 6,
                background: "#FFFFFF",
                border: "1px solid var(--hairline)",
                borderRadius: 14,
                padding: 4,
              }}
            >
              {opts.map((n) => {
                const active = n === attendees;
                return (
                  <button
                    type="button"
                    key={n}
                    onClick={() => setAttendees(n)}
                    aria-pressed={active}
                    style={{
                      padding: "10px 0",
                      fontSize: 14,
                      fontWeight: 600,
                      border: "none",
                      borderRadius: 10,
                      cursor: "pointer",
                      background: active ? "var(--coral)" : "transparent",
                      color: active ? "#FFFFFF" : "var(--muted)",
                      fontFamily: "inherit",
                      transition: "background 0.15s, color 0.15s",
                    }}
                  >
                    {n}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="works-cta-label">
              Üzenet <span style={{ color: "var(--muted)", fontWeight: 500, textTransform: "none", letterSpacing: 0, marginLeft: 4 }}>· opcionális</span>
            </label>
            <textarea
              className="works-cta-textarea"
              rows={3}
              placeholder="Kérdés, kontextus, bármi amit jó ha tudunk…"
            />
          </div>

          <button type="submit" className="works-cta-button" style={{ marginTop: 4 }}>
            Érdekel
          </button>
          <p style={{ fontSize: 12, color: "var(--muted)", textAlign: "center", margin: 0 }}>
            Válaszolunk 2 munkanapon belül.
          </p>
        </form>
      </div>
    </div>
  );
}
