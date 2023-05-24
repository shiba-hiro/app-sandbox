import crypto from "crypto";

import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";
import { assumeRole } from "./assume-role";

const REGION = "ap-northeast-1";

const produceSampleMessage = async () => {
  const sampleMessage = "Hello, LocalStack " + new Date().getTime();

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

  const command = new SendMessageCommand({
    QueueUrl: "http://localhost:11566/000000000000/sample-queue.fifo",
    MessageBody: sampleMessage,
    MessageGroupId: "sample-group-id",
    MessageDeduplicationId: crypto.randomUUID(),
  });
  await sqs.send(command);
};

produceSampleMessage();
