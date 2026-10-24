"use client"

import { useEffect, useRef, useState, type FormEvent } from "react"
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Check,
  Clock3,
  Globe2,
  Leaf,
  MapPin,
  Menu,
  Minus,
  Plus,
  Scissors,
  Send,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react"

import {
  availableSlots,
  dateKey,
  readBookings,
  saveBooking,
  services,
  staff,
  storageKey,
  type Booking,
  type Language,
  type Slot,
} from "@/lib/studio"

const copy = {
  en: {
    nav: ["Our services", "The studio", "Our people", "Visit us"],
    book: "Book a visit",
    tagline: "A LITTLE CARE. A LITTLE CONFIDENCE.",
    title: "Your time.",
    title2: "Your kind of glow.",
    intro:
      "A thoughtful space for hair, skin, and feeling like yourself. Expert care, unhurried moments, and a little everyday magic.",
    explore: "Explore our services",
    ai: "Not sure where to start?",
    aiLink: "Ask our AI booking assistant",
    scroll: "GOOD THINGS START WITH A LITTLE YOU-TIME",
    eyebrow: "MADE FOR YOUR MOMENT",
    services: "Care that feels like you.",
    serviceIntro:
      "A refresh, a reset, or something entirely new. Find your ritual.",
    all: "All services",
    hair: "Hair",
    skin: "Skin",
    wellness: "Wellness",
    from: "FROM",
    min: "min",
    serviceBook: "Choose this service",
    aboutLabel: "THE NOOR PHILOSOPHY",
    aboutTitle: "Come as you are.\nLeave a little lighter.",
    about:
      "We believe feeling good should feel simple. A warm welcome, a listening ear, and care that’s tailored to you. Noor is our fictional neighbourhood studio, designed around one thing: making space for yourself.",
    values: [
      "Thoughtful, personal care",
      "A calm, welcoming space",
      "Easy booking, your way",
    ],
    peopleLabel: "GOOD HANDS. GOOD ENERGY.",
    peopleTitle: "Meet your people.",
    peopleText:
      "A small team with a thoughtful touch. Meet our sample studio specialists.",
    visitLabel: "MAKE A LITTLE SPACE",
    visitTitle: "We’ll save you a seat.",
    visitText:
      "Choose your service and a time that suits you. Your next little reset starts here.",
    location: "12 Olive Lane, Garden District",
    fictional: "Fictional demo address",
    hours: "Studio hours",
    weekdays: "Monday – Saturday",
    closed: "Sunday · Closed",
    hoursTime: "10:00 am – 6:00 pm",
    formTitle: "Your next moment of care",
    formIntro: "A few details, and you’re on the calendar.",
    service: "Service",
    specialist: "Specialist",
    date: "Preferred date",
    time: "Available times",
    name: "Your name",
    email: "Email address",
    namePlaceholder: "How should we call you?",
    emailPlaceholder: "you@example.com",
    confirm: "Confirm demo booking",
    privacy:
      "Demo bookings are saved only in this browser. No payment or real appointment. Please do not enter sensitive information.",
    noSlots: "No times available. Try another date.",
    success: "Your demo moment is booked.",
    successText:
      "Saved in this browser. No real appointment or email has been sent.",
    another: "Book another visit",
    error:
      "Could not save. The slot may have been taken, or browser storage is unavailable. Please try again.",
    faq: "A few things you might wonder",
    faqItems: [
      [
        "How long is an appointment?",
        "Each of our sample services lasts 60 minutes, so there’s time to settle in and enjoy your visit.",
      ],
      [
        "Can I change my appointment?",
        "Our sample policy asks for at least 24 hours’ notice. You can cancel a local demo booking below and book a new time.",
      ],
      [
        "Is this a real business?",
        "Noor Studio is a fictional business created by Qudra Labs to demonstrate bilingual AI booking. No real bookings or payments are made.",
      ],
    ],
    footer: "Thoughtful care. Beautifully simple.",
    demo: "DEMO TEMPLATE BY",
    rights: "Qudra Labs · Fictional business demo",
    privacyLink: "Privacy & demo information",
    chatTitle: "Your Noor assistant",
    chatSub: "A little help finding your moment",
    demoMode: "Demo mode",
    powered: "AI-assisted · Please check details before booking",
    welcome:
      "Hello, welcome to Noor. Ask me about services, opening hours, or your next visit. I can help you find a time.",
    placeholder: "Ask a question or find a time…",
    suggestions: [
      "What services do you offer?",
      "When are you open?",
      "Find me a time",
    ],
    thinking: "Finding a little time for you…",
    chatError:
      "The assistant is unavailable. Please use the booking form below.",
    select: "Choose",
    chosen:
      "I’ve added this time to the booking form. Enter your name and email, then confirm to save your demo booking.",
    storage:
      "Browser storage is unavailable. Bookings cannot be saved until storage is enabled.",
    saved: "Your local demo bookings",
    cancel: "Cancel",
    canceled: "Demo booking cancelled.",
    clear: "Clear saved demo data",
    privacyTitle: "Your privacy in this demo",
    privacyText:
      "Bookings stay in localStorage on this device until you cancel them or clear the data. Chat messages are held in memory and sent to our API; when configured, Gemini processes the chat and available slots. Your name and email are not included in the assistant request. Never enter sensitive personal or medical information.",
    close: "Close",
    language: "Switch to Arabic",
    starting: "Sample prices in USD",
    template: "An AI-powered booking experience for small businesses.",
  },
  ar: {
    nav: ["خدماتنا", "الاستوديو", "فريقنا", "زورينا"],
    book: "احجزي موعداً",
    tagline: "قليل من العناية. مزيد من الثقة.",
    title: "وقتك لكِ.",
    title2: "وإشراقتك بطريقتك.",
    intro:
      "مساحة للعناية بالشعر والبشرة والشعور بالراحة. خبرة واهتمام ولحظات هادئة تمنح يومك لمسة مميزة.",
    explore: "اكتشفي خدماتنا",
    ai: "لا تعرفين من أين تبدئين؟",
    aiLink: "اسألي مساعد الحجز الذكي",
    scroll: "الأشياء الجميلة تبدأ بلحظة لنفسك",
    eyebrow: "لحظات صُممت لأجلك",
    services: "عناية تشبهك.",
    serviceIntro: "تجديد بسيط أو بداية مختلفة. اختاري طقوس العناية الخاصة بك.",
    all: "كل الخدمات",
    hair: "الشعر",
    skin: "البشرة",
    wellness: "العناية",
    from: "من",
    min: "دقيقة",
    serviceBook: "اختاري هذه الخدمة",
    aboutLabel: "فلسفة نور",
    aboutTitle: "كوني على طبيعتك.\nوغادري بروح أخف.",
    about:
      "نؤمن أن الراحة تبدأ بالبساطة. استقبال دافئ وإصغاء صادق وعناية تناسبك. نور هو استوديو حيّ خيالي صُمم حول فكرة واحدة: أن تمنحي نفسك بعض الوقت.",
    values: ["عناية شخصية مدروسة", "مساحة هادئة ومرحبة", "حجز سهل بطريقتك"],
    peopleLabel: "خبرة واهتمام",
    peopleTitle: "تعرّفي على فريقك.",
    peopleText:
      "فريق صغير بلمسة عناية مميزة. تعرّفي على مختصات الاستوديو التجريبي.",
    visitLabel: "امنحي نفسك مساحة",
    visitTitle: "مكانك بانتظارك.",
    visitText:
      "اختاري الخدمة والوقت المناسبين لك. لحظة راحتك القادمة تبدأ هنا.",
    location: "12 ممر الزيتون، حي الحدائق",
    fictional: "عنوان خيالي للعرض التجريبي",
    hours: "ساعات العمل",
    weekdays: "الاثنين – السبت",
    closed: "الأحد · مغلق",
    hoursTime: "10 صباحاً – 6 مساءً",
    formTitle: "موعدك القادم للعناية",
    formIntro: "بضع تفاصيل لتكوني على جدولنا.",
    service: "الخدمة",
    specialist: "المختصة",
    date: "التاريخ المفضل",
    time: "الأوقات المتاحة",
    name: "اسمك",
    email: "البريد الإلكتروني",
    namePlaceholder: "بأي اسم نناديك؟",
    emailPlaceholder: "you@example.com",
    confirm: "تأكيد الحجز التجريبي",
    privacy:
      "تُحفظ الحجوزات في هذا المتصفح فقط. لا دفع ولا مواعيد حقيقية. يرجى عدم إدخال بيانات حساسة.",
    noSlots: "لا تتوفر أوقات. جرّبي تاريخاً آخر.",
    success: "تم حجز لحظة العناية التجريبية.",
    successText:
      "حُفظت في هذا المتصفح. لم يتم حجز موعد حقيقي أو إرسال بريد إلكتروني.",
    another: "حجز موعد آخر",
    error:
      "تعذّر الحفظ. ربما حُجز الوقت أو تخزين المتصفح غير متاح. حاولي مجدداً.",
    faq: "أسئلة قد تخطر ببالك",
    faqItems: [
      [
        "كم يستغرق الموعد؟",
        "تستغرق كل خدمة تجريبية 60 دقيقة لتستمتعي بوقتك براحة.",
      ],
      [
        "هل يمكنني تغيير موعدي؟",
        "تطلب سياستنا التجريبية إشعاراً قبل 24 ساعة. يمكنك إلغاء الحجز المحلي أدناه ثم حجز موعد جديد.",
      ],
      [
        "هل هذا نشاط تجاري حقيقي؟",
        "نور ستوديو مشروع خيالي من قدرة لابز لعرض الحجز الذكي باللغتين. لا توجد حجوزات أو مدفوعات حقيقية.",
      ],
    ],
    footer: "عناية مدروسة. ببساطة جميلة.",
    demo: "قالب تجريبي من",
    rights: "قدرة لابز · مشروع خيالي تجريبي",
    privacyLink: "الخصوصية ومعلومات العرض",
    chatTitle: "مساعد نور",
    chatSub: "نساعدك في إيجاد لحظة لنفسك",
    demoMode: "وضع تجريبي",
    powered: "مساعد ذكي · راجعي التفاصيل قبل الحجز",
    welcome:
      "أهلاً بك في نور. اسأليني عن الخدمات أو ساعات العمل أو موعدك القادم. سأساعدك في إيجاد وقت مناسب.",
    placeholder: "اسألي سؤالاً أو ابحثي عن موعد…",
    suggestions: ["ما الخدمات المتاحة؟", "ما ساعات العمل؟", "أريد موعداً"],
    thinking: "نبحث عن وقت لك…",
    chatError: "المساعد غير متاح حالياً. استخدمي نموذج الحجز أدناه.",
    select: "اختيار",
    chosen:
      "أضفت هذا الوقت إلى نموذج الحجز. أدخلي اسمك وبريدك ثم أكدي لحفظ حجزك التجريبي.",
    storage: "تخزين المتصفح غير متاح. لا يمكن حفظ الحجوزات حتى يتم تفعيله.",
    saved: "حجوزاتك التجريبية المحلية",
    cancel: "إلغاء",
    canceled: "تم إلغاء الحجز التجريبي.",
    clear: "مسح البيانات التجريبية",
    privacyTitle: "خصوصيتك في هذا العرض",
    privacyText:
      "تُحفظ الحجوزات محلياً على هذا الجهاز حتى تلغيها أو تمسحي البيانات. تبقى المحادثات في الذاكرة وتُرسل إلى واجهتنا البرمجية، ويعالجها Gemini عند تفعيله مع الأوقات المتاحة. لا يُرسل اسمك أو بريدك في طلب المساعد. لا تُدخلي بيانات شخصية أو طبية حساسة.",
    close: "إغلاق",
    language: "Switch to English",
    starting: "أسعار تجريبية بالدولار الأمريكي",
    template: "تجربة حجز ذكية للمشروعات الصغيرة.",
  },
}
type Message = { role: "user" | "assistant"; text: string; slots?: Slot[] }
const photo = (id: string) => `/noor/${id}.jpg`
export function Studio({
  initialPrivacy = false,
  demoMode = true,
}: {
  initialPrivacy?: boolean
  demoMode?: boolean
}) {
  const [lang, setLang] = useState<Language>("en")
  const t = copy[lang]
  const ar = lang === "ar"
  const [category, setCategory] = useState("All")
  const [service, setService] = useState("cut")
  const [specialist, setSpecialist] = useState("maya")
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [bookings, setBookings] = useState<Booking[]>([])
  const [confirmed, setConfirmed] = useState<Booking | null>(null)
  const [notice, setNotice] = useState("")
  const [storageError, setStorageError] = useState(false)
  const [chat, setChat] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [busy, setBusy] = useState(false)
  const [demo, setDemo] = useState(demoMode)
  const [mobile, setMobile] = useState(false)
  const [faq, setFaq] = useState<number | null>(null)
  const [privacy, setPrivacy] = useState(initialPrivacy)
  const chatEnd = useRef<HTMLDivElement>(null)
  useEffect(() => {
    try {
      const saved = localStorage.getItem("noor-language")
      if (saved === "en" || saved === "ar") setLang(saved)
      setBookings(readBookings())
    } catch {
      setStorageError(true)
    }
    const next = new Date()
    if (next.getHours() >= 17) next.setDate(next.getDate() + 1)
    if (next.getDay() === 0) next.setDate(next.getDate() + 1)
    setDate(dateKey(next))
    const sync = () => {
      try {
        setBookings(readBookings())
      } catch {
        setStorageError(true)
      }
    }
    window.addEventListener("storage", sync)
    return () => window.removeEventListener("storage", sync)
  }, [])
  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = ar ? "rtl" : "ltr"
    try {
      localStorage.setItem("noor-language", lang)
    } catch {
      /* Language switching still works without storage. */
    }
  }, [lang, ar])
  useEffect(() => {
    chatEnd.current?.scrollIntoView({ behavior: "smooth", block: "nearest" })
  }, [messages, busy, chat])
  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setChat(false)
        setPrivacy(false)
        setMobile(false)
      }
    }
    window.addEventListener("keydown", close)
    return () => window.removeEventListener("keydown", close)
  }, [])
  const slots = availableSlots(service, specialist, date, bookings)
  function chooseService(id: string) {
    setService(id)
    setSpecialist(staff.find((s) => s.services.includes(id))!.id)
    setTime("")
    setConfirmed(null)
  }
  function selectSlot(slot: Slot) {
    chooseService(slot.service)
    setSpecialist(slot.staff)
    setDate(slot.date)
    setTime(slot.time)
    setChat(false)
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })
    setMessages((prev) => [...prev, { role: "assistant", text: t.chosen }])
  }
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    try {
      const saved = saveBooking({
        service,
        staff: specialist,
        date,
        time,
        name: String(form.get("name")).trim(),
        email: String(form.get("email")).trim(),
      })
      setBookings(readBookings())
      setConfirmed(saved)
      setNotice("")
      setTime("")
    } catch {
      setNotice(t.error)
    }
  }
  async function ask(question: string) {
    if (busy || !question.trim()) return
    const next = [...messages, { role: "user" as const, text: question.trim() }]
    setMessages(next)
    setInput("")
    setBusy(true)
    const context = next
      .filter((m) => m.role === "user")
      .map((m) => m.text)
      .join(" ")
      .toLowerCase()
    let wanted = service
    if (/facial|skin|بشرة|نضارة/.test(context)) wanted = "facial"
    else if (/scalp|ritual|فروة|عناية الشعر/.test(context)) wanted = "ritual"
    else if (/cut|style|قص|تصفيف/.test(context)) wanted = "cut"
    const wantedStaff = staff.find((s) => s.services.includes(wanted))!.id
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    const requestedDate = /tomorrow|غداً|غدا/.test(question)
      ? dateKey(tomorrow)
      : question.match(/\d{4}-\d{2}-\d{2}/)?.[0] || date || dateKey(new Date())
    const offered: Slot[] = []
    for (let i = 0; i < 7 && offered.length < 24; i++) {
      const day = new Date(requestedDate + "T12:00:00")
      day.setDate(day.getDate() + i)
      offered.push(
        ...availableSlots(wanted, wantedStaff, dateKey(day), bookings)
      )
    }
    try {
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          language: lang,
          messages: next.slice(-16).map(({ role, text }) => ({ role, text })),
          slots: offered.slice(0, 24),
        }),
      })
      if (!res.ok) throw new Error()
      const data = await res.json()
      if (typeof data.message !== "string" || !Array.isArray(data.slots))
        throw new Error()
      setDemo(data.demo)
      setMessages([
        ...next,
        { role: "assistant", text: data.message, slots: data.slots },
      ])
    } catch {
      setMessages([...next, { role: "assistant", text: t.chatError }])
    } finally {
      setBusy(false)
    }
  }
  const serviceName = (id: string) => {
    const s = services.find((s) => s.id === id)
    return ar ? s?.ar : s?.en
  }
  return (
    <div className="noor-site">
      <div className="demo-strip">
        <span>
          {t.demo} <strong>QUDRA LABS</strong>
        </span>
        <span className="strip-detail">
          {t.template}
          <ArrowUpRight size={12} />
        </span>
      </div>
      <header className="studio-header">
        <a href="#" className="wordmark" aria-label="Noor Studio">
          noor<span>STUDIO</span>
          <i />
        </a>
        <nav className={mobile ? "main-nav is-open" : "main-nav"}>
          {["services", "studio", "team", "visit"].map((id, i) => (
            <a key={id} href={`#${id}`} onClick={() => setMobile(false)}>
              {t.nav[i]}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <button
            className="language"
            onClick={() => {
              setLang(ar ? "en" : "ar")
              setMessages([])
            }}
            aria-label={t.language}
          >
            <Globe2 size={15} />
            {ar ? "EN" : "العربية"}
          </button>
          <a className="button header-book dark" href="#booking">
            {t.book}
            <ArrowUpRight size={16} />
          </a>
          <button
            className="mobile-menu icon-button"
            onClick={() => setMobile(!mobile)}
            aria-label={ar ? "القائمة" : "Menu"}
          >
            {mobile ? <X /> : <Menu />}
          </button>
        </div>
      </header>
      <main>
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="tiny-line" />
              {t.tagline}
            </p>
            <h1>
              {t.title}
              <br />
              <em>{t.title2}</em>
            </h1>
            <p className="hero-intro">{t.intro}</p>
            <div className="hero-buttons">
              <a className="button dark" href="#booking">
                {t.book}
                <ArrowUpRight size={18} />
              </a>
              <a className="text-link" href="#services">
                {t.explore}
                <ArrowRight size={16} />
              </a>
            </div>
            <div className="hero-assistant">
              <div className="sparkle-square">
                <Sparkles size={20} />
              </div>
              <div>
                <span>{t.ai}</span>
                <button onClick={() => setChat(true)}>
                  {t.aiLink}
                  <ArrowUpRight size={13} />
                </button>
              </div>
            </div>
          </div>
          <div className="hero-visual">
            <img
              className="hero-photo"
              src={photo("photo-1600210492486-724fe5c67fb0")}
              alt={
                ar
                  ? "مساحة دافئة بألوان طبيعية في الاستوديو"
                  : "A warm, sunlit studio with natural textures"
              }
            />
            <span className="image-caption">
              {ar
                ? "نور ستوديو — مساحة للراحة"
                : "NOOR STUDIO — A SPACE TO EXHALE"}
            </span>
            <div className="hero-note">
              <Leaf size={23} strokeWidth={1.3} />
              <span>
                {ar
                  ? "قليل من الوقت لنفسك،\nيصنع فرقاً جميلاً."
                  : "A little time for you\ngoes a long way."}
              </span>
              <span className="note-dot" />
            </div>
            <div className="visual-tag">
              <span />
              {ar ? "العناية تبدأ هنا" : "Your reset starts here"}
            </div>
          </div>
        </section>
        <div className="slow-strip">
          <span>{t.scroll}</span>
          <span className="strip-star">
            <Sparkles size={17} />
          </span>
          <span>
            {ar ? "الشعر / البشرة / العناية بالنفس" : "HAIR / SKIN / SELF-CARE"}
          </span>
          <span className="strip-star">
            <Sparkles size={17} />
          </span>
          <span>{ar ? "صُمم حولك" : "THOUGHTFULLY, FOR YOU"}</span>
        </div>
        <section className="section services-section" id="services">
          <div className="section-heading">
            <div>
              <p className="eyebrow">{t.eyebrow}</p>
              <h2>{t.services}</h2>
              <p className="section-intro">{t.serviceIntro}</p>
            </div>
            <div className="category-tabs" aria-label={t.service}>
              {["All", "Hair", "Skin", "Wellness"].map((c, i) => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={category === c ? "active" : ""}
                >
                  {[t.all, t.hair, t.skin, t.wellness][i]}
                </button>
              ))}
            </div>
          </div>
          <div className="service-grid">
            {services
              .filter((s) => category === "All" || s.category === category)
              .map((s) => (
                <article className="service-card" key={s.id}>
                  <div className="service-image">
                    <img
                      src={photo(s.image)}
                      alt={ar ? s.ar : s.en}
                      loading="lazy"
                    />
                    <span>
                      {[t.hair, t.skin, t.wellness][services.indexOf(s)]}
                    </span>
                    <a
                      href="#booking"
                      aria-label={`${t.serviceBook}: ${ar ? s.ar : s.en}`}
                      onClick={() => chooseService(s.id)}
                    >
                      <ArrowUpRight size={22} />
                    </a>
                  </div>
                  <div className="service-info">
                    <div>
                      <h3>{ar ? s.ar : s.en}</h3>
                      <span className="duration">
                        <Clock3 size={12} />
                        {s.duration} {t.min}
                      </span>
                    </div>
                    <p>{ar ? s.descriptionAr : s.description}</p>
                    <div className="service-price">
                      <span>
                        {t.from} <strong>${s.price}</strong>
                      </span>
                      <button
                        onClick={() => {
                          chooseService(s.id)
                          document
                            .getElementById("booking")
                            ?.scrollIntoView({ behavior: "smooth" })
                        }}
                      >
                        {t.book}
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
          </div>
          <p className="sample-prices">{t.starting}</p>
        </section>
        <section className="about-section" id="studio">
          <div className="about-image">
            <img
              src={photo("photo-1600948836101-f9ffda59d250")}
              alt={
                ar
                  ? "مقاعد أنيقة في مساحة العناية"
                  : "Thoughtfully arranged salon chairs and mirrors"
              }
              loading="lazy"
            />
            <span className="about-image-label">
              {ar ? "تمهّلي. واشعري بالراحة." : "SLOW DOWN. SETTLE IN."}
            </span>
          </div>
          <div className="about-copy">
            <p className="eyebrow">{t.aboutLabel}</p>
            <h2>{t.aboutTitle}</h2>
            <p>{t.about}</p>
            <div className="values">
              {t.values.map((v, i) => (
                <div key={v}>
                  {i === 0 ? (
                    <Scissors size={18} />
                  ) : i === 1 ? (
                    <Leaf size={18} />
                  ) : (
                    <CalendarDays size={18} />
                  )}
                  <span>{v}</span>
                </div>
              ))}
            </div>
            <a href="#team" className="text-link">
              {t.peopleTitle}
              <ArrowUpRight size={16} />
            </a>
          </div>
        </section>
        <section className="section team-section" id="team">
          <div>
            <p className="eyebrow">{t.peopleLabel}</p>
            <h2>{t.peopleTitle}</h2>
            <p className="section-intro">{t.peopleText}</p>
          </div>
          <div className="team-grid">
            {staff.map((s, i) => (
              <article key={s.id} className="person">
                <div className={`person-monogram person-${i}`}>
                  <span>{i === 0 ? "M" : "L"}</span>
                  <Leaf size={60} strokeWidth={0.7} />
                </div>
                <div>
                  <h3>{ar ? s.ar : s.name}</h3>
                  <p>{ar ? s.roleAr : s.role}</p>
                  <span className="sample-label">
                    {ar ? "شخصية تجريبية" : "Demo specialist"}
                  </span>
                </div>
                <button
                  className="icon-button"
                  aria-label={`${t.book} ${ar ? s.ar : s.name}`}
                  onClick={() => {
                    chooseService(s.services[0]!)
                    document
                      .getElementById("booking")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }}
                >
                  <ArrowUpRight />
                </button>
              </article>
            ))}
          </div>
        </section>
        <section className="booking-section" id="visit">
          <div className="visit-copy">
            <p className="eyebrow">{t.visitLabel}</p>
            <h2>{t.visitTitle}</h2>
            <p>{t.visitText}</p>
            <div className="visit-detail">
              <MapPin size={20} />
              <div>
                <strong>{t.location}</strong>
                <span>{t.fictional}</span>
              </div>
            </div>
            <div className="visit-detail">
              <Clock3 size={20} />
              <div>
                <strong>{t.hours}</strong>
                <span>
                  {t.weekdays}
                  <br />
                  {t.hoursTime}
                  <br />
                  {t.closed}
                </span>
              </div>
            </div>
            <div className="assistant-invite">
              <Sparkles size={21} />
              <div>
                <strong>{t.ai}</strong>
                <button onClick={() => setChat(true)}>
                  {t.aiLink}
                  <ArrowUpRight size={13} />
                </button>
              </div>
            </div>
          </div>
          <div className="booking-card" id="booking">
            {confirmed ? (
              <div className="booking-success" role="status">
                <div className="success-icon">
                  <Check size={28} />
                </div>
                <h3>{t.success}</h3>
                <p>{t.successText}</p>
                <div className="confirmation-details">
                  <strong>{serviceName(confirmed.service)}</strong>
                  <span>
                    {confirmed.date} · {confirmed.time}
                  </span>
                  <span>
                    {ar
                      ? staff.find((s) => s.id === confirmed.staff)?.ar
                      : staff.find((s) => s.id === confirmed.staff)?.name}
                  </span>
                </div>
                <button
                  className="button dark"
                  onClick={() => setConfirmed(null)}
                >
                  {t.another}
                  <Plus size={16} />
                </button>
              </div>
            ) : (
              <>
                <div className="form-heading">
                  <div>
                    <h3>{t.formTitle}</h3>
                    <p>{t.formIntro}</p>
                  </div>
                  <CalendarDays size={23} />
                </div>
                <form onSubmit={submit}>
                  <div className="form-row">
                    <label>
                      {t.service}
                      <select
                        value={service}
                        onChange={(e) => chooseService(e.target.value)}
                      >
                        {services.map((s) => (
                          <option key={s.id} value={s.id}>
                            {ar ? s.ar : s.en} · ${s.price}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label>
                      {t.specialist}
                      <select
                        value={specialist}
                        onChange={(e) => {
                          setSpecialist(e.target.value)
                          setTime("")
                        }}
                      >
                        {staff
                          .filter((s) => s.services.includes(service))
                          .map((s) => (
                            <option key={s.id} value={s.id}>
                              {ar ? s.ar : s.name}
                            </option>
                          ))}
                      </select>
                    </label>
                  </div>
                  <label>
                    {t.date}
                    <input
                      type="date"
                      aria-label={t.date}
                      value={date}
                      min={dateKey(new Date())}
                      max={dateKey(new Date(Date.now() + 365 * 86400000))}
                      required
                      onChange={(e) => {
                        setDate(e.target.value)
                        setTime("")
                      }}
                    />
                  </label>
                  <fieldset>
                    <legend>{t.time}</legend>
                    <div className="time-slots">
                      {slots.map((s) => (
                        <button
                          type="button"
                          key={s.time}
                          aria-pressed={time === s.time}
                          className={time === s.time ? "selected" : ""}
                          onClick={() => setTime(s.time)}
                        >
                          {s.time}
                        </button>
                      ))}
                    </div>
                    {!slots.length && <p className="no-slots">{t.noSlots}</p>}
                  </fieldset>
                  <div className="form-row">
                    <label>
                      {t.name}
                      <input
                        name="name"
                        required
                        maxLength={100}
                        pattern=".*\S.*"
                        placeholder={t.namePlaceholder}
                        autoComplete="name"
                      />
                    </label>
                    <label>
                      {t.email}
                      <input
                        name="email"
                        type="email"
                        required
                        maxLength={200}
                        placeholder={t.emailPlaceholder}
                        autoComplete="email"
                        dir="ltr"
                      />
                    </label>
                  </div>
                  <button
                    className="button confirm-button dark"
                    disabled={!time || storageError}
                    type="submit"
                  >
                    {t.confirm}
                    <ArrowUpRight size={17} />
                  </button>
                  <p className="form-privacy">
                    <ShieldCheck size={14} />
                    {t.privacy}
                  </p>
                  {notice && (
                    <p role="alert" className="form-error">
                      {notice}
                    </p>
                  )}
                  {storageError && (
                    <p role="alert" className="form-error">
                      {t.storage}
                    </p>
                  )}
                </form>
              </>
            )}
            {bookings.length > 0 && (
              <div className="saved-bookings">
                <h4>{t.saved}</h4>
                {bookings.map((b) => (
                  <div key={b.id}>
                    <span>
                      {serviceName(b.service)}
                      <small>
                        {b.date} · {b.time}
                      </small>
                    </span>
                    <button
                      onClick={() => {
                        try {
                          const updated = readBookings().filter(
                            (x) => x.id !== b.id
                          )
                          localStorage.setItem(
                            storageKey,
                            JSON.stringify(updated)
                          )
                          setBookings(updated)
                          setNotice(t.canceled)
                          if (confirmed?.id === b.id) setConfirmed(null)
                        } catch {
                          setStorageError(true)
                        }
                      }}
                    >
                      {t.cancel}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
        <section className="section faq-section">
          <div>
            <p className="eyebrow">{ar ? "لراحة بالك" : "A LITTLE CLARITY"}</p>
            <h2>{t.faq}</h2>
          </div>
          <div className="faq-list">
            {t.faqItems.map(([q, a], i) => (
              <div className="faq-item" key={q}>
                <button
                  aria-expanded={faq === i}
                  onClick={() => setFaq(faq === i ? null : i)}
                >
                  {q}
                  {faq === i ? <Minus size={17} /> : <Plus size={17} />}
                </button>
                {faq === i && <p>{a}</p>}
              </div>
            ))}
          </div>
        </section>
      </main>
      <footer className="studio-footer">
        <div className="footer-top">
          <div>
            <a href="#" className="wordmark">
              noor<span>STUDIO</span>
              <i />
            </a>
            <p>{t.footer}</p>
          </div>
          <div className="footer-brand">
            <span>{t.demo}</span>
            <strong>
              QUDRA LABS
              <ArrowUpRight size={19} />
            </strong>
            <p>{t.template}</p>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} {t.rights}
          </span>
          <button onClick={() => setPrivacy(true)}>{t.privacyLink}</button>
          <a href="#services">
            {t.explore}
            <ArrowUpRight size={13} />
          </a>
        </div>
      </footer>
      <button
        className="chat-launcher"
        onClick={() => setChat(!chat)}
        aria-label={chat ? t.close : t.aiLink}
        aria-expanded={chat}
      >
        {chat ? (
          <X size={22} />
        ) : (
          <>
            <Sparkles size={19} />
            <span>{ar ? "اسألي نور" : "Ask Noor"}</span>
            <span className="online-dot" />
          </>
        )}
      </button>
      {chat && (
        <aside className="chat-panel" role="dialog" aria-label={t.chatTitle}>
          <div className="chat-header">
            <div className="assistant-avatar">
              <Sparkles size={23} />
            </div>
            <div>
              <h3>{t.chatTitle}</h3>
              <p>{t.chatSub}</p>
            </div>
            <button
              className="icon-button"
              onClick={() => setChat(false)}
              aria-label={t.close}
            >
              <X size={19} />
            </button>
          </div>
          <div className="chat-mode">
            {demo && <span>{t.demoMode}</span>}
            <small>{t.powered}</small>
          </div>
          <div className="chat-messages" aria-live="polite">
            <div className="message assistant">{t.welcome}</div>
            {messages.map((m, i) => (
              <div className={`message ${m.role}`} key={i}>
                {m.text}
                {m.slots && m.slots.length > 0 && (
                  <div className="chat-slots">
                    {m.slots.map((s) => (
                      <button
                        key={`${s.date}-${s.time}`}
                        onClick={() => selectSlot(s)}
                      >
                        <span>
                          {serviceName(s.service)}
                          <small>
                            {s.date} · {s.time}
                          </small>
                        </span>
                        <ArrowUpRight size={16} />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {busy && <div className="message assistant">{t.thinking}</div>}
            <div ref={chatEnd} />
          </div>
          {messages.length === 0 && (
            <div className="chat-suggestions">
              {t.suggestions.map((s) => (
                <button key={s} onClick={() => ask(s)}>
                  {s}
                  <ArrowUpRight size={12} />
                </button>
              ))}
            </div>
          )}
          <form
            className="chat-input"
            onSubmit={(e) => {
              e.preventDefault()
              void ask(input)
            }}
          >
            <input
              aria-label={t.placeholder}
              placeholder={t.placeholder}
              maxLength={1500}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={busy}
            />
            <button
              disabled={busy || !input.trim()}
              aria-label={ar ? "إرسال" : "Send"}
            >
              <Send size={17} />
            </button>
          </form>
        </aside>
      )}
      {privacy && (
        <div className="modal-overlay" onClick={() => setPrivacy(false)}>
          <section
            className="privacy-modal"
            role="dialog"
            aria-modal="true"
            aria-label={t.privacyTitle}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              autoFocus
              className="icon-button"
              onClick={() => setPrivacy(false)}
              aria-label={t.close}
            >
              <X />
            </button>
            <ShieldCheck size={28} />
            <h2>{t.privacyTitle}</h2>
            <p>{t.privacyText}</p>
            <button
              className="button dark"
              onClick={() => {
                try {
                  localStorage.removeItem(storageKey)
                  setBookings([])
                  setConfirmed(null)
                  setPrivacy(false)
                } catch {
                  setStorageError(true)
                }
              }}
            >
              {t.clear}
            </button>
          </section>
        </div>
      )}
    </div>
  )
}
