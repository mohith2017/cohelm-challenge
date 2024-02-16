export async function getReportData() {
    const response = await fetch("https://cohelm-challenge.vercel.app/api/cohelm");
    const jsonData = await response.json();
    return jsonData;
  };