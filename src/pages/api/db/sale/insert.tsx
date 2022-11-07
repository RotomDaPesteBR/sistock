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
    const product = await prisma.SalesRec.update({
      where: { id: data.product },
      data: {
        stock: data.quantity
      }
    });
    res.status(200).json('Inserido com sucesso');
  } catch (err) {
    res.status(500).json({ error: 'Erro' });
  }
}
