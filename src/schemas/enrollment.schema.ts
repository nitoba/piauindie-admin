import { list } from '@keystone-6/core'
import { allOperations } from '@keystone-6/core/access'
import { relationship, timestamp } from '@keystone-6/core/fields'
import { isAdmin } from '../auth/permissions'
import { alreadyEnrolledOn } from '../utils/alreadyEnrolledOn'

export const enrollmentSchema = list({
  access: {
    operation: allOperations(isAdmin),
  },
  fields: {
    student: relationship({
      ref: 'User.enrollments',
    }),
    course: relationship({ ref: 'Course.enrolledOn' }),
    createdAt: timestamp({
      defaultValue: { kind: 'now' },
    }),
    updatedAt: timestamp({
      defaultValue: { kind: 'now' },
      db: { updatedAt: true },
    }),
  },
  hooks: {
    async validateInput({
      inputData: { student, course },
      context: { prisma },
    }) {
      return alreadyEnrolledOn(prisma, student, course)
    },
  },
  db: { map: 'enrollments' },
})
