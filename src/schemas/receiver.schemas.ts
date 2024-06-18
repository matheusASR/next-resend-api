import { z } from "zod";

const receiverSchema = z.object({
  id: z.number().positive(),
  email: z.string().max(255).email(),
  name: z.string().max(255),
  create_date: z.date().optional(),
  update_date: z.date().optional(),
  campaign_receivers: z.array(z.object({ id: z.number().positive() })).optional(),
  schedules: z.array(z.object({ id: z.number().positive() })).optional(),
});

const receiverCreateSchema = receiverSchema.omit({ id: true });

export {
  receiverSchema,
  receiverCreateSchema,
};
