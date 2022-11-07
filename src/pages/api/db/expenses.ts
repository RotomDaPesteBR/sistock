import { NextApiRequest, NextApiResponse } from 'next/types';
import prisma from '../../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { data } = req.body;
    const expenses = await prisma.Expenses.findMany({
      where: { userId: data },
      select: {
        id: true,
        name: true
      },
      orderBy: {
        name: 'asc'
      }
    });
    res.status(200).json(expenses);
  } catch (err) {
    res.status(500).json({ error: 'failed to load data' });
  }
}
