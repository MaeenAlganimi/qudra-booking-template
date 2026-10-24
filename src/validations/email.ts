import * as z from "zod"

export const emailSchema = z
  .string({
    required_error: "Email is required",
    invalid_type_error: "Invalid data type",
  })
  .min(5, {
    message: "Email must contain at least 5 characters",
  })
  .max(64, {
    message: "Email may contain at most 64 characters",
  })
  .email({
    message: "Enter a valid email address",
  })

export const emailVerificationSchema = z.object({
  email: emailSchema,
})

export const markEmailAsVerifiedSchema = z.object({
  token: z.string(),
})

export const checkIfEmailVerifiedSchema = z.object({
  email: emailSchema,
})

export const contactFormSchema = z.object({
  rodo: z.boolean().refine(value => value, "Consent is required"),
  email: emailSchema,
  firstName: z.string({
    required_error: "First name is required",
    invalid_type_error: "Invalid data type",
  }),
  lastName: z.string({
    required_error: "Last name is required",
    invalid_type_error: "Invalid data type",
  }),
  // TODO: Consider adding a regex to further validate the phone number
  phone: z.string({
    required_error: "Phone number is required",
    invalid_type_error: "Invalid data type",
  }),
  message: z
    .string({
      required_error: "Message is required",
      invalid_type_error: "Invalid input format",
    })
    .max(10240, {
      message: "Message may contain at most 10240 characters",
    }),
})

export type EmailVerificationFormInput = z.infer<typeof emailVerificationSchema>

export type MarkEmailAsVerifiedInput = z.infer<typeof markEmailAsVerifiedSchema>

export type CheckIfEmailVerifiedInput = z.infer<
  typeof checkIfEmailVerifiedSchema
>

export type ContactFormInput = z.infer<typeof contactFormSchema>
