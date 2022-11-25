import { NextApiRequest, NextApiResponse } from 'next/types';
import prisma from '../../../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { data } = req.body;
    await prisma.ProductSales.update({
      where: { id: data },
      data: {
        active: false
      }
    });
    res.status(200).json('Desativado com sucesso');
  } catch (err) {
    res.status(500).json({ error: 'failed to load data' });
  }
}
