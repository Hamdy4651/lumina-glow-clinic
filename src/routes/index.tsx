import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  HeartPulse,
  Menu,
  MessageCircle,
  Quote,
  ShieldCheck,
  Sparkles,
  Star,
  Syringe,
  Timer,
  WandSparkles,
  X,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import logoAsset from "@/assets/lumina-logo.png.asset.json";
import clinicPortrait from "@/assets/lumina-clinic-portrait.jpg";
import beforeAfterCases from "@/assets/lumina-before-after-cases.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LUMINA aesthetic clinic Bochum" },
      {
        name: "description",
        content:
          "LUMINA aesthetic clinic in Bochum für botox®, Hyaluron, Skin Booster, HydraFacial und natürliche ästhetische Behandlungen.",
      },
      { property: "og:title", content: "LUMINA aesthetic clinic Bochum" },
      {
        property: "og:description",
        content:
          "Natürliche Schönheit unterstreichen: botox®, Hyaluron und moderne Ästhetik in der Brückstr. 44 in Bochum.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const whatsappUrl = "https://wa.me/4915777779962";

const treatments = [
  {
    title: "Faltenbehandlung",
    subtitle: "botox® für entspannte Mimik",
    detail:
      "Sanfte Dosierungen für Stirn, Zornesfalte und Augenpartie mit Fokus auf Natürlichkeit und Ausdruck.",
    icon: Syringe,
    from: "ab 189 €",
  },
  {
    title: "Hyaluron",
    subtitle: "Volumen, Kontur & Feuchtigkeit",
    detail:
      "Präzise Unterspritzungen für Lippen, Jawline, Wangen und Nasolabialfalte nach individueller Analyse.",
    icon: Sparkles,
    from: "ab 249 €",
  },
  {
    title: "Lemon Bottle",
    subtitle: "Fett-weg-Spritze",
    detail:
      "Gezielte Behandlung kleiner Fettdepots an Kinn, Bauch oder Konturen inklusive realistischer Beratung.",
    icon: WandSparkles,
    from: "ab 149 €",
  },
  {
    title: "Skin Booster",
    subtitle: "Glow & Hautqualität",
    detail:
      "Feuchtigkeitsdepots für glattere Hautstruktur, feinere Linien und einen frischen Lumina-Glow.",
    icon: HeartPulse,
    from: "ab 199 €",
  },
  {
    title: "HydraFacial",
    subtitle: "Tiefenreinigung & Pflege",
    detail:
      "Mehrstufiges Treatment für Poren, Glow und gepflegte Haut mit sofort sichtbar frischem Finish.",
    icon: Sparkles,
    from: "ab 129 €",
  },
  {
    title: "Infusionen",
    subtitle: "Beauty & Vitalität",
    detail:
      "Ausgewählte Vitamin- und Nährstoffinfusionen als Ergänzung für Energie, Haut und Wohlbefinden.",
    icon: HeartPulse,
    from: "ab 89 €",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Analyse",
    text: "Gesicht, Hautqualität und persönliche Wünsche werden ruhig und präzise besprochen.",
  },
  {
    number: "02",
    title: "Behandlungsplan",
    text: "Empfehlung, Dosierung, Preisrahmen und Ablauf werden transparent festgelegt.",
  },
  {
    number: "03",
    title: "Treatment",
    text: "Die Behandlung erfolgt konzentriert, hygienisch und mit zertifizierten Produkten.",
  },
  {
    number: "04",
    title: "Nachsorge",
    text: "Hinweise, Ergebnisfenster und Kontrolloptionen begleiten den natürlichen Heilungsverlauf.",
  },
];

const trustItems = [
  "Ärztliche Expertise",
  "Zertifizierte Produkte",
  "Natürliche Ergebnisse",
  "Individuelle Beratung",
];

const offers = [
  { name: "HydraFacial Glow", old: "169 €", price: "129 €", badge: "-24%" },
  { name: "Skin Booster Kur", old: "690 €", price: "549 €", badge: "Kurpreis" },
  { name: "Lippen Fresh-up", old: "299 €", price: "249 €", badge: "Beliebt" },
];

const cases = [
  { title: "Hautbild & Glow", position: "left" },
  { title: "Kontur & Wange", position: "center" },
  { title: "Frische Linien", position: "right" },
];

const testimonials = [
  {
    text: "Sehr feinfühlige Beratung und ein Ergebnis, das frisch aussieht, aber nicht gemacht.",
    name: "M. aus Bochum",
    place: "Innenstadt",
  },
  {
    text: "Die Praxis ist wunderschön ruhig. Ich habe mich vom ersten Gespräch an sicher gefühlt.",
    name: "S. aus Wattenscheid",
    place: "Bochum",
  },
  {
    text: "Professionell, ehrlich und sehr natürlich. Genau das, was ich gesucht habe.",
    name: "A. aus Ehrenfeld",
    place: "Bochum",
  },
];

const prices = [
  { category: "botox®", lines: ["1 Zone ab 189 €", "2 Zonen ab 289 €", "3 Zonen ab 369 €"] },
  { category: "Hyaluron", lines: ["Lippen ab 249 €", "Jawline ab 349 €", "Wange ab 399 €"] },
  { category: "Skin & Glow", lines: ["HydraFacial ab 129 €", "Skin Booster ab 199 €", "Infusion ab 89 €"] },
  { category: "Kontur", lines: ["Lemon Bottle ab 149 €", "Kinnlinie ab 299 €", "Beratung 0 €"] },
];

const treatmentFaqs: Record<string, Array<{ question: string; answer: string }>> = {
  Faltenbehandlung: [
    { question: "Wie lange hält botox®?", answer: "Die Wirkung hält häufig drei bis vier Monate. Stoffwechsel, Muskelaktivität und behandelte Region beeinflussen die individuelle Dauer." },
    { question: "Wann wirkt botox®?", answer: "Erste Veränderungen zeigen sich meist nach drei bis fünf Tagen. Das vollständige Ergebnis lässt sich in der Regel nach etwa 14 Tagen beurteilen." },
    { question: "Wie läuft eine botox®-Behandlung ab?", answer: "Nach Analyse und Aufklärung werden kleine, gezielte Mengen injiziert. Die eigentliche Behandlung dauert meist nur wenige Minuten." },
    { question: "Welche Falten können behandelt werden?", answer: "Typische Bereiche sind Zornesfalte, Stirn und Augenpartie. Ob eine Behandlung sinnvoll ist, klären wir immer individuell." },
    { question: "Gibt es Nebenwirkungen?", answer: "Vorübergehende Rötungen, kleine Schwellungen oder Blutergüsse sind möglich. Seltene Risiken und persönliche Ausschlussgründe besprechen wir vorab ausführlich." },
    { question: "Wann darf botox® nicht angewendet werden?", answer: "Unter anderem in Schwangerschaft und Stillzeit sowie bei bestimmten Erkrankungen oder Medikamenten. Die medizinische Eignung wird im Beratungsgespräch geprüft." },
  ],
  Hyaluron: [
    { question: "Wie lange hält Hyaluron?", answer: "Je nach Produkt, Region und Stoffwechsel bleibt das Ergebnis häufig sechs bis zwölf Monate sichtbar." },
    { question: "Ist das Ergebnis sofort sichtbar?", answer: "Eine Veränderung ist meist direkt erkennbar. Schwellungen können das erste Bild beeinflussen; das finale Ergebnis beurteilen wir nach der Beruhigungsphase." },
    { question: "Welche Bereiche können behandelt werden?", answer: "Häufig behandeln wir Lippen, Wangen, Jawline und Nasolabialbereich. Die Empfehlung folgt immer den Proportionen Ihres Gesichts." },
    { question: "Wirkt Hyaluron natürlich?", answer: "Unser Ansatz ist zurückhaltend: harmonische Konturen und Frische statt sichtbarer Überkorrektur." },
    { question: "Was sollte ich danach beachten?", answer: "Am Behandlungstag sollten Druck, starke Wärme, intensiver Sport und Alkohol vermieden werden. Sie erhalten persönliche Nachsorgehinweise." },
  ],
  "Lemon Bottle": [
    { question: "Für welche Zonen eignet sich Lemon Bottle?", answer: "Die Behandlung kann für kleine, klar begrenzte Fettdepots infrage kommen, etwa unter dem Kinn oder an ausgewählten Körperzonen." },
    { question: "Ist Lemon Bottle eine Methode zum Abnehmen?", answer: "Nein. Sie ersetzt weder Gewichtsreduktion noch Bewegung, sondern richtet sich ausschließlich an lokal begrenzte Konturen." },
    { question: "Wie viele Sitzungen sind nötig?", answer: "Das ist abhängig von Zone und Ausgangslage. Nach der Analyse erhalten Sie eine realistische Einschätzung zur möglichen Sitzungszahl." },
    { question: "Wann sieht man ein Ergebnis?", answer: "Veränderungen entwickeln sich schrittweise. Das Gewebe benötigt Zeit, weshalb das Ergebnis nicht unmittelbar nach der Behandlung bewertet wird." },
    { question: "Welche Reaktionen sind möglich?", answer: "Schwellung, Rötung, Druckempfindlichkeit oder kleine Blutergüsse können vorübergehend auftreten. Risiken werden individuell besprochen." },
  ],
  "Skin Booster": [
    { question: "Was ist ein Skin Booster?", answer: "Ein Skin Booster bringt feuchtigkeitsbindende Wirkstoffe gezielt in die Haut, um Hautqualität, Elastizität und Frische zu unterstützen." },
    { question: "Für wen eignet sich die Behandlung?", answer: "Sie kann bei feuchtigkeitsarmer, fahler oder feinliniger Haut sinnvoll sein. Die Eignung klären wir nach einer Hautanalyse." },
    { question: "Wie viele Behandlungen werden empfohlen?", answer: "Häufig wird eine Aufbaukur empfohlen. Anzahl und Abstand richten sich nach Produkt, Hautzustand und Behandlungsziel." },
    { question: "Wann bin ich wieder gesellschaftsfähig?", answer: "Kleine Einstichstellen oder leichte Schwellungen können kurz sichtbar sein. Viele Kundinnen und Kunden sind rasch wieder alltagstauglich." },
    { question: "Wie lange hält der Glow?", answer: "Die Haltbarkeit ist individuell. Regelmäßige Pflege, Sonnenschutz und Auffrischungen können das Ergebnis unterstützen." },
  ],
  HydraFacial: [
    { question: "Was passiert bei einem HydraFacial?", answer: "Die Behandlung kombiniert Reinigung, sanftes Peeling, Ausreinigung und intensive Versorgung der Haut in mehreren abgestimmten Schritten." },
    { question: "Für welchen Hauttyp eignet es sich?", answer: "HydraFacial lässt sich an viele Hauttypen anpassen. Empfindlichkeit, aktive Entzündungen und individuelle Ziele berücksichtigen wir vorab." },
    { question: "Sieht man sofort einen Effekt?", answer: "Viele erleben direkt danach ein glatteres, frischer wirkendes Hautbild. Das Ergebnis variiert je nach Ausgangslage." },
    { question: "Gibt es eine Ausfallzeit?", answer: "In der Regel ist keine längere Ausfallzeit zu erwarten. Kurzzeitige Rötungen sind je nach Hautreaktion möglich." },
    { question: "Wie oft ist HydraFacial sinnvoll?", answer: "Einzeltermine sorgen für einen Frischekick; regelmäßige Abstände können Teil eines längerfristigen Hautkonzepts sein." },
  ],
  Infusionen: [
    { question: "Was enthalten die Infusionen?", answer: "Die Zusammensetzung wird je nach Angebot und persönlicher Eignung ausgewählt. Inhaltsstoffe und Dosierungen erläutern wir transparent vorab." },
    { question: "Wie lange dauert eine Infusion?", answer: "Planen Sie abhängig von der Zusammensetzung meist etwa 30 bis 60 Minuten in ruhiger Atmosphäre ein." },
    { question: "Ist eine ärztliche Prüfung nötig?", answer: "Ja. Vor einer Infusion prüfen wir Vorerkrankungen, Medikamente und mögliche Gegenanzeigen, um die medizinische Eignung einzuschätzen." },
    { question: "Wie oft kann eine Infusion erfolgen?", answer: "Das hängt von Ziel, Zusammensetzung und individueller Situation ab. Eine pauschale Empfehlung ohne Anamnese ist nicht sinnvoll." },
    { question: "Ersetzt sie eine ausgewogene Ernährung?", answer: "Nein. Infusionen ersetzen weder ausgewogene Ernährung noch die Behandlung bestehender Erkrankungen." },
  ],
};

const bookingSteps = ["Behandlung", "Behandler:in", "Termin", "Kontakt", "Fragen", "Bestätigung"];
const timeSlots = ["10:00", "12:30", "15:00", "17:30"];

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeProcess, setActiveProcess] = useState(0);
  const [selectedTreatment, setSelectedTreatment] = useState("Faltenbehandlung");
  const [caseIndex, setCaseIndex] = useState(0);
  const [compareValue, setCompareValue] = useState(52);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [bookingStep, setBookingStep] = useState(0);
  const [booking, setBooking] = useState({
    treatment: "Faltenbehandlung",
    practitioner: "Dr. L. Kaya",
    date: "Donnerstag, 24. Oktober",
    time: "15:00",
    contact: "",
    mode: "Gast",
    questions: "",
  });
  const processRefs = useRef<Array<HTMLDivElement | null>>([]);
  const progress = ((activeProcess + 1) / processSteps.length) * 100;
  const selectedCase = cases[caseIndex] ?? { title: "Hautbild & Glow", position: "left" };
  const currentProcessStep = processSteps[activeProcess] ?? { number: "01", title: "Analyse", text: "" };
  const activeTestimonial = testimonials[testimonialIndex] ?? {
    text: "Sehr feinfühlige Beratung und ein natürlich frisches Ergebnis.",
    name: "LUMINA Kundin",
    place: "Bochum",
  };
  const activeTreatment = useMemo(
    () =>
      treatments.find((treatment) => treatment.title === selectedTreatment) ?? {
        title: "Faltenbehandlung",
        subtitle: "botox® für entspannte Mimik",
        detail: "Sanfte Dosierungen für einen natürlichen, erholten Ausdruck.",
        icon: Syringe,
        from: "ab 189 €",
      },
    [selectedTreatment],
  );
  const activeFaqs = treatmentFaqs[selectedTreatment] ?? treatmentFaqs.Faltenbehandlung ?? [];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const index = Number(visible.target.getAttribute("data-step-index"));
        if (Number.isFinite(index)) setActiveProcess(index);
      },
      { threshold: [0.45, 0.65, 0.85], rootMargin: "-20% 0px -20% 0px" },
    );

    processRefs.current.forEach((node) => {
      if (node) observer.observe(node);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    const revealNodes = document.querySelectorAll("[data-reveal]");
    revealNodes.forEach((node) => revealObserver.observe(node));
    return () => revealObserver.disconnect();
  }, []);

  function updateBooking(key: keyof typeof booking, value: string) {
    setBooking((current) => ({ ...current, [key]: value }));
  }

  const nextStep = () => setBookingStep((current) => Math.min(current + 1, bookingSteps.length - 1));
  const previousStep = () => setBookingStep((current) => Math.max(current - 1, 0));

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      <section id="start" className="relative min-h-[85vh] overflow-hidden px-5 pt-28 sm:px-8 lg:px-12">
        <div className="absolute inset-x-0 top-28 mx-auto h-64 max-w-4xl rounded-full bg-lumina-glow blur-3xl" aria-hidden="true" />
        <div className="mx-auto grid max-w-7xl items-center gap-12 pb-14 lg:min-h-[calc(85vh-7rem)] lg:grid-cols-[0.95fr_1.05fr]">
          <div className="relative z-10 max-w-3xl hero-copy">
            <p className="mb-5 text-sm uppercase text-primary hero-kicker">WILLKOMMEN BEI LUMINA</p>
            <h1 className="font-serif text-5xl font-semibold leading-none text-foreground hero-title sm:text-7xl lg:text-8xl">
              Natürliche Schönheit <span className="block text-primary">unterstreichen.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-muted-foreground">
              LUMINA aesthetic clinic in Bochum verbindet botox®, Hyaluron und Skin-Treatments mit ruhiger Beratung, präzisem Blick und einem natürlich frischen Ergebnis.
            </p>
            <div className="mt-10 flex flex-col gap-3 hero-actions sm:flex-row">
              <Button asChild className="h-12 rounded-full px-7 text-sm uppercase">
                <a href="#buchung">
                  Termin buchen <CalendarDays aria-hidden="true" />
                </a>
              </Button>
              <Button asChild variant="outline" className="h-12 rounded-full border-primary bg-background/70 px-7 text-sm uppercase hover:bg-secondary">
                <a href={whatsappUrl} target="_blank" rel="noreferrer">
                  WhatsApp <MessageCircle aria-hidden="true" />
                </a>
              </Button>
            </div>
            <div className="mt-12 grid max-w-xl grid-cols-3 gap-4 border-y border-primary/35 py-5 text-sm text-muted-foreground">
              <span>Brückstr. 44</span>
              <span>44787 Bochum</span>
              <span>botox® & Hyaluron</span>
            </div>
          </div>

          <div className="relative z-10 mx-auto w-full max-w-xl hero-visual lg:mr-0">
            <div className="organic-mask relative overflow-hidden border border-primary/35 bg-secondary shadow-lumina hero-float">
              <img
                src={clinicPortrait}
                alt="Warmer Behandlungsraum der LUMINA aesthetic clinic"
                width={1200}
                height={1504}
                className="h-[560px] w-full object-cover sm:h-[640px]"
              />
              <div className="absolute bottom-6 left-6 right-6 rounded-3xl border border-primary/40 bg-background/80 p-5 backdrop-blur-xl">
                <p className="font-serif text-2xl text-foreground">Fresh, refined, never overdone.</p>
                <p className="mt-1 text-sm text-muted-foreground">Ästhetische Medizin mit weichem Signature-Look.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section aria-label="Vertrauen" data-reveal className="border-y border-primary/30 bg-secondary/70 px-5 py-5 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {trustItems.map((item) => (
            <div key={item} className="motion-card flex items-center gap-3 rounded-full bg-card px-5 py-3 text-sm text-foreground shadow-soft">
              <ShieldCheck className="size-5 text-primary" aria-hidden="true" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="ablauf" data-reveal className="px-5 py-24 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="lg:sticky lg:top-28 lg:h-fit">
            <p className="text-sm uppercase text-primary">Cinematic Scroll</p>
            <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight sm:text-6xl">
              Ihr Behandlungsablauf in vier ruhigen Momenten.
            </h2>
            <div className="mt-8 h-2 overflow-hidden rounded-full bg-secondary">
              <div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: `${progress}%` }} />
            </div>
            <p className="mt-4 text-sm text-muted-foreground">{currentProcessStep.number} von 04</p>
          </div>
          <div className="space-y-6">
            {processSteps.map((step, index) => (
              <div
                key={step.number}
                ref={(node) => {
                  processRefs.current[index] = node;
                }}
                data-step-index={index}
                className={`process-card rounded-3xl border p-8 transition-all duration-500 ${
                  activeProcess === index
                    ? "border-primary bg-card shadow-lumina"
                    : "border-border bg-secondary/45"
                }`}
              >
                <span className="font-serif text-5xl text-primary">{step.number}</span>
                <h3 className="mt-6 font-serif text-3xl font-semibold">{step.title}</h3>
                <p className="mt-3 max-w-2xl leading-7 text-muted-foreground">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="behandlungen" data-reveal className="bg-secondary/55 px-5 py-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-sm uppercase text-primary">Behandlungen</p>
              <h2 className="mt-4 font-serif text-4xl font-semibold sm:text-6xl">Sanft geplant. Präzise ausgeführt.</h2>
            </div>
            <p className="max-w-lg leading-7 text-muted-foreground">
              Jede Behandlung beginnt mit einer ehrlichen Einschätzung, damit Produkt, Technik und Dosierung zu Ihnen passen.
            </p>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-[1fr_0.82fr]">
            <div className="grid gap-4 sm:grid-cols-2">
              {treatments.map((treatment) => {
                const Icon = treatment.icon;
                const active = activeTreatment.title === treatment.title;
                return (
                  <Button
                    key={treatment.title}
                    type="button"
                    variant="outline"
                    onClick={() => setSelectedTreatment(treatment.title)}
                    className={`group motion-card h-auto whitespace-normal rounded-3xl p-6 text-left transition-all ${
                      active ? "border-primary bg-card shadow-lumina" : "border-border bg-background hover:border-primary/60"
                    }`}
                  >
                    <div className="w-full">
                      <div className="mb-8 flex items-center justify-between">
                        <span className="flex size-12 items-center justify-center rounded-full bg-secondary text-primary">
                          <Icon className="size-5" aria-hidden="true" />
                        </span>
                        <span className="text-sm text-primary">{treatment.from}</span>
                      </div>
                      <h3 className="font-serif text-3xl font-semibold">{treatment.title}</h3>
                      <p className="mt-2 text-sm text-muted-foreground">{treatment.subtitle}</p>
                    </div>
                  </Button>
                );
              })}
            </div>

            <aside key={activeTreatment.title} className="detail-swap rounded-3xl border border-primary/35 bg-card p-8 shadow-soft">
              <p className="text-sm uppercase text-primary">Detailansicht</p>
              <h3 className="mt-5 font-serif text-5xl font-semibold">{activeTreatment.title}</h3>
              <p className="mt-5 leading-8 text-muted-foreground">{activeTreatment.detail}</p>
              <div className="mt-8 rounded-3xl bg-secondary p-6">
                <p className="text-sm uppercase text-primary">ab Preis</p>
                <p className="mt-2 font-serif text-4xl">{activeTreatment.from}</p>
              </div>
              <Button asChild className="mt-8 h-12 w-full rounded-full">
                <a href="#buchung">
                  Diese Behandlung wählen <ArrowRight aria-hidden="true" />
                </a>
              </Button>
            </aside>
          </div>
        </div>
      </section>

      <section id="signature" data-reveal className="px-5 py-24 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-7xl overflow-hidden rounded-3xl border border-primary/35 bg-card shadow-soft lg:grid-cols-[0.92fr_1.08fr]">
          <div className="min-h-[520px] bg-secondary">
            <img
              src={clinicPortrait}
              alt="Editoriale Ansicht eines warmen LUMINA Behandlungszimmers"
              width={1200}
              height={1504}
              loading="lazy"
               className="h-full w-full object-cover image-drift"
            />
          </div>
          <div className="p-8 sm:p-12 lg:p-16">
            <p className="text-sm uppercase text-primary">Signature-Kombi</p>
            <h2 className="mt-5 font-serif text-4xl font-semibold leading-tight sm:text-6xl">
              botox® Soft Lift + Hyaluron Fresh-up + Glow Finish
            </h2>
            <p className="mt-6 leading-8 text-muted-foreground">
              Die Signature-Kombi verbindet entspannte Mimik, harmonische Kontur und leuchtende Hautqualität in einem abgestimmten Plan. Ideal, wenn das Ergebnis frisch und sichtbar, aber leise wirken soll.
            </p>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {['45–75 Min.', '3 Module', 'natürlicher Effekt'].map((item) => (
                <div key={item} className="rounded-3xl bg-secondary p-5 text-center text-sm text-foreground">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="angebote" data-reveal className="bg-secondary/55 px-5 py-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm uppercase text-primary">Angebote</p>
          <h2 className="mt-4 font-serif text-4xl font-semibold sm:text-6xl">Aktuelle Beauty-Momente.</h2>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {offers.map((offer) => (
              <article key={offer.name} className="motion-card rounded-3xl border border-primary/35 bg-card p-7 shadow-soft">
                <span className="inline-flex rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-foreground">{offer.badge}</span>
                <h3 className="mt-8 font-serif text-3xl font-semibold">{offer.name}</h3>
                <div className="mt-8 flex items-end gap-3">
                  <span className="text-lg text-muted-foreground line-through">{offer.old}</span>
                  <span className="font-serif text-5xl text-primary">{offer.price}</span>
                </div>
                <Button asChild variant="outline" className="mt-8 h-11 rounded-full border-primary bg-background/70 hover:bg-secondary">
                  <a href="#buchung">Angebot sichern</a>
                </Button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="vorher-nachher" data-reveal className="px-5 py-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-sm uppercase text-primary">Vorher & Nachher</p>
              <h2 className="mt-4 font-serif text-4xl font-semibold sm:text-6xl">Interaktiver Ergebnisblick.</h2>
            </div>
            <div className="flex gap-2">
              {cases.map((item, index) => (
                <Button
                  key={item.title}
                  type="button"
                  variant={caseIndex === index ? "default" : "outline"}
                  className="rounded-full"
                  onClick={() => setCaseIndex(index)}
                >
                  {index + 1}
                </Button>
              ))}
            </div>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div className="relative overflow-hidden rounded-3xl border border-primary/35 bg-secondary shadow-lumina">
              <img
                src={beforeAfterCases}
                alt="Vorher-Ansicht eines ästhetischen Behandlungsfalls"
                width={1600}
                height={1008}
                loading="lazy"
                className={`h-[520px] w-full object-cover grayscale contrast-90 ${positionClass(selectedCase.position)}`}
              />
              <div className="absolute inset-0 overflow-hidden" style={{ width: `${compareValue}%` }}>
                <img
                  src={beforeAfterCases}
                  alt="Nachher-Ansicht eines ästhetischen Behandlungsfalls"
                  width={1600}
                  height={1008}
                  loading="lazy"
                  className={`h-[520px] w-full max-w-none object-cover saturate-110 ${positionClass(selectedCase.position)}`}
                />
              </div>
              <div className="absolute inset-y-0 flex w-1 -translate-x-1/2 items-center justify-center bg-primary" style={{ left: `${compareValue}%` }}>
                <span className="flex size-12 items-center justify-center rounded-full border border-primary bg-card text-primary shadow-soft">
                  <ChevronLeft className="size-4" aria-hidden="true" />
                  <ChevronRight className="size-4" aria-hidden="true" />
                </span>
              </div>
              <div className="absolute left-5 top-5 rounded-full bg-card/85 px-4 py-2 text-sm text-foreground backdrop-blur-lg">Nachher</div>
              <div className="absolute right-5 top-5 rounded-full bg-card/85 px-4 py-2 text-sm text-foreground backdrop-blur-lg">Vorher</div>
              <label className="sr-only" htmlFor="compare-slider">Vergleich verschieben</label>
              <input
                id="compare-slider"
                type="range"
                min="18"
                max="82"
                value={compareValue}
                onChange={(event) => setCompareValue(Number(event.target.value))}
                className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
              />
            </div>
            <div className="rounded-3xl bg-secondary p-8">
              <p className="text-sm uppercase text-primary">Fall {caseIndex + 1}</p>
              <h3 className="mt-5 font-serif text-5xl font-semibold">{selectedCase.title}</h3>
              <p className="mt-5 leading-8 text-muted-foreground">
                Der Slider zeigt den Fokus auf feinere Struktur, frische Kontur und einen gepflegten Ausdruck. Ergebnisse sind individuell und werden im Gespräch realistisch eingeordnet.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="bewertungen" data-reveal className="bg-secondary/55 px-5 py-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-sm uppercase text-primary">Bewertungen</p>
          <h2 className="mt-4 font-serif text-4xl font-semibold sm:text-6xl">Worte aus Bochum.</h2>
           <div key={testimonialIndex} className="testimonial-swap mt-12 rounded-3xl border border-primary/35 bg-card p-8 shadow-soft sm:p-12">
            <Quote className="mx-auto size-9 text-primary" aria-hidden="true" />
            <div className="mt-7 flex justify-center gap-1 text-primary" aria-label="5 Sterne">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star key={index} className="size-5 fill-current" aria-hidden="true" />
              ))}
            </div>
            <p className="mx-auto mt-8 max-w-3xl font-serif text-3xl leading-snug sm:text-4xl">
              “{activeTestimonial.text}”
            </p>
            <p className="mt-7 text-sm text-muted-foreground">
              {activeTestimonial.name} · {activeTestimonial.place}
            </p>
            <div className="mt-8 flex justify-center gap-3">
              <Button type="button" variant="outline" size="icon" className="rounded-full border-primary" onClick={() => setTestimonialIndex((current) => (current + testimonials.length - 1) % testimonials.length)} aria-label="Vorherige Bewertung">
                <ChevronLeft aria-hidden="true" />
              </Button>
              <Button type="button" variant="outline" size="icon" className="rounded-full border-primary" onClick={() => setTestimonialIndex((current) => (current + 1) % testimonials.length)} aria-label="Nächste Bewertung">
                <ChevronRight aria-hidden="true" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="preise" data-reveal className="px-5 py-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm uppercase text-primary">Preistabelle</p>
          <h2 className="mt-4 font-serif text-4xl font-semibold sm:text-6xl">Transparente ab-Preise.</h2>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {prices.map((price) => (
              <article key={price.category} className="motion-card rounded-3xl border border-border bg-card p-7 shadow-soft">
                <h3 className="font-serif text-3xl font-semibold text-primary">{price.category}</h3>
                <ul className="mt-7 space-y-4 text-sm text-muted-foreground">
                  {price.lines.map((line) => (
                    <li key={line} className="flex items-center gap-3">
                      <Check className="size-4 text-primary" aria-hidden="true" />
                      {line}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="ueber-uns" data-reveal className="bg-secondary/55 px-5 py-24 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="rounded-3xl border border-primary/35 bg-card p-8 shadow-soft sm:p-12">
            <p className="text-sm uppercase text-primary">Über uns</p>
            <h2 className="mt-5 font-serif text-4xl font-semibold leading-tight sm:text-6xl">Eine ruhige Adresse für feine Ästhetik.</h2>
            <p className="mt-6 leading-8 text-muted-foreground">
              LUMINA steht für Beratung auf Augenhöhe, moderne Produkte und Ergebnisse, die nicht verkleiden. In der Brückstr. 44 entsteht ein warmer Raum für Menschen, die frischer wirken möchten, ohne ihre Natürlichkeit zu verlieren.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {[
              ["4", "Schritte bis zum Plan"],
              ["6", "Behandlungskategorien"],
              ["100%", "Fokus auf Natürlichkeit"],
              ["Bochum", "Zentrale Innenstadtlage"],
            ].map(([value, label]) => (
              <div key={label} className="motion-card rounded-3xl bg-card p-8 shadow-soft">
                <p className="font-serif text-5xl text-primary">{value}</p>
                <p className="mt-3 text-sm text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="kontakt" data-reveal className="px-5 py-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <p className="text-sm uppercase text-primary">FAQ & Kontakt</p>
            <h2 className="mt-4 font-serif text-4xl font-semibold sm:text-6xl">Antworten, die Sicherheit geben.</h2>
            <div className="mt-10 space-y-4 text-muted-foreground">
              <p>Brückstr. 44, 44787 Bochum</p>
              <p>WhatsApp 015 77777 9962</p>
              <p>botox® · Hyaluron · Glow Treatments</p>
            </div>
            <Button asChild className="mt-8 h-12 rounded-full px-7">
              <a href={whatsappUrl} target="_blank" rel="noreferrer">
                Jetzt per WhatsApp schreiben <MessageCircle aria-hidden="true" />
              </a>
            </Button>
          </div>
          <div>
            <div className="mb-5 flex gap-2 overflow-x-auto pb-2" aria-label="FAQ Behandlung auswählen">
              {treatments.map((treatment) => (
                <Button key={treatment.title} type="button" variant={selectedTreatment === treatment.title ? "default" : "outline"} className="shrink-0 rounded-full" onClick={() => setSelectedTreatment(treatment.title)}>
                  {treatment.title}
                </Button>
              ))}
            </div>
            <Accordion key={selectedTreatment} type="single" collapsible defaultValue="faq-0" className="faq-swap rounded-3xl border border-primary/35 bg-card px-6 shadow-soft">
            {activeFaqs.map((faq, index) => (
              <AccordionItem key={faq.question} value={`faq-${index}`} className="border-primary/25">
                <AccordionTrigger className="py-6 text-left font-serif text-2xl hover:no-underline">{faq.question}</AccordionTrigger>
                <AccordionContent className="leading-7 text-muted-foreground">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          </div>
          </div>
        </div>
      </section>

      <section id="buchung" data-reveal className="bg-secondary/55 px-5 py-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl rounded-3xl border border-primary/35 bg-card p-6 shadow-lumina sm:p-8 lg:p-10">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <p className="text-sm uppercase text-primary">Buchungs-Wizard</p>
              <h2 className="mt-4 font-serif text-4xl font-semibold sm:text-6xl">Terminwunsch vormerken.</h2>
            </div>
            <p className="max-w-md text-sm leading-7 text-muted-foreground">
              Nach der Bestätigung erhalten Sie Ihren Gutscheincode und können die Anfrage per WhatsApp abschicken.
            </p>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-[0.32fr_0.68fr]">
            <ol className="space-y-3">
              {bookingSteps.map((step, index) => (
                <li key={step} className={`flex items-center gap-3 rounded-full px-4 py-3 text-sm ${index === bookingStep ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"}`}>
                  <span className="flex size-7 items-center justify-center rounded-full bg-card text-foreground">{index + 1}</span>
                  {step}
                </li>
              ))}
            </ol>

            <div className="min-h-[430px] rounded-3xl bg-background p-6 sm:p-8">
              {bookingStep === 0 && (
                <WizardPanel title="Welche Behandlung wünschen Sie?">
                  <div className="grid gap-3 sm:grid-cols-2">
                    {treatments.map((treatment) => (
                      <Button
                        key={treatment.title}
                        type="button"
                        variant={booking.treatment === treatment.title ? "default" : "outline"}
                        className="h-auto justify-start rounded-2xl px-5 py-4 text-left"
                        onClick={() => updateBooking("treatment", treatment.title)}
                      >
                        {treatment.title}
                      </Button>
                    ))}
                  </div>
                </WizardPanel>
              )}

              {bookingStep === 1 && (
                <WizardPanel title="Wer soll Sie behandeln?">
                  <div className="grid gap-3 sm:grid-cols-2">
                    {["Dr. L. Kaya", "M. Neumann", "Erste freie Auswahl", "Beratung vorab"].map((person) => (
                      <Button key={person} type="button" variant={booking.practitioner === person ? "default" : "outline"} className="h-14 rounded-2xl" onClick={() => updateBooking("practitioner", person)}>
                        {person}
                      </Button>
                    ))}
                  </div>
                </WizardPanel>
              )}

              {bookingStep === 2 && (
                <WizardPanel title="Wann passt es Ihnen?">
                  <div className="grid gap-5 sm:grid-cols-[1fr_1fr]">
                    <div className="rounded-2xl border border-border p-5">
                      <p className="text-sm text-muted-foreground">Wunschtermin</p>
                      <select className="mt-3 h-12 w-full rounded-2xl border border-input bg-card px-4 text-foreground" value={booking.date} onChange={(event) => updateBooking("date", event.target.value)}>
                        {['Donnerstag, 24. Oktober', 'Freitag, 25. Oktober', 'Montag, 28. Oktober'].map((date) => (
                          <option key={date}>{date}</option>
                        ))}
                      </select>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {timeSlots.map((time) => (
                        <Button key={time} type="button" variant={booking.time === time ? "default" : "outline"} className="h-14 rounded-2xl" onClick={() => updateBooking("time", time)}>
                          {time}
                        </Button>
                      ))}
                    </div>
                  </div>
                </WizardPanel>
              )}

              {bookingStep === 3 && (
                <WizardPanel title="Wie erreichen wir Sie?">
                  <div className="space-y-4">
                    <input
                      value={booking.contact}
                      onChange={(event) => updateBooking("contact", event.target.value)}
                      placeholder="Name, Telefon oder E-Mail"
                      className="h-14 w-full rounded-2xl border border-input bg-card px-5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                    <div className="flex flex-wrap gap-3">
                      {['Gast', 'Konto später erstellen'].map((mode) => (
                        <Button key={mode} type="button" variant={booking.mode === mode ? "default" : "outline"} className="rounded-full" onClick={() => updateBooking("mode", mode)}>
                          {mode}
                        </Button>
                      ))}
                    </div>
                  </div>
                </WizardPanel>
              )}

              {bookingStep === 4 && (
                <WizardPanel title="Gibt es Zusatzfragen?">
                  <textarea
                    value={booking.questions}
                    onChange={(event) => updateBooking("questions", event.target.value)}
                    placeholder="Allergien, frühere Behandlungen oder besondere Wünsche"
                    className="min-h-36 w-full rounded-2xl border border-input bg-card p-5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </WizardPanel>
              )}

              {bookingStep === 5 && (
                <WizardPanel title="Ihre Anfrage ist bereit.">
                  <div className="rounded-3xl border border-primary/35 bg-secondary p-7 text-center">
                    <span className="mx-auto flex size-20 items-center justify-center rounded-full bg-primary text-primary-foreground animate-scale-in">
                      <Check className="size-10" aria-hidden="true" />
                    </span>
                    <p className="mt-6 font-serif text-4xl">LUMINA10</p>
                    <p className="mt-3 text-muted-foreground">Gutscheincode für Ihre erste Anfrage</p>
                    <div className="mt-7 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
                      <span>{booking.treatment}</span>
                      <span>{booking.practitioner}</span>
                      <span>{booking.date}</span>
                      <span>{booking.time} Uhr</span>
                    </div>
                    <Button asChild className="mt-8 h-12 rounded-full px-7">
                      <a href={whatsappUrl} target="_blank" rel="noreferrer">
                        Anfrage senden <MessageCircle aria-hidden="true" />
                      </a>
                    </Button>
                  </div>
                </WizardPanel>
              )}

              <div className="mt-8 flex justify-between gap-3">
                <Button type="button" variant="outline" className="rounded-full border-primary" onClick={previousStep} disabled={bookingStep === 0}>
                  Zurück
                </Button>
                <Button type="button" className="rounded-full" onClick={nextStep} disabled={bookingStep === bookingSteps.length - 1}>
                  Weiter <ArrowRight aria-hidden="true" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-lumina-footer px-5 py-14 text-lumina-footer-foreground sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <img src={logoAsset.url} alt="LUMINA aesthetic clinic Logo" width={160} height={160} loading="lazy" className="h-24 w-auto" />
            <p className="mt-6 max-w-md leading-7 text-lumina-footer-muted">Natürliche Schönheit unterstreichen. Ästhetische Medizin in Bochum.</p>
          </div>
          <div className="grid gap-8 sm:grid-cols-3">
            <FooterColumn title="LUMINA" links={["Start", "Behandlungen", "Über uns", "Kontakt"]} />
            <FooterColumn title="Treatments" links={["botox®", "Hyaluron", "Skin Booster", "HydraFacial"]} />
            <FooterColumn title="Kontakt" links={["Brückstr. 44", "44787 Bochum", "015 77777 9962", "WhatsApp"]} />
          </div>
        </div>
        <div className="mx-auto mt-12 flex max-w-7xl flex-col gap-3 border-t border-lumina-footer-line pt-6 text-sm text-lumina-footer-muted sm:flex-row sm:justify-between">
          <span>© 2026 LUMINA aesthetic clinic</span>
          <span>Impressum · Datenschutz · AGB</span>
        </div>
      </footer>
    </main>
  );
}

function Header({ menuOpen, setMenuOpen }: { menuOpen: boolean; setMenuOpen: (open: boolean) => void }) {
  const nav = [
    ["Ablauf", "#ablauf"],
    ["Behandlungen", "#behandlungen"],
    ["Angebote", "#angebote"],
    ["Preise", "#preise"],
    ["Kontakt", "#kontakt"],
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-primary/25 bg-background/78 px-5 py-3 backdrop-blur-2xl sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-5">
        <a href="#start" className="flex items-center gap-3" aria-label="LUMINA Startseite">
          <img src={logoAsset.url} alt="LUMINA aesthetic clinic Logo" width={92} height={92} className="h-14 w-auto" />
        </a>

        <nav className="hidden items-center gap-7 text-sm text-muted-foreground lg:flex" aria-label="Hauptnavigation">
          <div className="group relative py-4">
            <a href="#behandlungen" className="transition-colors hover:text-primary">Behandlungen</a>
            <div className="invisible absolute left-1/2 top-full w-[680px] -translate-x-1/2 rounded-3xl border border-primary/35 bg-card p-6 opacity-0 shadow-lumina transition-all group-hover:visible group-hover:opacity-100">
              <div className="grid grid-cols-3 gap-3">
                {treatments.slice(0, 6).map((treatment) => (
                  <a key={treatment.title} href="#behandlungen" className="rounded-2xl bg-secondary p-4 transition-colors hover:bg-accent">
                    <span className="font-serif text-xl text-foreground">{treatment.title}</span>
                    <span className="mt-1 block text-xs text-muted-foreground">{treatment.subtitle}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
          {nav.filter(([label]) => label !== "Behandlungen").map(([label, href]) => (
            <a key={label} href={href} className="transition-colors hover:text-primary">{label}</a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Button asChild variant="outline" size="icon" className="rounded-full border-primary bg-background/70" aria-label="WhatsApp öffnen">
            <a href={whatsappUrl} target="_blank" rel="noreferrer"><MessageCircle aria-hidden="true" /></a>
          </Button>
          <Button asChild className="rounded-full px-6">
            <a href="#buchung">Termin</a>
          </Button>
        </div>

        <Button type="button" variant="outline" size="icon" className="rounded-full border-primary lg:hidden" onClick={() => setMenuOpen(true)} aria-label="Menü öffnen">
          <Menu aria-hidden="true" />
        </Button>
      </div>

      {menuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <Button type="button" variant="ghost" aria-label="Menü schließen" className="absolute inset-0 h-auto w-auto rounded-none bg-lumina-scrim p-0 hover:bg-lumina-scrim" onClick={() => setMenuOpen(false)} />
          <div className="absolute right-0 top-0 h-screen w-[86vw] max-w-sm bg-background p-6 shadow-lumina">
            <div className="flex items-center justify-between">
              <img src={logoAsset.url} alt="LUMINA aesthetic clinic Logo" width={90} height={90} className="h-14 w-auto" />
              <Button type="button" variant="outline" size="icon" className="rounded-full border-primary" onClick={() => setMenuOpen(false)} aria-label="Menü schließen">
                <X aria-hidden="true" />
              </Button>
            </div>
            <nav className="mt-10 grid gap-3" aria-label="Mobile Navigation">
              {nav.map(([label, href]) => (
                <a key={label} href={href} onClick={() => setMenuOpen(false)} className="rounded-2xl bg-secondary px-5 py-4 font-serif text-2xl text-foreground">
                  {label}
                </a>
              ))}
            </nav>
            <Button asChild className="mt-8 h-12 w-full rounded-full">
              <a href="#buchung" onClick={() => setMenuOpen(false)}>Termin buchen</a>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}

function WizardPanel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="animate-fade-in">
      <h3 className="font-serif text-3xl font-semibold sm:text-4xl">{title}</h3>
      <div className="mt-7">{children}</div>
    </div>
  );
}

function FooterColumn({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <h3 className="font-serif text-2xl text-lumina-footer-foreground">{title}</h3>
      <ul className="mt-5 space-y-3 text-sm text-lumina-footer-muted">
        {links.map((link) => (
          <li key={link}>{link}</li>
        ))}
      </ul>
    </div>
  );
}

function positionClass(position: string) {
  if (position === "left") return "object-left";
  if (position === "right") return "object-right";
  return "object-center";
}
