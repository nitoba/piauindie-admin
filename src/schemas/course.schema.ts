import { list } from '@keystone-6/core'
import { allOperations } from '@keystone-6/core/access'
import { relationship, select, text, timestamp } from '@keystone-6/core/fields'
import { isAdmin } from '../auth/permissions'
import { validationSlugs } from '../utils/regexs'

export const courseSchema = list({
  access: {
    operation: allOperations(isAdmin),
  },
  fields: {
    title: text({ validation: { isRequired: true } }),
    description: text({ validation: { isRequired: true } }),
    slug: text({
      isIndexed: 'unique',
      validation: {
        isRequired: true,
        match: {
          regex: validationSlugs,
          explanation:
            'The slug must only contain letters and numbers as well as (_-)',
        },
      },
    }),

    enrolledOn: relationship({
      ref: 'Enrollment.course',
      many: true,
      ui: { createView: { fieldMode: 'hidden' } },
    }),
    lessons: relationship({ ref: 'Lesson.course', many: true }),
    teacher: relationship({ ref: 'User.teachingIn' }),

    courseEvaluation: select({
      type: 'integer',
      options: [
        { label: '1', value: 1 },
        { label: '2', value: 2 },
        { label: '3', value: 3 },
        { label: '4', value: 4 },
        { label: '5', value: 5 },
      ],
    }),

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
