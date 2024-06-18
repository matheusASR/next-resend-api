import { z } from "zod";

const scheduleSchema = z.object({
  id: z.number().positive(),
  email: z.object({ id: z.number().positive() }).optional(),
  receiver: z.object({ id: z.number().positive() }).optional(),
  send_date: z.string(), // YYYY-MM-DD
  send_hour: z.string(), // HH:MM:SS
  status: z.string().max(50),
  error: z.string().nullable().optional(),
  create_date: z.date().optional(),
  update_date: z.date().optional(),
});

const scheduleCreateSchema = scheduleSchema.omit({ id: true });

export {
  scheduleSchema,
  scheduleCreateSchema,
};
