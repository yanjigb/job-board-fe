import React, { ReactNode } from 'react'
import { OctagonAlert } from 'lucide-react'

import { cn } from '@/utils/cn'

function WarningNotification({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div
      className={cn(
        'flex items-start gap-[0.625rem] rounded-sm bg-another-4 p-3 text-secondary',
        className,
      )}
    >
      <span>
        <OctagonAlert size="1.5rem" strokeWidth={1.25} />
      </span>

      <span className="text-body/small/regular font-light">{children}</span>
    </div>
  )
}

export { WarningNotification }
