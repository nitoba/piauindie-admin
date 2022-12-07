import { getContext } from '@keystone-6/core/context'
import config from '../keystone'
import { Context } from '.keystone/types'
import * as PrismaModule from '.prisma/client'
import { BaseListTypeInfo } from '@keystone-6/core/types'
import { Prisma } from './@types'

type MyContext = {
  lists: Record<string, BaseListTypeInfo>
  prisma: Prisma
}

// Making sure multiple prisma clients are not created during hot reloading
export const keystoneContext: Context =
  (globalThis as any).keystoneContext ||
  getContext<MyContext>(config, PrismaModule)

if (process.env.NODE_ENV !== 'production')
  (globalThis as any).keystoneContext = keystoneContext
