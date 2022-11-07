import { NextApiRequest, NextApiResponse } from 'next/types';
import prisma from '../../../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { data } = req.body;
    const Product = await prisma.Product.update({
      where: { id: data.produto },
      data: {
        name: data.nome,
        brand: data.marca,
        unit: data.unidade,
        limit: data.limite
      }
    });
    res.status(200).json(Product);
  } catch (err) {
    res.status(500).json({ error: 'failed to load data' });
  }
}
