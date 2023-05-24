import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { assumeRole } from "./assume-role";

const REGION = "ap-northeast-1";

const uploadSampleObject = async () => {
  const objectData = "Hello, LocalStack " + new Date().getTime();

  const cred = await assumeRole();

  const s3 = new S3Client({
    region: REGION,
    endpoint: "http://localhost:11566",
    credentials: {
      accessKeyId: cred.AccessKeyId!,
      secretAccessKey: cred.SecretAccessKey!,
      sessionToken: cred.SessionToken!,
      expiration: cred.Expiration,
    },

    // https://github.com/aws/aws-sdk-java-v2/issues/3797#issuecomment-1453124821
    forcePathStyle: true,
  });

  const command = new PutObjectCommand({
    Bucket: "sandbox-localstack",
    Key: "test-object.txt",
    Body: objectData,
  });
  await s3.send(command);
};

uploadSampleObject();
