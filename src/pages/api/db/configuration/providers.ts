import { NextApiRequest, NextApiResponse } from 'next/types';
import prisma from '../../../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { data } = req.body;
    const providers = await prisma.Account.findMany({
      where: { userId: data },
      select: {
        provider: true
      },
      orderBy: {
        provider: 'asc'
      }
    });
    res.status(200).json(providers);
  } catch (err) {
    res.status(500).json({ error: 'failed to load data' });
  }
}
