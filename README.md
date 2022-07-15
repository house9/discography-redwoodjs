# ?

```
yarn install
```

```
docker-compose up -d
yarn rw prisma migrate dev --name xxxx
yarn rw prisma migrate reset --force
yarn redwood prisma db seed
```

```
yarn rw console

const gojira1 = await db.band.findFirst({ where: { name: 'Gojira' }})
const gojira2 = await db.band.findFirst({ where: { name: 'Gojira' }, include: { albums: true }})
const gojira3 = await db.band.findFirst({ where: { name: 'Gojira' }, include: { albums: { include: { songs: true }} }})
const gojira = await db.band.findUnique({ where: { id: gojira1.id }})

const bands = await db.band.findMany({ include: { albums: { include: { songs: true }}}});
bands.forEach((band) => {
  console.log(`======== ${band.name}`);
  band.albums.forEach((album) => {
    console.log(`  ${album.name}`);
    album.songs.forEach((song) => {
      console.log(`  - ${song.name}`);
    })
  })
});


const bands = await db.band.findMany({ include: { members: { include: { musician: true } } } });
bands.forEach((band) => {
  console.log(`======== ${band.name}`);
  band.members.forEach((member) => {
    console.log(`  ${member.musician.name}`);
  })
})
```

```
/Applications/Postgres.app/Contents/Versions/14/bin/psql $DATABASE_URL
```

## Resources

- https://redwoodjs.com
- https://www.prisma.io/docs/concepts/components/prisma-schema/data-model
