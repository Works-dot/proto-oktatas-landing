import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Landing() {
  return (
    <div className="font-['DM_Sans'] bg-white text-[#1A1A1A] antialiased min-h-screen">
      {/* Navigation */}
      <nav className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        <a href="https://worksdot.hu" className="text-xl font-bold tracking-tight text-[#1A1A1A]">
          Works.
        </a>
        <a href="https://worksdot.hu/contact" className="text-sm font-medium text-[#5C5C5C] hover:text-[#1A1A1A] transition-colors">
          Kapcsolat
        </a>
      </nav>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="max-w-xl">
            <span className="inline-block bg-[#F5F4F1] text-[#5C5C5C] text-xs font-semibold px-3 py-1.5 rounded-full mb-6 uppercase tracking-wider">
              Új képzés
            </span>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-[1.1] mb-6">
              Insight-tól<br />prototípusig
            </h1>
            <p className="text-lg md:text-xl text-[#5C5C5C] mb-4">
              Rengeteg igény van — és hetekbe telik, mire a ködös igényeket körbejárjuk.
            </p>
            <p className="text-lg md:text-xl font-medium text-[#1A1A1A] mb-8">
              Tanuld meg, hogyan lesz a zavaros igényből kézzel fogható, tesztelhető prototípus — AI segítségével.
            </p>
            <a 
              href="#cta" 
              className="inline-flex items-center justify-center bg-[#1A1A1A] text-white px-8 py-4 rounded-lg font-medium hover:bg-[#333333] transition-colors"
            >
              Érdekel →
            </a>
          </div>
          <div className="relative rounded-2xl overflow-hidden border border-[#E0DFDC] bg-white shadow-sm">
            <img 
              src="/__mockup/images/proto_mockup.png" 
              alt="Prototípus illusztráció" 
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </section>

      {/* Kinek szól? */}
      <section className="bg-[#F5F4F1] py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-12">Kinek szól?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-8 rounded-lg border border-[#E0DFDC] shadow-sm">
              <h3 className="text-lg font-semibold mb-3">Product ownereknek</h3>
              <p className="text-[#5C5C5C] leading-relaxed">
                Akik nem akarnak heteket várni, hogy a fejlesztőcsapat demózzon valamit.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg border border-[#E0DFDC] shadow-sm">
              <h3 className="text-lg font-semibold mb-3">Service designereknek</h3>
              <p className="text-[#5C5C5C] leading-relaxed">
                Akik journey map-eket rajzolnak, de szívesen mutatnának működő felületet is.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg border border-[#E0DFDC] shadow-sm">
              <h3 className="text-lg font-semibold mb-3">UX researchereknek</h3>
              <p className="text-[#5C5C5C] leading-relaxed">
                Akik a tesztekhez eddig Figma-mockupokat kértek, és heteket vártak rá.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Három alkalom, három szint */}
      <section className="py-20 md:py-28 max-w-6xl mx-auto px-6">
        <div className="max-w-3xl mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Három alkalom, három szint</h2>
          <p className="text-lg text-[#5C5C5C]">
            Háromhetente, ~4 óra, kis csoport. A saját munkádon keresztül tanulsz.
          </p>
        </div>

        <div className="space-y-16">
          {/* Step 1 */}
          <div className="flex flex-col md:flex-row gap-6 md:gap-12">
            <div className="md:w-24 shrink-0">
              <span className="text-5xl font-bold text-[#E0DFDC]">1.</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold tracking-tight mb-3">A zavaros igénytől az első eredményig</h3>
              <p className="text-lg font-medium text-[#1A1A1A] mb-6">
                Egy életszerűen zavaros üzleti igényből indulsz — és a nap végén böngészőben megnyitható prototípusod lesz. Nem kell hozzá kódolási tapasztalat.
              </p>
              <ul className="space-y-4 text-[#5C5C5C] text-base md:text-lg">
                <li className="flex gap-4">
                  <span className="text-[#9A9A9A]">—</span>
                  <span>AI-val szétszeded a homályos igényt: kérdéseket generálsz, feltételezéseket teszel explicitté, eldöntöd, mit érdemes prototipizálni és mit nem.</span>
                </li>
                <li className="flex gap-4">
                  <span className="text-[#9A9A9A]">—</span>
                  <span>Barnamezős kiindulás: egy fiktív, de realisztikus meglévő rendszerhez érkezik az igény — pont úgy, ahogy a munkahelyeden is működik.</span>
                </li>
                <li className="flex gap-4">
                  <span className="text-[#9A9A9A]">—</span>
                  <span>Chat-alapú AI-val (Claude, ChatGPT) készítesz egy egyszerű HTML prototípust — közben tanulod a prompt-iteráció logikáját és a szintetikus tesztadat-generálást. Kitérünk adatkezelési tippekre is, hogy bátran kísérletezhess, és az IT biztonsági csapat se akadjon fenn rajta.</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="h-px w-full bg-[#E0DFDC]" />

          {/* Step 2 */}
          <div className="flex flex-col md:flex-row gap-6 md:gap-12">
            <div className="md:w-24 shrink-0">
              <span className="text-5xl font-bold text-[#E0DFDC]">2.</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold tracking-tight mb-3">Komolyabb prototípus, valódi logikával</h3>
              <p className="text-lg font-medium text-[#1A1A1A] mb-6">
                Többoldalas, interaktív, a saját design rendszeredhez igazítható. Nem játék — használható.
              </p>
              <ul className="space-y-4 text-[#5C5C5C] text-base md:text-lg">
                <li className="flex gap-4">
                  <span className="text-[#9A9A9A]">—</span>
                  <span>Döntési keretrendszer: mikor elég a pehelysúlyú módszer, és mikor kell komolyabb eszköz? Mennyi időd van, kinek mutatod, mi a tét.</span>
                </li>
                <li className="flex gap-4">
                  <span className="text-[#9A9A9A]">—</span>
                  <span>Belépés a Claude Code / Replit világába — ugyanazt az igényt megoldjuk komolyabb eszközzel, és meglátod, miben lesz jobb az eredmény.</span>
                </li>
                <li className="flex gap-4">
                  <span className="text-[#9A9A9A]">—</span>
                  <span>Összetettebb prototípus építése: több képernyő, valódi logika, szűrés, állapotváltozás, adatkapcsolatok.</span>
                </li>
                <li className="flex gap-4">
                  <span className="text-[#9A9A9A]">—</span>
                  <span>Haladó kihívás: a saját céged design rendszerének alapjait (színek, tipográfia, gomb-stílusok) betöltöd, hogy a protó vizuálisan is illeszkedjen.</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="h-px w-full bg-[#E0DFDC]" />

          {/* Step 3 */}
          <div className="flex flex-col md:flex-row gap-6 md:gap-12">
            <div className="md:w-24 shrink-0">
              <span className="text-5xl font-bold text-[#E0DFDC]">3.</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold tracking-tight mb-3">Meggyőzés és továbblépés</h3>
              <p className="text-lg font-medium text-[#1A1A1A] mb-6">
                A prototípus önmagában nem ér semmit — meg kell tudnod mutatni és el kell tudnod adni.
              </p>
              <ul className="space-y-4 text-[#5C5C5C] text-base md:text-lg">
                <li className="flex gap-4">
                  <span className="text-[#9A9A9A]">—</span>
                  <span>Tesztelés felhasználókkal: hogyan keretezed a tesztet, mik a tipikus csapdák, hogyan dokumentálod az eredményt. A résztvevők egymás prototípusait tesztelik párokban.</span>
                </li>
                <li className="flex gap-4">
                  <span className="text-[#9A9A9A]">—</span>
                  <span>Pitch döntéshozóknak: hogyan mutatod be a protót úgy, hogy ne a technológiáról beszélj, hanem az üzleti kérdésről, amire választ ad.</span>
                </li>
                <li className="flex gap-4">
                  <span className="text-[#9A9A9A]">—</span>
                  <span>Hogyan dokumentálod a prototípust: mit adj át, hogyan tartsd karban, és mikor érdemes elengedni.</span>
                </li>
                <li className="flex gap-4">
                  <span className="text-[#9A9A9A]">—</span>
                  <span>Továbblépési térkép: mikor dobd el, mikor iterálj, mikor adj át fejlesztőnek — és mi a konkrét következő lépés.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Ez nem AI-tréning */}
      <section className="bg-[#1A1A1A] text-white py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-12">Ez nem AI-tréning</h2>
          <ul className="space-y-6 text-lg md:text-xl font-medium">
            <li className="flex gap-4">
              <span className="text-[#9A9A9A]">→</span>
              <span>Nem tool-tutorialt tartunk — a saját munkádon keresztül tanulsz.</span>
            </li>
            <li className="flex gap-4">
              <span className="text-[#9A9A9A]">→</span>
              <span>A végén nem egy certificate-ed lesz, hanem egy prototípus, amit megmutathatsz.</span>
            </li>
            <li className="flex gap-4">
              <span className="text-[#9A9A9A]">→</span>
              <span>Nem kell kódolni tudnod.</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Gyakorlati infók & Works. block */}
      <section className="py-20 md:py-28 max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16">
          {/* Info */}
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-8">Gyakorlati infók</h2>
            <div className="flex flex-wrap gap-3 mb-12">
              <span className="bg-[#F5F4F1] text-[#1A1A1A] px-4 py-2 rounded-lg font-medium text-sm md:text-base">📅 3 alkalom, háromhetente</span>
              <span className="bg-[#F5F4F1] text-[#1A1A1A] px-4 py-2 rounded-lg font-medium text-sm md:text-base">⏱ Alkalmanként ~4 óra</span>
              <span className="bg-[#F5F4F1] text-[#1A1A1A] px-4 py-2 rounded-lg font-medium text-sm md:text-base">👥 Max 10 fő</span>
              <span className="bg-[#F5F4F1] text-[#1A1A1A] px-4 py-2 rounded-lg font-medium text-sm md:text-base">📍 Works. iroda, Budapest</span>
            </div>

            <div className="rounded-lg overflow-hidden border border-[#E0DFDC] mb-4 bg-[#F5F4F1] h-[220px] flex items-center justify-center">
              <span className="text-[#9A9A9A] font-medium">📸 Tárgyaló fotó helye</span>
            </div>
            <p className="text-[#5C5C5C] font-medium">Works. iroda — 1118 Budapest, Himfy utca 1.</p>
          </div>

          {/* Works Block */}
          <div className="flex flex-col justify-center">
            <div className="bg-[#F5F4F1] p-8 md:p-10 rounded-xl">
              <p className="text-lg leading-relaxed text-[#1A1A1A] mb-6">
                A programot a <strong className="font-bold">Works.</strong> szervezi — egy UX és service design csapat, amely 2016 óta segít nagyvállalati ügyfeleknek ügyfélközpontú digitális szolgáltatásokat tervezni. A programot a Works. senior kollégái tartják.
              </p>
              <a href="https://worksdot.hu" className="inline-flex font-bold text-[#1A1A1A] hover:text-[#5C5C5C] transition-colors items-center gap-1">
                worksdot.hu <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section id="cta" className="bg-[#F5F4F1] py-20 md:py-32 text-center px-6">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Indulj a következő csoporttal</h2>
          <p className="text-lg text-[#5C5C5C] mb-8">
            Add meg e-mail címed, és értesítünk, amikor indul.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="email@cegnev.hu" 
              className="flex-1 px-4 py-3 rounded-lg border border-[#E0DFDC] bg-white focus:outline-none focus:ring-2 focus:ring-[#1A1A1A] transition-shadow placeholder:text-[#9A9A9A]"
              required
            />
            <button 
              type="submit" 
              className="bg-[#1A1A1A] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#333333] transition-colors"
            >
              Érdekel
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1A1A1A] text-white py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-b border-[#333333] pb-8 mb-8">
            <a href="https://worksdot.hu" className="text-2xl font-bold tracking-tight">
              Works.
            </a>
            <div className="flex flex-wrap justify-center gap-6">
              <a href="https://worksdot.hu" className="text-sm font-medium text-[#9A9A9A] hover:text-white transition-colors">
                Főoldal
              </a>
              <a href="https://www.linkedin.com/company/works.-hungary-kft./" className="text-sm font-medium text-[#9A9A9A] hover:text-white transition-colors">
                LinkedIn
              </a>
              <a href="https://worksdot.hu/contact" className="text-sm font-medium text-[#9A9A9A] hover:text-white transition-colors">
                Kapcsolat
              </a>
            </div>
          </div>
          <div className="text-center md:text-left text-sm text-[#5C5C5C]">
            Works Hungary Kft. © 2025 · <a href="https://worksdot.hu/privacy-statement" className="hover:text-[#9A9A9A] transition-colors underline underline-offset-4">Adatvédelmi nyilatkozat</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
