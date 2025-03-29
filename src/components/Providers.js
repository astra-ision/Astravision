'use client'

import { ThemeProvider } from 'next-themes'
import { IntlAuthProvider } from '@/components/IntlAuthProvider'

export function Providers({ children }) {
  return (
    <ThemeProvider attribute="class">
      <IntlAuthProvider>{children}</IntlAuthProvider>
    </ThemeProvider>
  )
} 