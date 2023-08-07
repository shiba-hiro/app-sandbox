# --
# Development image
FROM golang:1.20.3 AS development

# ARG GH_READ_PACKAGES_TOKEN
# RUN git config --global url."https://${GH_READ_PACKAGES_TOKEN}:x-oauth-basic@github.com/my-private-namespace/".insteadOf "https://github.com/my-private-namespace/"
# # root ではないユーザーで実行させられるよう gitconfig をコピー
# RUN cp /root/.gitconfig /.gitconfig && chmod 644 /.gitconfig

RUN apt upgrade && apt update \
    && apt -y install \
      postgresql-client \
    && apt clean \
    && rm -rf /var/lib/apt/lists/*

ENV GOLANGCI_LINT_VERSION v1.53.3 # renovate: depName=github.com/golangci/golangci-lint
RUN curl -sSfL https://raw.githubusercontent.com/golangci/golangci-lint/master/install.sh | sh -s -- -b /usr/local/bin $GOLANGCI_LINT_VERSION

USER 1000:1000
ENV GOCACHE /go/.cache

RUN go install github.com/rubenv/sql-migrate/...@latest
RUN go install github.com/volatiletech/sqlboiler/v4@latest
RUN go install github.com/volatiletech/sqlboiler/v4/drivers/sqlboiler-psql@latest


# --
# Build application layer
# FROM golang:1.20.3-bullseye AS builder

# Do something...


