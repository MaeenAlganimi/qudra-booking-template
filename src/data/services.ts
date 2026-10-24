import { services as studioServices } from "@/lib/studio"
export const services = studioServices.map(s => ({ title:s.en, description:s.description, bulletPoints:["60-minute appointment", "Sample studio service"], bulletPointsRest:[] }))
