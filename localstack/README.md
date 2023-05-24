# LocalStack sandbox



https://github.com/localstack/localstack


https://docs.localstack.cloud/overview/


https://docs.localstack.cloud/references/init-hooks/


## Basic

```
docker compose up -d
docker compose exec -it localstack /bin/bash

awslocal s3 ls
aws s3 ls --endpoint-url http://localhost:4566

awslocal sqs list-queues
```

```
awslocal sts get-caller-identity

{
    "UserId": "AKIAIOSFODNN7EXAMPLE",
    "Account": "000000000000",
    "Arn": "arn:aws:iam::000000000000:root"
}
```

自社のサービスの場合、 k8s の SA 経由で割り当てられた Role から switch できる、 switch 先の Role ARN を環境変数 AssumeRoleArn へ入れて使っている。
local においても同じ構成をエミュレートすることで、 Access Key Id などを余分にアプリケーションへ渡す必要がなくなる。
switch 元の Role は作成しようがないので考えないものとし、 switch 先の Role を localstack で作成、当該 Role の名前 (local-switchRole) を AssumeRoleArn として指定する。
それっぽくやるために、 arn:aws:iam::000000000000:role/local-SwitchRole とかにしてもいいかも。


switch 元のアカウントを 999999999999 と仮定して信頼するものとする。
```json
{
  "Version": "2012-10-17",
  "Statement": {
    "Effect": "Allow",
    "Principal": { "AWS": "arn:aws:iam::999999999999:root" },
    "Action": "sts:AssumeRole"
  }
}
```


docker compose logs -f localstack


```
sandbox-localstack  | {
sandbox-localstack  |     "Role": {
sandbox-localstack  |         "Path": "/",
sandbox-localstack  |         "RoleName": "local-SwitchRole",
sandbox-localstack  |         "RoleId": "AROAQAAAAAAAIRRNPLQS6",
sandbox-localstack  |         "Arn": "arn:aws:iam::000000000000:role/local-SwitchRole",
sandbox-localstack  |         "CreateDate": "2023-05-23T08:49:16.075000Z",
sandbox-localstack  |         "AssumeRolePolicyDocument": {
sandbox-localstack  |             "Version": "2012-10-17",
sandbox-localstack  |             "Statement": {
sandbox-localstack  |                 "Effect": "Allow",
sandbox-localstack  |                 "Principal": {
sandbox-localstack  |                     "AWS": "arn:aws:iam::999999999999:root"
sandbox-localstack  |                 },
sandbox-localstack  |                 "Action": "sts:AssumeRole"
sandbox-localstack  |             }
sandbox-localstack  |         }
sandbox-localstack  |     }
sandbox-localstack  | }

sandbox-localstack  | {
sandbox-localstack  |     "Location": "http://sandbox-localstack.s3.localhost.localstack.cloud:4566/"
sandbox-localstack  | }

sandbox-localstack  | {
sandbox-localstack  |     "QueueUrl": "http://localhost:4566/000000000000/sample-dl-queue.fifo"
sandbox-localstack  | }

sandbox-localstack  | {
sandbox-localstack  |     "QueueUrl": "http://localhost:4566/000000000000/sample-queue.fifo"
sandbox-localstack  | }
```


### S3 & App

```
cd app
yarn install

./node_modules/.bin/ts-node ./src/upload-to-s3.ts
```


```
docker compose exec -it localstack /bin/bash

awslocal s3 cp s3://sandbox-localstack/test-object.txt -
```



### SQS & App

```
cd app
yarn install

./node_modules/.bin/ts-node ./src/produce-to-sqs.ts
```


```
awslocal sqs get-queue-attributes --queue-url 'http://localhost:4566/000000000000/sample-queue.fifo' --attribute-names ApproximateNumberOfMessages

awslocal sqs receive-message --queue-url 'http://localhost:4566/000000000000/sample-queue.fifo'
```

```
./node_modules/.bin/ts-node ./src/produce-to-sqs.ts

./node_modules/.bin/ts-node ./src/consume-from-sqs.ts
```


## Tear down

docker compose down
docker volume rm localstack_sandbox-localstack-volume
