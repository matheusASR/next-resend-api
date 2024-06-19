import {
  campaignRepository,
  clientRepository,
  emailClassificationRepository,
  emailRepository,
  scheduleRepository,
  senderRepository,
  campaignReceiverRepository,
  receiverRepository,
} from "../repositories";
import "dotenv/config";
import { Resend } from "resend";
import { IFormData } from "../interfaces";
import fs from "fs";
import csvParser from "csv-parser";

async function readCSV(filePath: string): Promise<string[]> {
  return new Promise((resolve, reject) => {
    const emails: string[] = [];
    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on("data", (row: any) => {
        if (row.email) {
          emails.push(row.email);
        }
      })
      .on("end", () => {
        resolve(emails);
      })
      .on("error", (error) => {
        reject(error);
      });
  });
}

const create = async (
  campaignPayload: any,
  clientPayload: any,
  schedulePayload: any | null,
  emailClassificationPayload: any,
  senderPayload: any,
  emailPayload: any,
  receivers: { name: string; email: string }[],
  payload: IFormData
): Promise<any> => {
  // Criação do cliente
  const clientCreated = clientRepository.create(clientPayload);
  await clientRepository.save(clientCreated);

  // Criação da campanha e associação com o cliente
  const campaignCreated = campaignRepository.create({
    ...campaignPayload,
    client: clientCreated,
  });
  await campaignRepository.save(campaignCreated);

  // Criação da classificação de email e associação com a campanha
  const emailClassificationCreated = emailClassificationRepository.create({
    ...emailClassificationPayload,
    campaign: campaignCreated,
  });
  await emailClassificationRepository.save(emailClassificationCreated);

  // Criação do remetente
  const senderCreated = senderRepository.create(senderPayload);
  await senderRepository.save(senderCreated);

  // Criação do email e associação com a classificação e o remetente
  const emailCreated = emailRepository.create({
    ...emailPayload,
    classification: emailClassificationCreated,
    sender: senderCreated,
  });
  await emailRepository.save(emailCreated);

  // Criação de receptores e associação com a campanha
  for (const receiverData of receivers) {
    const receiverCreated = receiverRepository.create(receiverData);
    await receiverRepository.save(receiverCreated);

    const campaignReceiverCreated = campaignReceiverRepository.create({
      campaign: campaignCreated as any,
      receiver: receiverCreated,
    });
    await campaignReceiverRepository.save(campaignReceiverCreated);

    // Criação do agendamento e associação com o email e o receptor, se schedulePayload não for null
    if (schedulePayload) {
      const scheduleCreated = scheduleRepository.create({
        ...schedulePayload,
        email: emailCreated,
        receiver: receiverCreated,
      });
      await scheduleRepository.save(scheduleCreated);
    }
  }
};

const resend = async (): Promise<any> => {
  // let receiversEmails: string[];
  // let payload;

  // if (payload.csv_file.length <= 0) {
  //   receiversEmails = receivers.map((receiver) => receiver.email);
  // } else {
  //   try {
  //     receiversEmails = await readCSV(payload.csv_file);
  //   } catch (error: any) {
  //     return { error: `Failed to read CSV file: ${error.message}` };
  //   }
  // }

  // const resend = new Resend(process.env.RESEND_API_KEY);
  // const { data, error } = await resend.emails.send({
  //   from: `Acme <${payload.sender_email}>`,
  //   to: receiversEmails,
  //   subject: payload.subject,
  //   html: payload.html_file,
  // });

  // if (error) {
  //   return error;
  // }

  // return data;
};

const resendScheduled = async (): Promise<any> => {

}

export default { create, resend, resendScheduled };
