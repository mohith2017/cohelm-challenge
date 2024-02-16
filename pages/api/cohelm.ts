// pages/api/hello.ts
import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Path to the file containing the JSON data
  const filePath = 'public/data/example-response.json';
  
  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const jsonData = JSON.parse(fileContent);
    res.status(200).json(jsonData);
  } catch (error) {
    console.error('Error reading or parsing the file:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
