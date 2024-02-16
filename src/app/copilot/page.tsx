import type { Metadata } from 'next'
import LoginPageContents from '../components/login/loginPageContents'

export const metadata: Metadata = {
  title: 'Cohelm: AI',
  description: 'Generate your Report!'
}


export default function Page() {

  return (
    <>
        <LoginPageContents></LoginPageContents>
    </>

  )
}
