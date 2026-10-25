export type Language = "en" | "ar"
export const services = [
  {
    id: "cut",
    en: "Signature cut & style",
    ar: "قص وتصفيف مميز",
    description: "A fresh shape, a beautiful finish. Entirely you.",
    descriptionAr: "قصة جديدة ولمسة أنيقة تعبّر عنك.",
    duration: 60,
    price: 45,
    category: "Hair",
    image: "photo-1562322140-8baeececf3df",
  },
  {
    id: "facial",
    en: "The glow facial",
    ar: "جلسة نضارة البشرة",
    description: "Slow down. Let your natural radiance shine.",
    descriptionAr: "استرخي ودعي إشراقتك الطبيعية تتألق.",
    duration: 60,
    price: 65,
    category: "Skin",
    image: "photo-1570172619644-dfd03ed5d881",
  },
  {
    id: "ritual",
    en: "Scalp & hair ritual",
    ar: "عناية بالشعر وفروة الرأس",
    description: "A nourishing reset, from roots to ends.",
    descriptionAr: "عناية مغذية من الجذور حتى الأطراف.",
    duration: 60,
    price: 55,
    category: "Wellness",
    image: "photo-1527799820374-dcf8d9d4a388",
  },
]
export const staff = [
  {
    id: "maya",
    name: "Maya",
    ar: "مايا",
    role: "Hair stylist",
    roleAr: "خبيرة تصفيف الشعر",
    services: ["cut", "ritual"],
  },
  {
    id: "lina",
    name: "Lina",
    ar: "لينا",
    role: "Skin specialist",
    roleAr: "أخصائية العناية بالبشرة",
    services: ["facial"],
  },
]
export const business = {
  name: "Noor Studio",
  brand: "Maeen Alganimi",
  address: "12 Olive Lane, Garden District (fictional)",
  hours: "Monday–Saturday, 10:00–18:00. Closed Sunday.",
  cancellation:
    "Cancel or reschedule at least 24 hours before your appointment.",
  payment:
    "Sample prices in USD. No online payment. This is a fictional demo; no real appointment is made.",
  services,
  staff,
}
export type Booking = {
  id: string
  service: string
  staff: string
  date: string
  time: string
  name: string
  email: string
}
export type Slot = {
  date: string
  time: string
  staff: string
  service: string
}
export const storageKey = "noor-bookings-v1"
export function dateKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`
}
export function availableSlots(
  service: string,
  staffId: string,
  date: string,
  bookings: Booking[]
): Slot[] {
  const day = new Date(date + "T12:00:00")
  if (
    !/^\d{4}-\d{2}-\d{2}$/.test(date) ||
    isNaN(day.getTime()) ||
    dateKey(day) !== date ||
    day.getDay() === 0 ||
    date < dateKey(new Date()) ||
    !services.some((s) => s.id === service) ||
    !staff.some((s) => s.id === staffId && s.services.includes(service))
  )
    return []
  return Array.from({ length: 8 }, (_, i) => `${i + 10}:00`)
    .filter(
      (time) =>
        new Date(`${date}T${time}:00`) > new Date() &&
        !bookings.some(
          (b) => b.date === date && b.time === time && b.staff === staffId
        )
    )
    .map((time) => ({ date, time, staff: staffId, service }))
}
export function readBookings(): Booking[] {
  const value: unknown = JSON.parse(localStorage.getItem(storageKey) || "[]")
  if (
    !Array.isArray(value) ||
    !value.every(
      (b) =>
        b &&
        ["id", "service", "staff", "date", "time", "name", "email"].every(
          (k) => typeof b[k] === "string"
        )
    )
  )
    throw new Error("Invalid booking storage")
  return value
}
export function saveBooking(input: Omit<Booking, "id">) {
  const bookings = readBookings()
  if (
    !availableSlots(input.service, input.staff, input.date, bookings).some(
      (s) => s.time === input.time
    )
  )
    throw new Error("Slot unavailable")
  const booking = { ...input, id: crypto.randomUUID() }
  localStorage.setItem(storageKey, JSON.stringify([...bookings, booking]))
  return booking
}
