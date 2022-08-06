# Prisma

Prisma schema file can be found at `./api/db/schema.prisma`

You must set the `provider` and `url` on the datasource.

```ts
datasource db {
  provider = "postgresql"
  url = env("DATABASE_URL")
}
```

## Data model changes

Database migration files can be found at `./api/migrations`

All changes to your applications database should be made in the schema file.

After changing your data model prisma will generate a new migration file and apply the changes to your database by using the `prisma migrate dev` command.

```bash
# where xxxx is the name of your migration
yarn rw prisma migrate dev --name xxxx
# i.e yarn rw prisma migrate dev --name add_email_to_users

# optionally rebuild database at any point: drop, migrate and seed
yarn rw prisma migrate reset --force
```

Prisma creates a table named `_prisma_migrations` where it tracks which migrations have already been run.

```sql
select migration_name from _prisma_migrations;
```

## UUIDs as primary keys

### Step 1

Enable the postgres extension `uuid-ossp`

- create migration file by hand

```bash
mkdir api/db/migrations/00000000000000_add_extension_uuid_ossp

echo 'CREATE EXTENSION IF NOT EXISTS "uuid-ossp";' > api/db/migrations/00000000000000_add_extension_uuid_ossp/migration.sql
```

Or use the `--create-only` flag, i.e. `prisma migrate dev --create-only` and then modify the generated file.

### Step 2

As you define your models use the following options for the id column

```ts
id String @id @default(dbgenerated("public.uuid_generate_v4()")) @db.Uuid
```

- typescript type of `String`
- database type of `uuid`
- database default value: a new uuid value


## Table naming

By default Prisma will create database tables that match the model names (`PascalCase`).

Use the `@@map` function for custom database table naming:

```js
model User {
  @@map("users")

  id ...
  email String
}
```

I prefer to use `snake_case` and so does postgres.

Given a model named `FooBar`:

```sql
-- when we use @@map('foo_bars') in the model

select * from foo_bars;
--  id | email
-- ----+-------
-- (0 rows)
```

```sql
-- when we use the default naming

select * from FooBar;

-- ERROR:  relation "foobar" does not exist
-- LINE 1: select * from FooBar;
--                       ^

select * from "FooBar";
--  id | email
-- ----+-------
-- (0 rows)
```

## Database logging

The instance of the prisma client that is used throughout a Redwoodjs application is found in:

`./api/src/lib/db.ts`

You can setup custom logging to inspect the SQL that Prisma generates:

```ts
import { PrismaClient, Prisma } from '@prisma/client'

import { emitLogLevels, handlePrismaLogging } from '@redwoodjs/api/logger'

import { logger } from './logger'

export const db = new PrismaClient<
  Prisma.PrismaClientOptions,
  'info' | 'warn' | 'error' | 'query'
>({
  log: emitLogLevels(['info', 'warn', 'error', 'query']),
})

db.$on('query', (e: Prisma.QueryEvent) => {
  console.log(' ')
  console.log('----------------------------')
  console.log('Query: ' + e.query)
  console.log('Params: ' + e.params)
  console.log('Duration: ' + e.duration + 'ms')
  console.log('----------------------------')
  console.log(' ')
})

handlePrismaLogging({
  db,
  logger,
  logLevels: ['info', 'warn', 'error', 'query'],
})
```

## Resources

- https://www.prisma.io/docs/concepts/overview/what-is-prisma/data-modeling
- https://www.prisma.io/docs/concepts/components/prisma-schema/data-model
- https://www.prisma.io/docs/guides/database/developing-with-prisma-migrate
- https://www.prisma.io/docs/guides/database/developing-with-prisma-migrate/enable-native-database-functions
- https://www.prisma.io/docs/concepts/components/prisma-client/working-with-prismaclient/logging
- https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#event-types
