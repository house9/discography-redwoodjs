# Prisma: many-to-many (implicit)

## Model

A `Song` has many `writingCredits` (Multiple musicians collaborating on the same song)

A `Musician` has many `songs` they have written

```ts
// api/db/schema.prisma

model Musician {
  @@map("musicians")

  id String @id @default(dbgenerated("public.uuid_generate_v4()")) @db.Uuid

  name String
  songs Song[]
}

model Song {
  @@map("songs")

  id String @id @default(dbgenerated("public.uuid_generate_v4()")) @db.Uuid

  albumId String @map("album_id") @db.Uuid
  album Album @relation(fields: [albumId], references: [id])
  name String
  writingCredits Musician[]
}
```

Key points
- `Song` has an array of `writingCredits`
  - `writingCredits Musician[]`
  - The name of the property can be named what ever you like, match the type if no better option is apparent
    - i.e. `musicians Musician[]`
- `Musician` has an array of `songs`
  - `songs Song[]`
- No join model exists, only the underlying database table
- Your code does not need to concern itself with the underlying join table

## Creating records

```ts
// given a band with an album
const gojira = await db.band.create({ data: { name: 'Gojira' } })
const magma = await db.album.create({ data: { name: 'Magma', bandId: gojira.id } })

// create a new musician
const joe = await db.musician.create({ data: { name: 'Joe Duplantier' } })

// create a new song
const silvera = await db.song.create({
  data: { name: 'Silvera', albumId: magma.id },
})

// assign writing credits (implicit many-to-many)
await db.song.update({
  where: { id: silvera.id },
  data: {
    writingCredits: { connect: { id: joe.id } },
  },
})

// remove the writing credit
// - disconnect: this deletes the join record from the database
await db.song.update({
  where: { id: silvera.id },
  data: {
    writingCredits: { disconnect: { id: joe.id } },
  },
})

// create a new musician
// create a new song with writing credit (Pray)
// add writing credit to existing song (Silvera)
const mario = await db.musician.create({
  data: {
    name: 'Mario Duplantier',
    songs: {
      create: [{ name: 'Pray', albumId: magma.id }],
      connect: [{ id: silvera.id }],
    }
  },
})
```


## Querying records

```ts
const silvera = await db.song.findFirst({
  where: { name: 'Silvera' },
  include: {
    album: true,
    writingCredits: true,
  }
})

console.log(silvera.album.name)
console.log(silvera)
silvera.writingCredits.forEach((credit) => console.log(`  - ${credit.name}`))

const mario = await db.musician.findFirst({
  where: { name: 'Mario Duplantier' },
  include: {
    songs: {
      include: {
        album: true
      }
    }
  }
})

console.log(mario)
mario.songs.forEach((song) => console.log(`  - ${song.album.name}: ${song.name}`))
```

## Of interest

Prisma generates implicit many-to-many database tables, but no model is defined in the schema file

- naming conventions:
  - table: `_Table1ToTable2`, i.e. `_MusicianToSong`
  - columns: `A` and `B` as column names for the foreign keys

My preference: Avoid implicit many-to-many and use [explicit many-to-many](./prisma-4-many-to-many-explicit.md) instead.


## Resources

- https://www.prisma.io/docs/concepts/components/prisma-schema/relations/many-to-many-relations#implicit-many-to-many-relations
- https://redwoodjs.com/docs/schema-relations
