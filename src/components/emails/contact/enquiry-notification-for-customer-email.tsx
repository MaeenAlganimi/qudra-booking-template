import { Body, Head, Html, Preview, Tailwind } from "@react-email/components"

interface EnquiryNotificationForCustomerEmailProps {
  firstName: string
  lastName: string
  email: string
  phone: string
  message?: string
}

export function EnquiryNotificationForCustomerEmail({
  firstName,
  lastName,
}: EnquiryNotificationForCustomerEmailProps): JSX.Element {
  const previewText = `${firstName} ${lastName} sent a contact form enquiry>`

  return (
    <Html lang="en">
      <Head>
        <title>Website contact enquiry</title>
        <Preview>{previewText}</Preview>
      </Head>
      <Tailwind>
        <Body>
          {/* TODO */}
          New contact enquiry for Noor Studio, a Qudra Labs demo.
        </Body>
      </Tailwind>
    </Html>
  )
}
