import { COLORS, Logo, PillLink } from "./App";

const HOME_HREF = `${import.meta.env.BASE_URL}`;

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2
        className="text-2xl md:text-3xl font-bold mb-4"
        style={{ color: COLORS.dark }}
      >
        {title}
      </h2>
      <div
        className="space-y-3 text-base md:text-lg leading-relaxed"
        style={{ color: COLORS.muted }}
      >
        {children}
      </div>
    </section>
  );
}

function Bullets({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="list-disc pl-6 space-y-2">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}

export default function PrivacyPolicy() {
  return (
    <div
      className="font-['Mulish'] antialiased min-h-screen"
      style={{ backgroundColor: "#FFFFFF", color: COLORS.dark }}
    >
      <nav
        className="sticky top-0 z-50 px-6 py-4 md:py-5 backdrop-blur"
        style={{
          backgroundColor: "rgba(255,255,255,0.85)",
          borderBottom: `1px solid ${COLORS.hairline}`,
        }}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <a href={HOME_HREF} aria-label="Works.">
            <Logo />
          </a>
          <PillLink
            href="https://worksdot.hu/contact"
            variant="outline"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs px-4 py-2 md:text-sm md:px-7 md:py-3"
          >
            Kapcsolat
          </PillLink>
        </div>
      </nav>

      <main className="pt-10 pb-16 md:pt-14 md:pb-20 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <a
            href={HOME_HREF}
            className="inline-flex items-center gap-2 mb-8 text-sm font-semibold transition-colors"
            style={{ color: COLORS.coral }}
          >
            <span aria-hidden="true">←</span> Vissza a főoldalra
          </a>

          <h1
            className="text-4xl md:text-5xl font-bold mb-3"
            style={{ color: COLORS.dark }}
          >
            Adatvédelmi tájékoztató
          </h1>
          <p className="text-sm mb-12" style={{ color: COLORS.muted }}>
            Hatályos: 2026. május 21-től
          </p>

          <Section title="1. Adatkezelő">
            <p>
              <strong style={{ color: COLORS.dark }}>Works Hungary Kft.</strong>
              <br />
              Székhely: 1118 Budapest, Himfy utca 1.
              <br />
              Kapcsolat:{" "}
              <a
                href="mailto:hello@worksdot.hu"
                className="underline underline-offset-4"
                style={{ color: COLORS.coral }}
              >
                hello@worksdot.hu
              </a>
            </p>
            <p>
              Ez a tájékoztató a Works. által üzemeltetett, az „Insight-tól
              prototípusig" képzéshez tartozó landing oldalra (jelen
              webhelyre) vonatkozik. A worksdot.hu fő oldal külön
              adatvédelmi tájékoztatóval rendelkezik:{" "}
              <a
                href="https://worksdot.hu/privacy-statement"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4"
                style={{ color: COLORS.coral }}
              >
                worksdot.hu/privacy-statement ↗
              </a>
            </p>
          </Section>

          <Section title="2. Milyen adatokat gyűjtünk?">
            <p>
              Az oldalon található érdeklődési űrlap kitöltésekor az alábbi
              adatokat adod meg nekünk:
            </p>
            <Bullets
              items={[
                <>Teljes név</>,
                <>Cég neve</>,
                <>E-mail cím</>,
                <>Érdeklődők (résztvevők) száma</>,
                <>Üzenet (opcionális mező)</>,
              ]}
            />
            <p>
              Az űrlap beküldésekor szerveroldalon automatikusan rögzítjük
              továbbá:
            </p>
            <Bullets
              items={[
                <>IP-címed (visszaélés-megelőzés és rate limiting céljából)</>,
                <>Böngésződ user agent azonosítóját</>,
                <>A beküldés időbélyegét</>,
              ]}
            />
            <p>
              Az oldal <strong style={{ color: COLORS.dark }}>nem
              használ</strong> analitikai szolgáltatást (pl. Google Analytics),
              hirdetési pixelt (pl. Meta Pixel) vagy harmadik féltől származó
              követőkódot. Cookie-t kizárólag a szükséges működéshez (pl. a
              cookie banner döntésének tárolása localStorage-ben, az admin
              felület session cookie-ja) használunk — lásd a 7. pontot.
            </p>
          </Section>

          <Section title="3. Mire használjuk az adatokat?">
            <Bullets
              items={[
                <>Kapcsolatfelvétel az érdeklődővel a képzéssel kapcsolatban.</>,
                <>Értesítés a következő csoport indulásáról.</>,
                <>A képzéssel kapcsolatos kérdések megválaszolása.</>,
                <>Visszaélések megelőzése (pl. spam, automatizált beküldések szűrése).</>,
              ]}
            />
            <p>
              Az adataidat marketing célból nem használjuk fel, és harmadik
              félnek marketing célból nem adjuk át.
            </p>
          </Section>

          <Section title="4. Az adatkezelés jogalapja">
            <p>
              Az adatkezelés jogalapja az érintett (Te) hozzájárulása az
              űrlap önkéntes kitöltésével és beküldésével (GDPR 6. cikk (1)
              bekezdés a) pont), valamint — amennyiben szerződéses
              kapcsolatba lépünk — a szerződéskötést megelőző lépések
              megtétele a Te kérésedre (GDPR 6. cikk (1) bekezdés b) pont).
            </p>
            <p>
              A rate limiting és visszaélés-megelőzés jogalapja az
              adatkezelő jogos érdeke (GDPR 6. cikk (1) bekezdés f) pont) a
              szolgáltatás működésének és biztonságának fenntartására.
            </p>
          </Section>

          <Section title="5. Adattárolás és megőrzési idő">
            <p>
              Az érdeklődési űrlap adatait egy PostgreSQL adatbázisban
              tároljuk, amelyet a{" "}
              <a
                href="https://railway.app"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4"
                style={{ color: COLORS.coral }}
              >
                Railway
              </a>{" "}
              tárhelyszolgáltató üzemeltet az Európai Unió területén.
              A Railway mint adatfeldolgozó saját adatvédelmi
              gyakorlattal rendelkezik.
            </p>
            <p>
              Az adatokat addig őrizzük meg, amíg az kapcsolatfelvételhez
              és a képzésre való jelentkezéshez szükséges, legfeljebb az
              utolsó érdemi kapcsolatfelvételtől számított{" "}
              <strong style={{ color: COLORS.dark }}>24 hónapig</strong>.
              Ezt követően az adatokat töröljük vagy anonimizáljuk.
            </p>
            <p>
              Ennél hamarabb is törölhetjük az adatokat, amennyiben azt
              kéred (lásd 8. pont).
            </p>
          </Section>

          <Section title="6. Adattovábbítás">
            <p>
              Az adataidat harmadik félnek nem adjuk át, kivéve:
            </p>
            <Bullets
              items={[
                <>
                  Tárhelyszolgáltatónknak (Railway) mint adatfeldolgozónak,
                  a szolgáltatás működésének biztosítása érdekében.
                </>,
                <>
                  Hatóságnak, amennyiben jogszabály kötelez minket az
                  adatok kiadására (pl. bírósági végzés alapján).
                </>,
              ]}
            />
          </Section>

          <Section title="7. Cookie-k és helyi tárolás">
            <p>
              Az oldal a szükséges működés érdekében a böngésződ helyi
              tárolójában (localStorage) eltárolja:
            </p>
            <Bullets
              items={[
                <>
                  A cookie tájékoztató elfogadásának tényét
                  (<code style={{ color: COLORS.coral }}>works-consent</code>
                  {" "}kulcs), hogy ne kelljen újra megjelenítenünk minden
                  látogatáskor.
                </>,
              ]}
            />
            <p>
              Az adminisztrációs felületre belépéskor egy session cookie
              kerül kiállításra a bejelentkezett munkamenet azonosítására.
              Ez a cookie csak a Works. munkatársait érinti, nem a
              látogatókat.
            </p>
            <p>
              Az oldal nem használ analitikai, marketing- vagy
              követőcookie-kat.
            </p>
          </Section>

          <Section title="8. Az érintett (Te) jogai">
            <p>A GDPR alapján az alábbi jogok illetnek meg:</p>
            <Bullets
              items={[
                <><strong style={{ color: COLORS.dark }}>Hozzáférés:</strong> tájékoztatást kérhetsz arról, hogy milyen adataidat kezeljük.</>,
                <><strong style={{ color: COLORS.dark }}>Helyesbítés:</strong> kérheted a pontatlan adataid javítását.</>,
                <><strong style={{ color: COLORS.dark }}>Törlés („elfeledtetés"):</strong> kérheted a rólad tárolt adatok törlését.</>,
                <><strong style={{ color: COLORS.dark }}>Korlátozás:</strong> kérheted az adatkezelés korlátozását.</>,
                <><strong style={{ color: COLORS.dark }}>Tiltakozás:</strong> tiltakozhatsz az adatkezelés ellen.</>,
                <><strong style={{ color: COLORS.dark }}>Adathordozhatóság:</strong> kérheted, hogy az adataidat strukturált, géppel olvasható formában megkapd vagy másik adatkezelőhöz továbbítsuk.</>,
                <><strong style={{ color: COLORS.dark }}>Hozzájárulás visszavonása:</strong> a hozzájárulásodon alapuló adatkezelést bármikor visszavonhatod.</>,
              ]}
            />
            <p>
              A jogaid gyakorlására irányuló kérelmedet a{" "}
              <a
                href="mailto:hello@worksdot.hu"
                className="underline underline-offset-4"
                style={{ color: COLORS.coral }}
              >
                hello@worksdot.hu
              </a>{" "}
              címen jelezheted. A kérelmedre 30 napon belül érdemben
              válaszolunk.
            </p>
          </Section>

          <Section title="9. Panasztétel">
            <p>
              Amennyiben úgy ítéled meg, hogy az adatkezelésünk sérti a
              jogaidat, panaszt tehetsz a Nemzeti Adatvédelmi és
              Információszabadság Hatóságnál (NAIH):
            </p>
            <p>
              <strong style={{ color: COLORS.dark }}>NAIH</strong>
              <br />
              Cím: 1055 Budapest, Falk Miksa utca 9-11.
              <br />
              Levelezési cím: 1363 Budapest, Pf. 9.
              <br />
              Telefon: +36 1 391 1400
              <br />
              E-mail:{" "}
              <a
                href="mailto:ugyfelszolgalat@naih.hu"
                className="underline underline-offset-4"
                style={{ color: COLORS.coral }}
              >
                ugyfelszolgalat@naih.hu
              </a>
              <br />
              Honlap:{" "}
              <a
                href="https://naih.hu"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4"
                style={{ color: COLORS.coral }}
              >
                naih.hu ↗
              </a>
            </p>
          </Section>

          <Section title="10. Adatbiztonság">
            <p>
              Az adataid védelme érdekében észszerű technikai és szervezési
              intézkedéseket teszünk: az oldal HTTPS protokollon keresztül
              érhető el, az adatbázishoz hozzáférés korlátozott, és csak a
              Works. arra jogosult munkatársai férhetnek hozzá az
              érdeklődési adatokhoz az adminisztrációs felületen.
            </p>
            <p>
              Tudomásul vesszük ugyanakkor, hogy abszolút biztonságot egyetlen
              rendszer sem nyújthat. Ha incidenst észlelünk, a vonatkozó
              jogszabályoknak megfelelően járunk el.
            </p>
          </Section>

          <Section title="11. A tájékoztató módosítása">
            <p>
              Fenntartjuk a jogot, hogy ezt a tájékoztatót szükség esetén
              módosítsuk. A módosításokat az oldalon közzétesszük, és a
              tájékoztató tetején frissítjük a hatálybalépés dátumát.
              Lényeges változásról a már jelentkezetteket e-mailben is
              értesítjük.
            </p>
          </Section>

          <div
            className="mt-12 pt-8"
            style={{ borderTop: `1px solid ${COLORS.hairline}` }}
          >
            <a
              href={HOME_HREF}
              className="inline-flex items-center gap-2 text-sm font-semibold transition-colors"
              style={{ color: COLORS.coral }}
            >
              <span aria-hidden="true">←</span> Vissza a főoldalra
            </a>
          </div>
        </div>
      </main>

      <footer
        className="pt-12 pb-10 px-6 text-white"
        style={{ backgroundColor: COLORS.dark }}
      >
        <div className="max-w-6xl mx-auto text-center text-sm" style={{ color: "#8A7A8E" }}>
          Works Hungary Kft. © 2025
        </div>
      </footer>
    </div>
  );
}
