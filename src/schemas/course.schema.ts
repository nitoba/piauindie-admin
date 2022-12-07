import { list } from '@keystone-6/core'
import { allOperations } from '@keystone-6/core/access'
import { relationship, text, timestamp } from '@keystone-6/core/fields'
import { isAdmin } from '../auth/permissions'

export const courseSchema = list({
  access: {
    operation: allOperations(isAdmin),
  },
  fields: {
    title: text({ validation: { isRequired: true } }),
    description: text({ validation: { isRequired: true } }),
    slug: text({
      isIndexed: true,
      validation: {
        isRequired: true,
        match: {
          regex: /^[a-z0-9]+(?:[_-][a-z0-9]+)*$/,
          explanation:
            'The slug must only contain letters and numbers as well as (_-)',
        },
      },
    }),

    enrolledOn: relationship({ ref: 'Enrollment.course', many: true }),

    createdAt: timestamp({
      defaultValue: { kind: 'now' },
      ui: { createView: { fieldMode: 'hidden' } },
    }),
    updatedAt: timestamp({
      defaultValue: { kind: 'now' },
      ui: { createView: { fieldMode: 'hidden' } },
      db: { updatedAt: true },
    }),
  },
  ui: { label: 'Courses' },
  db: { map: 'courses' },
})
