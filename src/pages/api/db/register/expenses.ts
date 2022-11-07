import { NextApiRequest, NextApiResponse } from 'next/types';
import prisma from '../../../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { data } = req.body;
    const expenses = await prisma.Expenses.create({
      data: {
        name: data.nome,
        userId: data.user
      }
    });
    res.status(200).json(expenses);
  } catch (err) {
    res.status(500).json({ error: 'failed to load data' });
  }
}
