import type { Metadata } from 'next';
import { getReportData } from '../../../common/api/cohelm';

export const metadata: Metadata = {
  title: 'Cohelm: Report',
  description: 'Check out your report here!'
}




export default async function Page() {
  let report;
  try {
    report = await getReportData();
    // Use the report data
    console.log("Report data:", report);
  } catch (error) {
    console.error("Error fetching report data:", error);
  }
  


  return (
    <>
    Report Page
    {report? 
      <p>{report.case_id}</p>
     : <></>
    }

    </>
  )
}
