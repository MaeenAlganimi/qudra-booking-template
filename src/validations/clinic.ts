import * as z from "zod"

export const clinicIdSchema = z
  .string({
    required_error: "Business ID is required",
    invalid_type_error: "Input must be text",
  })
  .min(1, {
    message: "ID must contain at least 1 character",
  })
  .max(128, {
    message: "ID may contain at most 32 characters",
  })

export const clinicSchema = z.object({
  latitude: z
    .string({
      required_error: "Latitude is required",
      invalid_type_error: "Latitude must be text",
    })
    .max(24, {
      message: "Latitude may contain at most 24 characters",
    })
    .regex(/^(-?[1-8]?\d(\.\d+)?|90(\.0+)?)$/, {
      message: "Invalid latitude",
    }),
  longitude: z
    .string({
      required_error: "Longitude is required",
      invalid_type_error: "Longitude must be text",
    })
    .max(24, {
      message: "Longitude may contain at most 24 characters",
    })
    .regex(/^(0|([1-9]|[1-9]\d|1[0-7]\d)(\.\d+)?)$|^180(\.0+)?$/, {
      message: "Invalid longitude",
    }),
  address: z
    .string({
      required_error: "Address is required",
      invalid_type_error: "Address must be text",
    })
    .min(3, { message: "Address must contain at least 3 characters" })
    .max(128, { message: "Address may contain at most 128 characters" }),
  phone_1: z
    .string({
      required_error: "Phone number is required",
      invalid_type_error: "Phone number must be text",
    })
    .min(8, { message: "Phone number must contain at least 8 characters" })
    .max(16, { message: "Phone number may contain at most 16 characters" })
    .regex(/^\+?[0-9 ]{9,15}$/, {
      message:
        "Use digits and an optional leading + for the phone number",
    }),
  phone_2: z
    .string({
      required_error: "Phone number is required",
      invalid_type_error: "Phone number must be text",
    })
    .min(8, { message: "Phone number must contain at least 8 characters" })
    .max(16, { message: "Phone number may contain at most 16 characters" })
    .regex(/^\+?[0-9 ]{9,15}$/, {
      message:
        "Use digits and an optional leading + for the phone number",
    }),
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be text",
    })
    .email({
      message: "Niepoprawny format adresu email",
    })
    .min(6, { message: "Email must contain at least 6 characters" })
    .max(64, { message: "Email may contain at most 64 characters" }),
})

export const getClinicByIdSchema = z.object({
  id: z.string({
    required_error: "ID is required",
    invalid_type_error: "ID must be text",
  }),
})

export const addClinicSchema = clinicSchema

export const checkIfClinicExistsSchema = z.object({
  id: clinicIdSchema,
})

export const updateClinicSchema = clinicSchema.extend({
  id: clinicIdSchema,
})

export type GetClinicInput = z.infer<typeof getClinicByIdSchema>

export type AddClinicInput = z.infer<typeof addClinicSchema>

export type CheckIfClinicExistsInput = z.infer<typeof checkIfClinicExistsSchema>

export type UpdateClinicInput = z.infer<typeof updateClinicSchema>
