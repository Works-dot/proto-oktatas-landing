import React from "react";

const COLORS = {
  coral: "#EE3956",
  coralHover: "#D62E48",
  coralSoft: "#FCE3E7",
  dark: "#2A1A2E",
  muted: "#5C4F5F",
  warm: "#F0EDF1",
  hairline: "#E0DBD7",
};

const PROTO_IMG = `${import.meta.env.BASE_URL}images/proto_mockup.png`;
const OFFICE_IMG = `${import.meta.env.BASE_URL}images/works-office.jpg`;
const LOGO_IMG = `${import.meta.env.BASE_URL}images/works-logo.png`;

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
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors";
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
    el.style.backgroundColor = hovered ? COLORS.coralSoft : "transparent";
  } else {
    el.style.backgroundColor = hovered ? COLORS.coralHover : COLORS.coral;
  }
}

interface PillExtra {
  variant?: PillVariant;
  size?: keyof typeof pillSizes;
}

function PillButton(
  props: React.ButtonHTMLAttributes<HTMLButtonElement> & PillExtra,
) {
  const { className = "", style, variant = "primary", size = "md", onMouseEnter, onMouseLeave, ...rest } = props;
  return (
    <button
      {...rest}
      className={`${pillBase} ${pillSizes[size]} ${className}`}
      style={{ ...pillStyleFor(variant), ...style }}
      onMouseEnter={(e) => {
        applyPillHover(e.currentTarget, variant, true);
        onMouseEnter?.(e);
      }}
      onMouseLeave={(e) => {
        applyPillHover(e.currentTarget, variant, false);
        onMouseLeave?.(e);
      }}
    />
  );
}

function PillLink(
  props: React.AnchorHTMLAttributes<HTMLAnchorElement> & PillExtra,
) {
  const { className = "", style, variant = "primary", size = "md", onMouseEnter, onMouseLeave, ...rest } = props;
  return (
    <a
      {...rest}
      className={`${pillBase} ${pillSizes[size]} ${className}`}
      style={{ ...pillStyleFor(variant), ...style }}
      onMouseEnter={(e) => {
        applyPillHover(e.currentTarget, variant, true);
        onMouseEnter?.(e);
      }}
      onMouseLeave={(e) => {
        applyPillHover(e.currentTarget, variant, false);
        onMouseLeave?.(e);
      }}
    />
  );
}

function CtaInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  const { className = "", style, onFocus, onBlur, ...rest } = props;
  return (
    <input
      {...rest}
      className={`w-full px-5 py-3 rounded-full bg-white focus:outline-none transition-shadow ${className}`}
      style={{
        border: `1px solid ${COLORS.hairline}`,
        color: COLORS.dark,
        ...style,
      }}
      onFocus={(e) => {
        e.currentTarget.style.boxShadow = `0 0 0 3px ${COLORS.coral}33`;
        e.currentTarget.style.borderColor = COLORS.coral;
        onFocus?.(e);
      }}
      onBlur={(e) => {
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.borderColor = COLORS.hairline;
        onBlur?.(e);
      }}
    />
  );
}

function Diamond() {
  return (
    <span
      aria-hidden="true"
      className="inline-block shrink-0"
      style={{
        width: 10,
        height: 10,
        backgroundColor: COLORS.warm,
        transform: "rotate(45deg)",
        marginTop: "0.55em",
      }}
    />
  );
}

function Landing() {
  return (
    <div
      className="font-['Mulish'] antialiased min-h-screen"
      style={{ backgroundColor: "#FFFFFF", color: COLORS.dark }}
    >
      {/* Navigation — sticky */}
      <nav
        className="sticky top-0 z-50 px-6 py-4 backdrop-blur"
        style={{
          backgroundColor: "rgba(255,255,255,0.85)",
          borderBottom: `1px solid ${COLORS.hairline}`,
        }}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <a href="https://worksdot.hu" aria-label="Works.">
            <Logo />
          </a>
          <PillLink href="https://worksdot.hu/contact" variant="outline">
            Kapcsolat
          </PillLink>
        </div>
      </nav>

      {/* Hero Section — white, no slant */}
      <section className="relative pt-10 pb-16 md:pt-14 md:pb-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-10 md:gap-10 items-center">
            <div className="max-w-xl">
              <span
                className="inline-block text-xs font-semibold px-3 py-1.5 rounded-full mb-6 uppercase tracking-wider"
                style={{
                  backgroundColor: "#FFFFFF",
                  color: COLORS.muted,
                  border: `1px solid ${COLORS.hairline}`,
                }}
              >
                Új képzés
              </span>
              <h1
                className="text-5xl md:text-6xl font-bold leading-[1.1] mb-6"
                style={{ color: COLORS.dark }}
              >
                Insight-tól<br />prototípusig
              </h1>
              <p className="text-lg md:text-xl mb-4" style={{ color: COLORS.muted }}>
                Rengeteg igény van — és hetekbe telik, mire a ködös igényeket körbejárjuk.
              </p>
              <p
                className="text-lg md:text-xl font-medium mb-8"
                style={{ color: COLORS.dark }}
              >
                Tanuld meg, hogyan lesz a zavaros igényből kézzel fogható, tesztelhető prototípus — AI segítségével.
              </p>
              <PillLink href="#cta" size="lg">Érdekel →</PillLink>
            </div>
            <div className="flex justify-center md:justify-end">
              <img
                src={PROTO_IMG}
                alt="Prototípus illusztráció"
                className="w-full max-w-[540px] h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Kinek szól? — warm bg */}
      <section className="py-14 md:py-20" style={{ backgroundColor: COLORS.warm }}>
        <div className="max-w-6xl mx-auto px-6">
          <h2
            className="text-3xl md:text-4xl font-bold mb-10"
            style={{ color: COLORS.dark }}
          >
            Kinek szól?
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                t: "Product ownereknek",
                d: "Akik nem akarnak heteket várni, hogy a fejlesztőcsapat demózzon valamit.",
              },
              {
                t: "Service designereknek",
                d: "Akik journey map-eket rajzolnak, de szívesen mutatnának működő felületet is.",
              },
              {
                t: "UX researchereknek",
                d: "Akik a tesztekhez eddig Figma-mockupokat kértek, és heteket vártak rá.",
              },
            ].map((card) => (
              <div
                key={card.t}
                className="p-8 rounded-lg bg-white"
                style={{ borderLeft: `6px solid ${COLORS.coral}` }}
              >
                <h3
                  className="text-lg font-semibold mb-3"
                  style={{ color: COLORS.dark }}
                >
                  {card.t}
                </h3>
                <p className="leading-relaxed" style={{ color: COLORS.muted }}>
                  {card.d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Három alkalom, három szint — white */}
      <section className="py-14 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <h2
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ color: COLORS.dark }}
            >
              Három alkalom, három szint
            </h2>
            <p className="text-lg" style={{ color: COLORS.muted }}>
              Háromhetente, ~4 óra, kis csoport. A saját munkádon keresztül tanulsz.
            </p>
          </div>

          <div className="space-y-12">
            {[
              {
                n: "1.",
                t: "A zavaros igénytől az első eredményig",
                p: "Egy életszerűen zavaros üzleti igényből indulsz — és a nap végén böngészőben megnyitható prototípusod lesz. Nem kell hozzá kódolási tapasztalat.",
                bullets: [
                  "AI-val szétszeded a homályos igényt: kérdéseket generálsz, feltételezéseket teszel explicitté, eldöntöd, mit érdemes prototipizálni és mit nem.",
                  "Barnamezős kiindulás: egy fiktív, de realisztikus meglévő rendszerhez érkezik az igény — pont úgy, ahogy a munkahelyeden is működik.",
                  "Chat-alapú AI-val (Claude, ChatGPT) készítesz egy egyszerű HTML prototípust — közben tanulod a prompt-iteráció logikáját és a szintetikus tesztadat-generálást. Kitérünk adatkezelési tippekre is, hogy bátran kísérletezhess, és az IT biztonsági csapat se akadjon fenn rajta.",
                ],
              },
              {
                n: "2.",
                t: "Komolyabb prototípus, valódi logikával",
                p: "Többoldalas, interaktív, a saját design rendszeredhez igazítható. Nem játék — használható.",
                bullets: [
                  "Döntési keretrendszer: mikor elég a pehelysúlyú módszer, és mikor kell komolyabb eszköz? Mennyi időd van, kinek mutatod, mi a tét.",
                  "Belépés a Claude Code / Replit világába — ugyanazt az igényt megoldjuk komolyabb eszközzel, és meglátod, miben lesz jobb az eredmény.",
                  "Összetettebb prototípus építése: több képernyő, valódi logika, szűrés, állapotváltozás, adatkapcsolatok.",
                  "Haladó kihívás: a saját céged design rendszerének alapjait (színek, tipográfia, gomb-stílusok) betöltöd, hogy a protó vizuálisan is illeszkedjen.",
                ],
              },
              {
                n: "3.",
                t: "Meggyőzés és továbblépés",
                p: "A prototípus önmagában nem ér semmit — meg kell tudnod mutatni és el kell tudnod adni.",
                bullets: [
                  "Tesztelés felhasználókkal: hogyan keretezed a tesztet, mik a tipikus csapdák, hogyan dokumentálod az eredményt. A résztvevők egymás prototípusait tesztelik párokban.",
                  "Pitch döntéshozóknak: hogyan mutatod be a protót úgy, hogy ne a technológiáról beszélj, hanem az üzleti kérdésről, amire választ ad.",
                  "Hogyan dokumentálod a prototípust: mit adj át, hogyan tartsd karban, és mikor érdemes elengedni.",
                  "Továbblépési térkép: mikor dobd el, mikor iterálj, mikor adj át fejlesztőnek — és mi a konkrét következő lépés.",
                ],
              },
            ].map((step, i, arr) => (
              <React.Fragment key={step.n}>
                <div className="flex flex-col md:flex-row gap-4 md:gap-8">
                  <div className="md:w-16 shrink-0">
                    <span
                      className="text-5xl font-bold"
                      style={{ color: COLORS.coral }}
                    >
                      {step.n}
                    </span>
                  </div>
                  <div>
                    <h3
                      className="text-2xl font-bold mb-3"
                      style={{ color: COLORS.dark }}
                    >
                      {step.t}
                    </h3>
                    <p
                      className="text-lg font-medium mb-6"
                      style={{ color: COLORS.dark }}
                    >
                      {step.p}
                    </p>
                    <ul className="space-y-4 text-base md:text-lg" style={{ color: COLORS.muted }}>
                      {step.bullets.map((b, j) => (
                        <li key={j} className="flex gap-4">
                          <Diamond />
                          <span>{b}</span>
                        </li>
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

      {/* Ez nem AI-tréning — dark aubergine */}
      <section
        className="py-16 md:py-24 text-white"
        style={{ backgroundColor: COLORS.dark }}
      >
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

      {/* Gyakorlati infók & Works. block — white */}
      <section className="py-14 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2
                className="text-3xl font-bold mb-6"
                style={{ color: COLORS.dark }}
              >
                Gyakorlati infók
              </h2>
              <div className="flex flex-wrap gap-3 mb-8">
                {[
                  "📅 3 alkalom, háromhetente",
                  "⏱ Alkalmanként ~4 óra",
                  "👥 Max 10 fő",
                  "📍 Works. iroda, Budapest",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-2 rounded-full font-medium text-sm md:text-base"
                    style={{ backgroundColor: COLORS.warm, color: COLORS.dark }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div
                className="rounded-lg overflow-hidden mb-4 h-[300px]"
                style={{ backgroundColor: COLORS.warm }}
              >
                <img
                  src={OFFICE_IMG}
                  alt="Works. iroda — kollégák laptopokkal a tárgyalóasztalnál"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <p className="font-medium" style={{ color: COLORS.muted }}>
                Works. iroda — 1118 Budapest, Himfy utca 1.
              </p>
            </div>

            <div className="flex flex-col justify-center">
              <div
                className="p-8 md:p-10 rounded-lg"
                style={{ backgroundColor: COLORS.warm }}
              >
                <p
                  className="text-lg leading-relaxed mb-6"
                  style={{ color: COLORS.dark }}
                >
                  A programot a{" "}
                  <span className="font-bold" style={{ color: COLORS.coral }}>
                    Works.
                  </span>{" "}
                  szervezi — egy UX és service design csapat, amely 2016 óta segít nagyvállalati ügyfeleknek ügyfélközpontú digitális szolgáltatásokat tervezni. A programot a Works. senior kollégái tartják.
                </p>
                <a
                  href="https://worksdot.hu"
                  className="inline-flex font-bold items-center gap-1 transition-colors"
                  style={{ color: COLORS.coral }}
                >
                  worksdot.hu <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA — warm bg */}
      <section
        id="cta"
        className="py-16 md:py-24 text-center px-6"
        style={{ backgroundColor: COLORS.warm }}
      >
        <div className="max-w-2xl mx-auto">
          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ color: COLORS.dark }}
          >
            Indulj a következő csoporttal
          </h2>
          <p className="text-lg mb-8" style={{ color: COLORS.muted }}>
            Add meg az adataidat, és értesítünk, amikor indul.
          </p>
          <form
            className="flex flex-col gap-3 max-w-lg mx-auto text-left"
            onSubmit={(e) => e.preventDefault()}
          >
            <CtaInput
              type="text"
              name="name"
              placeholder="Teljes név"
              autoComplete="name"
              aria-label="Teljes név"
              required
            />
            <CtaInput
              type="text"
              name="company"
              placeholder="Cég neve"
              autoComplete="organization"
              aria-label="Cég neve"
              required
            />
            <CtaInput
              type="email"
              name="email"
              placeholder="email@cegnev.hu"
              autoComplete="email"
              aria-label="Email cím"
              required
            />
            <PillButton type="submit" className="w-full mt-1">Érdekel</PillButton>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="pt-16 pb-12 px-6 text-white"
        style={{ backgroundColor: COLORS.dark }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 pb-8 mb-8"
               style={{ borderBottom: `1px solid #3D2D42` }}>
            <a href="https://worksdot.hu" aria-label="Works.">
              <Logo size="lg" variant="light" />
            </a>
            <div className="flex flex-wrap justify-center gap-6">
              {[
                { h: "https://worksdot.hu", t: "Főoldal" },
                { h: "https://www.linkedin.com/company/works.-hungary-kft./", t: "LinkedIn" },
                { h: "https://worksdot.hu/contact", t: "Kapcsolat" },
              ].map((l) => (
                <a
                  key={l.t}
                  href={l.h}
                  className="text-sm font-medium transition-colors"
                  style={{ color: "#B8A8BC" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#FFFFFF")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#B8A8BC")}
                >
                  {l.t}
                </a>
              ))}
            </div>
          </div>
          <div className="text-center md:text-left text-sm" style={{ color: "#8A7A8E" }}>
            Works Hungary Kft. © 2025 ·{" "}
            <a
              href="https://worksdot.hu/privacy-statement"
              className="underline underline-offset-4 transition-colors"
              style={{ color: "#B8A8BC" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#FFFFFF")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#B8A8BC")}
            >
              Adatvédelmi nyilatkozat
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return <Landing />;
}
