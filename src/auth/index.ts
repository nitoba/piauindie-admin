import { createAuth } from '@keystone-6/auth'
import { statelessSessions } from '@keystone-6/core/session'

const sessionSecret = process.env.SESSION_SECRET ?? 'default-secret'

const { withAuth } = createAuth({
  listKey: 'User',
  identityField: 'email',
  sessionData: 'id email role',
  secretField: 'password',
  initFirstItem: {
    fields: ['name', 'email', 'password'],
    itemData: { role: 'admin' },
  },
})

//   we use an expiry of 30 days for this starter
const sessionMaxAge = 60 * 60 * 24 * 30 // 30 days

// you can find out more at https://keystonejs.com/docs/apis/session#session-api
const session = statelessSessions({
  maxAge: sessionMaxAge,
  secret: sessionSecret!,
})

export { withAuth, session }
