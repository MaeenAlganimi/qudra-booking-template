import { Resend } from "resend"

// Legacy email actions are not used by the local demo.
export const resend = new Resend(
  process.env.RESEND_API_KEY || "demo-unconfigured"
)
