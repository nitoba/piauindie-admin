import Link from 'next/link'
import React from 'react'
export function Logo() {
  return (
    <Link href="/">
      <div
        style={{
          width: 50,
          borderRadius: 8,
          border: '2px solid #DDD',
          padding: 4,
        }}
      >
        <img src="../assets/logo.jpg" alt="logo" style={{ width: '100%' }} />
      </div>
    </Link>
  )
}
