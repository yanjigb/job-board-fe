/* eslint-disable react/prop-types */
import * as React from 'react'
import isEqual from 'react-fast-compare'

import { cn } from '@/utils/cn'

interface IColGroupProps {
  list?: number[]
  paddingX?: number
}
const ColGroup = React.memo(function ColGroup({ list = [], paddingX = 24 }: IColGroupProps) {
  const containerWidth = React.useMemo(
    () => list.reduce((acc, curr) => acc + curr, 0) + paddingX * list.length,
    [list, paddingX],
  )

  return (
    <colgroup>
      {list.map((width, index) => (
        <col
          span={1}
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          style={{ width: `calc(${((+width + +paddingX) / containerWidth) * 100}%)` }}
        />
      ))}
    </colgroup>
  )
}, isEqual)
ColGroup.displayName = 'ColGroup'

const Table = React.forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>(
  ({ className, ...props }, ref) => (
    <div className="relative w-full overflow-auto">
      <table ref={ref} className={cn('w-full caption-bottom', className)} {...props} />
    </div>
  ),
)
Table.displayName = 'Table'

interface ITableHeaderProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  borderTopBottom?: boolean
  nowrap?: boolean
  bg?: boolean
  noBorder?: boolean
  size?: 'sm' | 'md'
}
const TableHeader = React.forwardRef<HTMLTableSectionElement, ITableHeaderProps>(
  ({ size = 'md', className, borderTopBottom, nowrap, bg, noBorder, ...props }, ref) => (
    <thead
      ref={ref}
      className={cn(
        '[&_th]:pb-[0.9375rem] [&_tr]:border-b [&_tr]:border-stroke',
        borderTopBottom && '[&_th]:pt-[0.9375rem] [&_tr]:border-t',
        nowrap && 'whitespace-nowrap',
        bg && 'bg-dark-2',
        noBorder && '[&_tr]:border-transparent',
        size === 'sm' && '[&_th]:pb-[0.6875rem] [&_th]:pt-3',
        className,
      )}
      {...props}
    />
  ),
)
TableHeader.displayName = 'TableHeader'

interface ITableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  alignItem?: 'bottom' | 'middle' | 'top'
}
const TableBody = React.forwardRef<HTMLTableSectionElement, ITableBodyProps>(
  ({ className, alignItem = 'top', ...props }, ref) => (
    <tbody
      ref={ref}
      className={cn(
        '[&_tr:last-child]:border-0',
        alignItem === 'bottom' && '[&_td]:align-bottom',
        alignItem === 'top' && '[&_td]:align-top',
        alignItem === 'middle' && '[&_td]:align-middle',

        className,
      )}
      {...props}
    />
  ),
)
TableBody.displayName = 'TableBody'

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      'border-t bg-slate-100/50 dark:bg-slate-800/50 [&>tr]:last:border-b-0',
      className,
    )}
    {...props}
  />
))
TableFooter.displayName = 'TableFooter'

interface ITableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  noBorder?: boolean
}
const TableRow = React.forwardRef<HTMLTableRowElement, ITableRowProps>(
  ({ className, noBorder, ...props }, ref) => (
    <tr
      ref={ref}
      className={cn(
        'border-b transition-colors data-[state=selected]:bg-slate-100 dark:data-[state=selected]:bg-slate-800',
        'border-stroke',
        noBorder && 'border-transparent',
        className,
      )}
      {...props}
    />
  ),
)
TableRow.displayName = 'TableRow'

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      'text-left align-middle [&:has([role=checkbox])]:pr-0',
      'px-3 py-4 font-light text-text-primary',
      className,
    )}
    {...props}
  />
))
TableHead.displayName = 'TableHead'

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn(
      'align-middle [&:has([role=checkbox])]:pr-0',
      'px-3 pb-[0.9375rem] pt-4',
      className,
    )}
    {...props}
  />
))
TableCell.displayName = 'TableCell'

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn('mt-4 text-slate-500 dark:text-slate-400', className)}
    {...props}
  />
))
TableCaption.displayName = 'TableCaption'

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
  ColGroup,
}
