# Redwood Record

Similar to Active Record models

## Setup

- install package
  - `yarn workspace api add @redwoodjs/record`
- Add model files to `api/src/models`
  - these are very simple as everything has already been specified in your `schema.prisma` file
- Run initializer
  - `yarn rw record init`
  - will need to run everytime schema file or models directory changes?

## Notes

Ignore 'resolving errors' when `require` from redwood console

### Create

```ts
const { Band } = require('./api/src/models')
const { v4 } = require('uuid')

// create does not work when specifying the id (uuid)
const band = await Band.create({ id: v4(), name: 'TESTING' })
// queries for the record and then rolls back the transaction
// => undefined

const band = await Band.create({ name: 'TESTING' })
console.log(band.attributes)
// => { id: '532bd2d6-1d4c-4cf6-a295-71a5c23cfc82', name: 'TESTING' }

// without any validations setup
const newBand = Band.build({ name: null })
newBand.hasError // => false
await newBand.save() // => false
newBand.hasError // => true
newBand.errors.name // => []
newBand.errors.base // => stack trace

const newBand = Band.build({ name: null })
await newBand.save({ throw: true }) // => exception !

// with validations: validates name presence: true
const newBand = Band.build({ name: null }) // { name: '' } is ok but should not be...
newBand.hasError // => false
await newBand.save() // => false
newBand.hasError // => true
newBand.errors.name // => [ 'Name must be present' ]
```

### Find

```ts
const { Band } = require('./api/src/models')

const bandByName = await Band.findBy({ name: 'Gojira' })
const bandById = await Band.find(bandByName.id)
const gojira = await Band.first({ name: { startsWith: 'Go' } })

const bands = await Band.where({ name: { startsWith: 'Black' } })
const bands = await Band.all({ orderBy: { name: 'asc' } })
const bandNames = bands.map((band) => band.name)
```

#### Many to Many: Implicit

```ts
const { Song } = require('./api/src/models')

const songs = await Song.all({ orderBy: { name: 'asc' } })
const writingCredits = await Promise.all(songs.map(async(song) => await song.writingCredits.all()))
// N+1 queries out the wazzo :(
const musicianNames = writingCredits.flat().map((musician) => musician.name)
const uniqueMusicianNames = [...new Set(musicianNames)].sort()
```
#### Many to Many: Explicit

has-many through is in the works

```ts
// TODO: ......
const bands = await Band.all({ orderBy: { name: 'asc' } })
const members = bands.map((band) => band.member)

```

## Resources

- https://redwoodjs.com/docs/redwoodrecord

