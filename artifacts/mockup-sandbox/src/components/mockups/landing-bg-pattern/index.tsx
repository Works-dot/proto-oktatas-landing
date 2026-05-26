import React, { useEffect, useState } from "react";
import W_ASSET from "@assets/W_1779438741039.png";
import DIAMOND_ASSET from "@assets/works_1779438876045.png";

const COLORS = {
  coral: "#EE3956",
  coralHover: "#D62E48",
  coralSoft: "#FCE3E7",
  dark: "#2A1A2E",
  muted: "#5C4F5F",
  warm: "#F0EDF1",
  hairline: "#E0DBD7",
};

const PROTO_IMG = "/__mockup/images/hero-mockup.png";
const OFFICE_IMG = "/__mockup/images/works-office.jpg";
const LOGO_IMG = "/__mockup/images/works-logo.png";
const W_IMG = W_ASSET;
const DIAMOND_IMG = DIAMOND_ASSET;

function Logo({ size = "md", variant = "dark" }: { size?: "md" | "lg"; variant?: "dark" | "light" }) {
  const heightPx = size === "lg" ? 36 : 30;
  return (
    <img
      src={LOGO_IMG}
      alt="Works."
      style={{
        height: heightPx,
        width: "auto",
        display: "block",
        filter: variant === "light" ? "brightness(0) invert(1)" : undefined,
      }}
    />
  );
}

const pillBase =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors cursor-pointer disabled:cursor-not-allowed";
const pillSizes = {
  md: "px-7 py-3 text-sm",
  lg: "px-9 py-4 text-base",
};

type PillVariant = "primary" | "outline";

function pillStyleFor(variant: PillVariant): React.CSSProperties {
  if (variant === "outline") {
    return {
      backgroundColor: "transparent",
      color: COLORS.coral,
      border: `1.5px solid ${COLORS.coral}`,
    };
  }
  return { backgroundColor: COLORS.coral, color: "#FFFFFF" };
}

function applyPillHover(el: HTMLElement, variant: PillVariant, hovered: boolean) {
  if (variant === "outline") {
    if (hovered) {
      el.style.backgroundColor = COLORS.coral;
      el.style.color = "#FFFFFF";
    } else {
      el.style.backgroundColor = "transparent";
      el.style.color = COLORS.coral;
    }
  } else {
    el.style.backgroundColor = hovered ? COLORS.coralHover : COLORS.coral;
  }
}

interface PillExtra {
  variant?: PillVariant;
  size?: keyof typeof pillSizes;
}

function PillButton(props: React.ButtonHTMLAttributes<HTMLButtonElement> & PillExtra) {
  const { className = "", style, variant = "primary", size = "md", onMouseEnter, onMouseLeave, ...rest } = props;
  return (
    <button
      {...rest}
      className={`${pillBase} ${pillSizes[size]} ${className}`}
      style={{ ...pillStyleFor(variant), ...style }}
      onMouseEnter={(e) => { applyPillHover(e.currentTarget, variant, true); onMouseEnter?.(e); }}
      onMouseLeave={(e) => { applyPillHover(e.currentTarget, variant, false); onMouseLeave?.(e); }}
    />
  );
}

function PillLink(props: React.AnchorHTMLAttributes<HTMLAnchorElement> & PillExtra) {
  const { className = "", style, variant = "primary", size = "md", onMouseEnter, onMouseLeave, ...rest } = props;
  return (
    <a
      {...rest}
      className={`${pillBase} ${pillSizes[size]} ${className}`}
      style={{ ...pillStyleFor(variant), ...style }}
      onMouseEnter={(e) => { applyPillHover(e.currentTarget, variant, true); onMouseEnter?.(e); }}
      onMouseLeave={(e) => { applyPillHover(e.currentTarget, variant, false); onMouseLeave?.(e); }}
    />
  );
}

function FieldLabel({ htmlFor, required, children }: { htmlFor: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="block text-sm font-medium mb-1.5" style={{ color: COLORS.dark }}>
      {children}
      {required && (
        <span aria-hidden="true" style={{ color: COLORS.coral, marginLeft: 2 }}>*</span>
      )}
    </label>
  );
}

function CtaInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  const { className = "", style, onFocus, onBlur, ...rest } = props;
  return (
    <input
      {...rest}
      className={`w-full px-5 py-3 rounded-lg bg-white focus:outline-none transition-shadow ${className}`}
      style={{ border: `1px solid ${COLORS.hairline}`, color: COLORS.dark, ...style }}
      onFocus={(e) => { e.currentTarget.style.boxShadow = `0 0 0 3px ${COLORS.coral}33`; e.currentTarget.style.borderColor = COLORS.coral; onFocus?.(e); }}
      onBlur={(e) => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = COLORS.hairline; onBlur?.(e); }}
    />
  );
}

function CtaTextarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const { className = "", style, onFocus, onBlur, rows = 4, ...rest } = props;
  return (
    <textarea
      {...rest}
      rows={rows}
      className={`w-full px-5 py-3 rounded-lg bg-white focus:outline-none transition-shadow resize-y ${className}`}
      style={{ border: `1px solid ${COLORS.hairline}`, color: COLORS.dark, fontFamily: "inherit", ...style }}
      onFocus={(e) => { e.currentTarget.style.boxShadow = `0 0 0 3px ${COLORS.coral}33`; e.currentTarget.style.borderColor = COLORS.coral; onFocus?.(e); }}
      onBlur={(e) => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = COLORS.hairline; onBlur?.(e); }}
    />
  );
}

function Diamond() {
  return (
    <span
      aria-hidden="true"
      className="inline-block shrink-0"
      style={{ width: 10, height: 10, backgroundColor: "#C9C0CD", transform: "rotate(45deg)", marginTop: "0.55em" }}
    />
  );
}

function BgDiamond({
  top, left, right, bottom, size = 180, rotate = 0, opacity = 0.45,
}: {
  top?: number | string; left?: number | string; right?: number | string; bottom?: number | string;
  size?: number; rotate?: number; opacity?: number;
}) {
  return (
    <img
      src={DIAMOND_IMG}
      alt=""
      aria-hidden="true"
      style={{
        position: "absolute",
        top, left, right, bottom,
        width: size, height: "auto",
        transform: `rotate(${rotate}deg)`,
        opacity,
        pointerEvents: "none",
        userSelect: "none",
      }}
    />
  );
}

function LeadFormStub() {
  return (
    <form
      className="grid grid-cols-1 sm:grid-cols-6 gap-3 max-w-3xl mx-auto text-left"
      onSubmit={(e) => e.preventDefault()}
      noValidate
    >
      <div className="sm:col-span-3">
        <FieldLabel htmlFor="lead-name" required>Név</FieldLabel>
        <CtaInput id="lead-name" type="text" name="name" autoComplete="name" required />
      </div>
      <div className="sm:col-span-3">
        <FieldLabel htmlFor="lead-company" required>Cég</FieldLabel>
        <CtaInput id="lead-company" type="text" name="company" autoComplete="organization" required />
      </div>
      <div className="sm:col-span-3">
        <FieldLabel htmlFor="lead-email" required>Email cím</FieldLabel>
        <CtaInput id="lead-email" type="email" name="email" placeholder="email@cegnev.hu" autoComplete="email" required />
      </div>
      <div className="sm:col-span-3">
        <FieldLabel htmlFor="lead-attendees" required>Érdeklődők száma</FieldLabel>
        <CtaInput id="lead-attendees" type="number" name="attendees" min={1} required />
      </div>
      <div className="sm:col-span-6">
        <FieldLabel htmlFor="lead-message">Üzenet (opcionális)</FieldLabel>
        <CtaTextarea id="lead-message" name="message" />
      </div>
      <PillButton type="submit" className="w-full mt-1 sm:col-span-6">Érdekel</PillButton>
    </form>
  );
}

export function Landing() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="font-['Mulish'] antialiased min-h-screen"
      style={{ backgroundColor: "#FFFFFF", color: COLORS.dark }}
    >
      {/* Nav */}
      <nav
        className={`sticky top-0 z-50 px-6 backdrop-blur transition-[padding,box-shadow,background-color] duration-200 ${
          scrolled ? "py-2 md:py-2.5" : "py-4 md:py-5"
        }`}
        style={{
          backgroundColor: scrolled ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.85)",
          borderBottom: `1px solid ${COLORS.hairline}`,
          boxShadow: scrolled ? "0 1px 8px rgba(42,26,46,0.06)" : "none",
        }}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <a href="#" aria-label="Works."><Logo /></a>
          <PillLink href="#" variant="outline" className="text-xs px-4 py-2 md:text-sm md:px-7 md:py-3">
            Kapcsolat
          </PillLink>
        </div>
      </nav>

      {/* Hero — W background pattern, kifut jobbra */}
      <section className="relative pt-10 pb-16 md:pt-14 md:pb-20 bg-white overflow-hidden">
        {/* Background W — csak a jobb oldali felet tölti ki, kifut a viewportig */}
        <img
          src={W_IMG}
          alt=""
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "50%",
            right: "-120px",
            transform: "translateY(-50%)",
            width: "min(640px, 52%)",
            height: "auto",
            opacity: 0.55,
            pointerEvents: "none",
            userSelect: "none",
            zIndex: 0,
          }}
        />
        <div className="max-w-6xl mx-auto px-6 relative" style={{ zIndex: 1 }}>
          <div className="grid md:grid-cols-2 gap-0 md:gap-10 items-center">
            <div className="w-full md:max-w-xl order-last md:order-none">
              <span
                className="inline-block text-xs font-semibold px-3 py-1.5 rounded-full mb-6 uppercase tracking-wider"
                style={{ backgroundColor: "#FFFFFF", color: COLORS.muted, border: `1px solid ${COLORS.hairline}` }}
              >
                Új képzés
              </span>
              <h1 className="text-5xl md:text-6xl font-bold leading-[1.1] mb-6" style={{ color: COLORS.dark }}>
                Insight-tól<br />prototípusig
              </h1>
              <p className="text-lg md:text-xl mb-4" style={{ color: COLORS.muted }}>
                Rengeteg igény van — és hetekbe telik, mire a ködös igényeket körbejárjuk.
              </p>
              <p className="text-lg md:text-xl font-medium mb-8" style={{ color: COLORS.dark }}>
                Tanuld meg, hogyan lesz a zavaros igényből kézzel fogható, tesztelhető prototípus — AI segítségével.
              </p>
              <PillLink href="#cta" size="lg" className="w-full sm:w-auto group">
                Érdekel{" "}
                <span aria-hidden="true" className="inline-block transition-transform group-hover:translate-x-1">→</span>
              </PillLink>
            </div>
            <div className="flex justify-center md:justify-end order-first md:order-none">
              <img
                src={PROTO_IMG}
                alt="Mobil app prototípus illusztráció"
                className="w-4/5 max-w-[432px] md:w-full md:max-w-[540px] h-auto mx-auto md:mx-0"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Kinek szól — warm bg + scattered diamonds */}
      <section className="relative py-14 md:py-20 overflow-hidden" style={{ backgroundColor: COLORS.warm }}>
        <BgDiamond top={40} left={"-60px"} size={260} rotate={-18} opacity={0.5} />
        <BgDiamond bottom={"14%"} right={"-30px"} size={110} rotate={24} opacity={0.42} />
        <div className="max-w-6xl mx-auto px-6 relative" style={{ zIndex: 1 }}>
          <h2 className="text-3xl md:text-4xl font-bold mb-10" style={{ color: COLORS.dark }}>
            Kinek szól?
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { t: "Product ownereknek", d: "Akik nem akarnak heteket várni, hogy a fejlesztőcsapat demózzon valamit." },
              { t: "Service designereknek", d: "Akik journey map-eket rajzolnak, de szívesen mutatnának működő felületet is." },
              { t: "UX researchereknek", d: "Akik a tesztekhez eddig Figma-mockupokat kértek, és heteket vártak rá." },
            ].map((card) => (
              <div key={card.t} className="p-8 rounded-lg bg-white" style={{ borderLeft: `6px solid ${COLORS.coral}` }}>
                <h3 className="text-lg font-semibold mb-3" style={{ color: COLORS.dark }}>{card.t}</h3>
                <p className="leading-relaxed" style={{ color: COLORS.muted }}>{card.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Három alkalom — white + scattered diamonds */}
      <section className="relative py-14 md:py-20 bg-white overflow-hidden">
        <BgDiamond top={60} right={"-70px"} size={240} rotate={32} opacity={0.38} />
        <BgDiamond bottom={"18%"} left={"-20px"} size={120} rotate={-22} opacity={0.4} />
        <div className="max-w-6xl mx-auto px-6 relative" style={{ zIndex: 1 }}>
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: COLORS.dark }}>
              Három alkalom, három szint
            </h2>
            <p className="text-lg" style={{ color: COLORS.muted }}>
              Háromhetente, ~4 óra, kis csoport. A saját munkádon keresztül tanulsz.
            </p>
          </div>
          <div className="space-y-12">
            {[
              {
                n: "1.", t: "A zavaros igénytől az első eredményig",
                p: "Egy életszerűen zavaros üzleti igényből indulsz — és a nap végén böngészőben megnyitható prototípusod lesz. Nem kell hozzá kódolási tapasztalat.",
                bullets: [
                  "AI-val szétszeded a homályos igényt: kérdéseket generálsz, feltételezéseket teszel explicitté, eldöntöd, mit érdemes prototipizálni és mit nem.",
                  "Barnamezős kiindulás: egy fiktív, de realisztikus meglévő rendszerhez érkezik az igény — pont úgy, ahogy a munkahelyeden is működik.",
                  "Chat-alapú AI-val (Claude, ChatGPT) készítesz egy egyszerű HTML prototípust — közben tanulod a prompt-iteráció logikáját és a szintetikus tesztadat-generálást.",
                ],
              },
              {
                n: "2.", t: "Komolyabb prototípus, valódi logikával",
                p: "Többoldalas, interaktív, a saját design rendszeredhez igazítható. Nem játék — használható.",
                bullets: [
                  "Döntési keretrendszer: mikor elég a pehelysúlyú módszer, és mikor kell komolyabb eszköz?",
                  "Belépés a Claude Code / Replit világába — ugyanazt az igényt megoldjuk komolyabb eszközzel.",
                  "Összetettebb prototípus építése: több képernyő, valódi logika, szűrés, állapotváltozás, adatkapcsolatok.",
                  "Haladó kihívás: a saját céged design rendszerének alapjait betöltöd, hogy a protó vizuálisan is illeszkedjen.",
                ],
              },
              {
                n: "3.", t: "Meggyőzés és továbblépés",
                p: "A prototípus önmagában nem ér semmit — meg kell tudnod mutatni és el kell tudnod adni.",
                bullets: [
                  "Tesztelés felhasználókkal: hogyan keretezed a tesztet, mik a tipikus csapdák, hogyan dokumentálod az eredményt.",
                  "Pitch döntéshozóknak: hogyan mutatod be a protót úgy, hogy ne a technológiáról beszélj.",
                  "Hogyan dokumentálod a prototípust: mit adj át, hogyan tartsd karban, és mikor érdemes elengedni.",
                  "Továbblépési térkép: mikor dobd el, mikor iterálj, mikor adj át fejlesztőnek.",
                ],
              },
            ].map((step, i, arr) => (
              <React.Fragment key={step.n}>
                <div className="flex flex-col md:flex-row gap-4 md:gap-8">
                  <div className="md:w-16 shrink-0">
                    <span className="text-5xl font-bold" style={{ color: COLORS.coral }}>{step.n}</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-3" style={{ color: COLORS.dark }}>{step.t}</h3>
                    <p className="text-lg font-medium mb-6" style={{ color: COLORS.dark }}>{step.p}</p>
                    <ul className="space-y-4 text-base md:text-lg" style={{ color: COLORS.muted }}>
                      {step.bullets.map((b, j) => (
                        <li key={j} className="flex gap-4"><Diamond /><span>{b}</span></li>
                      ))}
                    </ul>
                  </div>
                </div>
                {i < arr.length - 1 && (
                  <div className="h-px w-full" style={{ backgroundColor: COLORS.hairline }} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* Ez nem AI-tréning — dark aubergine (NO pattern by design) */}
      <section className="py-16 md:py-24 text-white" style={{ backgroundColor: COLORS.dark }}>
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-10">Ez nem AI-tréning</h2>
          <ul className="space-y-6 text-lg md:text-xl font-medium">
            {[
              "Nem tool-tutorialt tartunk — a saját munkádon keresztül tanulsz.",
              "A végén nem egy certificate-ed lesz, hanem egy prototípus, amit megmutathatsz.",
              "Nem kell kódolni tudnod.",
            ].map((item) => (
              <li key={item} className="flex gap-4">
                <span style={{ color: COLORS.coral }}>→</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Gyakorlati infók — white + diamond */}
      <section className="relative py-14 md:py-20 bg-white overflow-hidden">
        <BgDiamond top={"10%"} right={"-50px"} size={230} rotate={15} opacity={0.4} />
        <BgDiamond bottom={"20%"} left={"-25px"} size={100} rotate={-30} opacity={0.36} />
        <div className="max-w-6xl mx-auto px-6 relative" style={{ zIndex: 1 }}>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6" style={{ color: COLORS.dark }}>Gyakorlati infók</h2>
              <div className="flex flex-wrap gap-3 mb-8">
                {["📅 3 alkalom, háromhetente", "⏱ Alkalmanként ~4 óra", "👥 Max 10 fő", "📍 Works. iroda, Budapest"].map((tag) => (
                  <span key={tag} className="px-4 py-2 rounded-full font-medium text-sm md:text-base"
                    style={{ backgroundColor: COLORS.warm, color: COLORS.dark }}>{tag}</span>
                ))}
              </div>
              <div className="rounded-lg overflow-hidden mb-4 h-[300px]" style={{ backgroundColor: COLORS.warm }}>
                <img src={OFFICE_IMG} alt="Works. iroda" className="w-full h-full object-cover" loading="lazy" />
              </div>
              <p className="font-medium" style={{ color: COLORS.muted }}>
                Works. iroda — 1118 Budapest, Himfy utca 1.
              </p>
            </div>
            <div className="flex flex-col justify-center">
              <div className="p-8 md:p-10 rounded-lg" style={{ backgroundColor: COLORS.warm }}>
                <p className="text-lg leading-relaxed mb-6" style={{ color: COLORS.dark }}>
                  A programot a{" "}<span className="font-bold" style={{ color: COLORS.coral }}>Works.</span>{" "}
                  szervezi — egy UX és service design csapat, amely 2016 óta segít nagyvállalati ügyfeleknek ügyfélközpontú digitális szolgáltatásokat tervezni.
                </p>
                <a href="#" className="group inline-flex font-bold items-center gap-1 transition-colors"
                  style={{ color: COLORS.coral }}>
                  worksdot.hu{" "}
                  <span aria-hidden="true" className="inline-block transition-transform group-hover:translate-x-1">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA — warm bg + diamonds */}
      <section
        id="cta"
        className="relative py-16 md:py-24 text-center px-6 overflow-hidden"
        style={{ backgroundColor: COLORS.warm }}
      >
        <BgDiamond top={"12%"} left={"-70px"} size={260} rotate={-15} opacity={0.5} />
        <BgDiamond bottom={"14%"} right={"-25px"} size={115} rotate={22} opacity={0.45} />
        <div className="max-w-3xl mx-auto relative" style={{ zIndex: 1 }}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: COLORS.dark }}>
            Indulj a következő csoporttal
          </h2>
          <p className="text-lg mb-8" style={{ color: COLORS.muted }}>
            Add meg az adataidat, és értesítünk, amikor indul.
          </p>
          <LeadFormStub />
        </div>
      </section>

      {/* Footer */}
      <footer className="pt-16 pb-12 px-6 text-white" style={{ backgroundColor: COLORS.dark }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 pb-8 mb-8"
            style={{ borderBottom: `1px solid #3D2D42` }}>
            <a href="#" aria-label="Works."><Logo size="lg" variant="light" /></a>
            <div className="flex flex-wrap justify-center gap-6">
              <a href="#" className="inline-flex items-center gap-2 text-sm font-medium" style={{ color: "#B8A8BC" }}>
                <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M2 12h20" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
                Weboldalunk
              </a>
              <a href="#" className="inline-flex items-center gap-2 text-sm font-medium" style={{ color: "#B8A8BC" }}>
                <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.37V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.26 2.37 4.26 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
                </svg>
                LinkedIn
              </a>
            </div>
          </div>
          <div className="text-center md:text-left text-sm" style={{ color: "#8A7A8E" }}>
            Works Hungary Kft. © 2025 ·{" "}
            <a href="#" className="underline underline-offset-4" style={{ color: "#B8A8BC" }}>
              Adatvédelmi tájékoztató
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
