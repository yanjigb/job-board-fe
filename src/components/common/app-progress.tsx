'use client'

import React, { memo } from 'react'
import isEqual from 'react-fast-compare'

import { Progress } from '@/components/ui/progress'

interface Props extends React.ComponentProps<typeof Progress> {}
function AppProgress({ value, ...rest }: Props) {
  const [progress, setProgress] = React.useState(0)

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(value ?? 0), 500)
    return () => clearTimeout(timer)
  }, [value])

  return <Progress value={progress} {...rest} />
}

export default memo(AppProgress, isEqual)
