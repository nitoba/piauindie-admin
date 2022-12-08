export type Session = {
  data: {
    id: string
    email: string
    role: 'admin' | 'student' | 'teacher'
  }
}
