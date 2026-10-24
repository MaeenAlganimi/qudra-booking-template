import { Studio } from "@/components/studio"
export default function Home() { return <Studio demoMode={!process.env.GEMINI_API_KEY} /> }
