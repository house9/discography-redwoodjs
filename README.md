# Discography

Sample application for learning [Redwood.js](https://redwoodjs.com/) and [Prisma.js](https://www.prisma.io/)

## Get started
```sh
# install dependencies
yarn install
# set up config
cp .env.example .env
# start up database servers
docker-compose up -d
# rebuild database, migrations and seed
yarn rw prisma migrate reset --force
# development console
yarn rw console
# development server
yarn rw dev
```

## Sample application

A naive implementation for managing Bands and their Discographies.

We are ignoring compilation albums (more than one band) for simplicity.

### Data model

Our sample application is running a postgres database inside a Docker container.

#### The database schema:

![Database](./db-schema-diagram.png)

## Learning

I recommend reading the links listed in the Resources section of each document:

- Data modeling and querying with Prisma
  - [Intro](./docs/prisma-1-intro.md)
  - [one-to-many](./docs/prisma-2-one-to-many.md)
  - [many-to-many (implicit)](./docs/prisma-3-many-to-many-implicit.md)
  - [many-to-many (explicit)](./docs/prisma-4-many-to-many-explicit.md)
  - TODO: database transactions
  - see also: [./scripts/seed.ts](./scripts/seed.ts)
- TODO: services
- TODO: GraphQL
- TODO: front end
## Resources

- https://redwoodjs.com
- https://www.prisma.io/docs/concepts/components/prisma-schema/data-model

---

## TODO:
- `docs/prisma-1-intro.md`
  - check out difference between `pgcrypto` and `uuid-ossp`, which should we prefer in these docs?
  - research what the `handlePrismaLogging` is doing
  - add seeding `yarn redwood prisma db seed`

## Notes


```
/Applications/Postgres.app/Contents/Versions/14/bin/psql $DATABASE_URL
```
