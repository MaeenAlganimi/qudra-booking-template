import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components"

import { siteConfig } from "@/config/site"

interface EmailVerificationEmailProps {
  email: string
  emailVerificationToken: string
}

export function EmailVerificationEmail({
  email,
  emailVerificationToken,
}: Readonly<EmailVerificationEmailProps>): JSX.Element {
  const previewText = `Email verification for ${siteConfig.nameShort}`
  return (
    <Html lang="en">
      <Head>
        <title>{previewText}</title>
      </Head>
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body>
          <Container>
            <Section>
              <Text className="text-xl">Hello,</Text>
              <Text className="text-base">
                Someone tried to use the email address {email} to create an administrator account at{" "}
                <span className="font-semibold tracking-wide">
                  {siteConfig.nameShort}
                </span>
                .
              </Text>
              <Text className="text-base">
                If this was you, click the link below to verify your email and finish creating your account.
              </Text>
              <Button
                href={`${process.env.NEXT_PUBLIC_APP_URL}/rejestracja/potwierdz-email?token=${emailVerificationToken}`}
              >
                Verify email address
              </Button>
            </Section>

            <Section>
              <Text className="text-xs">
                If you did not try to sign up, ignore this email.
              </Text>
              <Text className="text-base font-medium">Have a lovely day!</Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}
