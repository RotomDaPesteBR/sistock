import { NextApiRequest, NextApiResponse } from 'next/types';
import prisma from '../../../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { data } = req.body;
    const user = await prisma.ProductSales.delete({
      where: { id: data }
    });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: 'failed to load data' });
  }
}
