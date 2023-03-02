-- CreateTable
CREATE TABLE "Note" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "colour" TEXT DEFAULT 'transparent',
    "bgImage" TEXT DEFAULT '',

    CONSTRAINT "Note_pkey" PRIMARY KEY ("id")
);
