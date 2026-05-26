import { useEffect, useState } from "react";
import { COLORS, PillButton } from "./App";

const CONSENT_KEY = "works-consent";
const PRIVACY_HREF = `${import.meta.env.BASE_URL}adatvedelem`;

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (window.localStorage.getItem(CONSENT_KEY) !== "1") {
        setVisible(true);
      }
    } catch {
      setVisible(true);
    }
  }, []);

  function accept() {
    try {
      window.localStorage.setItem(CONSENT_KEY, "1");
    } catch {
      // ignore — még ha nem is tudjuk eltárolni, a sávot most rejtsük el.
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie tájékoztató"
      className="fixed bottom-0 left-0 right-0 z-[60] px-4 pb-4 sm:px-6 sm:pb-6"
      style={{ pointerEvents: "none" }}
    >
      <div
        className="max-w-6xl mx-auto rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-4"
        style={{
          backgroundColor: "#FFFFFF",
          border: `1px solid ${COLORS.hairline}`,
          boxShadow: "0 6px 24px rgba(42,26,46,0.12)",
          pointerEvents: "auto",
        }}
      >
        <p
          className="text-sm sm:text-base leading-relaxed flex-1"
          style={{ color: COLORS.dark }}
        >
          Ez a weboldal sütiket használ a működéshez. A továbblépéssel
          elfogadod ezek használatát. Részletek az{" "}
          <a
            href={PRIVACY_HREF}
            className="underline underline-offset-4 font-semibold"
            style={{ color: COLORS.coral }}
          >
            Adatvédelmi tájékoztatóban
          </a>
          .
        </p>
        <PillButton
          type="button"
          onClick={accept}
          className="w-full sm:w-auto shrink-0"
        >
          Elfogadom
        </PillButton>
      </div>
    </div>
  );
}
