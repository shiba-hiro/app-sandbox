import { STSClient, AssumeRoleCommand } from "@aws-sdk/client-sts";

const REGION = "ap-northeast-1";

export const assumeRole = async () => {
  const sts = new STSClient({
    region: REGION,
    endpoint: "http://localhost:11566",
    credentials: {
      accessKeyId: "dummy",
      secretAccessKey: "dummy",
    },
  });

  const command = new AssumeRoleCommand({
    RoleArn: "arn:aws:iam::000000000000:role/local-SwitchRole",
    RoleSessionName: "session-name" + new Date().getTime(),
  });

  const response = await sts.send(command);
  return response.Credentials!;
};
