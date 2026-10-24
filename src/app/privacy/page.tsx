import { Studio } from "@/components/studio"
export default function PrivacyPage() { return <Studio initialPrivacy demoMode={!process.env.GEMINI_API_KEY} /> }
