import { z } from "zod";

const senderSchema = z.object({
  id: z.number().positive(),
  name: z.string().max(255),
  alias: z.string().max(255),
  create_date: z.date().optional(),
  update_date: z.date().optional(),
  emails: z.array(z.object({ id: z.number().positive() })).optional(),
});

const senderCreateSchema = senderSchema.omit({ id: true });

export {
  senderSchema,
  senderCreateSchema,
};
