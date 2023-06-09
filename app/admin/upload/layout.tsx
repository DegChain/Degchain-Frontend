import './globals.css'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Upload Files',
  description: 'Generated by create next app',
}

export default function UploadLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <section >{children}</section>
  )
}