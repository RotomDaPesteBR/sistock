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
    const expense = await prisma.ExpensesRec.create({
      data: {
        date: data.date,
        quantity: data.addedQuantity,
        value: data.value,
        expensesId: data.expense,
        userId: data.user
      }
    });
    res.status(200).json('Inserido com sucesso');
  } catch (err) {
    res.status(500).json({ error: 'Erro' });
  }
}
