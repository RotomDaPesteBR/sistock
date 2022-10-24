import { NextApiRequest, NextApiResponse } from 'next/types';
import prisma from '../../../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { data } = req.body;
    const products = await prisma.ProductIn.findMany({
      where: { userId: data },
      select: {
        id: true,
        date: true,
        quantity: true,
        value: true,
        productId: true,
        userId: true,
        product: { select: { name: true, brand: true } }
      },
      orderBy: {
        date: 'desc'
      }
    });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: 'failed to load data' });
  }
}
