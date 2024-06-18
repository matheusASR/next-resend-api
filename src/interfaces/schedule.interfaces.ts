import { z } from "zod";
import {
    scheduleSchema, scheduleCreateSchema
} from "../schemas";
import { Repository } from "typeorm";
import { Schedule } from "../entities";

type ISchedule = z.infer<typeof scheduleSchema>;
type ScheduleCreate = z.infer<typeof scheduleCreateSchema>

type ScheduleRepo = Repository<Schedule>;

export type { ISchedule, ScheduleCreate, ScheduleRepo };