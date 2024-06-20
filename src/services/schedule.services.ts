import {
  emailRepository,
  receiverRepository,
  scheduleRepository,
} from "../repositories";

const schedule = async (id: number, payload: any): Promise<any> => {
  const emailFound: any = await emailRepository.findOne({
    where: { id },
    relations: ["sender"],
  });

  for (const receiverEmail of emailFound.receivers) {
    const receiverFound = await receiverRepository.findOne({
      where: { email: receiverEmail },
    });
    const scheduleCreated = scheduleRepository.create({
      ...payload,
      email: emailFound,
      receiver: receiverFound,
    });
    await scheduleRepository.save(scheduleCreated);
  }

  return "success";
};

const read = async (): Promise<any> => {
  const schedules = await scheduleRepository.find({
    relations: ["email"],
  });

  return schedules;
};

export default { schedule, read };
