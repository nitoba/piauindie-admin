import { PageContainer } from '@keystone-6/core/admin-ui/components'
import { Heading } from '@keystone-ui/core'

export default function CustomPage() {
  return (
    <PageContainer header={<Heading type="h3">Custom Page</Heading>}>
      <h1>This is a custom Admin UI Page</h1>
      <p>It can be accessed via the route `/custom-page`</p>
    </PageContainer>
  )
}
