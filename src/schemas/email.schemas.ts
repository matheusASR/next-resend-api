import { z } from "zod";

const emailSchema = z.object({
  id: z.number().positive(),
  title: z.string().max(255),
  body: z.string(),
  image: z.instanceof(Buffer).optional(),
  html_file: z.instanceof(Buffer).optional(), 
  classification: z.object({ id: z.number().positive() }).optional(),
  sender: z.object({ id: z.number().positive() }).optional(),
  create_date: z.date().optional(),
  update_date: z.date().optional(),
});

const emailCreateSchema = emailSchema.omit({ id: true });

export {
  emailSchema,
  emailCreateSchema,
};


