#!/bin/bash

set-eu

echo "Creating IAM Role and Policy"
awslocal iam create-role --role-name local-SwitchRole --assume-role-policy-document file:///custom-files/policy/assume_trust_policy.json
awslocal iam put-role-policy --role-name local-SwitchRole --policy-name local-SwitchRolePolicy --policy-document file:///custom-files/policy/switched_role_policy.json
