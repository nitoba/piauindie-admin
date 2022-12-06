/** @jsxRuntime classic */
/** @jsx jsx */
import logo from '../assets/logo.jpg'
import { jsx } from '@keystone-ui/core'
import Link from 'next/link'
export function Logo() {
  return (
    <Link href="/">
      <div
        css={{
          width: 50,
          borderRadius: 8,
          border: '2px solid #DDD',
          padding: 4,
        }}
      >
        <img src={logo.src} alt="logo" css={{ width: '100%' }} />
      </div>
    </Link>
  )
}
