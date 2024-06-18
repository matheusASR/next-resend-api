import { z } from "zod";

const receiverSchema = z.object({
  email: z.string().email(),
  name: z.string().max(255),
});

const formDataSchema = z.object({
  campaign_name: z.string().max(255),
  type: z.string().max(50),
  client: z.string().max(255),
  sender_name: z.string().max(255),
  sender_email: z.string().email(),
  subject: z.string().max(255),
  title: z.string().max(255).optional(),
  body: z.string().optional(),
  image: z.instanceof(Buffer).optional(), 
  html_file: z.instanceof(Buffer).optional(), 
  button_name: z.string().max(50).optional(),
  button_color: z.string().max(50).optional(),  
  button_link: z.string().url().optional(),
  date_day: z.string().max(2).optional(),
  date_month: z.string().max(2).optional(),
  date_year: z.string().max(4).optional(),
  time_hour: z.string().max(2).optional(),
  time_minute: z.string().max(2).optional(),
  csv_file: z.instanceof(Buffer).optional(),  
  receivers: z.array(receiverSchema),
});

export {
  formDataSchema,
};
