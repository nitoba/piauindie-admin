import { list } from '@keystone-6/core'
import { allowAll } from '@keystone-6/core/access'
import {
  float,
  integer,
  relationship,
  select,
  text,
  timestamp,
} from '@keystone-6/core/fields'
import { isAdmin, isStudent, isTeacher } from '../auth/permissions'
import { DEFAULT_THUMBNAIL_URL_COURSE } from '../utils/contants'
import { validationSlugs, validationURLs } from '../utils/regexs'

export const courseSchema = list({
  access: {
    operation: {
      create: isAdmin,
      delete: isAdmin,
      query: allowAll,
      update: isTeacher || isAdmin,
    },
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
    thumbnailUrl: text({
      validation: {
        isRequired: true,
        match: {
          regex: validationURLs,
          explanation: 'Must be a valid URL',
        },
      },

      defaultValue: DEFAULT_THUMBNAIL_URL_COURSE,
    }),

    durationInMinutes: integer({
      validation: { isRequired: true, min: 1 },
      defaultValue: 1,
    }),

    price: float({
      defaultValue: 0,
      ui: {
        description: 'Set a regular price (USD). Leave it blank for Free.',
      },
    }),

    courseEvaluation: select({
      type: 'integer',
      options: [
        { label: '1', value: 1 },
        { label: '2', value: 2 },
        { label: '3', value: 3 },
        { label: '4', value: 4 },
        { label: '5', value: 5 },
      ],

      ui: {
        createView: { fieldMode: 'hidden' },
      },
    }),

    enrolledOn: relationship({
      ref: 'Enrollment.course',
      many: true,
      ui: { createView: { fieldMode: 'hidden' } },
    }),
    lessons: relationship({ ref: 'Lesson.course', many: true }),
    teacher: relationship({ ref: 'User.teachingIn' }),

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
  ui: { label: 'Courses', hideCreate: isStudent },
  db: { map: 'courses' },
})
