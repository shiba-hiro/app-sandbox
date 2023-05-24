#!/bin/bash
set -eu

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
	CREATE ROLE foo_role WITH LOGIN PASSWORD 'password';

    CREATE DATABASE foo_db;

    \connect foo_db

    CREATE SCHEMA app_default;

    GRANT ALL PRIVILEGES ON SCHEMA app_default TO foo_role;
EOSQL

