/* eslint-disable no-unused-vars */
import { NextApiRequest, NextApiResponse } from 'next/types';
import prisma from '../../../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { data } = req.body;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const product = await prisma.Product.update({
      where: { id: data.product },
      data: {
        stock: data.quantity
      }
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const historic = await prisma.ProductIn.create({
      data: {
        date: data.date,
        quantity: data.addedQuantity,
        value: data.value,
        productId: data.product,
        userId: data.user
      }
    });
    res.status(200).json('Inserido com sucesso');
  } catch (err) {
    res.status(500).json({ error: 'Erro' });
  }
}
