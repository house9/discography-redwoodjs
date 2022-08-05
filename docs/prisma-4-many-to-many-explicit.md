# Prisma: many-to-many (explicit)

## Model

A `Musician` has many `bands` that they play music with

A `Band` has many `members` over the years, some still active and others not

```ts
// api/db/schema.prisma

model Band {
  @@map("bands")

  id String @id @default(dbgenerated("public.uuid_generate_v4()")) @db.Uuid

  name String
  members BandMember[]
}

model Musician {
  @@map("musicians")

  id String @id @default(dbgenerated("public.uuid_generate_v4()")) @db.Uuid

  name String
  members BandMember[]
}

// Explicit many-to-many Band <-> Musician
model BandMember {
  @@map("band_members")

  id String @id @default(dbgenerated("public.uuid_generate_v4()")) @db.Uuid

  active Boolean @default(true)
  bandId String @map("band_id") @db.Uuid
  band Band @relation(fields: [bandId], references: [id])
  musicianId String @map("musician_id") @db.Uuid
  musician Musician @relation(fields: [musicianId], references: [id])
}
```

Key points
- `Band` has an array of `members`
  - `members BandMember[]`
- `Musician` has an array of `members`
  - `members BandMember[]`
- `BandMember` represents the join between `Band` and `Musician`
  - it "belongs to" each
  - `bandId String @map("band_id") @db.Uuid`
    - this adds a column `band_id` to the `band_members` table
  - `band Band @relation(fields: [bandId], references: [id])`
    - this creates the relationship in typescript
    - this adds the foreign key in the database
  - `musicianId String @map("musician_id") @db.Uuid`
    - this adds a column `musician_id` to the `band_members` table
  - `musician Musician @relation(fields: [musicianId], references: [id])`
    - this creates the relationship in typescript
    - this adds the foreign key in the database
## Creating records

```ts
// create Band
const gojira = await db.band.create({ data: { name: 'Gojira' } })

// create Musician
const frank = await db.musician.create({ data: { name: 'Frank Risso' } })

// assign Musician to the band: explicit many-to-many
await db.bandMember.create({
  data: {
    bandId: gojira.id,
    musicianId: frank.id
  },
})

// set the membership to inactive
const member = await db.bandMember.findFirst({
  where: { bandId: gojira.id, musicianId: frank.id }
})
await db.bandMember.update({
  where: { id: member.id },
  data: { active: false },
})

// remove band member: explicit many-to-many
await db.band.update({
  where: { id: gojira.id },
  data: {
    members: {
      deleteMany: {
        musicianId: frank.id,
      },
    },
  },
})

// create a band along with some of its members
// create active members (default)
// create inactive members
// connect to existing musicians
const jason = await db.musician.create({ data: { name: 'Jason Newsted ' } })
const metallica = await db.band.create({
  data: {
    name: 'Metallica',
    members: {
      create: [
        {
          musician: { create: { name: 'James Hetfield' } },
        },
        {
          active: false,
          musician: { connect: { id: jason.id } },
        },
        {
          active: false,
          musician: { create: { name: 'Ron McGovney' } },
        },
      ],
    },
  },
})
```


## Querying records

```ts
const gojira = await db.band.findFirst({
  where: { name: 'Gojira' },
  include: {
    members: {
      include: { musician: true },
    },
  }
})

gojira.members.forEach((member) => {
  console.log(`  - [${member.active}] ${member.musician.name}`)
})

const mario = await db.musician.findFirst({
  where: { name: 'Mario Duplantier' },
  include: {
    members: {
      include: { band: true }
    }
  }
})

const mariosBands = mario.members.map((member) => member.band)
mariosBands.forEach((band) => console.log(band.name))
```

## Of interest

- Explicit many-to-many just uses standard model mapped to a database table
- Prisma does not support has_many through, not sure if they are planning to or not?

## Resources

- https://www.prisma.io/docs/concepts/components/prisma-schema/relations/many-to-many-relations#explicit-many-to-many-relations
- https://redwoodjs.com/docs/schema-relations
