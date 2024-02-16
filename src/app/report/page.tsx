import type { Metadata } from 'next';
import ReportPageContents from '../components/report/reportPageContents';

export const metadata: Metadata = {
  title: 'Cohelm: Report',
  description: 'Check out your report here!'
}


export default async function Page() {

  return (
    <>
        <ReportPageContents></ReportPageContents>
    </>
    
  )
}
