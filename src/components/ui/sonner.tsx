'use client'

// import { useTheme } from 'next-themes'
import { Toaster as Sonner } from 'sonner'

type ToasterProps = React.ComponentProps<typeof Sonner>

function Toaster({ ...props }: ToasterProps) {
  // const { theme = 'system' } = useTheme()

  return (
    <Sonner
      position="top-center"
      expand
      richColors
      // theme={theme as ToasterProps['theme']}
      {...props}
    />
  )
}

export { Toaster }
