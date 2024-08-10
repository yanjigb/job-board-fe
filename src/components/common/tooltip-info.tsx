'use client'

import React, { useState } from 'react'
import { Info } from 'lucide-react'
import dynamic from 'next/dynamic'
import { useBoolean } from 'usehooks-ts'

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

function Icon({ size = 10 }: { size?: number }) {
  return (
    <span aria-label="info">
      <Info
        size={size}
        className="icon rounded-full bg-text-primary text-text-dark [&_circle]:stroke-text-primary"
      />
    </span>
  )
}

function TooltipInfoRaw({
  content,
  size,
  className,
}: {
  content: React.ReactNode
  size?: number
  className?: string
}) {
  const [isTouch, setIsTouch] = useState(false)

  const { value: isOpen, toggle, setFalse } = useBoolean()

  React.useEffect(() => {
    const is_touch_device = 'ontouchstart' in document.documentElement
    setIsTouch(is_touch_device)
  }, [])

  if (isTouch) {
    return (
      <TooltipProvider>
        <Tooltip open={isOpen} onOpenChange={() => setFalse()}>
          <TooltipTrigger onClick={toggle}>
            <Icon size={size} />
          </TooltipTrigger>
          <TooltipContent className={className} side="bottom">
            {content}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Icon size={size} />
        </TooltipTrigger>
        <TooltipContent side="bottom">{content}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
const TooltipInfo = dynamic(() => Promise.resolve(TooltipInfoRaw), {
  ssr: false,
  loading: () => <Icon />,
})

export default TooltipInfo
