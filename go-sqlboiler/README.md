

sqlboiler, sql-migrate のための sandbox

https://github.com/volatiletech/sqlboiler

https://github.com/rubenv/sql-migrate



`docker compose up -d`

`docker compose exec -it go-dev /bin/bash`

or

`docker compose exec go-dev bash -c 'go mod tidy'`

---
sql-migrate


`sql-migrate new mig` で新しいマイグレーション用 sql ファイルの雛形を生成。

`sql-migrate up -env postgres-db`, `sql-migrate down -env postgres-db` で実行。

env は dbconfig での指定。

---


sqlboiler 
https://github.com/volatiletech/sqlboiler

README 読む限り、すごくいい感じ。
スキーマファースト。
SQL 書けるのが前提。

`sqlboiler [flags] <driver>`


データベースの情報を読み取ってコード化してくれる。


`sqlboiler psql`

infra の models として出力させて、 repository の実装で domain の models へマッピングするのが吉なのかなぁ。
