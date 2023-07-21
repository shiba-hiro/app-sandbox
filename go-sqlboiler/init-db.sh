#!/bin/bash
set -eu

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
	CREATE ROLE test_user WITH LOGIN PASSWORD 'password';

  CREATE DATABASE sandbox_db;

  \connect sandbox_db

  CREATE SCHEMA app_default;

  GRANT ALL PRIVILEGES ON SCHEMA app_default TO test_user;
EOSQL

