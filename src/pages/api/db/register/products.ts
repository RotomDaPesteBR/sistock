import { NextApiRequest, NextApiResponse } from 'next/types';
import prisma from '../../../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { data } = req.body;
    const products = await prisma.Product.create({
      data: {
        name: data.nome,
        brand: data.marca,
        unit: data.unidade,
        limit: data.limite,
        stock: 0,
        userId: data.user
      }
    });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: 'failed to load data' });
  }
}
