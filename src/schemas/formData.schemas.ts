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
  title: z.string().max(255),
  body: z.string(),
  image: z.any(), 
  html_file: z.any(), 
  button_name: z.string().max(50),
  button_color: z.string().max(50),  
  button_link: z.string().url(),
  date_day: z.string().max(2),
  date_month: z.string().max(2),
  date_year: z.string().max(4),
  time_hour: z.string().max(2),
  time_minute: z.string().max(2),
  csv_file: z.any(),  
  receivers: z.array(receiverSchema),
});

export {
  formDataSchema,
};
