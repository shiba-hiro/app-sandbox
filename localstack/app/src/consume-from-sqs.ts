import { SQSClient, ReceiveMessageCommand } from "@aws-sdk/client-sqs";
import { assumeRole } from "./assume-role";

const REGION = "ap-northeast-1";

const consumeMessage = async () => {
  const cred = await assumeRole();

  const sqs = new SQSClient({
    region: REGION,
    endpoint: "http://localhost:11566",
    credentials: {
      accessKeyId: cred.AccessKeyId!,
      secretAccessKey: cred.SecretAccessKey!,
      sessionToken: cred.SessionToken!,
      expiration: cred.Expiration,
    },
  });

  const command = new ReceiveMessageCommand({
    QueueUrl: "http://localhost:11566/000000000000/sample-queue.fifo",
  });
  const response = await sqs.send(command);
  console.log(response);
};

consumeMessage();
