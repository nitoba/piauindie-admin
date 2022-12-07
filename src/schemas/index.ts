import type { Lists } from '.keystone/types'
import { courseSchema } from './course.schema'
import { enrollmentSchema } from './enrollment.schema'
import { userSchema } from './user.schema'

export const schemas: Lists = {
  User: userSchema,
  Course: courseSchema,
  Enrollment: enrollmentSchema,
}
