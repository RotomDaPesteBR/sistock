import { NextApiRequest, NextApiResponse } from 'next/types';
import prisma from '../../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { data } = req.body;
    const products = await prisma.Product.findMany({
      where: { userId: data },
      select: {
        id: true,
        name: true,
        brand: true,
        unit: true,
        limit: true,
        stock: true,
        active: true
      },
      orderBy: {
        stock: 'asc'
      }
    });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: 'failed to load data' });
  }
}
