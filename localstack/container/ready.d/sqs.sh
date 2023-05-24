#!/bin/bash

set -eu

echo "Creating SQS Queues"

QUEUES=(
  "sample-dl-queue.fifo"
  "sample-queue.fifo"
)

for queue in ${QUEUES[@]}; do
  echo "create queue: ${queue}"
  awslocal sqs create-queue --queue-name ${queue} --attributes file:///custom-files/sqs-attributes/${queue}.json
done
