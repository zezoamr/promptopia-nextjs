import '@styles/globals.css'
import type { Metadata } from 'next'
import { ReactNode } from 'react';

interface RootLayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: 'Promptopia',
  description: 'Share and Discover AI prompts',
}

export default function RootLayout({children} : RootLayoutProps){
  return (
    <html lang="en">
      <body>
        <div className='main'>
          <div className='gradient'/>
        </div>
        <main className='app'>{children}</main>
      </body>
    </html>
  )
}
