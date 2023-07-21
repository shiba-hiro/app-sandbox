# --
# Development image
FROM golang:1.20.3 AS development

RUN apt upgrade && apt update \
    && apt -y install \
      postgresql-client \
    && apt clean \
    && rm -rf /var/lib/apt/lists/*

RUN go install github.com/rubenv/sql-migrate/...@latest
RUN go install github.com/volatiletech/sqlboiler/v4@latest
RUN go install github.com/volatiletech/sqlboiler/v4/drivers/sqlboiler-psql@latest


# --
# Build application layer
# FROM golang:1.20.3-bullseye AS builder

# Do something...


