import React, { memo } from 'react'
import isEqual from 'react-fast-compare'

import { Button } from '@/components/ui/button'
import { InputOTP, InputOTPSlot } from '@/components/ui/input-otp'

import AuthenticationLayout from '@/components/layout/authentication/layout'
import { useDictionary } from '@/providers/dictionary-provider'

interface Props {
  onComplete: (value: string) => void
}

function SignInOtpForm({ onComplete }: Props) {
  const { dictionary } = useDictionary()

  return (
    <AuthenticationLayout
      title={dictionary['Enter OTP code']}
      description={
        <>
          {dictionary['We have sent the OTP code to email']}
          &nbsp;bui*****asd@gmail.com
        </>
      }
    >
      <InputOTP maxLength={6} onComplete={onComplete}>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTP>

      <Button className="w-full">{dictionary['Log in']}</Button>
    </AuthenticationLayout>
  )
}

export default memo(SignInOtpForm, isEqual)
