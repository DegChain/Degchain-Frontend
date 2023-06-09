import './globals.css'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'View Files',
  description: 'Generated by create next app',
}

export default function ViewLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <section >{children}</section>
  )
}