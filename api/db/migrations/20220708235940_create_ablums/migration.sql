-- CreateTable
CREATE TABLE "albums" (
    "id" UUID NOT NULL DEFAULT public.uuid_generate_v4(),
    "name" TEXT NOT NULL,

    CONSTRAINT "albums_pkey" PRIMARY KEY ("id")
);
