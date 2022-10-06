import { NextApiRequest, NextApiResponse } from 'next/types';

import prisma from '../../../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const accounts = await prisma.account.findMany();
  try {
    if (req.method === 'POST') {
      const { email } = req.body;
      const { password } = req.body;
      if (email === 'mielsen.gamer2005@gmail.com' && password === '123456') {
        res.status(200).json(accounts);
      }
    }
  } catch (err) {
    res.status(500).json({ error: 'failed to load data' });
  }
}
