import { z } from "zod";

const campaignSchema = z.object({
  id: z.number().positive(),
  name: z.string().max(255),
  type: z.string().max(50),
  client: z.object({ id: z.number().positive() }).optional(),
  create_date: z.date().optional(),
  update_date: z.date().optional(),
  classifications: z.array(z.object({ id: z.number().positive() })).optional(),
  campaign_receivers: z.array(z.object({ id: z.number().positive() })).optional(),
});

const campaignCreateSchema = campaignSchema.omit({ id: true });

export {
  campaignSchema,
  campaignCreateSchema,
};
