import { NextApiRequest, NextApiResponse } from 'next/types';
import prisma from '../../../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { data } = req.body;
    const goods = await prisma.SalesRec.findMany({
      where: { userId: data },
      select: {
        id: true,
        date: true,
        value: true,
        quantity: true,
        prodsaleId: true,
        userId: true,
        prodsale: { select: { name: true } }
      },
      orderBy: {
        date: 'desc'
      }
    });
    res.status(200).json(goods);
  } catch (err) {
    res.status(500).json({ error: 'failed to load data' });
  }
}
