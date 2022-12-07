import Link from 'next/link'
import React from 'react'

export function Logo() {
  return (
    <Link href="/">
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div
          style={{
            width: 50,
            height: 50,
            borderRadius: 8,
            border: '2px solid #DDD',
            padding: 4,
          }}
        >
          <img
            src={
              'https://pps.whatsapp.net/v/t61.24694-24/56681372_2645832648823376_2308220247842226176_n.jpg?ccb=11-4&oh=01_AdRC3ngV348bCZfrP-JKDCKCISAoGv5IIxKn7C5JCZaIww&oe=639DA26A'
            }
            alt="logo"
            style={{ width: '100%' }}
          />
        </div>
        <h1 style={{}}>Piauindie</h1>
      </div>
    </Link>
  )
}
