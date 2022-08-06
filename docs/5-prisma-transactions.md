# Prisma: transactions

Prisma schema file can be found at `./api/db/schema.prisma`

## Nested writes

Nested writes are already done as a single transaction:

```ts
// Given a Band
const gojira = await db.band.create({ data: { name: 'Gojira' } })

// create an album with nested songs
const magma = await db.album.create({
  data: {
    name: 'Magma',
    bandId: gojira.id,
    songs: {
      create: [
        { name: 'The Shooting Star' },
        { name: 'Silvera' },
      ],
    },
  }
})
```

```sql
BEGIN

INSERT INTO "public"."albums" ("name","band_id") VALUES ($1,$2) RETURNING "public"."albums"."id"
-- Params: ["Magma","201b2da3-cccf-40c8-bb9e-d8da48e2c928"]

INSERT INTO "public"."songs" ("album_id","name") VALUES ($1,$2) RETURNING "public"."songs"."id"
-- Params: ["dbf9bd49-765a-4cf7-933f-cf8917d0ebb6","The Shooting Star"]

INSERT INTO "public"."songs" ("album_id","name") VALUES ($1,$2) RETURNING "public"."songs"."id"
-- Params: ["dbf9bd49-765a-4cf7-933f-cf8917d0ebb6","Silvera"]

SELECT "public"."albums"."id", "public"."albums"."name", "public"."albums"."band_id" FROM "public"."albums" WHERE "public"."albums"."id" = $1 LIMIT $2 OFFSET $3
-- Params: ["dbf9bd49-765a-4cf7-933f-cf8917d0ebb6",1,0]

COMMIT
```

## Explicit transactions

### Promise array

You can execute an array of database operations all in the same transaction:

```ts
// create ids before hand
const bandId = v4() // requires: import { v4 } from 'uuid'
// create promises for each db operation (no await)
const createBand = db.band.create({
  data: { id: bandId, name: 'Black Sabbath' },
})
const createAlbumBlackSabbath = db.album.create({
  data: { bandId: bandId, name: 'Black Sabbath' },
})
const createAlbumParanoid = db.album.create({
  data: { bandId: bandId, name: 'Paranoid' },
})

// execute all of the promises in a transation
await db.$transaction([
  createBand,
  createAlbumBlackSabbath,
  createAlbumParanoid,
])

// query data after the transation is over
return db.band.findUnique({
  where: { id: bandId },
  include: { albums: true },
})
```

```sql
BEGIN

INSERT INTO "public"."bands" ("id","name") VALUES ($1,$2) RETURNING "public"."bands"."id"
-- Params: ["701c95c4-a6ec-4973-9105-992caff72495","Black Sabbath"]
SELECT "public"."bands"."id", "public"."bands"."name" FROM "public"."bands" WHERE "public"."bands"."id" = $1 LIMIT $2 OFFSET $3
-- Params: ["701c95c4-a6ec-4973-9105-992caff72495",1,0]
INSERT INTO "public"."albums" ("name","band_id") VALUES ($1,$2) RETURNING "public"."albums"."id"
-- Params: ["Black Sabbath","701c95c4-a6ec-4973-9105-992caff72495"]
SELECT "public"."albums"."id", "public"."albums"."name", "public"."albums"."band_id" FROM "public"."albums" WHERE "public"."albums"."id" = $1 LIMIT $2 OFFSET $3
-- Params: ["c6874c7b-24fb-438e-b17f-f4d6b6c15609",1,0]
INSERT INTO "public"."albums" ("name","band_id") VALUES ($1,$2) RETURNING "public"."albums"."id"
-- Params: ["Paranoid","701c95c4-a6ec-4973-9105-992caff72495"]
SELECT "public"."albums"."id", "public"."albums"."name", "public"."albums"."band_id" FROM "public"."albums" WHERE "public"."albums"."id" = $1 LIMIT $2 OFFSET $3
-- Params: ["b3fc548d-e3bb-4510-84a1-f1b982269c70",1,0]
COMMIT
```

### Interactive Transactions: aka 'Unit of work'

You must add `interactiveTransactions` to the prisma `previewFeatures`

```ts
generator client {
  provider      = "prisma-client-js"
  binaryTargets = "native"
  previewFeatures = ["interactiveTransactions"]
}
```

```ts
async function createBand(name: string, albums: Album[]) {
  const unitOfWork = async (tx: PrismaClient) => {
    const band = await tx.band.create({
      data: { name: name },
    })

    albums.forEach(async(albumName) => {
      await tx.album.create({
        data: { bandId: band.id, name: albumName },
      })
    })

    return tx.band.findUnique({
      where: { id: band.id },
      include: { albums: true },
    })
  }

  return db.$transaction(unitOfWork)
}

const blackSabbath = await createBand('Black Sabbath', [
  'Black Sabbath',
  'Paranoid',
  'Master of Reality',
  'Vol. 4',
])
console.log(blackSabbath.name)
```

## Resources

- https://www.prisma.io/docs/concepts/components/prisma-client/transactions
- https://www.prisma.io/docs/guides/performance-and-optimization/prisma-client-transactions-guide
