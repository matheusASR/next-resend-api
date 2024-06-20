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
import { IEmail, IFormData } from "../interfaces";
import fs from "fs";
import csvParser from "csv-parser";

// Função para ler o arquivo CSV e retornar um array de objetos
const readCSVFile = (
  filePath: string
): Promise<{ name: string; email: string }[]> => {
  return new Promise((resolve, reject) => {
    const results: { name: string; email: string }[] = [];
    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on("data", (data) => results.push(data))
      .on("end", () => {
        resolve(results);
      })
      .on("error", (error) => {
        reject(error);
      });
  });
};

const create = async (
  campaignPayload: any,
  clientPayload: any,
  schedulePayload: any | null,
  emailClassificationPayload: any,
  senderPayload: any,
  emailPayload: any,
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

  let receivers = payload.receivers;

  // Se não houver receptores no payload, ler do arquivo CSV
  if (receivers.length === 0 && payload.csv_file) {
    try {
      receivers = await readCSVFile(payload.csv_file);
    } catch (error) {
      console.error("Erro ao ler o arquivo CSV:", error);
      throw new Error("Erro ao ler o arquivo CSV");
    }
  }

  // Criação do email e associação com a classificação e o remetente
  const emailCreated = emailRepository.create({
    ...emailPayload,
    receivers: receivers.map(receiver => receiver.email),
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

const read = async (): Promise<any> => {
  const emails: IEmail[] = await emailRepository.find({
    relations: ["classification", "sender"],
  });

  return emails;
};

const resend = async (id: number): Promise<any> => {
  // Encontrar o email pelo ID, incluindo o remetente
  const emailFound: any = await emailRepository.findOne({
    where: { id },
    relations: ["sender"],
  });

  // Converter o conteúdo do html_file (Buffer) para string
  const htmlContent = emailFound.html_file.toString();

  // Configurar e enviar o email
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { data, error } = await resend.emails.send({
    from: `Acme <${emailFound.sender.alias}>`,
    to: emailFound.receivers,
    subject: emailFound.subject,
    html: htmlContent,
  });

  if (error) {
    return error;
  }

  return data;
};

const schedule = async (): Promise<any> => {};

export default { create, read, resend, schedule };
