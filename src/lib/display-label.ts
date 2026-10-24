const labels: Record<string, string> = {
  otwarte: "Open",
  zamknięte: "Closed",
  weterynarz: "Studio consultation",
  "salon fryzur": "Hair styling",
  klient: "Customer",
  administrator: "Administrator",
  niepotwierdzone: "Unconfirmed",
  potwierdzone: "Confirmed",
  anulowane: "Cancelled",
  odrzucone: "Rejected",
}
export function displayLabel(value: string) {
  return labels[value] || value
}
