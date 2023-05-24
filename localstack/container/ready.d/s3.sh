#!/bin/bash

set-eu

DEFAULT_BUCKET_NAME=${DEFAULT_BUCKET_NAME:-"sandbox-localstack"}

echo "Creating S3 Buckets"
echo "create bucket: ${DEFAULT_BUCKET_NAME}"
awslocal s3api create-bucket --bucket ${DEFAULT_BUCKET_NAME} --create-bucket-configuration LocationConstraint=ap-northeast-1
