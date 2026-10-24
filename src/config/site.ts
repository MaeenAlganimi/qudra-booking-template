import { type AdminNavItem, type NavItem } from "@/types"

const links = {
  facebook: "",
  github: "",
  openGraphImage: "",
  manifestFile: "",
  authorsWebsite: "",
}
export const siteConfig = {
  links,
  nameShort: "Noor Studio",
  nameLong: "Noor Studio by Qudra Labs",
  description: "A bilingual AI booking demo",
  url: "https://noor.example",
  ogImage: "",
  author: "Qudra Labs",
  hostingRegion: "fra1",
  keywords: ["booking", "salon", "demo"],
  mainNavItems: [
    { title: "Services", href: "/#services" },
    { title: "Studio", href: "/#studio" },
    { title: "Team", href: "/#team" },
    { title: "Visit", href: "/#visit" },
  ] satisfies NavItem[],
  mobileNav: [
    { title: "Studio", href: "/" },
    { title: "Bookings", href: "/#booking" },
    { title: "Availability", href: "/#booking" },
    { title: "Profile", href: "/" },
  ] satisfies AdminNavItem[],
}
