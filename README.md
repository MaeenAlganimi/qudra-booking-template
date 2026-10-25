# Noor Studio: AI Booking Website

**Live demo:** https://salon-booking-template.onrender.com (free instance; first load can take ~50 s to wake)

Bilingual (EN/AR) booking site for salons, clinics and small shops, with a Gemini AI assistant that answers FAQs and books slots.

A demo template by **Maeen Alganimi**. Bilingual English / Arabic (RTL), with AI from Google Gemini (`gemini-2.5-flash`) called server-side only.

| English | Arabic (RTL) | Mobile |
|---|---|---|
| ![](docs/desktop-en.png) | ![](docs/desktop-ar.png) | ![](docs/mobile-en.png) |

## Run locally
```bash
npm install
cp .env.example .env.local   # add GEMINI_API_KEY from https://aistudio.google.com/apikey
npm run dev
```
With no `GEMINI_API_KEY` set, the app runs in **Demo mode** with canned AI replies (the screenshots were taken in Demo mode). The business and people shown are fictional.

## Credits
Built from [pjborowiecki/ARKA-Veterinary-Clinic-Page-and-Appointment-Booking-System](https://github.com/pjborowiecki/ARKA-Veterinary-Clinic-Page-and-Appointment-Booking-System) (MIT license). The original LICENSE is kept in this repo, and the original README is in `docs/TEMPLATE-README.md`.
