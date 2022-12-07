import { list } from '@keystone-6/core'
import { allOperations } from '@keystone-6/core/access'
import {
  password,
  text,
  timestamp,
  select,
  relationship,
} from '@keystone-6/core/fields'
import { isAdmin } from '../auth/permissions'

export const userSchema = list({
  access: {
    operation: allOperations(isAdmin),
  },
  fields: {
    name: text({ validation: { isRequired: true } }),
    email: text({
      validation: { isRequired: true },
      isIndexed: 'unique',
    }),
    role: select({
      type: 'enum',
      options: [
        { label: 'isAdmin', value: 'admin' },
        { label: 'isStudent', value: 'student' },
      ],
      validation: { isRequired: true },
      ui: { displayMode: 'select' },
    }),
    password: password({
      validation: { isRequired: true },
    }),

    enrollments: relationship({ ref: 'Enrollment.student', many: true }),

    createdAt: timestamp({
      defaultValue: { kind: 'now' },
    }),
  },
  ui: { label: 'Users' },
  db: { map: 'users' },
})
