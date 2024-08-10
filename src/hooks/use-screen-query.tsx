'use client'

import { useMediaQuery } from 'usehooks-ts'

import theme from '@/theme'

const geCalcMaxWidth = (themeScreen: string) => `calc(${themeScreen} - 0.2px)`

const MEDIA_QUERY = {
  POINTER: 'only screen and (hover:hover)',
  MD_: `only screen and (min-width : ${theme.screens.md})`,
  _MD: `only screen and (max-width : ${geCalcMaxWidth(theme.screens.md)})`,
  _SM: `only screen and (max-width : ${geCalcMaxWidth(theme.screens.sm)}`,
  _LG: `only screen and (max-width : ${geCalcMaxWidth(theme.screens.lg)}`,
  _XL: `only screen and (max-width : ${geCalcMaxWidth(theme.screens.xl)})`,
}

function useScreenQuery() {
  const screenMD_ = useMediaQuery(MEDIA_QUERY.MD_)
  const screen_MD = useMediaQuery(MEDIA_QUERY._MD)
  const screen_XL = useMediaQuery(MEDIA_QUERY._XL)
  const screen_SM = useMediaQuery(MEDIA_QUERY._SM)
  const screen_LG = useMediaQuery(MEDIA_QUERY._LG)
  const screenPointer = useMediaQuery(MEDIA_QUERY.POINTER)

  return {
    screenMD_,
    screen_MD,
    screen_XL,
    screen_SM,
    screen_LG,
    screenPointer,
  }
}

export default useScreenQuery
