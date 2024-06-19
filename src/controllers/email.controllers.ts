import { Request, Response } from "express";
import { emailServices } from "../services";
import {
  CampaignCreate,
  ClientCreate,
  EmailClassificationCreate,
  EmailCreate,
  IFormData,
  ScheduleCreate,
  SenderCreate,
} from "../interfaces";

const create = async (req: Request, res: Response): Promise<Response> => {
  const payload: IFormData = req.body;
  const receivers = payload.receivers;

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
  };

  await emailServices.create(
    campaignPayload,
    clientPayload,
    schedulePayload,
    emailClassificationPayload,
    senderPayload,
    emailPayload,
    receivers,
    payload
  );

  return res.status(201);
};

const resend = async (req: Request, res: Response): Promise<Response> => {


  return res.status(200);
}

const resendScheduled = async (req: Request, res: Response): Promise<Response> => {


  return res.status(200);
}

export default { create, resend, resendScheduled };

