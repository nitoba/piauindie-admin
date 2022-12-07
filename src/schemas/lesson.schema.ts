import { list } from '@keystone-6/core'
import { allOperations } from '@keystone-6/core/access'
import { relationship, text, timestamp } from '@keystone-6/core/fields'
import { isAdmin } from '../auth/permissions'
import { validationSlugs, validationURLs } from '../utils/regexs'

export const lessonSchema = list({
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

    videoUrl: text({
      validation: {
        isRequired: true,
        match: {
          regex: validationURLs,
          explanation: 'This must be a valid url',
        },
      },
    }),

    course: relationship({ ref: 'Course.lessons' }),

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
  ui: { label: 'Lessons' },
  db: { map: 'lessons' },
})
