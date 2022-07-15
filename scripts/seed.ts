import { db } from 'api/src/lib/db'

export default async () => {
  const gojira = await db.band.create({
    data: {
      name: 'Gojira',
      albums: {
        create: [
          {
            name: 'Magma',
            songs: {
              create: [
                { name: 'The Shooting Star' },
                { name: 'Silvera' },
                { name: 'The Cell' },
                { name: 'Stranded' },
              ],
            },
          },
        ],
      },
    },
  })
  console.log(`CREATED ${gojira.name}`)

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
        ],
      },
    },
  })
  console.log(`CREATED ${metallica.name}`)

  const cliff = await db.musician.create({ data: { name: 'Cliff Burton' } })
  const dave = await db.musician.create({ data: { name: 'Dave Mustaine' } })
  const jason = await db.musician.create({ data: { name: 'Jason Newsted ' } })
  const ron = await db.musician.create({ data: { name: 'Ron McGovney' } })
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
  await db.bandMember.create({
    data: {
      active: false,
      bandId: metallica.id,
      musicianId: ron.id,
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
}
