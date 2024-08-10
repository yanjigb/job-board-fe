/* eslint-disable jsx-a11y/heading-has-content */

'use client'

import React, { ChangeEvent, memo, ReactNode, useCallback, useRef } from 'react'
import isEqual from 'react-fast-compare'
import { Eye, Plus, Trash } from 'lucide-react'
import NextImage from 'next/image'
import Lightbox from 'yet-another-react-lightbox'

import { AppCopy } from '@/components/common/app-copy'
import { Button } from '@/components/ui/button'

import { useDictionary } from '@/providers/dictionary-provider'
import { HTMLTypeWithoutRefHasClassNameOptional, ICustomFile } from '@/types/common'
import { cn, cnWithClxs } from '@/utils/cn'

const StepNumber = memo(function StepNumber({
  className,
  ...rest
}: HTMLTypeWithoutRefHasClassNameOptional<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        'flex size-8 min-w-8 items-center justify-center rounded-full bg-secondary text-h5/regular text-dark-background',
        className,
      )}
      {...rest}
    />
  )
}, isEqual)
StepNumber.displayName = 'StepNumber'

const StepHeading = memo(function StepHeading({
  className,
  ...rest
}: HTMLTypeWithoutRefHasClassNameOptional<HTMLHeadElement>) {
  return <h5 className={cn('text-body/large/medium font-normal', className)} {...rest} />
}, isEqual)
StepHeading.displayName = 'StepHeading'

const StepLayout = memo(function StepLayout({
  className,
  ...rest
}: HTMLTypeWithoutRefHasClassNameOptional<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'flex items-start gap-4 border-b border-solid border-dark-3 py-6 [&:first-child]:pt-0',
        className,
      )}
      {...rest}
    />
  )
}, isEqual)
StepLayout.displayName = 'StepLayout'

const BankName = memo(function BankName({
  className,
  ...rest
}: HTMLTypeWithoutRefHasClassNameOptional<HTMLSpanElement>) {
  return (
    <span
      className={cnWithClxs(
        'text-blueLight',
        cn(
          'min-w-[12.5rem] border-l-4 border-primary pl-2 text-body/medium/regular font-light',
          className,
        ),
      )}
      {...rest}
    />
  )
}, isEqual)
BankName.displayName = 'BankName'

interface IPreviewImagesUploadedProps {
  files: ICustomFile[]
  children?: (index: number) => ReactNode
}
const PreviewImagesUploaded = memo(function PreviewImagesUploaded({
  files,
  children,
}: IPreviewImagesUploadedProps) {
  const [open, setOpen] = React.useState(false)
  const [index, setIndex] = React.useState(3)

  const getImageSrc = React.useCallback((item: ICustomFile) => {
    if (item.fileUrl) return item.fileUrl
    if (item.file && item.file instanceof File) return URL.createObjectURL(item.file)
    return ''
  }, [])

  return (
    <>
      <Lightbox
        index={index}
        open={open}
        close={() => setOpen(false)}
        on={{ view: ({ index: currentIndex }) => setIndex(currentIndex) }}
        slides={files.map((file) => ({
          src: getImageSrc(file),
        }))}
        styles={{ root: { pointerEvents: 'auto' } }}
      />

      {files &&
        files.map((item, fileIndex) => {
          const onPreviewImage = () => {
            setOpen(true)
            setIndex(fileIndex)
          }

          const imageSrc = getImageSrc(item)

          return (
            <div
              key={item.id}
              className="group relative flex size-[6.5rem] items-center gap-3 rounded-[0.125rem] border border-stroke p-[0.5625rem]"
            >
              <div className="abs-center flex-center invisible h-[calc(100%-0.625rem)] w-[calc(100%-0.625rem)] gap-2 bg-black/50 opacity-0 transition-all group-hover:visible group-hover:opacity-100">
                <Button
                  type="button"
                  size="none"
                  variant="none"
                  onClick={onPreviewImage}
                  aria-label="preview"
                >
                  <Eye size={16} />
                </Button>

                {children && children(fileIndex)}
              </div>

              {imageSrc && (
                <NextImage
                  src={imageSrc}
                  className="object-cover p-[0.5625rem]"
                  width={86}
                  height={86}
                  alt="proof"
                />
              )}
            </div>
          )
        })}
    </>
  )
}, isEqual)
PreviewImagesUploaded.displayName = 'PreviewImagesUploaded'

interface IPreviewImagesUploadedWithDeleteProps {
  files: ICustomFile[]
  onRemoveImage: (index: number) => void
}
const PreviewImagesUploadedWithDelete = memo(function PreviewImagesUploadedWithDelete({
  files,
  onRemoveImage,
}: IPreviewImagesUploadedWithDeleteProps) {
  if (!files || !files.length) return null
  return (
    <PreviewImagesUploaded files={files}>
      {(index) => (
        <Button
          size="none"
          variant="none"
          type="button"
          onClick={() => onRemoveImage(index)}
          aria-label="remove"
        >
          <Trash size={16} />
        </Button>
      )}
    </PreviewImagesUploaded>
  )
}, isEqual)
PreviewImagesUploadedWithDelete.displayName = 'PreviewImagesUploadedWithDelete'

const UploadImages = memo(function UploadImages() {
  const { dictionary } = useDictionary()

  const [files, setFiles] = React.useState<ICustomFile[]>([])

  const inputRef = useRef<HTMLInputElement>(null)

  const onSelectFile = () => {
    if (inputRef.current) {
      inputRef.current.click()
    }
  }

  const onChangeFile = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { files: targetFiles } = e.target

    if (targetFiles?.length) {
      const slicedFiles = Array.from(targetFiles)
        .slice(0, 3)
        .map((file) => ({
          file,
          id: file.name,
        }))
      setFiles(slicedFiles)
      return
    }

    setFiles([])
  }, [])

  const onRemoveImage = React.useCallback((indexFile: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== indexFile))
  }, [])

  return (
    <div className="flex flex-wrap gap-2" id="hello-word">
      <PreviewImagesUploadedWithDelete files={files} onRemoveImage={onRemoveImage} />

      <Button type="button" variant="none" size="none" asChild onClick={onSelectFile}>
        <span className="flex size-[6.5rem] cursor-pointer flex-col items-center justify-center gap-2 rounded-[0.125rem] border border-dashed border-stroke text-body/small/regular font-light text-text-primary">
          <Plus size={14} className="text-text-dark" />
          {dictionary.Upload}
        </span>
      </Button>

      <input ref={inputRef} type="file" onChange={onChangeFile} className="hidden" multiple />
    </div>
  )
}, isEqual)
UploadImages.displayName = 'UploadImages'

interface IHeaderLabelProps extends React.HTMLAttributes<React.PropsWithoutRef<HTMLDivElement>> {
  label?: ReactNode
  buy?: boolean
}
const HeaderLabel = memo(function HeaderLabel({
  children,
  className,
  label,
  buy = true,
  ...rest
}: IHeaderLabelProps) {
  return (
    <div className={cn('flex items-start gap-2 sm:items-center', className)} {...rest}>
      <span
        className={cnWithClxs(
          'text-footnote/description',
          cn(
            'min-w-[3.5rem] rounded-sm px-2 py-1 text-center text-dark-background',
            buy ? 'bg-success' : 'bg-error text-text-dark',
          ),
        )}
      >
        {label}
      </span>

      <span className="text-heading-6">{children}</span>
    </div>
  )
})
HeaderLabel.displayName = 'HeaderLabel'

interface IHeaderInformationItemProps
  extends HTMLTypeWithoutRefHasClassNameOptional<HTMLLIElement> {
  label: string
  value: string
}
const HeaderInformationItem = memo(function HeaderInformationItem({
  label,
  value,
  className,
}: IHeaderInformationItemProps) {
  return (
    <li
      className={cn(
        'text-body/medium/medium [&:first-child]:font-normal [&:last-child]:font-light',
        className,
      )}
    >
      <span className="mr-1 text-text-primary">{label}</span>
      <span>{value}</span>
    </li>
  )
}, isEqual)
HeaderInformationItem.displayName = 'HeaderInformationItem'

const HeaderInformationContentLayout = memo(function HeaderInformationContentLayout({
  className,
  ...rest
}: HTMLTypeWithoutRefHasClassNameOptional<HTMLUListElement>) {
  return <ul className={cn('flex flex-col gap-8 gap-y-2 md:flex-row', className)} {...rest} />
}, isEqual)
HeaderInformationContentLayout.displayName = 'HeaderInformationContentLayout'

const HeaderInformationLayout = memo(function HeaderInformationLayout({
  className,
  ...rest
}: HTMLTypeWithoutRefHasClassNameOptional<HTMLDivElement>) {
  return <div className={cn('space-y-4', className)} {...rest} />
})
HeaderInformationLayout.displayName = 'HeaderInformationLayout'

const BanksLayout = memo(function BanksLayout({
  className,
  ...rest
}: HTMLTypeWithoutRefHasClassNameOptional<HTMLUListElement>) {
  return <ul className={cn('flex flex-col items-start gap-6 xl:flex-row', className)} {...rest} />
}, isEqual)

const BankInformationContentLayout = memo(function BankInformationContentLayout({
  className,
  ...rest
}: HTMLTypeWithoutRefHasClassNameOptional<HTMLUListElement>) {
  return <ul className={cn('grid grid-cols-1 gap-5 lg:grid-cols-2', className)} {...rest} />
}, isEqual)
BankInformationContentLayout.displayName = 'BankInformationContentLayout'

interface IBankInformationItemProps extends HTMLTypeWithoutRefHasClassNameOptional<HTMLLIElement> {
  label: string
  value: string
}
const BankInformationItem = memo(function BankInformationItem({
  className,
  label,
  value,
  ...rest
}: IBankInformationItemProps) {
  return (
    <li className={cn('min-w-[16.4375rem] space-y-1', className)} {...rest}>
      <p className="text-body/small/regular font-light text-text-primary">{label}</p>
      <AppCopy>
        <span className="grid grid-cols-1">
          <span className="break-words">{value}</span>
        </span>
      </AppCopy>
    </li>
  )
}, isEqual)
BankInformationItem.displayName = 'BankInformationItem'

const OrderInformationContentLayout = memo(function OrderInformationContentLayout({
  className,
  ...rest
}: HTMLTypeWithoutRefHasClassNameOptional<HTMLUListElement>) {
  return <ul className={cn('flex flex-wrap gap-8 gap-y-4', className)} {...rest} />
}, isEqual)
OrderInformationContentLayout.displayName = 'OrderInformationContentLayout'

interface IOrderInformationItemProps extends HTMLTypeWithoutRefHasClassNameOptional<HTMLLIElement> {
  label: string
  value: string
}
const OrderInformationItem = memo(function OrderInformationItem({
  className,
  label,
  value,
  ...rest
}: IOrderInformationItemProps) {
  return (
    <li className={cn('min-w-[7.5rem]', className)} {...rest}>
      <p className="label text-body/small/regular font-light text-text-primary">{label}</p>
      <p className="value text-body-large/regular font-light">{value}</p>
    </li>
  )
}, isEqual)
OrderInformationItem.displayName = 'OrderInformationItem'

const FooterActionsLayout = memo(function FooterActionsLayout({
  className,
  ...rest
}: HTMLTypeWithoutRefHasClassNameOptional<HTMLDivElement>) {
  return <div className={cn('flex justify-end gap-2 py-2', className)} {...rest} />
})
FooterActionsLayout.displayName = 'FooterActionsLayout'

export {
  BanksLayout,
  BankName,
  BankInformationContentLayout,
  BankInformationItem,
  UploadImages,
  PreviewImagesUploaded,
  PreviewImagesUploadedWithDelete,
  StepNumber,
  StepLayout,
  StepHeading,
  HeaderLabel,
  HeaderInformationItem,
  HeaderInformationLayout,
  HeaderInformationContentLayout,
  OrderInformationItem,
  OrderInformationContentLayout,
  FooterActionsLayout,
}
