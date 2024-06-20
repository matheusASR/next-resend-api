import { Request, Response } from "express";
import { scheduleServices } from "../services";
import { ISchedule } from "../interfaces";

const schedule = async (req: Request, res: Response): Promise<Response> => {
  const id: number = Number(req.params.id);
  const payload = req.body;
  const scheduleRes = await scheduleServices.schedule(id, payload);

  return res.status(200).json(scheduleRes);
};

const read = async (req: Request, res: Response): Promise<Response> => {
  const schedules: ISchedule[] = await scheduleServices.read();
  return res.status(200).json(schedules);
}

export default { schedule, read };
