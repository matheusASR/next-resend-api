import { z } from "zod";

const clientSchema = z.object({
  id: z.number().positive(),
  name: z.string().max(255),
  status: z.boolean().default(true),
  create_date: z.date().optional(),
  update_date: z.date().optional(),
  campaigns: z.array(z.object({ id: z.number().positive() })).optional(),
});

const clientCreateSchema = clientSchema.omit({ id: true });

export {
  clientSchema,
  clientCreateSchema,
};
