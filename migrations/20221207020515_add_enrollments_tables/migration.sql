-- CreateTable
CREATE TABLE "Enrollment" (
    "id" TEXT NOT NULL,
    "student" TEXT,
    "course" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Enrollment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Enrollment_student_idx" ON "Enrollment"("student");

-- CreateIndex
CREATE INDEX "Enrollment_course_idx" ON "Enrollment"("course");

-- AddForeignKey
ALTER TABLE "Enrollment" ADD CONSTRAINT "Enrollment_student_fkey" FOREIGN KEY ("student") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enrollment" ADD CONSTRAINT "Enrollment_course_fkey" FOREIGN KEY ("course") REFERENCES "courses"("id") ON DELETE SET NULL ON UPDATE CASCADE;
