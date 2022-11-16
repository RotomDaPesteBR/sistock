import { verify } from 'argon2';
import { NextApiRequest, NextApiResponse } from 'next/types';
import prisma from '../../../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const email = 'mielsen.gamer2005@gmail.com';
    const password = 'SenhaTeste';
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
    if (account.email === email && (await verify(account.password, password))) {
      res.status(200).json('ok');
    } else {
      res.status(200).json('false');
    }
  } catch (err) {
    res.status(500).json({ error: 'failed to load data' });
  }
}
