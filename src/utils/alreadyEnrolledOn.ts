import { Prisma } from '../@types'

export async function alreadyEnrolledOn(
  prisma: Prisma,
  student: { connect: { id: string } },
  course: { connect: { id: string } },
) {
  const enrollmentExists = await prisma.enrollment.findFirst({
    where: {
      courseId: course.connect.id,
      studentId: student.connect.id,
    },
  })

  if (enrollmentExists) {
    throw new Error(`User already enrolled`)
  }
}
