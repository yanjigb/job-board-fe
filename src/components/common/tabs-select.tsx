'use client'

import React, { memo, RefObject, useEffect, useRef } from 'react'
import isEqual from 'react-fast-compare'

import { HTMLTypeWithoutRefHasClassNameOptional, ITabsItem } from '@/types/common'
import { cn } from '@/utils/cn'

import { Button } from '../ui/button'
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs'

interface Props<T extends readonly ITabsItem[]> {
  list: T
  onClick: (value: string) => void
  currentValue?: T[number]['value']
  className?: string
  children?: React.ReactNode
}

const TabsSelect = memo(function TabsSelect({
  list,
  onClick,
  currentValue,
  className,
  children,
}: Props<ITabsItem[]>) {
  return (
    <Tabs defaultValue={currentValue} className={className}>
      <TabsList>
        {list.map((item) => {
          const handleClick = () => {
            onClick(item.value)
          }
          return (
            <TabsTrigger value={item.value} key={item.label} onClick={handleClick}>
              {item.label}
            </TabsTrigger>
          )
        })}
      </TabsList>

      {children}
    </Tabs>
  )
}, isEqual)
TabsSelect.displayName = 'TabsSelect'

const AdditionalTabsLayout = memo(function AdditionalTabsLayout({
  className,
  ...rest
}: HTMLTypeWithoutRefHasClassNameOptional<HTMLUListElement>) {
  return (
    <ul
      className={cn(
        'flex items-center gap-10 px-[1.5625rem] text-body/medium/medium font-normal text-text-primary',
        className,
      )}
      {...rest}
    />
  )
}, isEqual)
AdditionalTabsLayout.displayName = 'AdditionalTabsLayout'

interface TabItemProps {
  item: ITabsItem
  refProp: RefObject<HTMLLIElement>
  className?: string
  currentTab?: string
  onClick?: () => void
}
const AdditionalTab = memo(function AdditionalTab({
  className,
  currentTab,
  item,
  refProp,
  onClick,
  ...rest
}: TabItemProps) {
  return (
    <Button key={item.label} asChild variant="none" size="none" onClick={onClick}>
      <li
        className={cn(
          "relative cursor-pointer py-[0.9375rem] after:absolute after:bottom-[-0.0625rem] after:left-0 after:h-[0.125rem] after:w-full after:bg-transparent after:transition-colors after:content-['']",
          currentTab === item.value && 'text-secondary after:bg-secondary',
        )}
        ref={refProp}
        {...rest}
      >
        {item.label}
      </li>
    </Button>
  )
}, isEqual)
AdditionalTab.displayName = 'AdditionalTab'

const AdditionalTabSelect = memo(function AdditionalTabSelect({
  list = [],
  onClick,
  currentTab,
}: {
  list: { label: string; value: string }[]
  onClick?: (value: string) => void
  currentTab?: string
}) {
  const [tab, setTab] = React.useState(currentTab)

  const tabsRef = useRef<Record<string, HTMLLIElement | null>>(
    {} as Record<string, HTMLLIElement | null>,
  )
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (tab && containerRef.current && tabsRef.current[tab]) {
      const container = containerRef.current
      const activeTabElement = tabsRef.current[tab]

      const containerWidth = container.offsetWidth
      const tabWidth = activeTabElement.offsetWidth
      const tabLeft = activeTabElement.offsetLeft

      const scrollLeft = tabLeft - containerWidth / 2 + tabWidth / 2

      container.scrollTo({
        left: scrollLeft,
        behavior: 'smooth',
      })
    }
  }, [tab])

  return (
    <div className="overflow-x-auto overflow-y-hidden scroll-smooth" ref={containerRef}>
      <AdditionalTabsLayout>
        {list.map((item) => {
          const handleClick = () => {
            setTab(item.value)
            onClick?.(item.value)
          }
          return (
            <AdditionalTab
              key={item.value}
              refProp={{
                get current() {
                  return tabsRef.current[item.value]
                },
                set current(value) {
                  tabsRef.current[item.value] = value
                },
              }}
              onClick={handleClick}
              item={item}
              currentTab={tab}
            />
          )
        })}
      </AdditionalTabsLayout>
    </div>
  )
}, isEqual)
AdditionalTabSelect.displayName = 'AdditionalTabSelect'

export { TabsSelect, AdditionalTabSelect }
