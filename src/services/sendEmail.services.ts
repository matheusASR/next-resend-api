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

const create = async (
  campaignPayload: any,
  clientPayload: any,
  schedulePayload: any | null,
  emailClassificationPayload: any,
  senderPayload: any,
  emailPayload: any,
  receivers: { name: string; email: string }[]
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

export default { create };

