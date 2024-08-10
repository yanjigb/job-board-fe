'use client'

import React, { memo, PropsWithChildren, useMemo } from 'react'
import isEqual from 'react-fast-compare'
import { ArrowLeft, ArrowRight, Plus } from 'lucide-react'
import Image from 'next/image'

import { Button } from '@/components/ui/button'
import { useFormField } from '@/components/ui/form'

import { useDictionary } from '@/providers/dictionary-provider'
import { ICustomFile } from '@/types/common'
import { cn } from '@/utils/cn'

interface IUploadImageItemProps {
  id: string
  label: string
  file?: ICustomFile | null
  onFileChange: (file?: ICustomFile | null) => void
}

const UploadImageItem = memo(function UploadImageItem({
  id,
  label,
  file,
  onFileChange,
}: IUploadImageItemProps) {
  const { error } = useFormField()
  const { dictionary } = useDictionary()

  const url = useMemo(() => {
    if (!file) return ''

    return file.fileUrl ? file.fileUrl : URL.createObjectURL(file.file as File)
  }, [file])

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target
    const finalFile = files?.length
      ? {
          file: files?.[0],
          id,
          errorMessage: '',
          fileUrl: '',
        }
      : null

    onFileChange(finalFile)
  }

  return (
    <div className="space-y-2">
      <h3 className="font-medium">{label}</h3>

      <label
        htmlFor={id}
        className={cn(
          'group relative flex min-h-[220px] flex-col items-center justify-center rounded-[0.125rem] border border-dashed border-text-placeholder text-text-placeholder',
          error && 'border-error',
        )}
      >
        {url && <Image fill alt="preview" src={url} className="relative z-[1] object-contain" />}

        <input
          type="file"
          id={id}
          onChange={onChange}
          className="absolute z-[3] h-full w-full opacity-0"
        />

        <div className="absolute flex h-full w-full flex-col items-center justify-center gap-2 bg-dark-background/20 backdrop-blur-sm group-hover:z-[2]">
          <span aria-label="add-file">
            <Plus size={14} />
          </span>
          <span className="font-normal">{dictionary['Drag or Click to upload']}</span>
        </div>
      </label>
    </div>
  )
}, isEqual)
UploadImageItem.displayName = 'UploadImageItem'

interface IKycCardProps extends PropsWithChildren {
  className?: string
}
const KycCard = memo(function KycCard({ children, className }: IKycCardProps) {
  return <div className={cn('mt-6 space-y-6 rounded-xl bg-dark-2 p-6', className)}>{children}</div>
}, isEqual)
KycCard.displayName = 'KycCard'

const KycPass = memo(function KycPass() {
  const { dictionary } = useDictionary()
  return (
    <KycCard>
      <Image src="/images/kyc/verify-success.svg" width={131.2} height={120} alt="under-review" />
      <div>
        <h2 className="leading-0 text-heading-5 text-success">
          {dictionary['Complete Verify Account']}
        </h2>
        <p className="text-text-primary">
          {dictionary['The reason: Complete identity verification to access all P2P services']}
        </p>
      </div>
    </KycCard>
  )
}, isEqual)
KycPass.displayName = 'KycPass'

const KycFail = memo(function KycFail() {
  const { dictionary } = useDictionary()
  return (
    <KycCard>
      <Image src="/images/kyc/under-review.svg" width={72} height={70} alt="under-review" />
      <div>
        <h2 className="leading-0 text-heading-5 text-error">
          {dictionary['Your KYC verification is not valid']}
        </h2>
        <ul className="text-text-primary">
          {dictionary['The reason:']}
          <li className="list-style">{dictionary['Images not clear.']}</li>
          <li className="list-style">
            {dictionary['Place documents against a solid-colored background.']}
          </li>
        </ul>
      </div>
    </KycCard>
  )
}, isEqual)
KycFail.displayName = 'KycFail'

const KycUnderReview = memo(function KycUnderReview() {
  const { dictionary } = useDictionary()
  return (
    <KycCard>
      <Image src="/images/kyc/under-review.svg" width={72} height={70} alt="under-review" />
      <div>
        <h2 className="leading-0 text-heading-5">{dictionary['Under Review']}</h2>
        <p className="font-normal text-text-primary">
          {
            dictionary[
              'You will receive an email once the review is completed. Estimated review time: 72 hours'
            ]
          }
        </p>
      </div>
    </KycCard>
  )
}, isEqual)
KycUnderReview.displayName = 'KycUnderReview'

interface IFormNavigationProps {
  onBack?: () => void
}
const FormNavigation = memo(function FormNavigation({ onBack }: IFormNavigationProps) {
  const { dictionary } = useDictionary()

  return (
    <div className="flex justify-between">
      <Button variant="none" size="none" type="button" onClick={onBack}>
        <span className="flex items-center gap-2">
          <span aria-label="back">
            <ArrowLeft />
          </span>
          {dictionary.Back}
        </span>
      </Button>

      <Button variant="none" size="none">
        <span className="flex flex-row-reverse items-center gap-2 text-text-placeholder">
          <span aria-label="back">
            <ArrowRight />
          </span>
          {dictionary.Continue}
        </span>
      </Button>
    </div>
  )
}, isEqual)
FormNavigation.displayName = 'FormNavigation'

export { UploadImageItem, KycCard, KycPass, KycFail, KycUnderReview, FormNavigation }
