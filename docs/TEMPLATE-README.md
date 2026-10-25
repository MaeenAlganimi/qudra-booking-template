# Noor Studio · Maeen Alganimi

An English/Arabic small-business booking template built with Next.js, React, Tailwind CSS, and Lucide. Noor Studio is a fictional salon. All services, specialists, prices, and addresses are sample content.

## Run locally

Requires Node.js 20.19+.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000. No credentials are required. Run `npm run build` for a production build and `npm start` to serve it.

## AI assistant

Set `GEMINI_API_KEY` in `.env.local` (or your hosting provider's server environment) to enable Google Gemini `gemini-2.5-flash` via `@google/genai`. The key is read only by `/api/assistant` and is never sent to the browser. The route requests structured JSON, validates the result with Zod, and discards slots outside the supplied availability. Chat history and available slots are sent to Gemini when enabled; form contact fields are not automatically included.

Without a key, deterministic FAQ answers and slot proposals work in **Demo mode**. Provider failures fall back to the same demo responses. Selecting a proposed slot fills the booking form; the visitor must enter their details and confirm. The assistant never silently creates a booking.

## Demo bookings

The form and chat share the same availability and localStorage flow (`noor-bookings-v1`). All services last 60 minutes. Available hours are Monday–Saturday, 10:00–18:00; Sunday is closed. Past times and overlapping appointments for the same specialist are excluded. Submissions recheck availability before saving. Bookings persist after reload, can be cancelled in the form, and can be cleared through the privacy dialog.

This is a browser-local demonstration: it sends no booking emails, takes no payment, and does not share availability between devices. For a live business, connect the existing database booking modules to a shared, authenticated backend with atomic conflict checking. No database, auth, email, map, or analytics credentials are needed to build or render the public demo.

## Customise

- Business information, services, specialists, slot rules: `src/lib/studio.ts`
- English/Arabic dictionary and interface: `src/components/studio.tsx`
- Design and responsive/RTL rules: `src/styles/globals.css`
- Server-side Gemini integration: `src/app/api/assistant/route.ts`

The language choice persists in the browser and updates `html.lang` and `html.dir`. Old Polish page URLs redirect to the public demo or equivalent English route. Original database enums and migration identifiers remain for compatibility; legacy business-hours schema fields were aligned with the existing SQL migration. Legacy database/auth modules are retained for future integration and are not used by the public demo. The original LICENSE is preserved.

Studio photography is bundled locally in `public/noor` from Unsplash; it represents the fictional mood, not actual premises or team members.
