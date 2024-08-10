/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */

'use client'

import * as React from 'react'
import isEqual from 'react-fast-compare'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { X } from 'lucide-react'

import { cn } from '@/utils/cn'

const Dialog = DialogPrimitive.Root

const DialogTrigger = DialogPrimitive.Trigger

const DialogPortal = DialogPrimitive.Portal

const DialogClose = DialogPrimitive.Close

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      // base
      'fixed inset-0 z-50 overflow-y-auto px-6',
      // background color
      'bg-dialog-overlay backdrop-blur-md',
      className,
    )}
    {...props}
  />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

const CloseIcon = React.memo(function CloseIcon({ className }: { className?: string }) {
  return (
    <DialogPrimitive.Close
      className={cn(
        'absolute right-0 top-[1.3125rem] rounded-sm ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-slate-100 data-[state=open]:text-slate-500 dark:ring-offset-slate-950 dark:focus:ring-slate-300 dark:data-[state=open]:bg-slate-800 dark:data-[state=open]:text-slate-400',
        // base
        'z-[4] text-text-primary !ring-0 !ring-offset-0',
        className,
      )}
    >
      <X className="h-4 w-4" />
      <span className="sr-only">Close</span>
    </DialogPrimitive.Close>
  )
}, isEqual)

interface IdDialogContent extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  showCloseButton?: boolean
}
const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  IdDialogContent
>(({ className, children, showCloseButton = false, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] fixed left-[50%] z-50 grid translate-x-[-50%] gap-4 duration-200',
        // base
        'top-[4rem] flex w-full max-w-[calc(40rem+1.5rem)] translate-y-0 justify-center overflow-hidden border-none px-3 shadow-none outline-none',
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          'content relative max-h-[calc(100vh-4rem*2)] w-full overflow-auto rounded-[1.25rem] bg-dark-background px-6',
        )}
      >
        {children}

        {showCloseButton && <CloseIcon className="right-6" />}
      </div>
    </DialogPrimitive.Content>
  </DialogPortal>
))
DialogContent.displayName = DialogPrimitive.Content.displayName

function DialogHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'sticky left-0 top-0 z-[3] flex flex-col bg-dark-background py-4 text-left',
        className,
      )}
      {...props}
    >
      <span className="label text-body/large/medium font-normal text-text-dark">
        {props.children}
      </span>

      <CloseIcon />
    </div>
  )
}
DialogHeader.displayName = 'DialogHeader'

function DialogFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        '-mx-2 flex flex-col-reverse py-4 sm:flex-row sm:justify-end sm:space-x-2',
        className,
      )}
      {...props}
    />
  )
}
DialogFooter.displayName = 'DialogFooter'

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn('text-lg font-semibold leading-none tracking-tight', className)}
    {...props}
  />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn('text-sm text-slate-500 dark:text-slate-400', className)}
    {...props}
  />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
}
