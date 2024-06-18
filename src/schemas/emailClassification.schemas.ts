import { z } from "zod";

const emailClassificationSchema = z.object({
  id: z.number().positive(),
  name: z.string().max(255),
  campaign: z.object({ id: z.number().positive() }).optional(),
  create_date: z.date().optional(),
  update_date: z.date().optional(),
  emails: z.array(z.object({ id: z.number().positive() })).optional(),
});

const emailClassificationCreateSchema = emailClassificationSchema.omit({ id: true });

export {
  emailClassificationSchema,
  emailClassificationCreateSchema,
};
