import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';


export async function getReportData() {
    const response = await fetch("http://localhost:3000/api/cohelm");
    const jsonData = await response.json();
    return jsonData;
  };