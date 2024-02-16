export async function getReportData() {
  try {
    const response = await fetch("https://cohelm-challenge.vercel.app/api/cohelm");
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
  };