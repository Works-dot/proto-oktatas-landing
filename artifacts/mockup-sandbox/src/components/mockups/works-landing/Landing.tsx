import React from "react";

const COLORS = {
  coral: "#EE3956",
  coralHover: "#D62E48",
  dark: "#2A1A2E",
  muted: "#5C4F5F",
  warm: "#F0EBE8",
  hairline: "#E0DBD7",
};

function Logo({ size = "md", variant = "dark" }: { size?: "md" | "lg"; variant?: "dark" | "light" }) {
  const wordmarkClass = size === "lg" ? "text-2xl" : "text-xl";
  const diamondSize = size === "lg" ? 30 : 26;
  const wordmarkColor = variant === "light" ? "#FFFFFF" : COLORS.dark;
  return (
    <span className="inline-flex items-center gap-2">
      <svg
        width={diamondSize}
        height={diamondSize}
        viewBox="0 0 32 32"
        fill="none"
        style={{ transform: "rotate(-6deg)" }}
        aria-hidden="true"
      >
        <path
          d="M16 3 L29 16 L16 29 L3 16 Z"
          stroke={COLORS.coral}
          strokeWidth="2.5"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
      <span className={`${wordmarkClass} font-bold tracking-tight`} style={{ color: wordmarkColor }}>
        Works<span style={{ color: COLORS.coral }}>.</span>
      </span>
    </span>
  );
}

const pillButton =
  "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 text-sm font-medium text-white transition-colors";
const pillButtonStyle: React.CSSProperties = { backgroundColor: COLORS.coral };

function PillButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { className = "", style, onMouseEnter, onMouseLeave, ...rest } = props;
  return (
    <button
      {...rest}
      className={`${pillButton} ${className}`}
      style={{ ...pillButtonStyle, ...style }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.backgroundColor = COLORS.coralHover;
        onMouseEnter?.(e);
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.backgroundColor = COLORS.coral;
        onMouseLeave?.(e);
      }}
    />
  );
}

function PillLink(props: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const { className = "", style, onMouseEnter, onMouseLeave, ...rest } = props;
  return (
    <a
      {...rest}
      className={`${pillButton} ${className}`}
      style={{ ...pillButtonStyle, ...style }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.backgroundColor = COLORS.coralHover;
        onMouseEnter?.(e);
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.backgroundColor = COLORS.coral;
        onMouseLeave?.(e);
      }}
    />
  );
}

export function Landing() {
  const slantBottom: React.CSSProperties = {
    clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 60px), 0 100%)",
  };
  const slantTop: React.CSSProperties = {
    clipPath: "polygon(0 60px, 100% 0, 100% 100%, 0 100%)",
  };

  return (
    <div
      className="font-['DM_Sans'] antialiased min-h-screen"
      style={{ backgroundColor: "#FFFFFF", color: COLORS.dark }}
    >
      {/* Navigation */}
      <nav
        className="relative z-10 px-6 py-6"
        style={{ backgroundColor: COLORS.warm }}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <a href="https://worksdot.hu" aria-label="Works.">
            <Logo />
          </a>
          <PillLink href="https://worksdot.hu/contact">Kapcsolat</PillLink>
        </div>
      </nav>

      {/* Hero Section — warm bg with slanted bottom */}
      <section
        className="relative pt-12 pb-32 md:pt-16 md:pb-40"
        style={{ backgroundColor: COLORS.warm, ...slantBottom }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            <div className="max-w-xl">
              <span
                className="inline-block text-xs font-semibold px-3 py-1.5 rounded-full mb-6 uppercase tracking-wider"
                style={{ backgroundColor: "#FFFFFF", color: COLORS.muted }}
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
              <PillLink href="#cta">Érdekel →</PillLink>
            </div>
            <div className="flex justify-center md:justify-end">
              <img
                src="/__mockup/images/proto_mockup.png"
                alt="Prototípus illusztráció"
                className="w-full max-w-[540px] h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Kinek szól? — white, flush */}
      <section className="bg-white py-20 md:py-28 -mt-16 relative">
        <div className="max-w-6xl mx-auto px-6">
          <h2
            className="text-3xl md:text-4xl font-bold mb-12"
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
                className="p-8 rounded-lg"
                style={{ backgroundColor: COLORS.warm }}
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
      <section className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl mb-16">
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

          <div className="space-y-16">
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
                <div className="flex flex-col md:flex-row gap-6 md:gap-12">
                  <div className="md:w-24 shrink-0">
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
                          <span style={{ color: COLORS.coral }}>—</span>
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

      {/* Ez nem AI-tréning — dark aubergine, slanted top */}
      <section
        className="py-24 md:py-32 text-white relative"
        style={{ backgroundColor: COLORS.dark, ...slantTop }}
      >
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Ez nem AI-tréning</h2>
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
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h2
                className="text-3xl font-bold mb-8"
                style={{ color: COLORS.dark }}
              >
                Gyakorlati infók
              </h2>
              <div className="flex flex-wrap gap-3 mb-12">
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
                className="rounded-lg overflow-hidden mb-4 h-[220px] flex items-center justify-center"
                style={{ backgroundColor: COLORS.warm }}
              >
                <span className="font-medium" style={{ color: COLORS.muted }}>
                  📸 Tárgyaló fotó helye
                </span>
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
        className="py-20 md:py-32 text-center px-6"
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
            Add meg e-mail címed, és értesítünk, amikor indul.
          </p>
          <form
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="email@cegnev.hu"
              className="flex-1 px-5 py-3 rounded-full bg-white focus:outline-none transition-shadow"
              style={{
                border: `1px solid ${COLORS.hairline}`,
                color: COLORS.dark,
              }}
              onFocus={(e) => {
                e.currentTarget.style.boxShadow = `0 0 0 3px ${COLORS.coral}33`;
                e.currentTarget.style.borderColor = COLORS.coral;
              }}
              onBlur={(e) => {
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.borderColor = COLORS.hairline;
              }}
              required
            />
            <PillButton type="submit">Érdekel</PillButton>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="py-12 px-6 text-white"
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
