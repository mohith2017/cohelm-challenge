import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import fs from 'fs';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // const filePath = '../data/example-response.json';
  const filePath = path.join(process.cwd(), 'public', 'data', 'example-response.json');
  
  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const jsonData = JSON.parse(fileContent);
    res.status(200).json(jsonData);
  } catch (error) {
    console.error('Error reading or parsing the file:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
