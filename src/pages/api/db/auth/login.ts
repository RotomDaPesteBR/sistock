import { NextApiRequest, NextApiResponse } from 'next/types';
// import { createSign } from 'crypto';

import prisma from '../../../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === 'POST') {
      const { email } = req.body;
      const { password } = req.body;
      const account = await prisma.User.findUnique({
        where: {
          email
        },
        select: {
          id: true,
          name: true,
          email: true,
          password: true,
          image: true
        }
      });
      if (account.email === email && account.password === password) {
        // createSign('');
        const user = {
          id: account.id,
          name: account.name,
          email: account.email,
          image: account.image
        };
        res.status(200).json(user);
      } else {
        res.status(500).json({ error: 'failed to load data' });
      }
    } else {
      res.status(500).json({ error: 'failed to load data' });
    }
  } catch (err) {
    res.status(500).json({ error: 'failed to load data' });
  }
}
