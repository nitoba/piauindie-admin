-- AlterTable
ALTER TABLE "courses" ADD COLUMN     "teacher" TEXT;

-- CreateIndex
CREATE INDEX "courses_teacher_idx" ON "courses"("teacher");

-- AddForeignKey
ALTER TABLE "courses" ADD CONSTRAINT "courses_teacher_fkey" FOREIGN KEY ("teacher") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
