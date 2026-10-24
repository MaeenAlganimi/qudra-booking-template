import * as z from "zod"

export const hourSchema = z
  .string({
    required_error: "Enter an opening time",
    invalid_type_error: "Invalid data type",
  })
  .length(5)
  .regex(/^(?:[01]\d|2[0-3]):[0-5]\d$/, {
    message: "Invalid time. Use HH:MM",
  })

export const businessHoursIdSchema = z
  .string({
    required_error: "ID is required",
    invalid_type_error: "Input must be text",
  })
  .min(1, {
    message: "ID must contain at least 1 character",
  })
  .max(128, {
    message: "ID may contain at most 32 characters",
  })

export const singlePeriodSchema = z.object({
  opening: hourSchema,
  closing: hourSchema,
})

export const dayPeriodsSchema = z.array(singlePeriodSchema).default([])

export const businessHoursSchema = z.object({
  mondayStatus: z.enum(["otwarte", "zamknięte"]),
  mondayOpening: hourSchema,
  mondayClosing: hourSchema,
  tuesdayStatus: z.enum(["otwarte", "zamknięte"]),
  tuesdayOpening: hourSchema,
  tuesdayClosing: hourSchema,
  wednesdayStatus: z.enum(["otwarte", "zamknięte"]),
  wednesdayOpening: hourSchema,
  wednesdayClosing: hourSchema,
  thursdayStatus: z.enum(["otwarte", "zamknięte"]),
  thursdayOpening: hourSchema,
  thursdayClosing: hourSchema,
  fridayStatus: z.enum(["otwarte", "zamknięte"]),
  fridayOpening: hourSchema,
  fridayClosing: hourSchema,
  saturdayStatus: z.enum(["otwarte", "zamknięte"]),
  saturdayOpening: hourSchema,
  saturdayClosing: hourSchema,
  sundayStatus: z.enum(["otwarte", "zamknięte"]),
  sundayOpening: hourSchema,
  sundayClosing: hourSchema,
})

export const addBusinessHoursSchema = businessHoursSchema

export const updateBusinessHoursSchema = businessHoursSchema.extend({
  id: businessHoursIdSchema,
})

export type AddBusinessHoursInput = z.infer<typeof addBusinessHoursSchema>

export type UpdateBusinessHoursInput = z.infer<typeof updateBusinessHoursSchema>
