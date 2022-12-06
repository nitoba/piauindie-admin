import 'dotenv/config'
import { config } from '@keystone-6/core'
import { schemas } from './src/schemas'
import { withAuth, session } from './src/auth'
import { dbConfig } from './src/db-config'

/*
  An example of how to setup your own yoga graphql server
  using the generated Keystone GraphQL schema.
*/
export const configAPI = {
  api: {
    // Disable body parsing (required for file uploads)
    bodyParser: false,
  },
}

export default withAuth(
  config({
    db: dbConfig,
    lists: schemas,
    session,
  }),
)
