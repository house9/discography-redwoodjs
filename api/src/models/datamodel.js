module.exports = {
  enums: [],
  models: [
    {
      name: "Band",
      dbName: "bands",
      fields: [
        {
          name: "id",
          kind: "scalar",
          isList: false,
          isRequired: true,
          isUnique: false,
          isId: true,
          isReadOnly: false,
          hasDefaultValue: true,
          type: "String",
          default: {
            name: "dbgenerated",
            args: [
              "public.uuid_generate_v4()"
            ]
          },
          isGenerated: false,
          isUpdatedAt: false
        },
        {
          name: "name",
          kind: "scalar",
          isList: false,
          isRequired: true,
          isUnique: false,
          isId: false,
          isReadOnly: false,
          hasDefaultValue: false,
          type: "String",
          isGenerated: false,
          isUpdatedAt: false
        },
        {
          name: "albums",
          kind: "object",
          isList: true,
          isRequired: true,
          isUnique: false,
          isId: false,
          isReadOnly: false,
          hasDefaultValue: false,
          type: "Album",
          relationName: "AlbumToBand",
          relationFromFields: [],
          relationToFields: [],
          isGenerated: false,
          isUpdatedAt: false
        },
        {
          name: "members",
          kind: "object",
          isList: true,
          isRequired: true,
          isUnique: false,
          isId: false,
          isReadOnly: false,
          hasDefaultValue: false,
          type: "BandMember",
          relationName: "BandToBandMember",
          relationFromFields: [],
          relationToFields: [],
          isGenerated: false,
          isUpdatedAt: false
        }
      ],
      primaryKey: null,
      uniqueFields: [],
      uniqueIndexes: [],
      isGenerated: false
    },
    {
      name: "Album",
      dbName: "albums",
      fields: [
        {
          name: "id",
          kind: "scalar",
          isList: false,
          isRequired: true,
          isUnique: false,
          isId: true,
          isReadOnly: false,
          hasDefaultValue: true,
          type: "String",
          default: {
            name: "dbgenerated",
            args: [
              "public.uuid_generate_v4()"
            ]
          },
          isGenerated: false,
          isUpdatedAt: false
        },
        {
          name: "name",
          kind: "scalar",
          isList: false,
          isRequired: true,
          isUnique: false,
          isId: false,
          isReadOnly: false,
          hasDefaultValue: false,
          type: "String",
          isGenerated: false,
          isUpdatedAt: false
        },
        {
          name: "bandId",
          kind: "scalar",
          isList: false,
          isRequired: true,
          isUnique: false,
          isId: false,
          isReadOnly: true,
          hasDefaultValue: false,
          type: "String",
          isGenerated: false,
          isUpdatedAt: false
        },
        {
          name: "band",
          kind: "object",
          isList: false,
          isRequired: true,
          isUnique: false,
          isId: false,
          isReadOnly: false,
          hasDefaultValue: false,
          type: "Band",
          relationName: "AlbumToBand",
          relationFromFields: [
            "bandId"
          ],
          relationToFields: [
            "id"
          ],
          isGenerated: false,
          isUpdatedAt: false
        },
        {
          name: "songs",
          kind: "object",
          isList: true,
          isRequired: true,
          isUnique: false,
          isId: false,
          isReadOnly: false,
          hasDefaultValue: false,
          type: "Song",
          relationName: "AlbumToSong",
          relationFromFields: [],
          relationToFields: [],
          isGenerated: false,
          isUpdatedAt: false
        }
      ],
      primaryKey: null,
      uniqueFields: [],
      uniqueIndexes: [],
      isGenerated: false
    },
    {
      name: "Song",
      dbName: "songs",
      fields: [
        {
          name: "id",
          kind: "scalar",
          isList: false,
          isRequired: true,
          isUnique: false,
          isId: true,
          isReadOnly: false,
          hasDefaultValue: true,
          type: "String",
          default: {
            name: "dbgenerated",
            args: [
              "public.uuid_generate_v4()"
            ]
          },
          isGenerated: false,
          isUpdatedAt: false
        },
        {
          name: "albumId",
          kind: "scalar",
          isList: false,
          isRequired: true,
          isUnique: false,
          isId: false,
          isReadOnly: true,
          hasDefaultValue: false,
          type: "String",
          isGenerated: false,
          isUpdatedAt: false
        },
        {
          name: "album",
          kind: "object",
          isList: false,
          isRequired: true,
          isUnique: false,
          isId: false,
          isReadOnly: false,
          hasDefaultValue: false,
          type: "Album",
          relationName: "AlbumToSong",
          relationFromFields: [
            "albumId"
          ],
          relationToFields: [
            "id"
          ],
          isGenerated: false,
          isUpdatedAt: false
        },
        {
          name: "name",
          kind: "scalar",
          isList: false,
          isRequired: true,
          isUnique: false,
          isId: false,
          isReadOnly: false,
          hasDefaultValue: false,
          type: "String",
          isGenerated: false,
          isUpdatedAt: false
        },
        {
          name: "writingCredits",
          kind: "object",
          isList: true,
          isRequired: true,
          isUnique: false,
          isId: false,
          isReadOnly: false,
          hasDefaultValue: false,
          type: "Musician",
          relationName: "MusicianToSong",
          relationFromFields: [],
          relationToFields: [
            "id"
          ],
          isGenerated: false,
          isUpdatedAt: false
        }
      ],
      primaryKey: null,
      uniqueFields: [],
      uniqueIndexes: [],
      isGenerated: false
    },
    {
      name: "Musician",
      dbName: "musicians",
      fields: [
        {
          name: "id",
          kind: "scalar",
          isList: false,
          isRequired: true,
          isUnique: false,
          isId: true,
          isReadOnly: false,
          hasDefaultValue: true,
          type: "String",
          default: {
            name: "dbgenerated",
            args: [
              "public.uuid_generate_v4()"
            ]
          },
          isGenerated: false,
          isUpdatedAt: false
        },
        {
          name: "name",
          kind: "scalar",
          isList: false,
          isRequired: true,
          isUnique: false,
          isId: false,
          isReadOnly: false,
          hasDefaultValue: false,
          type: "String",
          isGenerated: false,
          isUpdatedAt: false
        },
        {
          name: "members",
          kind: "object",
          isList: true,
          isRequired: true,
          isUnique: false,
          isId: false,
          isReadOnly: false,
          hasDefaultValue: false,
          type: "BandMember",
          relationName: "BandMemberToMusician",
          relationFromFields: [],
          relationToFields: [],
          isGenerated: false,
          isUpdatedAt: false
        },
        {
          name: "songs",
          kind: "object",
          isList: true,
          isRequired: true,
          isUnique: false,
          isId: false,
          isReadOnly: false,
          hasDefaultValue: false,
          type: "Song",
          relationName: "MusicianToSong",
          relationFromFields: [],
          relationToFields: [
            "id"
          ],
          isGenerated: false,
          isUpdatedAt: false
        }
      ],
      primaryKey: null,
      uniqueFields: [],
      uniqueIndexes: [],
      isGenerated: false
    },
    {
      name: "BandMember",
      dbName: "band_members",
      fields: [
        {
          name: "id",
          kind: "scalar",
          isList: false,
          isRequired: true,
          isUnique: false,
          isId: true,
          isReadOnly: false,
          hasDefaultValue: true,
          type: "String",
          default: {
            name: "dbgenerated",
            args: [
              "public.uuid_generate_v4()"
            ]
          },
          isGenerated: false,
          isUpdatedAt: false
        },
        {
          name: "active",
          kind: "scalar",
          isList: false,
          isRequired: true,
          isUnique: false,
          isId: false,
          isReadOnly: false,
          hasDefaultValue: true,
          type: "Boolean",
          default: true,
          isGenerated: false,
          isUpdatedAt: false
        },
        {
          name: "bandId",
          kind: "scalar",
          isList: false,
          isRequired: true,
          isUnique: false,
          isId: false,
          isReadOnly: true,
          hasDefaultValue: false,
          type: "String",
          isGenerated: false,
          isUpdatedAt: false
        },
        {
          name: "band",
          kind: "object",
          isList: false,
          isRequired: true,
          isUnique: false,
          isId: false,
          isReadOnly: false,
          hasDefaultValue: false,
          type: "Band",
          relationName: "BandToBandMember",
          relationFromFields: [
            "bandId"
          ],
          relationToFields: [
            "id"
          ],
          isGenerated: false,
          isUpdatedAt: false
        },
        {
          name: "musicianId",
          kind: "scalar",
          isList: false,
          isRequired: true,
          isUnique: false,
          isId: false,
          isReadOnly: true,
          hasDefaultValue: false,
          type: "String",
          isGenerated: false,
          isUpdatedAt: false
        },
        {
          name: "musician",
          kind: "object",
          isList: false,
          isRequired: true,
          isUnique: false,
          isId: false,
          isReadOnly: false,
          hasDefaultValue: false,
          type: "Musician",
          relationName: "BandMemberToMusician",
          relationFromFields: [
            "musicianId"
          ],
          relationToFields: [
            "id"
          ],
          isGenerated: false,
          isUpdatedAt: false
        }
      ],
      primaryKey: null,
      uniqueFields: [],
      uniqueIndexes: [],
      isGenerated: false
    }
  ],
  types: []
};
