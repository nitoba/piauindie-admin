import { list } from '@keystone-6/core'
import { allOperations } from '@keystone-6/core/access'
import { relationship, timestamp } from '@keystone-6/core/fields'
import { isAdmin } from '../auth/permissions'

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

  db: { map: 'enrollments' },
})
