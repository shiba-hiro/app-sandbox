

## Basic

docker compose up -d



docker compose exec -it postgres bash




psql --username=foo_role --dbname=foo_db


CREATE TABLE app_default.customers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50),
  email VARCHAR(100),
  address VARCHAR(200)
);

\dt app_default.*



psql --username=postgres --dbname=postgres



SELECT datname FROM pg_database;

SELECT usename FROM pg_user;

SELECT rolname FROM pg_roles;

SELECT schemata.schema_name FROM information_schema.schemata;



CREATE ROLE foo_role WITH LOGIN PASSWORD 'password';

CREATE DATABASE foo_db;

\connect foo_db

GRANT ALL PRIVILEGES ON SCHEMA public TO foo_role;


psql --username=foo_role --dbname=foo_db

CREATE TABLE customers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50),
  email VARCHAR(100),
  address VARCHAR(200)
);

\d






SELECT current_database();

DO
$$
BEGIN
    IF current_database() <> 'sample_db' THEN
        RAISE EXCEPTION 'Invalid database name';
    END IF;
END;
$$;


DO
$$
BEGIN
    IF current_database() <> 'foo_db' THEN
        RAISE EXCEPTION 'Invalid database name';
    END IF;
END;
$$;



docker cp ./scripts/test.sql postgrsql-postgres-1:/test.sql

psql -v ON_ERROR_STOP=1 -f ./test.sql -U postgres --dbname=foo_db


## RLS

```sql
CREATE TABLE contents (
  id SERIAL PRIMARY KEY,
  tenant_id INT,
  content TEXT
);
```

```sql
CREATE POLICY service_provider_policy ON contents FOR ALL TO service_provider;
CREATE POLICY tenant_user_policy ON contents FOR ALL TO tenant_user USING (tenant_id = current_setting('my.tenant_id')::INT);
```

```sql
-- サービス提供者のユーザー/ロール作成
CREATE USER service_provider;
GRANT service_provider_policy ON contents TO service_provider;

-- テナントユーザーのユーザー/ロール作成
CREATE USER tenant_user;
GRANT tenant_user_policy ON contents TO tenant_user;
```

```sql
-- サービス提供者のセッション設定
SET my.tenant_id = NULL;

-- テナントユーザーのセッション設定（例：テナントID 1）
SET my.tenant_id = '1';
```
