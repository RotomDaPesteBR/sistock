import { NextApiRequest, NextApiResponse } from 'next/types';
import prisma from '../../../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { data } = req.body;
    const sales = await prisma.ProductSales.create({
      data: {
        name: data.nome,
        userId: data.user
      }
    });
    res.status(200).json(sales);
  } catch (err) {
    res.status(500).json({ error: 'failed to load data' });
  }
}
