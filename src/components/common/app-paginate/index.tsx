/* eslint-disable react/jsx-props-no-spreading */

'use client'

import React, { memo, useMemo } from 'react'
import isEqual from 'react-fast-compare'
import ReactPaginate from 'react-paginate'
import { ArrowLeft, ArrowRight } from 'lucide-react'

import { Button } from '@/components/ui/button'

import { useDictionary } from '@/providers/dictionary-provider'
import { cn } from '@/utils/cn'

import styles from './Paginate.module.scss'

interface IPaginateProps extends Omit<React.ComponentProps<typeof ReactPaginate>, 'pageCount'> {
  activeClassName?: string
  itemsPerPage: number
  total: number
}

function Paginate(props: IPaginateProps) {
  const {
    activeClassName,
    className,
    itemsPerPage,
    total,
    renderOnZeroPageCount,
    onPageChange,
    ...rest
  } = props

  const { dictionary } = useDictionary()

  const pageCount = useMemo(
    () =>
      !Number.isNaN(+itemsPerPage) && !Number.isNaN(+total) ? Math.ceil(total / itemsPerPage) : 1,
    [itemsPerPage, total],
  )

  return (
    <div className="rounded-sm bg-dark-2 p-3">
      <ReactPaginate
        breakLabel="..."
        breakClassName={cn(styles.Break)}
        className={cn(styles.Component, className)}
        activeClassName={cn(styles.Active, activeClassName)}
        pageCount={pageCount}
        nextLabel={
          <Button
            className="gap-1 border-none px-2 py-[0.3125rem] text-body/small/regular font-light text-dark-background"
            size="none"
            variant="secondary"
          >
            {dictionary.Next}
            <ArrowRight size={12} strokeWidth={1} />
          </Button>
        }
        previousLabel={
          <Button
            className="gap-1 border-none px-2 py-[0.3125rem] text-body/small/regular font-light"
            size="none"
            variant="ghost"
          >
            <ArrowLeft size={12} strokeWidth={1} />
            {dictionary.Previous}
          </Button>
        }
        renderOnZeroPageCount={renderOnZeroPageCount}
        onPageChange={onPageChange}
        {...rest}
      />
    </div>
  )
}

export default memo(Paginate, isEqual)
