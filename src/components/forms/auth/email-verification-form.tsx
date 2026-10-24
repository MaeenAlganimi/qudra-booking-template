"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { resendEmailVerificationLink } from "@/actions/email"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { DEFAULT_UNAUTHENTICATED_REDIRECT } from "@/config/defaults"
import {
  emailVerificationSchema,
  type EmailVerificationFormInput,
} from "@/validations/email"

import { useToast } from "@/hooks/use-toast"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Icons } from "@/components/icons"

export function EmailVerificationForm(): JSX.Element {
  const router = useRouter()
  const { toast } = useToast()
  const [isPending, startTransition] = React.useTransition()

  const form = useForm<EmailVerificationFormInput>({
    resolver: zodResolver(emailVerificationSchema),
    defaultValues: {
      email: "",
    },
  })

  function onSubmit(formData: EmailVerificationFormInput): void {
    startTransition(async () => {
      try {
        const message = await resendEmailVerificationLink({
          email: formData.email,
        })

        switch (message) {
          case "not-found":
            toast({
              title: "No user found with that email",
              variant: "destructive",
            })
            form.reset()
            break
          case "verified":
            toast({
              title: "Your email is already verified",
              description: "Return to sign in and try again",
            })
            break
          case "success":
            toast({
              title: "Verification link sent",
              description:
                "Click the link in your email to complete verification",
            })
            router.push(DEFAULT_UNAUTHENTICATED_REDIRECT)
            break
          default:
            toast({
              title: "Could not send verification link",
              description: "Try again",
              variant: "destructive",
            })
            router.push("/rejestracja")
        }
      } catch (error) {
        toast({
          title: "Something went wrong",
          description: "Try again",
          variant: "destructive",
        })
        console.error(error)
      }
    })
  }

  return (
    <Form {...form}>
      <form
        className="grid gap-4"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="alex@example.com" {...field} />
              </FormControl>
              <FormMessage className="pt-2 sm:text-sm" />
            </FormItem>
          )}
        />

        <Button disabled={isPending}>
          {isPending ? (
            <>
              <Icons.spinner
                className="mr-2 size-4 animate-spin"
                aria-hidden="true"
              />
              <span>Sending...</span>
            </>
          ) : (
            <span>Send link</span>
          )}
          <span className="sr-only">
            Send a verification link to this email address
          </span>
        </Button>
      </form>
    </Form>
  )
}
