import { NextApiRequest, NextApiResponse } from 'next/types';
import prisma from '../../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { data } = req.body;
    const user = await prisma.User.findUnique({
      where: { id: data },
      select: {
        name: true,
        email: true,
        password: true,
        image: true,
        restaurantName: true,
        cpf: true
      }
    });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: 'failed to load data' });
  }
}
