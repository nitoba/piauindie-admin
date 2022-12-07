/*
  Warnings:

  - You are about to drop the `Enrollment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Enrollment" DROP CONSTRAINT "Enrollment_course_fkey";

-- DropForeignKey
ALTER TABLE "Enrollment" DROP CONSTRAINT "Enrollment_student_fkey";

-- DropTable
DROP TABLE "Enrollment";

-- CreateTable
CREATE TABLE "enrollments" (
    "id" TEXT NOT NULL,
    "student" TEXT,
    "course" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "enrollments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "enrollments_student_idx" ON "enrollments"("student");

-- CreateIndex
CREATE INDEX "enrollments_course_idx" ON "enrollments"("course");

-- AddForeignKey
ALTER TABLE "enrollments" ADD CONSTRAINT "enrollments_student_fkey" FOREIGN KEY ("student") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "enrollments" ADD CONSTRAINT "enrollments_course_fkey" FOREIGN KEY ("course") REFERENCES "courses"("id") ON DELETE SET NULL ON UPDATE CASCADE;
