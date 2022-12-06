import { Session } from '../@types/session'

export const isAdmin = ({ session }: { session: Session }) =>
  session?.data.role === 'admin'

export const isStudent = ({ session }: { session: Session }) =>
  session?.data.role === 'student'
