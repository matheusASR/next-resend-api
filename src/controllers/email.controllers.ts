import { Request, Response } from "express";
import { emailServices } from "../services";
import {
  CampaignCreate,
  ClientCreate,
  EmailClassificationCreate,
  EmailCreate,
  IEmail,
  IFormData,
  ScheduleCreate,
  SenderCreate,
} from "../interfaces";

const create = async (req: Request, res: Response): Promise<Response> => {
  const payload: IFormData = req.body;

  const campaignPayload: CampaignCreate = {
    name: payload.campaign_name,
    type: payload.type,
  };

  const clientPayload: ClientCreate = {
    name: payload.client,
    status: true,
  };

  let schedulePayload: ScheduleCreate | null = null;
  if (payload.date_year.length > 0) {
    schedulePayload = {
      send_date: `${payload.date_year}/${payload.date_month}/${payload.date_day}`,
      send_hour: `${payload.time_hour}:${payload.time_minute}:00`,
      status: "Agendado",
    };
  }

  const emailClassificationPayload: EmailClassificationCreate = {
    name: payload.type,
  };

  const senderPayload: SenderCreate = {
    name: payload.sender_name,
    alias: payload.sender_email,
  };

  const emailPayload: EmailCreate = {
    title: payload.title,
    body: payload.body,
    image: payload.image,
    html_file: payload.html_file,
    subject: payload.subject,
  };

  const response = await emailServices.create(
    campaignPayload,
    clientPayload,
    schedulePayload,
    emailClassificationPayload,
    senderPayload,
    emailPayload,
    payload
  );

  return res.status(201).json(response);
};

const read = async (req: Request, res: Response): Promise<Response> => {
  const emails: IEmail[] = await emailServices.read();
  return res.status(200).json(emails);
}

const resend = async (req: Request, res: Response): Promise<Response> => {
  const id: number = Number(req.params.id)
  const resendRes = await emailServices.resend(id)

  return res.status(200).json(resendRes);
}

export default { create, read, resend };

