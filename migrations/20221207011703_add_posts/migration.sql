-- AlterTable
ALTER TABLE "User" ADD COLUMN     "post" TEXT;

-- CreateTable
CREATE TABLE "posts" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "User_post_idx" ON "User"("post");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_post_fkey" FOREIGN KEY ("post") REFERENCES "posts"("id") ON DELETE SET NULL ON UPDATE CASCADE;
