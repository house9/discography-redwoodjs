import { db } from 'api/src/lib/db'

export default async () => {
  // !!! this seed is not idempotent, for demonstration purposes only
  const gojira = await seedGojira()
  console.log(`CREATED ${gojira.name}`)

  // const metallica = await seedMetallica()
  // console.log(`CREATED ${metallica.name}`)

  await runGojiraQueries(gojira.id)
}

async function seedGojira() {
  // == create Band
  const gojira = await db.band.create({ data: { name: 'Gojira' } })

  // == create Album: belongs_to Band, Band has_many Albums
  const magma = await db.album.create({
    data: {
      name: 'Magma',
      bandId: gojira.id,
    },
  })

  // == create Songs: belongs_to Album, Album has_many Songs
  // side one: SongUncheckedCreateInput { ablumId: string }
  const shootingStar = await db.song.create({
    data: { name: 'The Shooting Star', albumId: magma.id },
  })
  const silvera = await db.song.create({
    data: { name: 'Silvera', albumId: magma.id },
  })
  const theCell = await db.song.create({
    data: { name: 'The Cell', albumId: magma.id },
  })
  const stranded = await db.song.create({
    data: { name: 'Stranded', albumId: magma.id },
  })
  await db.song.create({ data: { name: 'Yellow Stone', albumId: magma.id } })

  // side two: SongCreateInput
  // { album: AlbumCreateNestedOneWithoutSongsInput: { connect?: AlbumWhereUniqueInput } }
  await db.song.create({
    data: { name: 'Magma', album: { connect: { id: magma.id } } },
  })
  // the rest of side two songs...
  await db.song.createMany({
    data: [
      { name: 'Pray', albumId: magma.id },
      { name: 'Only Pain', albumId: magma.id },
      { name: 'Low Lands', albumId: magma.id },
    ],
  })

  // == create Musician
  const joe = await db.musician.create({ data: { name: 'Joe Duplantier' } })

  // assign Musician to a band: explicit many-to-many
  await db.bandMember.create({
    data: {
      active: true,
      bandId: gojira.id,
      musicianId: joe.id,
    },
  })

  // update the writing credits on two songs: implicit many-to-many
  await db.song.update({
    where: { id: theCell.id },
    data: {
      writingCredits: { connect: { id: joe.id } },
    },
  })
  await db.song.update({
    where: { id: stranded.id },
    data: {
      writingCredits: { connect: { id: joe.id } },
    },
  })

  // create Musician
  //   and create a new Song with writing credits for this Musician
  //   and apply writing credits to existing songs: implicit many-to-many
  //   and assign to a band by creating a BandMember record: explicit many-to-many
  const mario = await db.musician.create({
    data: {
      name: 'Mario Duplantier',
      songs: {
        create: [{ name: 'Liberation', albumId: magma.id }],
        connect: [
          { id: theCell.id },
          { id: silvera.id },
          { id: shootingStar.id },
        ],
      },
      members: {
        create: {
          bandId: gojira.id,
        },
      },
    },
  })

  // add to writing credits
  await db.song.update({
    where: { id: stranded.id },
    data: {
      writingCredits: {
        connect: {
          id: mario.id,
        },
      },
    },
  })

  // remove writing credit: delete implicit many-to-many
  await db.song.update({
    where: { id: shootingStar.id },
    data: {
      writingCredits: {
        disconnect: {
          id: mario.id,
        },
      },
    },
  })

  // == create Musician
  const frank = await db.musician.create({ data: { name: 'Frank Risso' } })

  // assign Musician to the band: explicit many-to-many
  await db.bandMember.create({
    data: { bandId: gojira.id, musicianId: frank.id },
  })
  // remove from band: explicit many-to-many
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

  return gojira
}

async function runGojiraQueries(bandId) {
  const gojira = await db.band.findUnique({ where: { id: bandId } })
  console.log(gojira.id, gojira.name)

  const gojira1 = await db.band.findFirst({ where: { name: 'Gojira' } })
  console.log(gojira1.id, gojira1.name)

  const gojira2 = await db.band.findFirst({
    where: { name: 'Gojira' },
    include: { albums: true },
  })
  console.log(gojira2.id, gojira2.name, gojira2.albums.length)

  const gojira3 = await db.band.findFirst({
    where: { name: 'Gojira' },
    include: {
      members: {
        include: { musician: true },
      },
      albums: {
        include: {
          songs: {
            include: {
              writingCredits: true,
            },
          },
        },
      },
    },
  })
  console.log(gojira3.id, gojira3.name, gojira3.albums.length)

  console.log(' ')
  gojira3.albums.forEach((album) => {
    console.log(`  ${album.name}`)
    album.songs.forEach((song) => {
      console.log(`  - ${song.name}`)
      song.writingCredits.forEach((credit) => {
        console.log(`    * ${credit.name}`)
      })
    })
  })

  console.log(' ')
  gojira3.members.forEach((member) => {
    console.log(member.musician.name)
  })
}

async function seedMetallica() {
  const jason = await db.musician.create({ data: { name: 'Jason Newsted ' } })
  const metallica = await db.band.create({
    data: {
      name: 'Metallica',
      albums: {
        create: [
          {
            name: "Kill 'Em All",
            songs: {
              create: [
                { name: 'Hit the Lights' },
                { name: 'The Four Horsemen' },
                { name: 'Motorbreath' },
                { name: 'Jump in the Fire' },
                { name: '(Anesthesia)-Pulling Teeth' },
                { name: 'Whiplash' },
                { name: 'Phantom Lord' },
                { name: 'No Remorse' },
                { name: 'Seek & Destroy' },
                { name: 'Metal Militia' },
              ],
            },
          },
        ],
      },
      members: {
        create: [
          {
            musician: {
              create: { name: 'James Hetfield' },
            },
          },
          {
            musician: {
              create: { name: 'Kirk Hammett' },
            },
          },
          {
            musician: {
              create: { name: 'Robert Trujillo' },
            },
          },
          {
            musician: {
              create: { name: 'Lars Ulrich' },
            },
          },
          {
            active: false,
            musician: {
              connect: { id: jason.id },
            },
          },
          {
            active: false,
            musician: {
              create: { name: 'Ron McGovney' },
            },
          },
        ],
      },
    },
  })
  console.log(`CREATED ${metallica.name}`)

  const cliff = await db.musician.create({ data: { name: 'Cliff Burton' } })
  const dave = await db.musician.create({ data: { name: 'Dave Mustaine' } })

  await db.bandMember.create({
    data: {
      active: false,
      bandId: metallica.id,
      musicianId: cliff.id,
    },
  })
  await db.bandMember.create({
    data: {
      active: false,
      bandId: metallica.id,
      musicianId: dave.id,
    },
  })
  await db.bandMember.create({
    data: {
      active: false,
      bandId: metallica.id,
      musicianId: jason.id,
    },
  })

  const rideTheLightning = await db.album.create({
    data: {
      name: 'Ride the Lightning',
      bandId: metallica.id,
    },
  })
  console.log(`CREATED ${rideTheLightning.name}`)

  await db.song.create({
    data: { name: 'Fight Fire with Fire', albumId: rideTheLightning.id },
  })
  await db.song.create({
    data: { name: 'Ride the Lightning', albumId: rideTheLightning.id },
  })
  await db.song.create({
    data: { name: 'For Whom the Bell Tolls', albumId: rideTheLightning.id },
  })
  await db.song.create({
    data: { name: 'Fade to Black', albumId: rideTheLightning.id },
  })
  await db.song.create({
    data: { name: 'Trapped Under Ice', albumId: rideTheLightning.id },
  })
  await db.song.create({
    data: { name: 'Escape', albumId: rideTheLightning.id },
  })
  await db.song.create({
    data: { name: 'Creeping Death', albumId: rideTheLightning.id },
  })
  await db.song.create({
    data: {
      name: 'The Call of Ktulu',
      albumId: rideTheLightning.id,
      // writingCredits: [cliff.id], TODO: ????????????????????
    },
  })
  const rideTheLightningSongs = await db.song.findMany({
    where: { albumId: rideTheLightning.id },
  })
  console.log(`CREATED ${rideTheLightningSongs.length} songs`)

  return { name: 'TODO: Metallica' }
}
