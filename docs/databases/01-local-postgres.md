# Local Postgres

- Check if postges has already been installed locally

```bash
psql --version
```

- If `psql` is not installed then install postgres according to the specifications of your local operating system
- Check is psql is running

```bash
sudo systemctl status postgresql
```

- Setup a test database called `test_db` and test connection. See below to check how to create a database
- test psql connection

```bash
psql "postgres://postgres:postgres@localhost:5432/test_db"
```

- Add `DATABASE_URL` to `.env` file. Note `sslmode` should be disabled **ONLY** for local access during testing

```
DATABASE_URL="postgres://postgres:postgres@localhost:5432/test_db?sslmode=disable"
```

## Appendix - Simple postgres user

- Enter psql prompt

```bash
sudo -u postgres psql
```

- Create a user `postgres` with password `postgres` for simple local use

```sql
CREATE USER postgres WITH PASSWORD 'postgres'
```

- if the use already exists then you can change the password using `\password postgres`

### Helpful Navigation Commands inside the `psql` prompt

- `\l` : List all Databases
- `CREATE DATABASE test_tb;` : Create a Test Database. Note the semi-colon at the end
- `\c [database_name]` : Connect to database
- `\dt` : list all tables in current database
- `\q` : Exit the prompt

## Appendix - Installing on Fedora

```bash
sudo dnf install postgresql-server postgresql-contrib
sudo systemctl enable postgresql
sudo postgresql-setup --initdb --unit postgresql
sudo systemctl start postgresql
```

## Appendix - `Ident authentication failed` error

- check file `/var/lib/pgsql/data/pg_hba.conf`
- change ident method to `md5`. The file should look something like below

```
# TYPE  DATABASE        USER            ADDRESS                 METHOD
# "local" is for Unix domain socket connections only
local   all             all                                     peer
# IPv4 local connections:
host    all             all             127.0.0.1/32            md5
# IPv4 internal network connections:
host    all             all             192.168.122.1/24        md5
# IPv6 local connections:
host    all             all             ::1/128                 md5
# Allow replication connections from localhost, by a user with the
# replication privilege.
local   replication     all                                     peer
host    replication     all             127.0.0.1/32            md5
host    replication     all             ::1/128                 md5
```

- restart the service

```bash
sudo systemctl restart postgresql
```
