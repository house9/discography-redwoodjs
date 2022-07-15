/*
  Warnings:

  - Added the required column `band_id` to the `albums` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "albums" ADD COLUMN     "band_id" UUID NOT NULL,
ALTER COLUMN "id" SET DEFAULT public.uuid_generate_v4();

-- AlterTable
ALTER TABLE "songs" ALTER COLUMN "id" SET DEFAULT public.uuid_generate_v4();

-- CreateTable
CREATE TABLE "bands" (
    "id" UUID NOT NULL DEFAULT public.uuid_generate_v4(),
    "name" TEXT NOT NULL,

    CONSTRAINT "bands_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "musicians" (
    "id" UUID NOT NULL DEFAULT public.uuid_generate_v4(),
    "name" TEXT NOT NULL,

    CONSTRAINT "musicians_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "band_members" (
    "id" UUID NOT NULL DEFAULT public.uuid_generate_v4(),
    "active" BOOLEAN NOT NULL DEFAULT true,
    "band_id" UUID NOT NULL,
    "musician_id" UUID NOT NULL,

    CONSTRAINT "band_members_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_MusicianToSong" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_MusicianToSong_AB_unique" ON "_MusicianToSong"("A", "B");

-- CreateIndex
CREATE INDEX "_MusicianToSong_B_index" ON "_MusicianToSong"("B");

-- AddForeignKey
ALTER TABLE "albums" ADD CONSTRAINT "albums_band_id_fkey" FOREIGN KEY ("band_id") REFERENCES "bands"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "band_members" ADD CONSTRAINT "band_members_band_id_fkey" FOREIGN KEY ("band_id") REFERENCES "bands"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "band_members" ADD CONSTRAINT "band_members_musician_id_fkey" FOREIGN KEY ("musician_id") REFERENCES "musicians"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MusicianToSong" ADD CONSTRAINT "_MusicianToSong_A_fkey" FOREIGN KEY ("A") REFERENCES "musicians"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MusicianToSong" ADD CONSTRAINT "_MusicianToSong_B_fkey" FOREIGN KEY ("B") REFERENCES "songs"("id") ON DELETE CASCADE ON UPDATE CASCADE;
