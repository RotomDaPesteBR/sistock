import { NextApiRequest, NextApiResponse } from 'next/types';
import prisma from '../../../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { data } = req.body;
    const product = await prisma.Product.update({
        where: { id: data.product },
        data: { 
            stock: data.quantity
        }
      });
    const historic = await prisma.ProductIn.create({
        data: { 
            date: '',
            quantity: data.quantity,
            value: data.value,
            userId: data.user
        }
    });
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ error: 'failed to load data' });
  }
}
