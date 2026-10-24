import { type AdminNavItem } from "@/types"

export interface AdminConfigProps {
  sidebarNav: AdminNavItem[]
}

export const adminConfig: AdminConfigProps = {
  sidebarNav: [
    {
      title: "Studio",
      href: "/admin/przychodnia",
    },
    {
      title: "Bookings",
      href: "/admin/rezerwacje",
    },
    {
      title: "Availability",
      href: "/admin/dostepnosc",
    },
    {
      title: "Profil",
      href: "/admin/profil",
    },
  ] satisfies AdminNavItem[],
}
