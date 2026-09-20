import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowDown,
  ArrowRight,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  Menu,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Star,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState, type ReactNode } from "react";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import logoAsset from "@/assets/lumina-logo.png";
import beautyHero from "@/assets/lumina-beauty-hero.jpg";
import clinicPortrait from "@/assets/lumina-clinic-portrait.jpg";
import beforeAfterCases from "@/assets/lumina-before-after-cases.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LUMINA aesthetic clinic | Ästhetische Medizin in Bochum" },
      {
        name: "description",
        content: "Natürliche Ergebnisse mit botox®, Hyaluron und modernen Skin-Treatments bei LUMINA in Bochum.",
      },
      { property: "og:title", content: "LUMINA aesthetic clinic Bochum" },
      { property: "og:description", content: "Präzise Ästhetik. Natürlich Sie. Beratung und Behandlungen in der Brückstr. 44, Bochum." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const whatsappUrl = "https://wa.me/4915777779962";

const treatments = [
  { title: "Faltenbehandlung", eyebrow: "Mimik bewahren", description: "Gezielte Behandlung für Stirn, Zornesfalte und Augenpartie.", price: "ab 189 €" },
  { title: "Hyaluron", eyebrow: "Kontur verfeinern", description: "Harmonische Akzente für Lippen, Wangen und Jawline.", price: "ab 249 €" },
  { title: "Skin Booster", eyebrow: "Hautqualität stärken", description: "Intensive Feuchtigkeit für ein glatteres, frischeres Hautbild.", price: "ab 199 €" },
  { title: "HydraFacial", eyebrow: "Glow aktivieren", description: "Tiefenreinigung, Pflege und ein sichtbar frisches Finish.", price: "ab 129 €" },
  { title: "Lemon Bottle", eyebrow: "Konturen definieren", description: "Individuelle Beratung für ausgewählte kleine Fettdepots.", price: "ab 149 €" },
  { title: "Infusionen", eyebrow: "Vitalität ergänzen", description: "Ausgewählte Nährstoffinfusionen nach medizinischer Prüfung.", price: "ab 89 €" },
];

const faqs = [
  { question: "Wie läuft die Beratung ab?", answer: "Wir sprechen über Ihre Wünsche, prüfen Gesicht und Haut und erklären ehrlich, welche Behandlung sinnvoll ist. Dosierung, Ablauf und Preisrahmen werden vorab transparent besprochen." },
  { question: "Bleibt mein Ausdruck natürlich?", answer: "Unser Ansatz ist bewusst zurückhaltend. Das Ziel ist ein frischer, harmonischer Ausdruck, nicht eine sichtbare Überkorrektur." },
  { question: "Wie viel Ausfallzeit sollte ich einplanen?", answer: "Das hängt von der Behandlung ab. Kleine Rötungen, Schwellungen oder Blutergüsse können vorübergehend auftreten. Ihre persönlichen Hinweise erhalten Sie im Termin." },
  { question: "Wann sehe ich das Ergebnis?", answer: "Einige Effekte sind direkt erkennbar, andere entwickeln sich über Tage oder Wochen. Im Beratungsgespräch erklären wir das realistische Ergebnisfenster Ihrer Behandlung." },
];

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTreatment, setActiveTreatment] = useState(0);
  const [compareValue, setCompareValue] = useState(52);
  const [bookingStep, setBookingStep] = useState(0);
  const [booking, setBooking] = useState({ treatment: "Faltenbehandlung", contact: "", note: "" });

  const treatment = treatments[activeTreatment] ?? treatments[0];
  const bookingMessage = useMemo(
    () => encodeURIComponent(`Hallo LUMINA, ich interessiere mich für ${booking.treatment}. ${booking.contact ? `Meine Kontaktdaten: ${booking.contact}.` : ""} ${booking.note}`),
    [booking],
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.15 },
    );
    document.querySelectorAll("[data-reveal]").forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="min-h-screen overflow-x-hidden bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      <section id="start" className="hero-editorial relative min-h-[760px] h-[100svh] overflow-hidden">
        <img src={beautyHero} alt="Frau mit natürlich strahlender Haut im warmen Licht" width={1920} height={1280} fetchPriority="high" className="absolute inset-0 h-full w-full object-cover object-[64%_center] hero-image" />
        <div className="absolute inset-0 bg-lumina-hero-scrim" aria-hidden="true" />
        <div className="relative z-10 mx-auto flex h-full max-w-[1600px] flex-col justify-end px-5 pb-8 pt-28 sm:px-8 md:pb-10 lg:px-14 lg:pb-12">
          <div className="hero-copy max-w-5xl">
            <p className="hero-kicker mb-5 text-xs font-semibold uppercase text-lumina-hero-text">Aesthetic medicine · Bochum</p>
            <h1 className="hero-title max-w-4xl font-serif text-6xl font-normal italic leading-[0.84] text-lumina-hero-text sm:text-8xl lg:text-[9rem]">
              Präzise Ästhetik.<br /><span className="not-italic">Natürlich Sie.</span>
            </h1>
            <div className="hero-actions mt-8 flex max-w-3xl flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <p className="max-w-md text-base leading-7 text-lumina-hero-muted sm:text-lg">
                botox®, Hyaluron und Skin-Treatments für Ergebnisse, die frisch wirken und zu Ihnen passen.
              </p>
              <Button asChild className="h-14 rounded-none bg-lumina-hero-text px-8 text-xs font-semibold uppercase text-lumina-hero-ink hover:bg-primary">
                <a href="#buchung">Termin vereinbaren <ArrowRight aria-hidden="true" /></a>
              </Button>
            </div>
          </div>
          <div className="mt-10 flex items-end justify-between border-t border-lumina-hero-line pt-5 text-[11px] uppercase text-lumina-hero-muted">
            <div className="flex flex-col gap-1 sm:flex-row sm:gap-10">
              <span>Brückstr. 44 · 44787 Bochum</span>
              <span className="hidden sm:inline">WhatsApp 015 77777 9962</span>
            </div>
            <a href="#behandlungen" className="flex items-center gap-3 transition-colors hover:text-lumina-hero-text">Entdecken <ArrowDown className="size-4" aria-hidden="true" /></a>
          </div>
        </div>
      </section>

      <section aria-label="Vertrauen" className="border-b border-border bg-background px-5 py-5 sm:px-8 lg:px-14">
        <div className="mx-auto flex max-w-[1500px] flex-wrap justify-between gap-x-8 gap-y-3 text-xs font-medium uppercase text-muted-foreground">
          {["Ärztliche Expertise", "Zertifizierte Produkte", "Individuelle Beratung", "Natürliche Ergebnisse"].map((item) => (
            <span key={item} className="flex items-center gap-2"><ShieldCheck className="size-4 text-primary" aria-hidden="true" />{item}</span>
          ))}
        </div>
      </section>

      <section id="behandlungen" data-reveal className="px-5 py-20 sm:px-8 lg:px-14 lg:py-28">
        <div className="mx-auto max-w-[1500px]">
          <EditorialHeading number="01" kicker="Unsere Expertise" title={<>Weniger verändern.<br /><em>Mehr hervorheben.</em></>} copy="Jede Behandlung beginnt mit einer präzisen Analyse. Wir empfehlen nur, was Ihre natürliche Ausstrahlung unterstützt." />
          <div className="mt-14 grid border-y border-border lg:grid-cols-[0.62fr_1.38fr]">
            <div className="border-b border-border py-6 lg:border-b-0 lg:border-r lg:py-10 lg:pr-10">
              {treatments.map((item, index) => (
                <Button key={item.title} type="button" variant="ghost" onClick={() => setActiveTreatment(index)} className={`group h-auto w-full justify-between rounded-none border-b border-border px-0 py-5 text-left last:border-0 ${activeTreatment === index ? "text-primary" : "text-muted-foreground hover:bg-transparent hover:text-foreground"}`}>
                  <span className="font-serif text-2xl sm:text-3xl">{item.title}</span>
                  <ArrowRight className={`size-5 transition-transform ${activeTreatment === index ? "translate-x-0" : "-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"}`} aria-hidden="true" />
                </Button>
              ))}
            </div>
            <article key={treatment?.title} className="detail-swap grid min-h-[430px] bg-secondary md:grid-cols-[1fr_0.9fr]">
              <div className="flex flex-col justify-between p-7 sm:p-10 lg:p-14">
                <div>
                  <p className="text-xs font-semibold uppercase text-primary">{treatment?.eyebrow}</p>
                  <h2 className="mt-5 font-serif text-5xl font-normal sm:text-6xl">{treatment?.title}</h2>
                  <p className="mt-6 max-w-md text-lg leading-8 text-muted-foreground">{treatment?.description}</p>
                </div>
                <div className="mt-10 flex items-end justify-between border-t border-border pt-6">
                  <span className="text-sm text-muted-foreground">Orientierungspreis</span>
                  <span className="font-serif text-4xl text-primary">{treatment?.price}</span>
                </div>
              </div>
              <div className="relative min-h-72 overflow-hidden">
                <img src={clinicPortrait} alt="Behandlungsraum der LUMINA aesthetic clinic" width={1200} height={1504} loading="lazy" className="h-full w-full object-cover transition-transform duration-1000 hover:scale-105" />
              </div>
            </article>
          </div>
        </div>
      </section>

      <section id="ergebnisse" data-reveal className="bg-lumina-footer px-5 py-20 text-lumina-footer-foreground sm:px-8 lg:px-14 lg:py-28">
        <div className="mx-auto grid max-w-[1500px] gap-12 lg:grid-cols-[1.28fr_0.72fr] lg:items-end">
          <div>
            <div className="mb-7 flex items-end justify-between">
              <div>
                <p className="text-xs font-semibold uppercase text-primary">02 · Ergebnisblick</p>
                <h2 className="mt-4 font-serif text-5xl font-normal sm:text-7xl">Subtil. Aber spürbar.</h2>
              </div>
              <span className="hidden text-xs uppercase text-lumina-footer-muted sm:block">Regler bewegen</span>
            </div>
            <div className="relative aspect-[16/10] overflow-hidden bg-secondary">
              <img src={beforeAfterCases} alt="Beispieldarstellung vor einer ästhetischen Behandlung" width={1600} height={1008} loading="lazy" className="absolute inset-0 h-full w-full object-cover grayscale" />
              <div className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${compareValue}%` }}>
                <img src={beforeAfterCases} alt="Beispieldarstellung nach einer ästhetischen Behandlung" width={1600} height={1008} loading="lazy" className="h-full w-[calc(100vw-2.5rem)] max-w-[930px] object-cover saturate-125" />
              </div>
              <div className="absolute inset-y-0 w-px bg-lumina-hero-text" style={{ left: `${compareValue}%` }}>
                <span className="absolute left-1/2 top-1/2 flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-lumina-hero-text text-lumina-hero-ink"><ChevronLeft className="size-4" /><ChevronRight className="size-4" /></span>
              </div>
              <input aria-label="Vorher-Nachher-Vergleich" type="range" min="18" max="82" value={compareValue} onChange={(event) => setCompareValue(Number(event.target.value))} className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0" />
            </div>
            <p className="mt-3 text-xs text-lumina-footer-muted">Beispieldarstellung. Ergebnisse sind individuell und werden im Beratungsgespräch realistisch eingeordnet.</p>
          </div>
          <div className="border-t border-lumina-footer-line pt-8 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
            <Sparkles className="size-8 text-primary" aria-hidden="true" />
            <blockquote className="mt-8 font-serif text-4xl italic leading-tight sm:text-5xl">„Ihr Gesicht bleibt Ihres. Nur frischer.“</blockquote>
            <p className="mt-7 max-w-md leading-7 text-lumina-footer-muted">Unser Signature-Ansatz verbindet auf Wunsch Mimikentspannung, harmonische Kontur und Hautqualität in einem abgestimmten Plan.</p>
            <Button asChild variant="outline" className="mt-9 h-12 rounded-none border-primary bg-transparent px-7 text-lumina-footer-foreground hover:bg-primary hover:text-primary-foreground"><a href="#buchung">Persönlich beraten lassen</a></Button>
          </div>
        </div>
      </section>

      <section id="preise" data-reveal className="px-5 py-20 sm:px-8 lg:px-14 lg:py-28">
        <div className="mx-auto max-w-[1500px]">
          <EditorialHeading number="03" kicker="Orientierung" title={<>Klare Preise.<br /><em>Keine Überraschungen.</em></>} copy="Der genaue Preis richtet sich nach Region, Produkt und individuellem Behandlungsplan." />
          <div className="mt-14 grid border-t border-border md:grid-cols-2 lg:grid-cols-4">
            {treatments.slice(0, 4).map((item, index) => (
              <article key={item.title} className="group border-b border-border py-8 md:px-7 md:first:pl-0 lg:border-r lg:last:border-r-0">
                <span className="text-xs text-muted-foreground">0{index + 1}</span>
                <h3 className="mt-10 font-serif text-3xl">{item.title}</h3>
                <p className="mt-3 min-h-12 text-sm leading-6 text-muted-foreground">{item.description}</p>
                <p className="mt-8 font-serif text-3xl text-primary">{item.price}</p>
              </article>
            ))}
          </div>
          <div className="mt-12 grid gap-10 border-y border-border py-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-center">
            <div>
              <div className="flex gap-1 text-primary" aria-label="5 Sterne"><Star className="size-4 fill-current" /><Star className="size-4 fill-current" /><Star className="size-4 fill-current" /><Star className="size-4 fill-current" /><Star className="size-4 fill-current" /></div>
              <p className="mt-3 text-sm text-muted-foreground">Diskrete Beratung · zentrale Lage in Bochum</p>
            </div>
            <p className="font-serif text-3xl leading-snug sm:text-4xl">Medizinische Sorgfalt, transparente Aufklärung und ein Ergebnis, das nicht nach Behandlung aussehen muss.</p>
          </div>
        </div>
      </section>

      <section id="kontakt" data-reveal className="bg-secondary px-5 py-20 sm:px-8 lg:px-14 lg:py-28">
        <div className="mx-auto grid max-w-[1500px] gap-12 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <p className="text-xs font-semibold uppercase text-primary">04 · Gut zu wissen</p>
            <h2 className="mt-5 font-serif text-5xl font-normal sm:text-7xl">Erst verstehen.<br /><em>Dann entscheiden.</em></h2>
            <div className="mt-10 space-y-2 text-sm text-muted-foreground"><p>Brückstr. 44, 44787 Bochum</p><p>WhatsApp 015 77777 9962</p></div>
          </div>
          <Accordion type="single" collapsible defaultValue="faq-0" className="border-t border-border">
            {faqs.map((faq, index) => (
              <AccordionItem key={faq.question} value={`faq-${index}`} className="border-border">
                <AccordionTrigger className="py-6 text-left font-serif text-2xl font-normal hover:no-underline sm:text-3xl">{faq.question}</AccordionTrigger>
                <AccordionContent className="max-w-2xl pb-7 text-base leading-7 text-muted-foreground">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section id="buchung" data-reveal className="px-5 py-20 sm:px-8 lg:px-14 lg:py-28">
        <div className="mx-auto max-w-[1500px] border-y border-border py-12 sm:py-16">
          <div className="grid gap-12 lg:grid-cols-[0.78fr_1.22fr]">
            <div>
              <p className="text-xs font-semibold uppercase text-primary">05 · Termin</p>
              <h2 className="mt-5 font-serif text-6xl font-normal leading-[0.9] sm:text-8xl">Bereit für<br /><em>Ihren Glow?</em></h2>
              <p className="mt-7 max-w-md leading-7 text-muted-foreground">Senden Sie Ihren Terminwunsch direkt an LUMINA. Wir melden uns persönlich zur Abstimmung.</p>
            </div>
            <div className="bg-lumina-footer p-6 text-lumina-footer-foreground sm:p-10">
              <div className="mb-9 flex gap-3" aria-label="Buchungsfortschritt">
                {["Behandlung", "Kontakt", "Fertig"].map((step, index) => <span key={step} className={`h-1 flex-1 ${index <= bookingStep ? "bg-primary" : "bg-lumina-footer-line"}`} />)}
              </div>
              {bookingStep === 0 && <BookingPanel title="Wofür interessieren Sie sich?">
                <div className="grid gap-2 sm:grid-cols-2">{treatments.map((item) => <Button key={item.title} type="button" variant="outline" onClick={() => setBooking((current) => ({ ...current, treatment: item.title }))} className={`h-auto justify-start rounded-none border-lumina-footer-line px-4 py-4 ${booking.treatment === item.title ? "bg-primary text-primary-foreground" : "bg-transparent text-lumina-footer-foreground hover:bg-primary hover:text-primary-foreground"}`}>{item.title}</Button>)}</div>
              </BookingPanel>}
              {bookingStep === 1 && <BookingPanel title="Wie erreichen wir Sie?">
                <div className="space-y-4">
                  <input value={booking.contact} onChange={(event) => setBooking((current) => ({ ...current, contact: event.target.value }))} placeholder="Name und Telefon oder E-Mail" className="h-14 w-full rounded-none border border-lumina-footer-line bg-transparent px-5 text-lumina-footer-foreground placeholder:text-lumina-footer-muted focus:outline-none focus:ring-2 focus:ring-primary" />
                  <textarea value={booking.note} onChange={(event) => setBooking((current) => ({ ...current, note: event.target.value }))} placeholder="Wunschtermin oder Nachricht (optional)" className="min-h-28 w-full rounded-none border border-lumina-footer-line bg-transparent p-5 text-lumina-footer-foreground placeholder:text-lumina-footer-muted focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
              </BookingPanel>}
              {bookingStep === 2 && <BookingPanel title="Ihre Anfrage ist bereit.">
                <div className="border border-lumina-footer-line p-7 text-center"><span className="mx-auto flex size-16 items-center justify-center bg-primary text-primary-foreground"><Check className="size-8" aria-hidden="true" /></span><p className="mt-6 font-serif text-4xl">{booking.treatment}</p><p className="mt-3 text-sm text-lumina-footer-muted">Öffnen Sie WhatsApp, um die Anfrage persönlich abzustimmen.</p><Button asChild className="mt-7 h-12 rounded-none px-7"><a href={`${whatsappUrl}?text=${bookingMessage}`} target="_blank" rel="noreferrer">Anfrage senden <MessageCircle aria-hidden="true" /></a></Button></div>
              </BookingPanel>}
              <div className="mt-8 flex justify-between">
                <Button type="button" variant="ghost" disabled={bookingStep === 0} onClick={() => setBookingStep((step) => Math.max(0, step - 1))} className="rounded-none text-lumina-footer-muted hover:bg-transparent hover:text-lumina-footer-foreground">Zurück</Button>
                {bookingStep < 2 && <Button type="button" onClick={() => setBookingStep((step) => Math.min(2, step + 1))} className="rounded-none px-7">Weiter <ArrowRight aria-hidden="true" /></Button>}
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-lumina-footer px-5 py-10 text-lumina-footer-foreground sm:px-8 lg:px-14">
        <div className="mx-auto flex max-w-[1500px] flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div><img src={logoAsset} alt="LUMINA aesthetic clinic Logo" width={160} height={160} loading="lazy" className="h-20 w-auto" /><p className="mt-4 text-sm text-lumina-footer-muted">Natürliche Schönheit unterstreichen.</p></div>
          <div className="text-sm text-lumina-footer-muted sm:text-right"><p>Brückstr. 44 · 44787 Bochum</p><p className="mt-2">© 2026 LUMINA aesthetic clinic · Impressum · Datenschutz</p></div>
        </div>
      </footer>
    </main>
  );
}

function EditorialHeading({ number, kicker, title, copy }: { number: string; kicker: string; title: ReactNode; copy: string }) {
  return <div className="grid gap-8 lg:grid-cols-[0.28fr_0.92fr_0.8fr] lg:items-end"><p className="text-xs text-muted-foreground">{number}</p><div><p className="text-xs font-semibold uppercase text-primary">{kicker}</p><h2 className="mt-4 font-serif text-5xl font-normal leading-[0.95] sm:text-7xl">{title}</h2></div><p className="max-w-md text-lg leading-8 text-muted-foreground lg:justify-self-end">{copy}</p></div>;
}

function Header({ menuOpen, setMenuOpen }: { menuOpen: boolean; setMenuOpen: (open: boolean) => void }) {
  const links = [["Behandlungen", "#behandlungen"], ["Ergebnisse", "#ergebnisse"], ["Preise", "#preise"], ["FAQ", "#kontakt"]];
  return <header className="absolute inset-x-0 top-0 z-50 px-5 py-5 sm:px-8 lg:px-14">
    <div className="mx-auto flex max-w-[1500px] items-center justify-between border-b border-lumina-hero-line pb-4">
      <a href="#start" aria-label="LUMINA Startseite" className="flex items-center gap-4"><img src={logoAsset} alt="LUMINA aesthetic clinic Logo" width={92} height={92} className="h-14 w-auto brightness-0 invert" /><span className="hidden text-[10px] uppercase text-lumina-hero-muted sm:block">Aesthetic clinic · Bochum</span></a>
      <nav className="hidden items-center gap-8 text-[11px] font-semibold uppercase text-lumina-hero-text lg:flex" aria-label="Hauptnavigation">{links.map(([label, href]) => <a key={label} href={href} className="transition-opacity hover:opacity-60">{label}</a>)}</nav>
      <div className="hidden items-center gap-2 lg:flex"><Button asChild variant="ghost" size="icon" className="rounded-none text-lumina-hero-text hover:bg-lumina-hero-line"><a href={whatsappUrl} target="_blank" rel="noreferrer" aria-label="WhatsApp öffnen"><MessageCircle /></a></Button><Button asChild className="rounded-none bg-lumina-hero-text text-lumina-hero-ink hover:bg-primary"><a href="#buchung">Termin</a></Button></div>
      <Button type="button" variant="ghost" size="icon" onClick={() => setMenuOpen(true)} className="rounded-none text-lumina-hero-text hover:bg-lumina-hero-line lg:hidden" aria-label="Menü öffnen"><Menu /></Button>
    </div>
    {menuOpen && <div className="fixed inset-0 z-50 bg-lumina-footer p-6 text-lumina-footer-foreground lg:hidden"><div className="flex items-center justify-between"><img src={logoAsset} alt="LUMINA aesthetic clinic Logo" width={92} height={92} className="h-16 w-auto" /><Button type="button" variant="ghost" size="icon" className="rounded-none text-lumina-footer-foreground" onClick={() => setMenuOpen(false)} aria-label="Menü schließen"><X /></Button></div><nav className="mt-16 grid" aria-label="Mobile Navigation">{links.map(([label, href]) => <a key={label} href={href} onClick={() => setMenuOpen(false)} className="border-b border-lumina-footer-line py-5 font-serif text-4xl">{label}</a>)}</nav><Button asChild className="mt-10 h-14 w-full rounded-none"><a href="#buchung" onClick={() => setMenuOpen(false)}>Termin vereinbaren <CalendarDays /></a></Button></div>}
  </header>;
}

function BookingPanel({ title, children }: { title: string; children: ReactNode }) {
  return <div className="detail-swap"><h3 className="font-serif text-3xl sm:text-4xl">{title}</h3><div className="mt-7">{children}</div></div>;
}
